import React from 'react';

import SellerDashboardPage from '@/components/Seller/SellerDashboardPage';
import { getUserDashboard } from '@/libs/dashboard';
import { IDashboardData } from '@/interfaces/dashboard';

export default async function SellerDashboard () {

  const apiRes: Promise<IDashboardData | null> = getUserDashboard();
  const response = await apiRes;

  return (
    <section>
      <SellerDashboardPage
        dashboardData={response}
      />
    </section>
  );
};
