"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import TextInput from "@/components/Global/TextInput";
import Button from "@/components/Global/Button";
import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";

const ProfileForm = () => {
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: "",
            address: "",
            email: "",
            phoneNumber: "",
            country: "",
            state: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required().label("Email"),
            phoneNumber: Yup.string().required().label("Phone Number"),
            firstname: Yup.string().required().label("Firstname"),
            lastname: Yup.string().required().label("Lastname"),
            address: Yup.string().required().label("Address"),
            username: Yup.string().required().label("Username"),
            country: Yup.string().required().label("Country"),
            state: Yup.string().required().label("State"),
        }),
        onSubmit: async (values) => {

        },
        validateOnChange: true,
    });

    return (
        <>
            <h2 className="border-b-2 border-black py-4 w-full font-semibold text-xl">Profile</h2>
        
            <form
                action=''
                className='w-full max-w-md'
                onSubmit={formik.handleSubmit}
            >
                <div className="flex justify-between align-center gap-2 my-6">
                    {/* Firstname */}
                    <div className=''>
                        <label htmlFor='firstname' className='text-black text-lg font-semibold'>
                            Firstname
                        </label>
                        
                        <TextInput
                            onChange={formik.handleChange}
                            placeholder='Enter your first name'
                            type='text'
                            id='firstname'
                            value={formik.values.firstname}
                            error={formik.errors.firstname}
                        />
                    </div>

                    {/* Last name */}
                    <div className=''>
                        <label htmlFor='lastname' className='text-black text-lg font-semibold'>
                            Lastname
                        </label>
                        
                        <TextInput
                            onChange={formik.handleChange}
                            placeholder='Enter your last name'
                            type='text'
                            id='lastname'
                            value={formik.values.lastname}
                            error={formik.errors.lastname}
                        />
                    </div>
                </div>

                {/* Username */}
                <div className='my-6'>
                    <label htmlFor='username' className='text-black text-lg font-semibold'>
                        Username
                    </label>
                    
                    <TextInput
                        onChange={formik.handleChange}
                        placeholder='Enter your user name'
                        type='text'
                        id='username'
                        value={formik.values.username}
                        error={formik.errors.username}
                    />
                </div>

                {/* Address */}
                <div className='my-6'>
                    <label htmlFor='address' className='text-black text-lg font-semibold'>
                        Address
                    </label>
                    
                    <TextInput
                        onChange={formik.handleChange}
                        placeholder='Enter your address'
                        type='text'
                        id='address'
                        value={formik.values.address}
                        error={formik.errors.address}
                    />
                </div>

                {/* Email address */}
                <div className='my-6'>
                    <label htmlFor='email' className='text-black text-lg font-semibold'>
                        Email Address
                    </label>
                    
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

                {/* Country */}
                <div className='my-6 relative'>
                    <label
                        htmlFor='country'
                        className='text-sm text-neutral mb-2 block'
                    >
                        Country
                    </label>

                    <select
                        name='country'
                        id='country'
                        className='text-black bg-[#F0F1F3] font-medium'
                        onChange={formik.handleChange}
                        value={formik.values.country}
                    >
                        <option value='' defaultChecked disabled>
                            Select your country...
                        </option>
                    </select>
                    {/* <IoIosArrowDown onClick={handleSelectProductCategoryClick} className={`absolute right-4 ${formik.errors.categoryId ? "top-10" : "bottom-4"}`} />
                    <CustomError error={formik.errors.categoryId} /> */}
                </div>

                {/* State */}
                <div className='my-6 relative'>
                    <label
                        htmlFor='state'
                        className='text-sm text-neutral mb-2 block'
                    >
                        Country
                    </label>
                    
                    <select
                        name='state'
                        id='state'
                        className='text-black bg-[#F0F1F3] font-medium'
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    >
                        <option value='' defaultChecked disabled>
                            Select your state of residence...
                        </option>
                    </select>
                    {/* <IoIosArrowDown onClick={handleSelectProductCategoryClick} className={`absolute right-4 ${formik.errors.categoryId ? "top-10" : "bottom-4"}`} />
                    <CustomError error={formik.errors.categoryId} /> */}
                </div>

                <span className="flex gap-3">
                    <Button block loading={formik.isSubmitting} type='submit'>
                        Update Profile
                    </Button>
                    
                    <Button block  variant="outlined">
                        Discard changes
                    </Button>
                </span>
            </form>
        </>
    );
}

export default ProfileForm;