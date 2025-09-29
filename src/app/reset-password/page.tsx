"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoEye, IoEyeOff } from "react-icons/io5";
import * as Yup from 'yup';
import { useSearchParams } from "next/navigation";

import HTTPService from "@/services/http";
import logo from "../../../public/1-Photoroom.png";
import TextInput from '@/components/Global/TextInput';
import Button from "@/components/Global/Button";

const passwordSchema = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[@$!%*?&#]/, "Password must contain at least one special character");

export default function ResetPassword() {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const httpService = new HTTPService();

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await passwordSchema.validate(password);
        setError("");
        setLoading(true);

        const data = {
            password
        }

        try {
            const res = await httpService.post(`auth/reset-password/${token}`, data);

            if(res.success) {
                toast.success(res.message, { duration: 2000 });
                router.push("/login");
            } else {
                toast.error(res.message);
            }
        } catch (error: any) {
            console.log(error);
            setError(error.message);
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
                        Enter your new password:
                    </p>

                    <p className="text-black text-sm mb-4">
                        Please your new password
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
                            {/* <TextInput
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password here...'
                                type='text'
                                id='password'
                                value={password}
                            /> */}
                            <TextInput
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='* * * * * *'
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                rightIcon={showPassword ?  <IoEye /> : <IoEyeOff />}
                                rightIconClick={() => setShowPassword((prev) => !prev)}
                                value={password}
                                error={error}
                            />
                        </div>
        
                        <Button block disabled={loading} loading={loading} className='text-white font-semibold' type='submit'>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
};
