import React from "react";

import CustomersTable from "@/components/Shared/CustomersComponent/CustomersTable";
import { ICustomers } from "@/interfaces/customers";

export default function Customer () {
    return (
        <div>
            <CustomersTable 
                selectedDate={null}
                searchValue=""
                customers={undefined}
                selectedCustomers={[] as ICustomers}
                // handleChangeSelectedCustomers=() => {}
            />
        </div>
    )
}