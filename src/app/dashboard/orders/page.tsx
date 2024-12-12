import React from "react";

import PayoutPage from "@/components/Dashboard/Payouts/PayoutPage";
// import Orders from "@/components/Shared/OrdersComponents/Orders";

export default function Order () {
    return (
        <section>
            {/* <Orders /> */}
            <PayoutPage payouts={null} accountDetails={null} funds={{ pendingPayment: 88, amountToWithdraw: 10000}}  />
        </section>
    )
}