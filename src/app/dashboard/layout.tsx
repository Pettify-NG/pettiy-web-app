'use client';
import React, { useState } from 'react';

import Sidebar from '@/components/Shared/Sidebar';
import Header from '@/components/Shared/Header';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [unreadNotifications, setUnreadNotifications] = useState<any>();

  const [unreadOrders, setUnreadOrders] = useState<any>();

  const [unreadReturnRequests, setUnreadReturnRequests] = useState<any>();

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
      <div className='grid grid-cols-12 bg-gray-50 relative min-h-screen'>
        <div
          className={`bg-white duration-500 transition-all border-r-[1px] border-r-gray-50 w-0 h-0 ${
            sidebarOpen ? 'lg:col-span-2' : 'lg:col-span-1'
          } `}
        >
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={handleToggleSidebar}
            setSidebarOpen={setSidebarOpen}
            notifications={unreadNotifications}
            orders={unreadOrders}
            returnRequests={unreadReturnRequests}
          />
        </div>

        <div
          className={`duration-500 bg-gray-100 col-span-12 py-24 min-h-screen p-4 md:px-8 xl:px-16 ${
            sidebarOpen ? 'lg:col-span-10' : 'lg:col-span-11'
          }`}
        >

            <Header 
                isOpen={sidebarOpen} 
                toggleSidebar={handleToggleSidebar} 
                unreadNotifications={unreadNotifications}
            />
          
            {children}
        </div>
      </div>
  );
};
