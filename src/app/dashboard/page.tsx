import React from 'react';

import SellerDashboardPage from '@/components/Seller/SellerDashboardPage';
import { getUserDashboard } from '@/libs/dashboard';
import { IDashboardData } from '@/interfaces/dashboard';

const SellerDashboard = async () => {

  // const apiRes: Promise<IDashboardData | null> = getUserDashboard();
  // const response = await apiRes;

  const response: IDashboardData | undefined = await getUserDashboard();

  console.log("dashd", response);

  return (
    <section>
      <SellerDashboardPage
        dashboardData={response}
      />
    </section>
  );
};

export default SellerDashboard;