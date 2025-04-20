import React from "react";

import NotificationsTable from "@/components/Dashboard/Notifications/NotificationsTable";
import Pagination from "@/components/Shared/Paginatioin";

export default function Notifications() {
    return (
        <section className="py-4">
            <div>
                <p className='text-xl font-medium text-gray-700'>Orders</p>
                <Pagination /> 
            </div>

            <NotificationsTable />
        </section>
    );
}