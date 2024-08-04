'use client';

import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useMemo, ChangeEvent, useEffect } from 'react';
import { LuClipboardCheck } from 'react-icons/lu';
import { CiSearch } from 'react-icons/ci';
import { RiDeleteBin5Line, RiShoppingBasket2Line } from 'react-icons/ri';

// import DatePicker from '@/components/Shared/DatePicker';
// import HTTPService from '@/services/http';
// import ENDPOINTS from '@/config/ENDPOINTS';

import OrdersTable from './OrdersTable';
import TextInput from '../../Global/TextInput';
import Pagination from '../Paginatioin';
import Button from '../../Global/Button';
import { IOrder } from '@/src/interfaces/orders';

export default function Orders(
  { 
    orders, 
  }: { 
    orders: IOrder[] | null 
  }
) {
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // const [retrievedOrders, setRetrievedOrders] = useState<IOrder[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [categoryNavigation, setCategoryNavigation] = useState<any>();
  const [defaultFilterOption, setDefaultFilterOption] = useState(0);

  // const handleFilterOptionChange = (newIndex: number) =>
  //   setDefaultFilterOption(newIndex);

  // const [updateTo, setUpdateTo] = useState<string>("");
//   const [cardOpen, setCardOpen] = useState<boolean>(false);

//   const httpService = new HTTPService();
//   const cookies = new Cookies();

//   const router = useRouter();

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

        {/* <DatePicker handleSelectDate={handleSelectDate} /> */}

        {/* <div className='w-full'>
          <CategoryNavigation
            categories={[
              'All time',
              '12 months',
              '30 days',
              '7 days',
              '24 hours',
            ]}
            // className="w-full"
            defaultOption={defaultFilterOption}
            handleCategoryChange={function (newIndex: number, option): void {
                
                const now = new Date();
                let dateRange: { startDate: Date | null, endDate: Date | null } = {
                  startDate: null,
                  endDate: null,
                };
              
                switch (option) {
                  case 'All time':
                    dateRange.startDate = new Date(0); // earliest possible date
                    dateRange.endDate = now;
                    break;
                  case '12 months':
                    dateRange.startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                    dateRange.endDate = now;
                    break;
                  case '30 days':
                    dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
                    dateRange.endDate = now;
                    break;
                  case '7 days':
                    dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
                    dateRange.endDate = now;
                    break;
                  case '24 hours':
                    dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 24);
                    dateRange.endDate = now;
                    break;
                  default:
                    return; // return null for unknown filter options
                }
                setCategoryNavigation(dateRange);
                setDefaultFilterOption(newIndex);
              // throw new Error('Function not implemented.');
            }}
          />
        </div> */}
      </div>
      {/* Orders Table */}

    {/* //   <OriginalOrdersTable
    //     orders={orders}
    //     handleChangeSelectedOrders={handleChangeSelectedOrders}
    //     selectedOrders={selectedOrders}
    //     selectedDate={selectedDate}
    //     searchValue={searchValue.toLowerCase()}
    //     categoryNavigation={categoryNavigation}
    //   /> */}

            <OrdersTable
                orders={[]}
                selectedOrders={[]}
                searchValue=''
            />
    </>
  );
}
