"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";

import Button from "../Global/Button";
import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";
import TextInput from "../Global/TextInput";
import { CustomError } from "./PetListings/CreatePetListingForm";

interface ICreateListingProp {
    closePopup: () => void
    walletId: string
}

const UpdateAccountDetailsPopup: React.FC<ICreateListingProp> = ({ closePopup, walletId }) => {
    const httpService = new HTTPService();

    const cookies = new Cookies();
    const token = cookies.get("pettify-token");

    const router = useRouter();

    const jwt_secret_key = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

    const [accountName, setAccountName] = useState<string>("");

    const [banks, setBanks] = useState<any>([]);
    useEffect(() => {
        const fetchBanks = async () => {
            const response = await fetch('https://api.paystack.co/bank', {
                headers: {
                    Authorization: `Bearer ${jwt_secret_key}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setBanks(data.data); // Array of banks with their codes
        };
        
        fetchBanks();
    }, [jwt_secret_key]);

    const verifyAccount = async (accountNumber: string, bankCode: string) => {
        const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
            headers: {
                Authorization: `Bearer ${jwt_secret_key}`, // Replace with your Paystack secret key
            },
        });
        const data = await response.json();

        if (data.status) {
            return {
                isValid: true,
                accountName: data.data.account_name, // The account name retrieved
            };
        } else {
            return {
                isValid: false,
                error: data.message,
            };
        }
    };

    const [loading, setLoading] = useState<boolean>(false);

    const handleVerify = async (e: React.MouseEvent<HTMLButtonElement>, accountNumber: string, bankId: string) => {
         e.preventDefault();
         
        const bank = banks?.filter((bank: any) => bank.id === Number(bankId));

        setLoading(true);
        const result = await verifyAccount(accountNumber, bank[0].code);

        if (result.isValid) {
            console.log('Account verified:', result.accountName);
            setLoading(false);

            setAccountName(result.accountName);
            // formik.setField("accountHolderName", result.accountName);
            // if(result.accountName.toLowerCase() !== values.accountHolderName.toLowerCase()) {
            //     toast.error("Account Holder name you entered does not match the name associated with account number.");
            //     return;
            // }
        } else {
            console.error('Account verification failed:', result.error);
            setLoading(false);

            toast.error(result.error);
            return;
        }
    }

    const formik = useFormik({
        initialValues: {
            accountHolderName: "",
            accountNumber: "",
            bankId: "",
        },
        validationSchema: Yup.object({
            accountHolderName: Yup.string().required().label("Account Holder Name"),
            accountNumber: Yup.string().required().label("Account Number"),
            bankId: Yup.string().required().label("Bank"),
        }),
        onSubmit: async (values) => {
            try {
                const bank = banks?.filter((bank: any) => bank.id === Number(values.bankId));
                // console.log(bank);
                // const result = await verifyAccount(values.accountNumber, bank[0].code);

                // if (result.isValid) {
                //     console.log('Account verified:', result.accountName);
                //     setAccountName(result.accountName);
                //     // formik.setField("accountHolderName", result.accountName);
                //     // if(result.accountName.toLowerCase() !== values.accountHolderName.toLowerCase()) {
                //     //     toast.error("Account Holder name you entered does not match the name associated with account number.");
                //     //     return;
                //     // }
                // } else {
                //     console.error('Account verification failed:', result.error);
                //     toast.error(result.error);
                //     return;
                // }

                const data = {
                    accountDetails: {
                        bankName: bank[0].name,
                        accountNumber: values.accountNumber,
                        accountHolderName: accountName,
                    }
                };

                console.log('Request Body: ', data);

                httpService
                .patch(
                    `${ENDPOINTS.WALLET}${walletId}`, 
                    data, 
                    `Bearer ${token}`
                )
                .then((apiRes) => {
                    console.log('Response: ', apiRes);

                    if (apiRes.data) {
                        formik.resetForm();

                        toast.success('Account Details updated.');

                        closePopup();

                        router.refresh();
                        window.location.reload();
                        
                        console.log(apiRes);
                    }
                });
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        },
        validateOnChange: true,
    });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
            onClick={closePopup}
            className="absolute top-2 right-2 text-gray-400 text-3xl hover:text-gray-600"
        >
            &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Add Account Details</h2>

        <form
            onSubmit={formik.handleSubmit}
        >
            <div className='mb-4 relative'>
                <label
                    htmlFor='bankId'
                    className='text-sm text-neutral mb-2 block'
                >
                    Bank
                </label>

                <select
                    name='bankId'
                    id='bankId'
                    className='text-black bg-[#F0F1F3] font-medium'
                    onChange={formik.handleChange}
                    value={formik.values.bankId}
                >
                    <option value='' className="text-gray-500" defaultChecked disabled>
                        Select your preferred bank...
                    </option>
                    {
                        banks.map((bank: any, index: number) => (
                            <option value={bank.id} key={index} className="text-gray-500">
                                {bank.name}
                            </option>
                        ))
                    }
                </select>
                <IoIosArrowDown className={`absolute right-4 ${formik.errors.bankId ? "top-10" : "bottom-4"}`} />
                <CustomError error={formik.errors.bankId} />
            </div>

            <div className='mb-4'>
                <label htmlFor='accountNumber' className='text-sm text-neutral mb-2 block'>
                    Account Number
                </label>
                <TextInput
                    placeholder='Enter account number associated with bank...'
                    id='accountNumber'
                    onChange={formik.handleChange}
                    value={formik.values.accountNumber}
                    error={formik.errors.accountNumber}
                />
            </div>

            <Button
                // type="submit"
                onClick={(e) => handleVerify(e, formik.values.accountNumber, formik.values.bankId)}
                disabled={loading}
                loading={loading}
                variant="fill"
                className="bg-orange-500 text-white"
            >
                Verify account
            </Button>

            <div className='mb-6'>
                <label htmlFor='accountHolderName' className='text-sm text-neutral mb-2 block'>
                    {accountName}
                </label>
                {/* <TextInput
                    placeholder='Enter account holder name...'
                    id='accountHolderName'
                    onChange={formik.handleChange}
                    value={formik.values.accountHolderName}
                    error={formik.errors.accountHolderName}
                /> */}
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    variant="outlined"
                    onClick={closePopup}
                    className=""
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={formik.isSubmitting || accountName === ""}
                    loading={formik.isSubmitting}
                    variant="fill"
                    className="bg-orange-500 text-white"
                >
                    Add Account Details
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountDetailsPopup;