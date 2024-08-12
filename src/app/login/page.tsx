'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoEye, IoEyeOff, IoMailSharp } from 'react-icons/io5';
import * as Yup from 'yup';

import TextInput from '@/components/Global/TextInput';
import Button from '@/components/Global/Button';
import ENDPOINTS from '@/config/ENDPOINTS';
import { API_RESPONSES } from '@/config/API_RESPONSES';
import storeCookies from '@/libs/cookies';
import HTTPService from '@/services/http';
import AuthLayout from '@/layouts/AuthLayout';

export default function Login() {
  const httpService = new HTTPService();

  const { replace, push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email_or_username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email_or_username: Yup.string().required().label('Email or username'),
      password: Yup.string().required().label('Password'),
    }),
    onSubmit: async (values) => {
      const res = await httpService.post(ENDPOINTS.SIGN_IN, values);
      console.log(res);

      if (res.error) toast.error(API_RESPONSES.SIGN_IN[res.statusCode]);
      else {
        if (res.status === "success")  {
          if(res.data.user.role === "seller") {
            toast.success(
              API_RESPONSES.SIGN_IN[res.statusCode] ||
                API_RESPONSES.SIGN_IN[res.status]
            );
  
            // storeCookies([
            //   {
            //     key: 'pettify-token',
            //     value: res.data.token,
            //   },
            // ]);
  
            window.localStorage.setItem('pettify-details', JSON.stringify(res.data));
            push('/dashbooard/seller');
          } 

          if (res.data.user.role === "buyer") {
            toast.success(
                API_RESPONSES.SIGN_IN[res.statusCode] ||
                  API_RESPONSES.SIGN_IN[res.status]
              );
    
              // storeCookies([
              //   {
              //     key: 'pettify-token',
              //     value: res.data.token,
              //   },
              // ]);
    
              window.localStorage.setItem('pettify-details', JSON.stringify(res.data));
              push('/dashbooard/buyer');
          }
        } 

        // console.log(res.data.user.role);

        if (res.statusCode === 203) {
          storeCookies([
            {
              key: 'pettify-email',
              value: res.data.email,
            },

            {
              key: 'pettify-secret-reference',
              value: res.data.secretReference,
            },
          ]);

          setTimeout(() => {
            push('/auth/verify-email?role=admin');
          }, 1000);
        }
      }
    },
    validateOnChange: true,
  });

  return (
    <AuthLayout
      pageName='Login'
      greetingText='Welcome Back'
      altPage=''
      altPageText=''
      altPageUrl=''
    >
      <form
        action=''
        className='w-full max-w-md mx-auto'
        onSubmit={formik.handleSubmit}
      >
        <div className='my-6'>
          <label htmlFor='email_or_username' className='mb-2'>
            Email or username
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='Enter your email/username'
            type='text'
            id='email_or_username'
            rightIcon={<IoMailSharp />}
            // rounded
            value={formik.values.email_or_username}
            error={formik.errors.email_or_username}
          />
        </div>
        {/*  */}
        <div className='my-6'>
          <label htmlFor='password' className='mb-2'>
            Password
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='* * * * * *'
            type={showPassword ? 'text' : 'password'}
            id='password'
            rightIcon={showPassword ?  <IoEye /> : <IoEyeOff />}
            rightIconClick={() => setShowPassword((prev) => !prev)}
            // rounded
            value={formik.values.password}
            error={formik.errors.password}
          />
        </div>

        <div className='flex items-center justify-end mb-6'>
          <Link
            href='/register'
            className='font-semibold text-primary'
          >
            Dont have an account? <span className='hover:text-underline hover:opacity-80 cursor-pointer hover:text-gray'>Create one</span>
          </Link>
        </div>

        <Button block loading={formik.isSubmitting} type='submit'>
          Log In
        </Button>
      </form>
    </AuthLayout>
  );
}
