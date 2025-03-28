"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaX } from 'react-icons/fa6';
import { TfiSave } from 'react-icons/tfi';

import Pagination from './Paginatioin';
import Button from '@/components/Global/Button';

const PageHeading = ({ type }: { type: string }) => {
    const searchParams = useSearchParams();

    return (
        <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
            <div>
                <p className='text-xl font-bold text-gray-700 mb-4'>{type} Details</p>
                <Pagination lastPage="Product details"/>
            </div>
            
            <div className='flex items-center gap-4'>
            <Link href='/admin/products'>
                <Button variant='outlined' color='dark'>
                <FaX />
                Cancel
                </Button>
            </Link>

            {searchParams.get('edit') && 
                <Button>
                    <TfiSave />
                    {`Save ${type}`}
                </Button>
            }
            </div>
        </div>
    )
}

export default PageHeading;