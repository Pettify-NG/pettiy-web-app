'use client';

import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { RxPencil2 } from 'react-icons/rx';
import moment from 'moment';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';


import HTTPService from '@/src/services/http';
import ENDPOINTS from '@/src/config/ENDPOINTS';
import { formatCurrency, formatDate } from '@/src/helpers';
import { ICustomer, ICustomers } from '@/src/interfaces/customers';

export default function CustomersTable({
  selectedDate,
  customers,
  searchValue,
  selectedCustomers,
  handleChangeSelectedCustomers,
}: {
  selectedDate: Date | (Date | null)[] | Date[] | null | undefined | number;
  searchValue: string;
  customers: ICustomers | undefined;
  selectedCustomers: ICustomers;
  handleChangeSelectedCustomers?: (e: any) => void;
}) {
  // const [selectedCustomers, setSelectedCustomers] = useState<
  //   ICustomer[] | null
  // >(null);
  const [rowClick, setRowClick] = useState<boolean>(true);

  const httpService = new HTTPService();

  const cookies = new Cookies();
  const token = cookies.get('urban-token');

//   const deleteCustomer = (customerId?: number) => {
//     if(customerId) {
//       try {
//         toast.loading("Deleting customer...");

//         const data = {
//           status: "SUSPENDED"
//         }
  
//         httpService
//           .deleteLikePatch(`${ENDPOINTS.CUSTOMERS}/${customerId}`, data, `Bearer ${token}`)
//           .then((apiRes) => {
//             console.log('Response: ', apiRes);
  
//             toast.dismiss();
//             if (apiRes.status === 200) {
  
//               toast.success('Customer successfully deleted.');
//             }
//           });
//       } catch (error) {
//         console.log(error);
//       }
//     } else {toast.error("Could not delete customer.")}
//   }

  const dateTemplate = (customer: ICustomer) =>
    moment(customer.createdAt).format('MMM Do YYYY');

  function amountTemplate(customer: ICustomer) {
    return formatCurrency(customer.orderBalance);
  }

  function actionTemplate(customer: ICustomer) {
    return (
      <div className='flex items-center gap-3'>
        <Link
          href={`/admin/customers/${customer.id}?edit=false`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
       {/*  <Link
        {/* <Link
          href={`/admin/customers/${customer.id}?edit=true`}
          className='text-xl text-neutral'
        >
          <RxPencil2 /> 
          <MdOutlineModeEdit />
        </Link>*/}
        <button
        //   onClick={() => deleteCustomer(customer?.id)}
        >
          <RiDeleteBin6Line className='text-xl'/>
        </button>
      </div>
    );
  }

  function customerTemplate(customer: ICustomer) {
    return (
      <div className='flex items-center gap-4'>
        {/* <div className='h-12 w-12 bg-gray-300 rounded-full'></div> */}

        <div>
          <p className='text-xs font-medium'>{customer.firstName + " " + customer.lastName}</p>
          <p className='text-xs text-neutral font-light'>{customer.email}</p>
          <p className='text-xs text-neutral font-light'>{customer.phonenumber}</p>
        </div>
      </div>
    );
  }

  const dateChangeHandler = (e: any) => {
    // setSelectedCustomers(e.value);
    handleChangeSelectedCustomers!(e.value);
  };

  function statusTemplate(customer: ICustomer) {
    const { status } = customer;

    let styles = '';

    switch (status) {
      case 'ACTIVATED':
        styles = 'bg-green-100 text-green-600';
        break;
      case 'SUSPENDED':
        styles = 'bg-red-100 text-red-600';
        break;
      default:
        styles = 'bg-yellow-100 text-yellow-600';
    }

    return (
      <span
        className={`p-2 px-4 text-xs font-semibold rounded-full capitalize ${styles}`}
      >
        {customer.status.toLowerCase() === "activated" ? "Active" : customer.status.toLowerCase() === "suspended" ? "Blocked" : customer.status}
      </span>
    );
  }

  const matchedCustomers = useMemo(() => {
    if (searchValue.trim().length === 0) return customers;

    return customers?.filter(
      (customer) =>
        customer.firstName.toLowerCase().includes(searchValue) ||
        customer.lastName.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.uuid.toLowerCase().includes(searchValue)
    );
  }, [searchValue, customers]);

  const router = useRouter();
  console.log(customers);

  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
        <p className='font-bold text-xl text-gray-700'>Customers Table</p>
      </div>
      <DataTable
        value={matchedCustomers}
        selection={selectedCustomers}
        selectionMode={rowClick ? null : 'multiple'}
        onSelectionChange={handleChangeSelectedCustomers}
        dataKey='id'
        tableStyle={{ minWidth: '20rem' }}
        rows={10}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md'
        sortOrder={-1}
        sortField='createdAt'
        // sortIcon={<IoIosArrowDown />}
        onRowClick={(e) => router.push(`/admin/customers/${e.data.id}`)}
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
          className=''
          headerClassName='text-sm'
        ></Column>
        <Column
          field='customer.item'
          header='Customer Name'
          sortable
          body={customerTemplate}
          headerClassName='text-sm'
        ></Column>
        <Column field='phonenumber' header='Phone' sortable headerClassName='text-sm'></Column>
        {/* <Column field='orders' header='Orders' sortable></Column> */}
        <Column
          field='orderCount'
          header='Order Count'
          body={amountTemplate}
          sortable
          headerClassName='text-sm'
        ></Column>
        <Column
          field='orderBalance'
          header='Order Balance'
          body={amountTemplate}
          sortable
          headerClassName='text-sm'
        ></Column>
        <Column
          field='status'
          header='Status'
          sortable
          body={statusTemplate}
          headerClassName='text-sm'
        ></Column>
        <Column
          field='created'
          header='Created'
          body={dateTemplate}
          sortable
          headerClassName='text-sm'
        ></Column>
        <Column field='action' header='Action' body={actionTemplate} headerClassName='text-sm'></Column>
      </DataTable>
    </div>
  );
}
