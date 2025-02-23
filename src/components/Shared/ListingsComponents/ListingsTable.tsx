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

import { formatCurrency, formatDate } from '@/helpers';
import { IListing } from '@/interfaces/listings';
import ENDPOINTS from '@/config/ENDPOINTS';
import HTTPService from '@/services/http';
import { IUser, IUsers } from '@/interfaces/users';

export default function ListingsTable({
  selectedDate,
  listings,
  searchValue,
  selectedListings,
  handleChangeSelectedListings,
}: {
  selectedDate: Date | (Date | null)[] | Date[] | null | undefined | number;
  searchValue: string;
  listings: IListing[] | undefined;
  selectedListings: IListing[];
  handleChangeSelectedListings?: (e: any) => void;
}) {
  // const [selectedCustomers, setSelectedCustomers] = useState<
  //   ICustomer[] | null
  // >(null);
  const [rowClick, setRowClick] = useState<boolean>(true);

  const httpService = new HTTPService();

  const cookies = new Cookies();
  const token = cookies.get('urban-token');

  const dateTemplate = (customer: IUser) =>
    moment(customer.createdAt).format('MMM Do YYYY');

  function actionTemplate(listing: IListing) {
    return (
      <div className='flex items-center gap-3'>
        <Link
          href={`/admin/listings/${listing.id}?edit=false`}
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

  function customerTemplate(customer: IUser) {
    return (
      <div className='flex items-center gap-4'>
        {/* <div className='h-12 w-12 bg-gray-300 rounded-full'></div> */}

        <div>
          <p className='text-xs font-medium'>{customer.firstname + " " + customer.lastname}</p>
          <p className='text-xs text-neutral font-light'>{customer.email}</p>
          <p className='text-xs text-neutral font-light'>{customer.phonenumber}</p>
        </div>
      </div>
    );
  }

  const dateChangeHandler = (e: any) => {
    // setSelectedCustomers(e.value);
    handleChangeSelectedListings!(e.value);
  };

  function statusTemplate(listing: IListing) {
    const { vaccineStatus } = listing;

    let styles = '';

    switch (vaccineStatus) {
      case true:
        styles = 'bg-green-100 text-green-600';
        break;
      case false:
        styles = 'bg-red-100 text-red-600';
        break;
      default:
        styles = 'bg-yellow-100 text-yellow-600';
    }

    return (
      <span
        className={`p-2 px-4 text-xs font-semibold rounded-full capitalize ${styles}`}
      >
        {listing.vaccineStatus ? "Vaccinated" : "Unvaccinated"}
      </span>
    );
  }

  const matchedListings = useMemo(() => {
    if (searchValue.trim().length === 0) return listings;

    return listings?.filter(
      (listing: IListing) =>
        listing.merchant.firstName.toLowerCase().includes(searchValue) ||
        listing.merchant.lastName.toLowerCase().includes(searchValue) ||
        listing.merchant.email.toLowerCase().includes(searchValue) ||
        listing.breed.toLowerCase().includes(searchValue) ||
        listing.category.toLowerCase().includes(searchValue) 
    );
  }, [searchValue, listings]);

  const router = useRouter();
  console.log(listings);

  const rowClassTemplate = (data: IListing) => {
    return {
        'cursor-pointer': data.id
    };
  };

  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
        <p className='font-bold text-xl text-gray-700'>Pet Listings Table</p>
      </div>
      <DataTable
        value={matchedListings}
        selection={selectedListings}
        selectionMode={rowClick ? null : 'multiple'}
        onSelectionChange={handleChangeSelectedListings}
        dataKey='id'
        tableStyle={{ minWidth: '20rem' }}
        rows={10}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md'
        sortOrder={-1}
        sortField='createdAt'
        onRowClick={(e) => router.push(`/admin/listings/${e.data.uuid}`)}
        rowClassName={rowClassTemplate}
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
          className=''
          headerClassName='text-sm'
        ></Column>
        <Column field='merchant.username' header='Merchant' sortable headerClassName='text-sm'></Column>
        <Column field='category' header='Category' sortable headerClassName='text-sm'></Column>
        <Column field='breed' header='Breed' sortable headerClassName='text-sm'></Column>
        <Column field='sex' header='Sex' sortable headerClassName='text-sm'></Column>
        <Column field='price' header='Price' sortable headerClassName='text-sm'></Column>
        <Column field='petDateOfBirth' header='Pet DOB' sortable headerClassName='text-sm'></Column>
        <Column field='location' header='Location' sortable headerClassName='text-sm'></Column>
        <Column field='stock' header='Stock' sortable headerClassName='text-sm'></Column>
        <Column field='petImage' header='Pet Image' sortable headerClassName='text-sm'></Column>
        <Column
          field='created'
          header='Vaccine Status'
          body={statusTemplate}
          sortable
          headerClassName='text-sm'
        ></Column>
        <Column field='action' header='Action' body={actionTemplate} headerClassName='text-sm'></Column>
      </DataTable>
    </div>
  );
}
