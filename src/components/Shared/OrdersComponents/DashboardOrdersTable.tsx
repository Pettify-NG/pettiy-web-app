'use client';

import moment from 'moment';
import Image from 'next/image';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/navigation';

import { formatCurrency } from '@/helpers';
import IOrder from '@/interfaces/orders';

export default function DashboardOrdersTable({
  orders,
}: {
  orders: any
}) {

  const dateTemplate = (order: IOrder) => {
    const { createdAt } = order;

    return moment(createdAt).format('MMM Do YYYY');
  };

  function amountTemplate(order: IOrder) {
    return formatCurrency(order.totalAmountForSeller);
  }

  function statusTemplate(order: IOrder) {
    const { status } = order;

    let styles = '';

    switch (status.toLowerCase()) {
      case 'processing':
        styles = 'bg-orange-100 text-orange-600';
        break;
      case 'shipped':
        styles = 'bg-[#E8F8FD] text-[#13B2E4]';
        break;
      case 'delivered':
        styles = 'bg-green-100 text-green-600';
        break;
      case 'paid':
        styles = 'bg-green-100 text-green-600';
        break;
      case 'cancelled':
        styles = 'bg-red-100 text-red-600';
        break;
      case 'refunded':
        styles = 'bg-red-100 text-red-600';
        break;
      case 'packed':
        styles = 'bg-[#E8F8FD] text-[#13B2E4]';
        break;
      default:
        styles = 'bg-purple-50 text-purple-600';
        break;
    }

    return (
      <span className={`p-2 px-4 text-xs font-medium rounded-full whitespace-nowrap ${styles}`}>
        {order.status}
      </span>
    );
  }

  // function productTemplate(order: IOrder) {
  //   return (
  //     <div className='flex items-center gap-4'>
  //       <Image
  //         src={order.orderProduct[0].image}
  //         alt='image'
  //         width={20}
  //         height={20}
  //         className='h-12 w-12 bg-[#1b1b1b] rounded-md'
  //       />

  //       <div className='div capitalize flex-1'>
  //         <p className='text-sm flex-1 font-medium'>
  //           {order.orderProduct[0].productName}
  //         </p>
  //         {order.orderProduct.length > 1 && (
  //           <p className='text-xs text-neutral'>
  //             +{order.orderProduct.length} other products
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  // function customerTemplate(order: IOrder) {
  //   return (
  //     <div className='flex flex-col gap-2 capitalize'>
  //       <p className='text-sm flex-1 font-medium'>{order.user.firstName + " " + order.user.lastName}</p>
  //       {/* <p className='text-xs text-neutral'>{order.receiverPhone}</p> */}
  //       <p className='text-xs text-neutral'>{order.user.email}</p>
  //     </div>
  //   );
  // }

  const router = useRouter();

  const rowClassTemplate = (data: IOrder) => {
    return {
        'cursor-pointer': data._id
    };
  };

  const idTemplate = (data: IOrder) => {
    console.log(data);
    return `ORDER-${data.uuid}`
  }

  return (
    <>    
      <div className='card rounded-xl p-4 bg-white border border-gray-200'>
        <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
            <p className='font-bold text-xl text-gray-700'>Latest Orders</p>
        </div>

        <DataTable
          value={orders ?? []}
          scrollable={true}
          dataKey='uuid'
          // tableStyle={{ minWidth: '20rem' }}
          // paginator
          // paginatorClassName='flex justify-between overflow-x-auto'
          rows={10}
          className='rounded-md text-sm'
          sortOrder={-1}
          sortField='createdAt'
          showSelectAll
          sortIcon={<IoIosArrowDown />}
          selectionAutoFocus={true}
          onRowClick={(e) => router.push(`/dashboard/orders/${e.data.uuid}`)}
          rowClassName={rowClassTemplate}
        >
          <Column field='uuid' header='Order ID' body={idTemplate} className='text-[#F2C94C]'/>
          {/* <Column body={productTemplate} header='Products' /> */}
          <Column
              field='totalAmountForSeller'
              header='Amount'
              body={amountTemplate}
              sortable
          />
          <Column field="selectedLocation" header="Delivery Location" />
          <Column field='status' header='Status' sortable body={statusTemplate} />
          <Column field='createdAt' header='Date' body={dateTemplate} sortable />
        </DataTable>
      </div>
    </>
  );
}
