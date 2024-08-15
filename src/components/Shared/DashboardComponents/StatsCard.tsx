import React from 'react';
import Link from 'next/link';
import { BiWallet } from 'react-icons/bi';
import { CiMoneyBill } from 'react-icons/ci';
import { FiShoppingCart } from 'react-icons/fi';
import { GiReceiveMoney } from 'react-icons/gi';
import { TbLineScan } from 'react-icons/tb';


import { IDashboardData } from '@/interfaces/dashboard';

export default function StatCards({
  dashboardData,
}: {
  dashboardData: IDashboardData | null
}) {
  const card_icon_style =
    'h-10 w-10 text-xl flex items-center justify-center rounded-full';
  return (
    <section className='my-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
      {/*  */}
      <Link href="/admin/orders">
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
      <Link href="/admin/orders">
        <div className='rounded-lg bg-white border border-neural p-6'>
          {/* <span className={`${card_icon_style} bg-green-20`}> */}
          <span className={`${card_icon_style} bg-[#CFE7DC] text-green-800`}>
            <FiShoppingCart className='fill-[#0D894F]'/>
          </span>
          {/* </span> */}
          <p className='my-3 text-neutral text-sm'>Total orders</p>

          <div className='flex items-center gap-4'>
            <p className='text-gray-700 text-3xl font-medium'>
              {(990).toLocaleString()}
              {/* {dashboardData?.sales ? (dashboardData.sales).toLocaleString() : (0).toLocaleString()} */}
            </p>

            {/* <span className='py-1 px-2 bg-green-100 text-green-600 text-xs rounded-full font-semibold'>
              +15%
            </span> */}
          </div>
        </div>
      </Link>
      {/*  */}
      <Link href="/admin/listings">
        <div className='rounded-lg bg-white border border-neural p-6'>
          <span className={`${card_icon_style} bg-[#FCDAD7] text-pink-700`}>
            <TbLineScan className="fill-[#F04438]"/>
          </span>
          <p className='my-3 text-neutral text-sm'>Listings</p>

          <div className='flex items-center gap-4'>
            <p className='text-gray-700 text-3xl font-medium'>
              {(112).toLocaleString()}
              {/* {dashboardData?.quantity ? (dashboardData.quantity).toLocaleString() : (0).toLocaleString()} */}
            </p>

            {/* <span className='py-1 px-2 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold'>
              0%
            </span> */}
          </div>
        </div>
      </Link>
      {/*  */}
      <Link href="/admin/customers">
        <div className='rounded-lg bg-white border border-neural p-6'>
          <span className={`${card_icon_style} bg-[#FAE1CF] text-blue-700`}>
            <BiWallet className='fill-[#E46A11]'/>
          </span>
          <p className='my-3 text-neutral text-sm'>Total customers</p>

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
    </section>
  );
}
