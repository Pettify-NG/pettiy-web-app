'use client';

import React, { useState, useMemo, ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';

import OrdersTable from './OrdersTable';
import TextInput from '../../Global/TextInput';
import Pagination from '../Paginatioin';
import { IOrder } from '@/interfaces/orders';
import useFetch from '@/hooks/useFetch';

export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const handleChangeSelectedOrders = (e: any) => {
    console.log(e.value);

    setSelectedOrders(e.value);
  };

  const debouncedSearch = useMemo(() => {
    let timer: NodeJS.Timeout;

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchValue(e.target.value);
      }, 500);
    };

    return handleSearchChange;
  }, []);

  const handleSelectDate = (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => {
    if (date) {
      const formatted = new Date(date as Date).getTime();

      setSelectedDate(formatted);
    } else setSelectedDate(null);
  };

  return (
    <>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-4 py-4'>
        <div>
          <p className='text-xl font-medium text-gray-700'>Orders</p>
          <Pagination /> 
        </div>
      </div>

      <div className='justify-between flex flex-wrap items-center gap-4 mb-2 w-full'>
        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search orders...'
            leftIcon={<CiSearch />}
            onChange={debouncedSearch}
            value={searchValue}
          />
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable
          selectedOrders={[]}
          searchValue=''
      />
    </>
  );
}
