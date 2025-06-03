'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Cookies from 'universal-cookie';

import OrderDetails from './components/OrderDetails';
import Pagination from '@/components/Shared/Paginatioin';
import Button from '@/components/Global/Button';
import ENDPOINTS from '@/config/ENDPOINTS';
import IOrder from '@/interfaces/orders';
import LoadingScreen from '@/components/Global/LoadingScreen';

export default function OrderDetailsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<IOrder | null>(null);

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  useEffect(() => {
    async function getOrderDetails() {
      if (params.id) {
        try {
          setLoading(true);
          const token = cookies.get('pettify-token');

          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

          const apiRes = await fetch(
            `${baseUrl}/api/v1/${ENDPOINTS.ORDERS}${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },

              cache: "no-store"
              // next: {
              //   revalidate: 10,
              // },
            }
          );

          const res = await apiRes.json();

          if (res.data) {
            setOrderData(res.data as IOrder);
          }

          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    }

    getOrderDetails();
  }, [params.id, cookies]);

  if(loading) {
    return <LoadingScreen/>
  }

  return (
    <>
      <section>
        <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-4 py-4'>
          <div>
            <p className='text-xl font-medium text-gray-700'>Order Details</p>
            <Pagination lastPage="Order Details"/>
          </div>
        
          <div className='flex items-center gap-4'>
            <div className='py-3.5 px-6 rounded-xl border border-gray-200 bg-white text-sm text-gray-600'>
              {orderData?.status}
            </div>
          </div>
        </div>
        {/* Order Details */}
        <OrderDetails order={orderData} />
      </section>
    </>
  );
}
