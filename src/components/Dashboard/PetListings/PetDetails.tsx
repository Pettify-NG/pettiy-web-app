/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { IPet } from '@/interfaces/pet';
import { formatCurrency } from '@/helpers';

const PetDetails = ({
    petDetails
}: {
    petDetails: IPet | null
}) => {
    
    return (
        <div>
            <section className='w-full flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-0 gap-3 justify-between'>
                {/* Image Carousel */}
                <div className="relative lg:w-1/2 w-full mb-3 h-[300px]">
                    <Carousel showThumbs={true} className='h-full'>
                        {petDetails?.pet_images.map((image: string, index: number) => (
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
                        <h2 className='font-semibold text-black text-2xl mb-3'>{petDetails?.name}</h2>

                        {/* Brand name */}
                        <div className='gap-1 mb-3 items-center'>
                            <p className='font-semibold text-black text-sm'>Breed:</p>
                            <p className='text-black text-md'>{petDetails?.breed}</p>
                        </div>

                        <div className='gap-1 mb-3 items-center'>
                            <p className='font-semibold text-black text-sm'>Price:</p>
                            <p className='text-black text-lg mb-3'>{formatCurrency(petDetails?.price || 0)}</p>
                        </div>
                    </div>

                    <div className='gap-1 mb-3 items-center'>
                        <p className='font-semibold text-black text-sm'>Location:</p>
                        <p className='text-black text-lg mb-3'>{petDetails?.location?.state + ", " + petDetails?.location?.lga}</p>
                    </div>

                    <div className='mt-4 mb-8'>
                        {/* Quantity */}
                        <div className='gap-1 items-center'>
                            <p className='text-black text-sm font-medium'>Quantity:</p>
                            <p className='text-black font-semibold text-lg'>{petDetails?.quantity}</p>
                        </div>
                    </div>

                    <div className=''>
                        {/* Description */}
                        <div className='gap-1'>
                            <p className='text-black text-sm font-semibold'>Description:</p>
                            <p className='w-full text-md text-black mb-3 text-left pb-4'>{petDetails?.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PetDetails;