"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import HTTPService from "@/services/http";
import logo from "../../../../public/1-Photoroom.png"
import TextInput from '@/components/Global/TextInput';
import Button from "@/components/Global/Button";

export default function VerifyAccount({ params }: { params: { id: string } }) {
    const [token, setToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const httpService = new HTTPService();

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            otp: token
        }

        try {
            const res = await httpService.post(`auth/verify-otp/${params.id}`, data);

            if(res.success) {
                toast.success("Account verified.");

                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                toast.error(res.message);
            }
        } catch (error: any) {
            console.log(error);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=''>
            <div className='p-4 bg-white fixed top-0 left-0 w-full shadow-md z-10'>
            <Link href='/'>
                <Image src={logo} alt='Pettify Logo' className='w-[100px] h-[30px]'/>
            </Link>
            </div>
    
            <div className='flex space-between gap-6 bg-orange-300 h-screen w-full px-4 lg:px-14 py-14 mt-14 flex justify-center align-center'>
                <div className='lg:w-[500px] md:w-1/2 w-full h-[400px] rounded-md px-3 shadow-xl bg-white flex justify-center align-center flex-col'>
                    <p className='font-bold text-3xl mb-2 text-black'>
                        Verify your account
                    </p>

                    <p className="text-black text-sm mb-4">
                        Please enter the 6-figure pass code sent to your email.
                    </p>
        
                    <form
                        action=''
                        className='w-full'
                        onSubmit={handleSubmit}
                    >
                        <div className='my-4'>
                            {/* <label htmlFor='email_or_username' className='mb-2'>
                                Enter token sent to your email
                            </label> */}
                            <TextInput
                                onChange={(e) => setToken(e.target.value)}
                                placeholder='Enter token sent to your email...'
                                type='text'
                                id='token'
                                value={token}
                            />
                        </div>
        
                        <Button block disabled={loading} loading={loading} className='text-white font-semibold' type='submit'>
                            Verify Account
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
};
