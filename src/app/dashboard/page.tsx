"use client";

import React from 'react';
import Cookies from 'universal-cookie';

import SellerDashboardPage from '@/components/Seller/SellerDashboardPage';
// import { getUserDashboard } from '@/libs/dashboard';
import { IDashboardData } from '@/interfaces/dashboard';
import useFetch from '@/hooks/useFetch';

export default function SellerDashboard() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/dashboard`

  const cookies = new Cookies();
  const token = cookies.get("pettify-token");

  const options = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const { data, error, isLoading, refetch } = useFetch<IDashboardData>(fetchUrl, options);
  console.log(data);

  return (
    <section>
      <SellerDashboardPage
        dashboardData={data || null}
      />
    </section>
  );
};