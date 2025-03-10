'use client';
import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import { TabPanel, TabView } from 'primereact/tabview';

import StatCards from '../Shared/DashboardComponents/StatsCard';
import OrdersTable from '../Shared/OrdersComponents/OrdersTable';
import { DummyOrders } from '@/interfaces/orders';
import CreateListingPopup from '../Dashboard/CreateListingPopup';

const filter_options = [
    "All orders",
    "Last Week",
    "Last Month",
    "Last Year"
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
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [isPopupVisible, setPopupVisible] = useState(false);

    return (
        <div>
            {/* Statistic cards */}
            <StatCards 
                dashboardData={null}
            />

            {/* Add pet listing button. */}
            <div className='flex my-4 items-center justify-center w-full'>
                <div className='flex items-center gap-[16px]' onClick={() => setPopupVisible(true)}>
                    {/* <Link href='/dashboard/pets/create'> */}
                        <button className='rounded-[8px] h-fit w-fit text-[14px] text-white gap-[4px] flex items-center whitespace-nowrap bg-[#ed770b] py-[10px] px-[14px] ' >
                            Create New Listing
                        </button>
                    {/* </Link> */}
                </div>
            </div>

            {/* // Orders Table - All time, last week, last month, & last year. */}
            <section className='my-4'>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} scrollable>
                    {
                        filter_options.map((time, index) => {
                            return  (
                                <TabPanel header={time} key={index}>
                                    <OrdersTable
                                        orders={null}
                                        selectedOrders={[]}
                                        searchValue=''
                                        page="recent orders"
                                    />
                                </TabPanel>
                            )
                        })
                    }
                    {/* <TabPanel header="All orders">
                        <OrdersTable
                            orders={DummyOrders}
                            selectedOrders={[]}
                            searchValue=''
                            page="recent orders"
                        />
                    </TabPanel>
                    <TabPanel header="Last Week">
                        <OrdersTable
                            orders={DummyOrders}
                            selectedOrders={[]}
                            searchValue=''
                            page="recent orders"
                        />
                    </TabPanel>
                    <TabPanel header="Last Month">
                        <OrdersTable
                            orders={DummyOrders}
                            selectedOrders={[]}
                            searchValue=''
                            page="recent orders"
                        />
                    </TabPanel>
                    <TabPanel header="Last Year">
                        <OrdersTable
                            orders={DummyOrders}
                            selectedOrders={[]}
                            searchValue=''
                            page="recent orders"
                        />
                    </TabPanel> */}
                </TabView>
            </section>

            {/* Popup */}
            {isPopupVisible && (
                <CreateListingPopup closePopup={() => setPopupVisible(false)} />
            )}
        </div>
    )
};
  
