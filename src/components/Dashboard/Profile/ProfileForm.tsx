"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

import TextInput from "@/components/Global/TextInput";
import Button from "@/components/Global/Button";
import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AdminType } from "@/components/Shared/Header";

interface IProfileImage {
    image: File
}

const ProfileForm = () => {
    const [user, setUser] = useState<any>({});

    const [profileImage, setProfileImage] = useState<IProfileImage>({} as IProfileImage);

    const [seller_info, setSellerInfo] = useLocalStorage<AdminType>("pettify-details", {} as AdminType);

    const httpService = new HTTPService();

    // JWT Token gotten from the backend. Not yet implemented from the backend.
    const cookies = new Cookies();
    const token = cookies.get('pettify-token');

    const router = useRouter();

    const addNewImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const fileSizeInBytes = e.target.files[0].size;
          const fileType = e.target.files[0].type;
          const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    
          if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
            toast.error('File type is not supported!');
            return;
          }
    
          if (fileSizeInMB >= 1) {
            toast.error('File size too large');
            return;
          }

          setProfileImage({ image: e.target.files[0] });
        }
    };

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
            try {
                let profileImageUrl: string = "";
                if(profileImage) {
                    const formdata = new FormData();
                    formdata.append('file', profileImage?.image);
        
                    const requestOptions = {
                        method: 'POST',
                        body: formdata,
                        // headers: {
                        //     Authorization: `Bearer ${token}`,
                        // },
                    };
        
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
                        requestOptions
                    );
        
                    const data = await response.json();

                    profileImageUrl = data.url;
                    console.log(data);
                }

                const data = {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    address: values.address,
                    country: values.country,
                    state: values.state,
                    profileImage: profileImageUrl,
                };
    
                console.log('Request Body: ', data);

                httpService
                    .put(
                        `${ENDPOINTS.USER}/${seller_info._id}`, 
                        data, 
                        // `Bearer ${token}`
                    )
                    .then((apiRes) => {
                        console.log('Response: ', apiRes);
    
                        if (apiRes.success) {
                            formik.resetForm();
                            setProfileImage({} as IProfileImage);
        
                            toast.success('Profile updated.');
        
                            setTimeout(() => {
                            router.push('/dashboard');
                            }, 1000);
                        }
                    });

            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        },
        validateOnChange: true,
    });

    useEffect(() => {
        const fetchUser = async () => {
            
        }
    }, []);

    return (
        <>
            <h2 className="border-b-2 border-black py-4 w-full font-semibold text-xl">Profile</h2>
        
            <form
                action=''
                className='w-full max-w-md'
                onSubmit={formik.handleSubmit}
            >
                {/* Profile picture  */}
                <div className="flex gap-2 my-6 justify-between align-center">
                    {/* <div className=""> */}
                        <Image
                            src={user.profileImage ? user.profileImage : URL.createObjectURL(profileImage.image ?? null)}
                            alt="profile picture"
                            width={200}
                            height={200}
                            className='rounded-full w-full h-full object-cover'
                        />
                    {/* </div> */}

                    <div>
                        <input
                            type='file'
                            accept='.jpg,.png,.jpeg'
                            id='image'
                            className='pointer-events-none opacity-0'
                            onChange={addNewImage}
                        />
                    </div>
                </div>

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
                        disabled
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

                <span className="flex gap-3 w-1/2">
                    <Button block loading={formik.isSubmitting} type='submit'>
                        Update Profile
                    </Button>
                    
                    <Button block variant="outlined">
                        Discard changes
                    </Button>
                </span>
            </form>
        </>
    );
}

export default ProfileForm;