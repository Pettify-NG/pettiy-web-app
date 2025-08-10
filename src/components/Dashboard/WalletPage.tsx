"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import Cookies from "universal-cookie";

import Pagination from "@/components/Shared/Paginatioin";
import Button from "@/components/Global/Button";
import PayoutTable from "./Payouts/PayoutTable";
import useFetch from "@/hooks/useFetch";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IWallet } from "@/interfaces/wallet";
import UpdateAccountDetailsPopup from "./UpdateAccountDetailsPopup";
import Modal from "../Global/Modal";
import TextInput from "../Global/TextInput";
import toast from "react-hot-toast";
import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";

interface IWalletPage {
    availableBalance?: number
    pendingBalance?: number
}

const WalletPage = ({ availableBalance = 0, pendingBalance = 0 }: IWalletPage): React.JSX.Element => {
    const card_icon_style = 'h-10 w-10 text-xl flex items-center justify-center rounded-full';

    const [seller_info, setSellerInfo] = useLocalStorage<any>("pettify-details", {} as any);

    const [isPopupVisible, setPopupVisible] = useState(false);

    const [withdrawModal, setWithdrawModal] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>();
    const [inputError, setInputError] = useState<string>("");

    const httpService = new HTTPService();

    const cookies = new Cookies();
    const token = cookies.get("pettify-token");

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
        seller_info?.user?._id ? fetchUrl : "",
        options
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = parseFloat(e.target.value);
        const maxValue = parseFloat((data?.balance ?? 0) + "");

        if (isNaN(numValue)) return; // Don't update if not a number

        if(numValue > maxValue) {
            setInputError("Value exceeds your withdrawable balance");
            return;
        }

        if (numValue <= maxValue) {
            setInputValue(inputValue);
        }
    }

    const withdraw = async () => {
        try {
            toast.loading("Submitting...");

            const data = {
                amount: inputValue
            };

            httpService
            .post(
                `${ENDPOINTS.USER}${seller_info?.user?._id}/request-withdrawal`, 
                data, 
                `Bearer ${token}`
            )
            .then((apiRes) => {
                toast.dismiss();

                console.log('Response: ', apiRes);

                if (apiRes.success) {
                    toast.success('Withdrawal Request Submitted. An admin will attend to your request shortly.');

                    setWithdrawModal(false)
                } else {
                    toast.error(apiRes.message);
                }
            });
        } catch(error) {
            console.log("Error creating withdrawal request.");
            toast.error("Error creating witdrawal request.");
        }
    }

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

                <button disabled={data?.balance == 0 ? true : false} onClick={() => setWithdrawModal(true)} className={`rounded-[8px] h-fit w-fit text-[14px] text-white gap-[4px] flex items-center whitespace-nowrap ${data?.balance == 0 ? "bg-gray-300" : "bg-[#ED770B]"} py-[10px] px-[14px]`} >
                    Withdraw funds
                </button>

                <section>
                    <div className='w-full gap-8 mb-8 py-4'>
                        <div className="border-gray-500 border rounded p-6 my-6">
                            <p>Set up your payment details to receive your earnings.</p>

                            <div className="rounded p-3 flex lg:flex-row md:flex-row flex-col gap-3 lg:gap-0 md:gap-0 justify-between items-center mt-3">
                                <div className="flex justify-center items-center p-2 bg-gray-300 rounded">
                                    <AiFillBank />
                                </div>

                                {/* Bank details */}
                                {
                                    data?.accountDetails?.accountHolderName ? 

                                    <div className="flex flex-col gap-1">
                                        <p>{ data?.accountDetails?.accountHolderName || "" }</p>
                                        <p>{ data?.accountDetails?.bankName || "" }</p>
                                        <p>{ data?.accountDetails?.accountNumber || "" }</p>
                                    </div>

                                    :

                                    <p>Account details not provided.</p>
                                }


                                <button onClick={() => setPopupVisible(true)} className='rounded-[8px] h-fit w-fit text-[14px] text-white gap-[4px] flex items-center whitespace-nowrap bg-[#ED770B] py-[10px] px-[14px] ' >
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

            {/* Popup */}
            {isPopupVisible && (
                <UpdateAccountDetailsPopup closePopup={() => setPopupVisible(false)} walletId={data?._id ?? ""} />
            )}



        {/* Enter withdrawal amount Accessory Modal */}
        <Modal
            isOpen={withdrawModal}
            handleClose={() => setWithdrawModal(false)}
            title='Enter withdrawal amount'
        > 
            <TextInput
                placeholder='Enter amount you want to withdraw...'
                id='withdrawalAmount'
                onChange={handleChange}
                value={inputValue}
                error={inputError}
            />
            
            <div className='flex items-center gap-2 justify-between'>
                <Button onClick={withdraw}>Yes</Button>
                <Button variant='outlined' onClick={() =>  setWithdrawModal(false)}>
                    No
                </Button>
            </div>
        </Modal>
        </>
    )
}

export default WalletPage;