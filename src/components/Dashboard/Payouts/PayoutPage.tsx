import { FaShoppingBag } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";

import Pagination from "@/components/Shared/Paginatioin";
import Button from "@/components/Global/Button";

export default function PayoutPage ({ payouts, accountDetails, funds }: { payouts: any, accountDetails: any, funds: any }) {
    return (
        <section>
            <div className='w-full gap-8 mb-8 py-4'>
                <div>
                    <div className="flex gap-3">
                        <FaShoppingBag />

                        <h2>Payout</h2>
                    </div>
                    <Pagination />
                </div>

                <div className="border-gray-500 border rounded p-6 my-6">
                    <p>Set up your payment details to enable you receive your earnings.</p>

                    <div className="rounded p-3 flex justify-between items-center mt-3">
                        <div className="flex justify-center items-center p-2 bg-gray-300 rounded">
                            <AiFillBank />
                        </div>

                        {/* Bank details */}
                        <div className="flex flex-col gap-1">
                            <p>{"SUNDAY TITILAYO"}</p>
                            <p>{"Access Bank" + "-" + "0046789938"}</p>
                        </div>

                        <button className='rounded-[8px] h-fit w-fit text-[14px] text-white gap-[4px] flex items-center whitespace-nowrap bg-[#ED770B] py-[10px] px-[14px] ' >
                            Update acount details
                        </button>
                    </div>
                </div>

                <h2 className="text-black my-4 font-semibold text-2xl">Your balance</h2>

                <div className="border-gray-500 border rounded p-6">
                    <p>Once a withdrawal in initiated, you will receive your payment in your bank account within 24 hours.</p>

                    <div className="flex justify-between w-full my-4">
                        {/* Pending balance */}
                        <div className="flex flex-col gap-2">
                            <p className="text-green-400">Pending payment</p>
                            <p>{`NGN ${funds.pendingPayment ?? 0}`}</p>
                        </div>
                        
                        {/* Available to withdraw */}
                        <div className="flex flex-col gap-2">
                            <p className="text-red-400">Available to withdraw</p>
                            <p>{`NGN ${funds.amountToWithdraw ?? 0}`}</p>
                        </div>
                        
                        {/* Withdraw funds button */}
                        <button disabled={funds.amountToWithdraw === 0 ? true : false} className={`rounded-[8px] h-fit w-fit text-[14px] text-white gap-[4px] flex items-center whitespace-nowrap ${funds.amountToWithdraw === 0 ? "bg-gray-300" : "bg-[#ED770B]"} py-[10px] px-[14px]`} >
                            Withdraw funds
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}