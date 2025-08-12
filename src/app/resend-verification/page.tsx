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

export default function VerifyAccount() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const httpService = new HTTPService();

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            email: email
        }

        try {
            const res = await httpService.post(`auth/resend-verification/`, data);

            if(res.success) {
                toast.success("An OTP has been sent to your mail. You will be redirected to the verification page shortly.", { duration: 2000 });

                setTimeout(() => {
                    router.push(`verify-account/${res.data.userId}`);
                }, 2000);
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
                        Resend Verification Email
                    </p>

                    <p className="text-black text-sm mb-4">
                        Please enter your email and get a verification link sent to you.
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
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email here...'
                                type='text'
                                id='email'
                                value={email}
                            />
                        </div>
        
                        <Button block disabled={loading} loading={loading} className='text-white font-semibold' type='submit'>
                            Resend Vefification Link
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
};
