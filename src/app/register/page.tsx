'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoEye, IoEyeOff, IoMailSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import { FaPhone } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";

import TextInput from '@/components/Global/TextInput';
import Button from '@/components/Global/Button';
import storeCookies from '@/libs/cookies';
import ENDPOINTS from '@/config/ENDPOINTS';
import { API_RESPONSES } from '@/config/API_RESPONSES';
import HTTPService from '@/services/http';
import AuthLayout from '@/layouts/AuthLayout';

export default function Register() {
  const httpService = new HTTPService();

  const { replace, push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      phonenumber: undefined,
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required().label('Email'),
      password: Yup.string().required().label('Password'),
      firstname: Yup.string().required().label("Firstname"),
      lastname: Yup.string().required().label("Lastname"),
      username: Yup.string().required().label("Username"),
      phonenumber: Yup.number().min(0).required().label("Phone number"),
      confirmPassword: Yup.string().required().label('Confirm Password').test('confirmPassword', 'Confirm password and password must be the same.', function () {
        const { confirmPassword, password } = this.parent;
        return confirmPassword === password;
      }),
    }),
    onSubmit: async (values) => {
      const data = {
        ...values,
        role: "seller"
      };
      
      const res = await httpService.post(ENDPOINTS.SIGN_UP, data);
      console.log(res);

      if (res.error) toast.error(API_RESPONSES.SIGN_UP[res.statusCode]);
      else {
        if (res.status === 200 && (res.data.userType.toLowerCase() === "seller" || res.data.userType.toLowerCase() === "buyer")) {
          toast.success(
            API_RESPONSES.SIGN_UP[res.statusCode] ||
              API_RESPONSES.SIGN_UP[res.status]
          );

          setTimeout(() => {
            push(`/auth/verify-email?role=${res.data.userType.toLowerCase()}`);
          }, 1000);

          // storeCookies([
          //   {
          //     key: 'pettify-token',
          //     value: res.data.token,
          //   },
          // ]);

          // localStorage.setItem('pettify-admin', JSON.stringify(res.data));
          // push('/admin/dashboard');
        }

        // if (res.statusCode === 203) {
        //   storeCookies([
        //     {
        //       key: 'pettify-email',
        //       value: res.data.email,
        //     },

        //     {
        //       key: 'pettify-secret-reference',
        //       value: res.data.secretReference,
        //     },
        //   ]);
        // }
      }
    },

    validateOnChange: true,
  });

  return (
    <AuthLayout
      pageName='Sign up'
      greetingText='Welcome'
      altPage=''
      altPageText=''
      altPageUrl=''
    >
      <form
        action=''
        className='w-full max-w-md mx-auto'
        onSubmit={formik.handleSubmit}
      >
        {/* Firstname and last name field */}
        <div className='my-6 flex justify-between w-full gap-3'>
          {/* Firstname */}
          <div>
            <label htmlFor='firstname' className='mb-2'>
              Firstname
            </label>
            <TextInput
              onChange={formik.handleChange}
              placeholder='Enter firstname'
              type='text'
              id='firstname'
              rightIcon={<FaRegUser />}
              // rounded
              value={formik.values.firstname}
              error={formik.errors.firstname}
            />
          </div>

          {/* Lastname */}
          <div>
            <label htmlFor='lastname' className='mb-2'>
              Lastname
            </label>
            <TextInput
              onChange={formik.handleChange}
              placeholder='Enter lastname'
              type='text'
              id='lastname'
              rightIcon={<FaRegUser />}
              // rounded
              value={formik.values.lastname}
              error={formik.errors.lastname}
            />
          </div>
        </div>

        {/* Email input field */}
        <div className='my-6'>
          <label htmlFor='email' className='mb-2'>
            Email
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='Enter your email'
            type='email'
            id='email'
            rightIcon={<IoMailSharp />}
            // rounded
            value={formik.values.email}
            error={formik.errors.email}
          />
        </div>

        {/* Username input field */}
        <div className='my-6'>
          <label htmlFor='username' className='mb-2'>
            Username
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='Enter your username'
            type='text'
            id='username'
            rightIcon={<FaRegUser />}
            // rounded
            value={formik.values.username}
            error={formik.errors.username}
          />
        </div>

        {/* Phonenumber input field */}
        <div className='my-6'>
          <label htmlFor='phonenumber' className='mb-2'>
            Phone number
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='Enter your phone number'
            type='number'
            id='phonenumber'
            rightIcon={<FaPhone />}
            // rounded
            value={formik.values.phonenumber}
            error={formik.errors.phonenumber}
          />
        </div>

        {/* Password input field */}
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

        {/* Confirm Password Input Field */}
        <div className='my-6'>
          <label htmlFor='confirmPassword' className='mb-2'>
            Confirm Password
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='* * * * * *'
            type={showPassword ? 'text' : 'password'}
            id='confirmPassword'
            rightIcon={showPassword ?  <IoEye /> : <IoEyeOff />}
            rightIconClick={() => setShowPassword((prev) => !prev)}
            // rounded
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword}
          />
        </div>

        <div className='flex items-center justify-end mb-6'>
          {/* <Link
            href='/auth/reset-password'
            className='font-semibold text-primary'
          >
            Forgot Password?
          </Link> */}

          <Link
            href='/login'
            className='font-semibold text-primary'
          >
            Have an account? Log in.
          </Link>
        </div>

        <Button block loading={formik.isSubmitting} type='submit'>
          Sign up
        </Button>
      </form>
    </AuthLayout>
  );
}
