'use client'
import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import Cookies from 'universal-cookie';

// import ENDPOINTS from '@/config/ENDPOINTS';
// import { months_labels } from '@/utils/chart';
// import Header from './Header';
// import StatCards from '../StatCards';
// import Sales from '../Sales';
// import SalesChart from '../SalesChart';
// import OrdersTable from '../Orders/OrdersTable';
// import { IGraphDetails } from '@/interfaces/graph';
// import CategoryNavigation from '@/components/Shared/CategoryNavigation';
// import { ITopSellingProducts } from '@/interfaces/top-selling-products';
// import { IOrder } from '@/interfaces/orders';
// import StatCards from './StatsCard';
// import OrdersTable from '../OrdersComponents/OrdersTable';
// import { DummyOrders } from '@/src/interfaces/orders';

import StatCards from '../Shared/DashboardComponents/StatsCard';
import OrdersTable from '../Shared/OrdersComponents/OrdersTable';
import { DummyOrders } from '@/interfaces/orders';

const filter_options = [
    'all time',
    '12 months',
    '30 days',
    '7 days',
    '24 hours',
];

export default function SellerDashboardPage ({
    // dashboardData,
    // graph,
    // topSellingProducts,
    // orders,
}: {
    // dashboardData?: IDashboardData | null;
    // graph?: IGraphDetails | null,
    // topSellingProducts?: ITopSellingProducts | undefined,
    // orders?: IOrder[] | null;
}) {

    // const [newDashboardData, setNewDashboardData] = useState<IDashboardData>({} as IDashboardData);

    // const [currentMonth, setCurrentMonth] = useState('');
    // const [newMonthLabels, setNewMonthLabels] = useState<string[]>([]);

    // const [timeFilter, setTimeFilter] = useState<string>("All-time");
    // const [defaultFilterOption, setDefaultFilterOption] = useState(0);

    // const handleCategoryChange = (newIndex: number, option: any) => {            
    //     switch (option) {
    //         case 'all time':
    //             setTimeFilter("All-Time");
    //             break;
    //         case '12 months':
    //             setTimeFilter("12-Month");
    //             break;
    //         case '30 days':
    //             setTimeFilter("30-Days");
    //             break;
    //         case '7 days':
    //             setTimeFilter("7-Days");
    //             break;
    //         case '24 hours':
    //             setTimeFilter("24-Hours");
    //             break;
    //         default:
    //             return; // return null for unknown filter options
    //     }
    //     setDefaultFilterOption(newIndex);
    //     console.log(option);
    // }

    // const currentMonthIndex = useMemo(() => {
    //     const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
    //     return months_labels.indexOf(currentMonth) + 1;
    // }, []);
      
    // const slicedMonths = useMemo(() => {
    //     return months_labels.filter((month, index) => index <= currentMonthIndex);
    // }, [currentMonthIndex]);
      

    // useEffect(() => {
    //     const fetchData = () => {
    //         const cookies = new Cookies();
    //         const token = cookies.get('urban-token');
    //         console.log(token);
    //         const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

    //         fetch(`${baseUrl}/api/v1/${ENDPOINTS.DASHBOARD_TOP_CHART}?type=${timeFilter}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             cache: 'no-store',
    //         }).then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         }).then(data => {
    //             if (data.data) {
    //                 console.log(data.data);
    //                 setNewDashboardData(data.data);
    //             }
    //         }).catch(error => {
    //             console.error('There was a problem with the fetch operation:', error);
    //         });
    //     };

    //     fetchData();
    // }, [timeFilter]);
    // console.log(newMonthLabels);

    return (
        <div>
            {/* <div className='flex lg:flex-row gap-2 flex-col mb-4 justify-between w-full'>
                flex flex-col w-full justify-between lg:flex-col 2xl:items-center gap-8 mb-8
                <CategoryNavigation
                    categories={filter_options}
                    defaultOption={defaultFilterOption}
                    handleCategoryChange={handleCategoryChange}
                />

                <div className='flex items-center gap-[16px]'>
                    <Link href='/admin/products/new'>
                        <button className='rounded-[8px] h-fit w-fit text-[14px] text-[#090917] gap-[4px] flex items-center whitespace-nowrap bg-[#F2C94C] py-[10px] px-[14px] ' >
                            <FaPlus />
                            Add Product
                        </button>
                    </Link>
                </div>
            </div> */}
            <StatCards 
                dashboardData={null}
            />
            {/* <SalesChart 
                graph={graph!} 
                month_labels={slicedMonths}
            />
            <Sales 
                products={topSellingProducts?.topProducts} 
                salesByLocation={topSellingProducts?.topOrdersLocation}
            /> */}
            <OrdersTable
                orders={DummyOrders}
                selectedOrders={[]}
                searchValue=''
                page="recent orders"
            />
        </div>
    )
};
  
