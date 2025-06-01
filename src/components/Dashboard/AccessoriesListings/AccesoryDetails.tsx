/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import IAccessory from '@/interfaces/accessory';

const AccessoryDetails = ({
    accessoryDetails
}: {
    accessoryDetails: IAccessory | null
}) => {      
    return (
        <div>
            <section className='w-full flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-0 gap-3 justify-between'>
                {/* Image Carousel */}
                <div className="relative lg:w-1/2 w-full mb-3 h-[300px]">
                    <Carousel showThumbs={true} className='h-full'>
                        {accessoryDetails?.accessoryImages.map((image: string, index: number) => (
                            <div key={index}>
                                <img src={image} alt={`pet image ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Product details */}
                <div className='lg:w-1/2 w-full px-3'>
                    <div className='mg-4'>
                        {/* Product name */}
                        <h2 className='font-semibold text-black text-2xl mb-3'>{accessoryDetails?.name}</h2>

                        {/* Brand name */}
                        <div className='gap-1 mb-3'>
                            <p className='font-semibold text-black text-sm'>Brand:</p>
                            <p className='text-black text-lg'>{accessoryDetails?.name}</p>
                        </div>

                        <div className='gap-1 mb-3'>
                            <p className='font-semibold text-black text-sm'>Price:</p>
                            <p className='text-black text-lg mb-3'>${accessoryDetails?.price}</p>
                        </div>
                    </div>

                    <div className='mt-4 mb-8'>
                        {/* Quantity */}
                        <div className='gap-1'>
                            <p className='text-black text-sm font-semibold'>Quantity:</p>
                            <p className='text-black text-lg'>{accessoryDetails?.quantity}</p>
                        </div>
                    </div>

                    <div className=''>
                        {/* Description */}
                        <div className='gap-1'>
                            <p className='text-black text-sm font-semibold'>Description:</p>
                            <p className='w-full text-md text-black mb-3 text-left pb-4'>{accessoryDetails?.description}</p>
                        </div>
                    </div>
                </div>
            </section>

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