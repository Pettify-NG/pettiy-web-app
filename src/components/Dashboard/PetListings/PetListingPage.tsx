"use client";

import Link from "next/link";
import react, { useState, useMemo, ChangeEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

import Pagination from "@/components/Shared/Paginatioin";
import PetListingsTable from "./PetListingsTable";

export default function PetListingspage ({ petListings }: {
    petListings: any
}) {

    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedPetListings, setSelectedPetListings] = useState<any>([]);

    const handleChangeSelectedPetListings = (e: any) => {
      console.log(e.value);

      setSelectedPetListings(e.value);
    };

    const debouncedSearch = useMemo(() => {
      let timer: NodeJS.Timeout;

      const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          setSearchValue(e.target.value);
        }, 500);
      };

      return handleSearchChange;
    }, []);

    const handleSelectDate = (
      date: Date | (Date | null)[] | Date[] | null | undefined
    ) => {
      if (date) {
        const formatted = new Date(date as Date).getTime();

        setSelectedDate(formatted);
      } else setSelectedDate(null);
    };

    return (
        <section>
          <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-4'>
            <div>
              <p className='text-xl font-bold text-gray-700'>Pet Listings</p>
              <Pagination/>
            </div>
    
            <div className='flex items-center justify-between w-full'>
              <div className="flex gap-3">
                <FaShoppingBag />

                <h2>Pet Listings</h2>
              </div>

              {/* Add pet listing button. */}
              <div className='flex my-4 items-center justify-center w-full'>
                  <div className='flex items-center gap-[16px]'>
                      <Link href='/dashboard/create-listing'>
                          <button className='rounded-[8px] h-fit w-fit text-[14px] text-[#090917] gap-[4px] flex items-center whitespace-nowrap bg-[#F2C94C] py-[10px] px-[14px] ' >
                              <FaPlus />
                              Create A New Pet listing
                          </button>
                      </Link>
                  </div>
              </div>
            </div>
          </div>
    
          {/* Products Table */}
          <PetListingsTable
            selectedDate={selectedDate}
            petListings={petListings}
            searchValue={searchValue.toLowerCase()}
            handleChangeSelectedPetListings={handleChangeSelectedPetListings}
            selectedPetListings={selectedPetListings}
          />
      </section>
    );
};