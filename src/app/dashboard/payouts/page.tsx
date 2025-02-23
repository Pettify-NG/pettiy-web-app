import React from "react";

import PayoutPage from "@/components/Dashboard/Payouts/PayoutPage";

export default function Payout () {
    return (
        <section>
            <PayoutPage payouts={null} accountDetails={null} funds={{ pendingPayment: 88, amountToWithdraw: 10000}}  />
        </section>
    )
}