'use client';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta, DataTablePageEvent } from 'primereact/datatable';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import INotification, { INotifications } from '@/interfaces/notifications';
import HTTPService from '@/services/http';
import ENDPOINTS from '@/config/ENDPOINTS';
// import { NotificationContext } from '@/context/NotificationContext';
import { paginatorTemplate } from '@/components/Shared/OrdersComponents/OrdersTable';

interface LazyTableState { 
    first: number; 
    rows: number; 
    page?: number | undefined; 
    pageCount?: number; 
    sortField?: string; 
    sortOrder?: number; 
    filters?: DataTableFilterMeta; 
}

export default function NotificationsTable() {
  const [selectedCode, setSelectedCode] = useState<INotifications | null>(
    null
  );

//   console.log(notifications);

//   const { setUnreadNotifications } = useContext(NotificationContext) ?? {
//     setUnreadNotifications: () => {},
//   };

    const [rowClick, setRowClick] = useState<boolean>(true);

    const cookies = new Cookies();
    const httpService = new HTTPService();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 
  
    const router = useRouter();

    const [totalRecords, setTotalRecords] = useState<number>(0); 
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [lazyNotifications, setLazyNotifications] = useState<INotifications | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [lazyState, setlazyState] = useState<LazyTableState>({ 
        first: 0, 
        rows: 10, 
        page: 0, 
    }); 

    const onPage = (event: DataTablePageEvent) => {  
        setlazyState(event);
        console.log(event); 
    }; 

    async function markNotificationAsRead (id: string) {
        const token = cookies.get('pettify-token');
        toast.loading('Marking as read...');

        const res = await httpService.patchById(
            `${ENDPOINTS.NOTIFICATIONS}/${id}/mark-as-read`,
            `Bearer ${token}`
        );

        toast.dismiss();

        if (res.success) {
            console.log(res);
            toast.success('Notification marked as read.');
            // setUnreadNotifications((prev: number) => prev - 1);
            router.refresh();
            loadLazyData();
        } else toast.error('Cannot update notification at this time.');
    }

    const loadLazyData = useCallback(() => {
        setLoading(true);
  
        const fetchData = () => {
            const cookies = new Cookies();
            const token = cookies.get('pettify-token');
            console.log(token);
  
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
            fetch(`${baseUrl}/api/v1/${ENDPOINTS.NOTIFICATIONS}?page=${(lazyState.page ?? 0) + 1}&limit=${lazyState.rows}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: 'no-store',
            }).then(response => {
                if (!response.ok) {
                    throw new Error('An error occured.');
                }
                return response.json();
            }).then(data => {
                if (data.data) {
                    setTotalRecords(data.meta.totalRecords);
                    setTotalPages(data.meta.totalPages);
                    setLazyNotifications(data.data); 
                    setLoading(false);
                }
            }).catch(error => {
                toast.error(error.message);
                console.error('There was a problem with the fetch operation:', error);
            });
        };
    
        fetchData();
    }, [lazyState]);

    useEffect(() => {
        loadLazyData();
    }, [loadLazyData]);

    function actionTemplate(notification: INotification) {
        return (
            <div className={`flex items-center gap-3 justify-end`}>
                {
                    !notification.isRead 
                    ?
                    <button onClick={() => markNotificationAsRead(notification._id)}>
                        <IoCheckmarkDoneOutline className='text-xl'/>
                    </button> 
                    :
                    <p className='text-xs text-green-300 text-center'>Viewed</p>
                }
            </div>
        );
    }

    const selectRowHandler = (e: any) => {
        setSelectedCode(e.value);
    };

    const dateTemplate = (notif: INotification) => {
        return (
            <div>
                <p className='whitespace-nowrap'>{moment(notif.createdAt).format('MMM Do YYYY')}</p>
                <p>{moment(notif.createdAt).format('h:mm A')}</p>
            </div>
        )
    }
    
  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <DataTable
        value={lazyNotifications ?? []}
        emptyMessage={"You have no notifications."}
        lazy 
        first={lazyState.first}  
        onPage={onPage} 
        loading={loading} 
        totalRecords={totalRecords}
        dataKey='_id'
        tableStyle={{ minWidth: '30rem' }}
        paginator
        rows={20}
        className='rounded-md text-sm capitalize'
        paginatorTemplate={paginatorTemplate(totalRecords, lazyState.page)}
        paginatorClassName='flex justify-between'
        sortIcon={<IoIosArrowDown />}
      >
        <Column
          field='createdAt'
          header='Date'
          sortable
          body={dateTemplate}
          align='center'
        ></Column>
        <Column field='title' align='center' header='Title'></Column>
        <Column
          field='message'
          header='Message'
          className='text-gray-500'
          align='center'
        ></Column>
        {/* <Column
          field='action' 
          header='Action'
          body={actionTemplate}
          align='center'
        ></Column> */}
      </DataTable>
    </div>
  );
};