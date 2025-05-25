"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";
import TextInput from "@/components/Global/TextInput";
import Button from "@/components/Global/Button";
import useLocalStorage from "@/hooks/useLocalStorage";

const SettingsForm = () => {
    const httpService = new HTTPService();

    const cookies = new Cookies();
    const token = cookies.get("pettify-token");

    const [seller_info, setSellerInfo] = useLocalStorage<any>("pettify-details", {} as any);

    const formik = useFormik({
        initialValues: {
            email: "",
            phoneNumber: "",
            currentPassword: "",
            newPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required().label("Email"),
            phoneNumber: Yup.string().required().label("Phone Number"),
            currentPassword: Yup.string().required().label("Current Password"),
            newPassword: Yup.string().required().label("New Password"),
        }),
        onSubmit: async (values) => {
            try {
                // const userData = {
                //     firstname: values.firstname,
                //     lastname: values.lastname,
                //     username: values.username,
                //     phonenumber: values.phoneNumber,
                //     address: values.address,
                //     state: values.state,
                // };

                console.log('Request Body: ');

                httpService
                .patch(
                    `${ENDPOINTS.USER}${seller_info.user._id}`, 
                    // userData,
                    {},
                    `Bearer ${token}`
                )
                .then((apiRes) => {
                    if (apiRes.success) {    
                        toast.success('Settings updated.');
                    } else {
                        toast.error(apiRes.message);
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
        <>
            <h2 className="border-b-2 border-black py-4 w-full font-semibold text-xl">Settings</h2>

            <form
                action=''
                className='w-full max-w-md'
                onSubmit={formik.handleSubmit}
            >
                {/* Email address */}
                <div className='my-6'>
                    <label htmlFor='email' className='text-black text-lg font-semibold'>
                        Email
                    </label>
                    <p className="my-4">Used to sign in, for email receipts, updates  and notifications</p>
                    <TextInput
                        onChange={formik.handleChange}
                        placeholder='Enter your email'
                        type='text'
                        id='email'
                        value={formik.values.email}
                        error={formik.errors.email}
                    />
                </div>

                {/* Phone Number */}
                <div className='my-6'>
                    <label htmlFor='phoneNumber' className='mb-3 text-black text-lg font-semibold'>
                        Phone number
                    </label>
                    <TextInput
                        onChange={formik.handleChange}
                        placeholder='Enter your phone number'
                        type='text'
                        id='phoneNumber'
                        value={formik.values.phoneNumber}
                        error={formik.errors.phoneNumber}
                    />
                </div>

                {/* Password */}
                <div className='my-6 flex flex-col gap-3'>
                    <label htmlFor='' className='mb-3 text-black text-lg font-semibold'>
                        Password
                    </label>

                    <TextInput
                        onChange={formik.handleChange}
                        placeholder='Enter current password'
                        type='text'
                        id='currentPassword'
                        value={formik.values.currentPassword}
                        error={formik.errors.currentPassword}
                    />

                    <TextInput
                        onChange={formik.handleChange}
                        placeholder='Enter new password'
                        type='text'
                        id='newPassword'
                        value={formik.values.newPassword}
                        error={formik.errors.newPassword}
                    />
                </div>

                <Button block loading={formik.isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>
        </>
    );
}

export default SettingsForm;
