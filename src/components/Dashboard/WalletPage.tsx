"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";

import Pagination from "@/components/Shared/Paginatioin";
import Button from "@/components/Global/Button";
import PayoutTable from "./Payouts/PayoutTable";
import useFetch from "@/hooks/useFetch";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IWallet } from "@/interfaces/wallet";

interface IWalletPage {
    availableBalance?: number
    pendingBalance?: number
}

const WalletPage = ({ availableBalance = 0, pendingBalance = 0 }: IWalletPage): React.JSX.Element => {
    const card_icon_style = 'h-10 w-10 text-xl flex items-center justify-center rounded-full';

    const [seller_info, setSellerInfo] = useLocalStorage<any>("pettify-details", {} as any);

    const fetchUrl = useMemo(() => {
        return seller_info?.user?._id ?
        
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${seller_info.user._id}/wallet`
        
        : "";
    }, [seller_info]);

    const options = useMemo(() => ({  
        headers: {
            "Content": "application/json",
            "Authorization": `Bearer ${seller_info.token}`
        }
    }), [seller_info]);

    const { data, error, isLoading, refetch } = useFetch<IWallet>(
        // fetchUrl, 
        seller_info?.user?._id ? fetchUrl : "",
        options
    );
    console.log(data);

    return (
        <>
            <div className="w-full gap-8 mb-8 py-4">
                <div>
                    <div className="flex gap-3">
                        <FaShoppingBag />

                        <h2>Payout</h2>
                    </div>
                    <Pagination />
                </div>

                {/* Wallet cards */}
                <section className='my-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4'>
                    <div className='rounded-lg bg-white border border-neural p-6'>
                        <span className={`${card_icon_style} bg-[#DEDEFA] text-purple-700`}>
                            <CiMoneyBill className='text-2xl fill-[#F2C94C]' />
                        </span>
                        <p className='my-3 text-neutral text-sm'>Withdrawable Wallet Balance</p>

                        <div className='flex items-center gap-4'>
                            <p className='text-gray-700 text-2xl font-medium'>
                                ₦{(data?.balance ?? 0).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className='rounded-lg bg-white border border-neural p-6'>
                        <span className={`${card_icon_style} bg-[#DEDEFA] text-purple-700`}>
                            <CiMoneyBill className='text-2xl fill-[#F2C94C]' />
                        </span>
                        <p className='my-3 text-neutral text-sm'>Pending Wallet Balance</p>

                        <div className='flex items-center gap-4'>
                            <p className='text-gray-700 text-2xl font-medium'>
                                ₦{(data?.pendingBalance ?? 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </section>

                <button disabled={data?.balance == 0 ? true : false} className={`rounded-[8px] h-fit w-fit text-[14px] text-white gap-[4px] flex items-center whitespace-nowrap ${data?.balance == 0 ? "bg-gray-300" : "bg-[#ED770B]"} py-[10px] px-[14px]`} >
                    Withdraw funds
                </button>

                <section>
                    <div className='w-full gap-8 mb-8 py-4'>
                        <div className="border-gray-500 border rounded p-6 my-6">
                            <p>Set up your payment details to enable you receive your earnings.</p>

                            <div className="rounded p-3 flex justify-between items-center mt-3">
                                <div className="flex justify-center items-center p-2 bg-gray-300 rounded">
                                    <AiFillBank />
                                </div>

                                {/* Bank details */}
                                {
                                    data?.accountDetails?.accountHolderName ? 

                                    <div className="flex flex-col gap-1">
                                        <p>{ data?.accountDetails?.accountHolderName || "" }</p>
                                        <p>{ data?.accountDetails?.bankName || "" + "-" + data?.accountDetails?.accountNumber || "" }</p>
                                    </div>

                                    :

                                    <p>Account details not provided.</p>
                                }


                                <button className='rounded-[8px] h-fit w-fit text-[14px] text-white gap-[4px] flex items-center whitespace-nowrap bg-[#ED770B] py-[10px] px-[14px] ' >
                                    Update acount details
                                </button>
                            </div>
                        </div>

                        <h2 className="text-black my-4 font-semibold text-2xl">Your Transactions</h2>

                        {/* Tables */}
                        <div className="w-full my-6">
                            {/* <PayoutTable 
                                selectedDate={null}
                                searchValue=""
                                payouts={null}
                            /> */}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default WalletPage;