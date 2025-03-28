/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import clsx from 'clsx';

import IAccessory from '@/interfaces/accessory';

const AccessoryDetails = ({
    accessoryDetails
}: {
    accessoryDetails: IAccessory | null
}) => {
    console.log(accessoryDetails);
    const [currentImageCount, setCurrentImageCount] = useState<number>(0);

    const changeImage = (action: string) => {
        if(action.toLowerCase() === "next") {
            const newImageCount = currentImageCount + 1;
            setCurrentImageCount(newImageCount >= accessoryDetails!.accessoryImages.length ? 0 : newImageCount);
        }

        if(action.toLowerCase() === "previous") {
            const newImageCount = currentImageCount - 1;
            setCurrentImageCount(newImageCount < 0 ? accessoryDetails!.accessoryImages.length - 1 : newImageCount);
        }
    }

    const scrollToSection = (elementId: string) => {
        document.getElementById(elementId ?? "")?.scrollIntoView({ behavior: 'smooth' });
    };
      
    return (
        <div>
            <section className='w-full flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between'>
                {/* Image Carousel */}
                <div className='relative lg:w-1/2 w-full mb-3'>
                    <div className='w-full h-[200px]'>
                        <img
                            src={accessoryDetails?.accessoryImages[currentImageCount] || ''}
                            alt="product image"
                            // width="200"
                            // height="200"
                            className="mx-auto w-auto h-[250px] rounded transition-500 transition-all"
                            style={{
                                // objectFit: 'cover',
                                overflow: 'hidden',
                                // aspectRatio: "3/2",
                            }}
                        />

                        <div className="absolute top-0 justify-between h-full hidden md:flex w-[100%] lg:w-[100%] xl:w-[100%] items-center z-10">
                            {accessoryDetails?.accessoryImages !== undefined && accessoryDetails.accessoryImages.length > 1 && 
                                <MdKeyboardArrowLeft 
                                    // width={50}
                                    // height={50}
                                    size={50}
                                    className='cursor-pointer'
                                    color='black'
                                    onClick={() => changeImage("previous")}
                                />
                            }
                            
                            {accessoryDetails?.accessoryImages !== undefined && accessoryDetails.accessoryImages.length > 1 && 
                                <MdKeyboardArrowRight 
                                    // width={100}
                                    // height={100}
                                    size={50}
                                    color='black'
                                    className='cursor-pointer'
                                    onClick={() => changeImage("next")}
                                />
                            }
                            
                        </div>
                    </div>
                </div>

                {/* Product details */}
                <div className='lg:w-1/2 w-full px-3'>
                    <div className='mg-4'>
                        {/* Product name */}
                        <h2 className='font-semibold text-black text-2xl mb-3'>{accessoryDetails?.name}</h2>

                        {/* Brand name */}
                        <div className='flex gap-1 mb-3'>
                            <p className='font-semibold text-black text-md'>Brand:</p>
                            <p className='text-black text-md'>{accessoryDetails?.name}</p>
                        </div>

                        <div className='flex gap-1 mb-3'>
                            <p className='font-semibold text-black text-lg'>Price:</p>
                            <p className='text-black text-lg mb-3'>${accessoryDetails?.price}</p>
                        </div>
                    </div>

                    <div className='mt-4 mb-8'>
                        {/* Quantity */}
                        <div className='flex gap-1'>
                            <p className='text-black text-md font-semibold'>Quantity:</p>
                            <p className='text-black text-md'>{accessoryDetails?.quantity}</p>
                        </div>
                    </div>

                    <div className=''>
                        {/* Description */}
                        <div className='flex gap-1 border-b-2 border-gray-300'>
                            <p className='text-black text-md font-semibold'>Description:</p>
                            <p className='w-full text-md text-black mb-3 text-left  pb-4'>{accessoryDetails?.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='flex flex-start h-14 my-2 gap-2'>
                {accessoryDetails?.accessoryImages.map((image: string, index: number) => (
                    <Image
                        width={80}
                        height={50}
                        className={`rounded border cursor-pointer border-gray-300 ${currentImageCount === index ? "opacity-100" : "opacity-20"}`}
                        alt="product image"
                        src={image || ''}
                        key={index}
                        onClick={() => setCurrentImageCount(index)}
                    />
                ))}
            </div>


            {/* Shipping details: Weight, Height, Length, & Width */}
            {/* <section>
                <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
                    <p className='text-lg font-semibold text-gray-700 mb-8'>Inventory</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-5 2xl:grid-cols-3 gap-x-4 items-center'>
                        <div className='mb-6'>
                            <label htmlFor='sku' className='text-sm text-neutral mb-2 block'>
                                SKU
                            </label>
                            <TextInput
                                placeholder='SKU'
                                id='sku'
                                // onChange={formik.handleChange}
                                value={accessoryDetails?.sku}
                                // error={formik.errors.weight}
                                type='number'
                                disabled
                            />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor='barcode' className='text-sm text-neutral mb-2 block'>
                                Barcode
                            </label>
                            <TextInput
                                placeholder='Barcode...'
                                id='barcode'
                                // onChange={formik.handleChange}
                                value={accessoryDetails?.barcode}
                                // error={formik.errors.weight}
                                type='text'
                                disabled
                            />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor='sku' className='text-sm text-neutral mb-2 block'>
                                Weight
                            </label>
                            <TextInput
                                placeholder='Type product weight...'
                                id='weight'
                                // onChange={formik.handleChange}
                                value={accessoryDetails?.weight}
                                // error={formik.errors.weight}
                                type='number'
                                disabled
                            />
                        </div>
                        
                        <div className='mb-6'>
                        <label
                            htmlFor='productCategory'
                            className='text-sm text-neutral mb-2 block'
                        >
                            Product category
                        </label>
                        <TextInput
                            placeholder="Product category"
                            id='productCategory'
                            // onChange={formik.handleChange}
                            value={accessoryDetails?.category.name}
                            // error={formik.errors.length}
                            type='text'
                            disabled
                        />
                        </div>
                        
                        <div className='mb-6'>
                        <label
                            htmlFor='productStatus'
                            className='text-sm text-neutral mb-2 block'
                        >
                            Product Status
                        </label>
                        <TextInput
                            placeholder='Product status...'
                            id='productStatus'
                            // onChange={formik.handleChange}
                            value={accessoryDetails?.status}
                            // error={formik.errors.height}
                            type='text'
                            disabled
                        />
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    )
}

export default AccessoryDetails;