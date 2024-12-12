import React from 'react';
import Link from 'next/link';
import { BiWallet } from 'react-icons/bi';
import { CiMoneyBill } from 'react-icons/ci';

import { IDashboardData } from '@/interfaces/dashboard';

export default function StatCards({
  dashboardData,
}: {
  dashboardData: IDashboardData | null
}) {
  const card_icon_style =
    'h-10 w-10 text-xl flex items-center justify-center rounded-full';
  return (
    <section className='my-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
      {/*  */}
      <Link href="/dashboard/revenue">
        <div className='rounded-lg bg-white border border-neural p-6'>
          {/* <span className={`${card_icon_style} bg-purple-30 text-purple-700`}> */}
            <span className={`${card_icon_style} bg-[#DEDEFA] text-purple-700`}>
              <CiMoneyBill className='text-2xl fill-[#F2C94C]' />
            </span>
          {/* </span> */}
          <p className='my-3 text-neutral text-sm'>Total Revenue</p>

          <div className='flex items-center gap-4'>
            <p className='text-gray-700 text-3xl font-medium'>
              ${(59000).toLocaleString()}
              {/* ${dashboardData?.revenue ? (dashboardData?.revenue).toLocaleString() : (0).toLocaleString()} */}
            </p>

            {/* <span className='py-1 px-2 bg-green-100 text-green-600 text-xs rounded-full font-semibold'>
              +10%
            </span> */}
          </div>
        </div>
      </Link>
      {/*  */}
      <Link href="/dashboard/sales">
        <div className='rounded-lg bg-white border border-neural p-6'>
          <span className={`${card_icon_style} bg-[#FAE1CF] text-blue-700`}>
            <BiWallet className='fill-[#E46A11]'/>
          </span>
          <p className='my-3 text-neutral text-sm'>Total sales</p>

          <div className='flex items-center gap-4'>
            <p className='text-gray-700 text-3xl font-medium'>
              {(781).toLocaleString()}
              {/* {dashboardData?.costomers ? (dashboardData.costomers).toLocaleString() : (0).toLocaleString()} */}
            </p>

            {/* <span className='py-1 px-2 bg-red-100 text-red-600 text-xs rounded-full font-semibold'>
              -25%
            </span> */}
          </div>
        </div>
      </Link>
      {/*  */}
      <Link href="/dashboard/customers">
        <div className='rounded-lg bg-white border border-neural p-6'>
          <span className={`${card_icon_style} bg-[#FAE1CF] text-blue-700`}>
            <BiWallet className='fill-[#E46A11]'/>
          </span>
          <p className='my-3 text-neutral text-sm'>Total customers</p>

          <div className='flex items-center gap-4'>
            <p className='text-gray-700 text-3xl font-medium'>
              {(91).toLocaleString()}
              {/* {dashboardData?.costomers ? (dashboardData.costomers).toLocaleString() : (0).toLocaleString()} */}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
