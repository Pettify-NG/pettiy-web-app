"use client";

import { useState, useEffect, ChangeEvent, useRef } from "react";
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
import useFetch from "@/hooks/useFetch";
import { IoIosArrowDown } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";

interface IProfileImage {
    image: File
}

interface UserData {
    firstname: string;
    lastname: string;
    username: string;
    address: string;
    email: string;
    phonenumber: string;
    country: string;
    state: string;
    profileImage: string;
}

function CustomError({ error }: { error?: string }) {
    if (!error) return;
  
    return (
      <div className='text-xs font-light ml-1 p-2 absolute -bottom-6'>
        <span className='text-red-600'>
          {error}
        </span>
      </div>
    );
}
  
export default function ProfileForm({ user }: { user?: UserData | null }) {
    console.log(user);

    const [profileImage, setProfileImage] = useState<IProfileImage>({} as IProfileImage);

    const [profileImageUrl, setProfileImageUrl] = useState<string>();

    const [states, setStates] = useState<string[]>([]);

    const [seller_info, setSellerInfo] = useLocalStorage<any>("pettify-details", {} as any);

    const imageInputRef = useRef<HTMLInputElement | null>(null);

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
            firstname: user?.firstname ?? "",
            lastname: user?.lastname ?? "",
            username: user?.username ?? "",
            address: user?.address ?? "",
            email: user?.email ?? "",
            phoneNumber: user?.phonenumber ?? "",
            // country: user?.country ?? "",
            state: user?.state ?? "",
        },
        enableReinitialize: true, // Reinitialize when `initialValues` change
        validationSchema: Yup.object({
            email: Yup.string().required().label("Email"),
            phoneNumber: Yup.string().required().label("Phone Number"),
            firstname: Yup.string().required().label("Firstname"),
            lastname: Yup.string().required().label("Lastname"),
            address: Yup.string().required().label("Address"),
            username: Yup.string().required().label("Username"),
            // country: Yup.string().required().label("Country"),
            state: Yup.string().required().label("State"),
        }),
        onSubmit: async (values) => {
            try {
                // let profileImageUrl: string = "";
                if(profileImage) {
                    const formdata = new FormData();
                    formdata.append('file', profileImage?.image);
        
                    const requestOptions = {
                        method: 'POST',
                        body: formdata,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
        
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
                        requestOptions
                    ).then((response) => {
                        if (!response.ok) {
                            throw new Error("Image upload failed");
                        }
    
                        return response.json();
                    }).then((result) => {
                        const imageUrl = result.data.url;

                        const data = {
                            profileImage: imageUrl
                        };

                        const newSellerInfo = { ...seller_info, user: { ...seller_info.user, profileImage: imageUrl } }
                        setSellerInfo(newSellerInfo);
    
                        httpService
                        .put(
                            `${ENDPOINTS.USER}${seller_info.user._id}`, 
                            data, 
                            `Bearer ${token}`
                        )
                        .then((apiRes) => {
                            console.log('Response: ', apiRes);
        
                            if (!apiRes.success) {
                                toast.error("Failed to upload profile image.");
                                return;
                            } 
                        });
                    }).catch(error => { 
                        toast.error(error.message); 
                    });
                };

                const userData = {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    phonenumber: values.phoneNumber,
                    address: values.address,
                    state: values.state,
                };

                console.log('Request Body: ');

                httpService
                .patch(
                    `${ENDPOINTS.USER}${seller_info.user._id}`, 
                    userData, 
                    `Bearer ${token}`
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
    
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const apiRes = await fetch("https://nga-states-lga.onrender.com/fetch");

                const response = await apiRes.json();

                setStates(response);
            } catch(error: any) {
                console.log(error.message);
            }
        }

        fetchStates();
    }, []);

    const handleUploadImage = async () => {
        if(profileImage) {
                const formdata = new FormData();
                formdata.append('file', profileImage?.image);
    
                const requestOptions = {
                    method: 'POST',
                    body: formdata,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
    
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
                    requestOptions
                ).then((response) => {
                    if (!response.ok) {
                        throw new Error("Image upload failed");
                    }

                    return response.json();
                }).then((result) => {
                    const data = {
                        profileImage: result.url,
                    };

                    console.log('Request Body: ', data);

                    httpService
                    .patch(
                        `${ENDPOINTS.USER}${seller_info.user._id}`, 
                        data, 
                        `Bearer ${token}`
                    )
                    .then((apiRes) => {
                        console.log('Response: ', apiRes);
    
                        if (!apiRes.success) {
                            toast.error("Failed to upload profile image.");
                            return;
                        } 
                    });
                }).catch(error => { 
                    toast.error(error.message); 
                });
        } 
    };

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
                    {
                        (user?.profileImage || profileImage?.image) ? 
                            <Image
                                src={profileImage?.image ? URL.createObjectURL(profileImage.image) : (user?.profileImage ?? "")}
                                alt='User profile image'
                                width={50}
                                height={50}
                                quality={100}
                                className='rounded-full w-[150px] h-[150px] object-cover'
                            />
                            : 
                            <IoPersonCircleSharp 
                                className={`duration-500 rounded-full border border-gray-400 w-10 h-10`}
                            />
                    }

                    <div>
                        <input
                            type='file'
                            accept='.jpg,.png,.jpeg'
                            id='image'
                            ref={imageInputRef}
                            className='pointer-events-none opacity-0'
                            onChange={addNewImage}
                        />

                        <Button
                            size='small'
                            onClick={() => imageInputRef.current?.click()}
                            className="text-white"
                        >
                            Add Image
                        </Button>
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

                {/* Country
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
                    <IoIosArrowDown onClick={handleSelectProductCategoryClick} className={`absolute right-4 ${formik.errors.categoryId ? "top-10" : "bottom-4"}`} />
                    <CustomError error={formik.errors.categoryId} />
                </div> */}

                {/* State */}
                <div className='my-6 relative'>
                    <label
                        htmlFor='state'
                        className='text-sm text-neutral mb-2 block'
                    >
                        State
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
                        {
                            states.map((state, index) => 
                                <option value={state} key={index}>
                                    {state}
                                </option>
                            )
                        }
                    </select>
                    <IoIosArrowDown className={`absolute right-4 ${formik.errors.state ? "top-10" : "bottom-4"}`} />
                    <CustomError error={formik.errors.state} />
                </div>

                <span className="flex gap-3 w-1/2">
                    <Button block loading={formik.isSubmitting} className="text-white" type='submit'>
                        Update Profile
                    </Button>
                    
                    <Button block variant="outlined" onClick={() => router.push("/dashboard")}>
                        Discard changes
                    </Button>
                </span>
            </form>
        </>
    );
};