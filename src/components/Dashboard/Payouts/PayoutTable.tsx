"use client"

import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta, DataTablePageEvent } from "primereact/datatable";
import moment from "moment";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import HTTPService from "@/services/http";
import ENDPOINTS from "@/config/ENDPOINTS";
import { formatCurrency } from "@/helpers";
import { IoIosArrowDown } from "react-icons/io";

interface IPayoutTable {
    searchValue: string;
    selectedDate: number | null;
    payouts: any;
}

export interface LazyTableState { 
    first: number; 
    rows: number; 
    page?: number | undefined; 
    pageCount?: number; 
    sortField?: string; 
    sortOrder?: number; 
    filters?: DataTableFilterMeta; 
}

export interface IPayout {
    id: string
    amount: number;
    createdAt: string;
    bankName: string;
    bankAccount: string;
    recipientName: string;
    status: string;
}

export default function PayoutTable ({
    searchValue,
    selectedDate,
    payouts,
}: IPayoutTable) {
    const cookies = new Cookies();
    const httpService = new HTTPService();
  
    const router = useRouter();
  
    const [rowClick, setRowClick] = useState<boolean>(true);
    const [totalRecords, setTotalRecords] = useState<number>(0); 
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [lazyPayouts, setLazyPayouts] = useState<IPayout[] | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [lazyState, setlazyState] = useState<LazyTableState>({ 
       first: 0, 
       rows: 10, 
       page: 0, 
    }); 

     const loadLazyData = useCallback(() => { 
        setLoading(true); 
    
          const fetchData = () => { 
              const cookies = new Cookies(); 
              const token = cookies.get('urban-token'); 
              console.log(token); 
              const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL; 
       
              fetch(`${baseUrl}/api/v1/${ENDPOINTS.CONFIRM_EMAIL_OTP}?page=${(lazyState.page ?? 0) + 1}&limit=${lazyState.rows}`, { 
                  headers: { 
                      Authorization: `Bearer ${token}`, 
                  }, 
                  cache: 'no-store', 
              }).then(response => { 
                  if (!response.ok) { 
                      throw new Error('Network response was not ok'); 
                  } 
                  return response.json(); 
              }).then(data => { 
                  if (data.data) { 
                      console.log(data.meta); 
                      setTotalRecords(data.meta.total_items); 
                      setTotalPages(data.meta.total_pages); 
                      console.log(data.data); 
                      setLazyPayouts(data.data); 
                      setLoading(false); 
                  } 
              }).catch(error => { 
                  toast.error(error.message); 
            setLazyPayouts([]);
            setLoading(false);
                  console.error('There was a problem with the fetch operation:', error); 
              }); 
          }; 
           
          fetchData(); 
      }, [lazyState]); 
    
     useEffect(() => { 
         loadLazyData(); 
     }, [loadLazyData]); 
    
     const onPage = (event: DataTablePageEvent) => {  
        setlazyState(event);
        console.log(event); 
     }; 
  
    const dateTemplate = (payout: IPayout) =>
      moment(payout.createdAt).format('MMM Do YYYY');
  
    function amountTemplate(payout: IPayout) {
      return formatCurrency(+payout.amount);
    }
  
    function checkIfUrl(imageUrl: string) {
      if (!/^https?:\/\//.test(imageUrl) && !/^\/ /.test(imageUrl)) {
        // console.error(`Invalid image URL: ${imageUrl}`);
        return false;
      }
      return true;
    }
  
    function bankDetailsTemplate(payout: IPayout) {
      return (
        <div className='flex items-center gap-4'>
          <div className='flex-1 '>
            <p className='text-sm font-medium'>{payout?.recipientName}</p>
            <p className='text-sm font-medium'>{payout?.bankName + "-" + payout?.bankAccount}</p>
          </div>
        </div>
      );
    }

    function payoutStatusTemplate (payout: IPayout) {

        const { status } = payout;

        let styles;

        switch(status) {
            case 'pending':
                styles = 'bg-orange-100 text-orange-600';
                break;
            case 'sucecss':
                styles = 'bg-[#E8F8FD] text-[#13B2E4]';
                break;
            case 'failed':
                styles = 'bg-red-100 text-red-600';
                break;
            case 'cancelled':
                styles = 'bg-red-100 text-red-600';
                break;
            default:
                styles = 'bg-purple-50 text-purple-600';
                break;
        }

        return (
            <span className={`p-2 px-4 text-xs font-medium rounded-full whitespace-nowrap ${styles}`}>
              {status}
            </span>
        );
    } 
  
    const getPayoutsByDate = useMemo(() => {
      if (selectedDate) {
        return lazyPayouts?.filter(
          (payout) => moment(payout.createdAt).valueOf() >= selectedDate
        );
      } else return lazyPayouts;
    }, [lazyPayouts, selectedDate]);

  
    const rowClassTemplate = (data: IPayout) => {
      return {
          'cursor-pointer': data.id
      };
    };
  
    return (
      <div>
      <div className='card rounded-xl p-4 bg-white border border-gray-200'>

        <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
          <p className='font-bold text-xl text-gray-700'>Payouts</p>
        </div>
        
        <DataTable
          value={lazyPayouts ?? []}
          lazy 
          first={lazyState.first}  
          onPage={onPage} 
          loading={loading} 
          totalRecords={totalRecords}
          dataKey='id'
          tableStyle={{ minWidth: '80rem' }}
          paginator
          paginatorClassName='flex justify-between'
          rows={10}
          className='rounded-xl text-sm capitalize'
          sortOrder={-1}
          sortField='createdAt'
          sortIcon={<IoIosArrowDown />}
          showSelectAll
          selectionAutoFocus={true}
          alwaysShowPaginator={true}
          onRowClick={(e) => router.push(`/dashboard/payouts/${e.data.id}`)}
          rowClassName={rowClassTemplate}
        >
            <Column field='createdAt' header='Date' body={dateTemplate} sortable />
          
            <Column
                field=''
                header='Bank Details'
                body={bankDetailsTemplate}
                sortable
            />

            <Column
                field='amount'
                header='Amount'
                body={amountTemplate}
                sortable
            />

            <Column
                field='status'
                header='Status'
                sortable
                body={payoutStatusTemplate}
            />
            
            <Column field='id' header='Payout ID/Reference no' sortable />
        </DataTable>
      </div>
      </div>
    );
}