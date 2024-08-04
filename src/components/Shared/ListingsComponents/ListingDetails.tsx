"use client";
import React from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import Image from 'next/image';

import { IListing } from '@/src/interfaces/listings'
import Button from '../../Global/Button';
import logoIcon from '../../../../Pettify 1.png';
import logo from "../../../../public/Pettify.png"

const ListingStatus = ({ status }: { status: string | undefined }) => {

  let styles: string = "";

  switch(status?.toLowerCase()) {
    case "active":
      styles = "bg-green-100 text-green-600";
      break;
    case "pending":
      styles = "bg-yellow-100 text-yellow-600";
      break;
    case "out-of-stock":
      styles = "bg-red-100 text-red-600";
      break;
    default:
      styles = "bg-purple-100 text-purple-600"
  }
  return (
    <div className={`flex justify-center items-center p-2 px-4  text-xs font-semibold rounded-full capitalize ${styles}`}>{status?.toLowerCase()}</div>
  )
}

const ListingDetails = ({
    listing
}: {
    listing: IListing | undefined | null
}) => {
  return (
    <div>
      {/* Top section */}
      <section className='flex justify-end w-full items-center'>
        <div className='flex gap-2  items-center '>
          <p>Status:</p>
          <ListingStatus status={listing?.status}/>
        </div>
      </section>

      {/* Listings Details Section */}
      <section className='flex justify-between gap-3 w-full flex-col lg:flex-row items-center mt-3'>
        <div className='lg:border-r-2 lg:border-black px-10'>
          <Image
            // src={listing?.petImage  ?? ""}
            src={logo}
            alt="Pet image"
            className='lg:h-screen w-full h-[150px] border-2 rounded-sm border-[#F2C94C]'
          />
        </div>

        <div className='flex flex-col gap-3 w-full'>
          {/* Breed */}
          <h1 className='font-semibold text-2xl text-black'>{listing?.breed}</h1>

          {/* Pet category: Dog, Cat, Monkey */}
          <div className='flex gap-1'>
            <p>Category:</p>
            <p className='font-semibold'>{listing?.category}</p>
          </div>

          {/* Pet price */}
          <h1 className='font-semibold text-2xl text-black'>{`N${listing?.price}`}</h1>

          <div className=''>
            {/* Sex */}
            <div className='flex gap-1'>
              <p>Sex:</p>
              <p className='font-semibold'>{listing?.sex}</p>
            </div>

            {/* Colour */}
            <div className='flex gap-1'>
              <p>Colour:</p>
              <p className='font-semibold'>{listing?.color}</p>
            </div>

            {/* Date of Birth */}
            <div className='flex gap-1'>
              <p>DOB:</p>
              <p className='font-semibold'>{listing?.petDateOfBirth}</p>
            </div>

            {/* Location */}
            <div className='flex gap-1'>
              <p>Location:</p>
              <p className='font-semibold'>{listing?.location}</p>
            </div>

            {/* Merchant username */}
            <div className='flex gap-1'>
              <p>Merchant:</p>
              <p className='font-semibold'>{listing?.merchant.username}</p>
            </div>
          </div>

          {/* Pet Description */}
          <div >
            <p>Description:</p>
            <p className='font-semibold'>{listing?.description}</p>
          </div>

          {/* Pet Quantity availbale for sale. */}
          <div className='flex gap-1'>
            <p>Stock:</p>
            <p className='font-semibold'>{listing?.stock}</p>
          </div>

          {/* Pet Vaccine Status: if the pet listed has been vaccinated. */}
          <div className='flex gap-1'>
            <p>Vaccine Status:</p>
            <p className='font-semibold'>{listing?.vaccineStatus ? "True" : "False"}</p>
          </div>

          {/* Vaccine Card Image*/}
          <div >
            <p>Vaccine Card:</p>
            <p className='font-semibold'>{listing?.vaccineCard}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ListingDetails