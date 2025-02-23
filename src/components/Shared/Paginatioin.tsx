"use client";
import { useRouter, usePathname } from 'next/navigation';
import { FaAngleRight } from "react-icons/fa";
import React from 'react';
import Link from 'next/link';

interface IPaginationProps {
    lastPage?: string;
}

const Pagination: React.FC<IPaginationProps> = ({ lastPage }) => {
    const router = useRouter();
    const pathname = usePathname();

    const formatString = (str: string) => {
        if(str === "admin") {
            return "dashboard".charAt(0).toUpperCase() + "ashboard";
        } else {
            return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
        }
    }

    const oldSegments = pathname.split('/').filter(segment => segment !== '')

    if((/^\d+$/.test(oldSegments[oldSegments.length - 1]))) {
        oldSegments[oldSegments.length - 1] = lastPage ?? "";
    }

    const segments = oldSegments.filter(segment => !(/^\d+$/.test(segment)));

    let currentPath = '';
    const paginationLinks: React.ReactNode[] = [];

    segments.forEach((segment, index) => {
        currentPath += '/' + segment;
        const link = currentPath;
        paginationLinks.push(
            <li key={index}>
                <Link href={link}>
                    <div className='flex gap-1 items-center justify-center'>
                        <p className={`text-sm ${index === segments.length - 1 ? "text-neutral" : "text-[#CFA31C]" }`}>
                        {/* {index === segments.length - 1 ? formatString(lastPage ?? segment) : formatString(segment) + ' '} */}
                            {index === segments.length - 1 ? formatString((lastPage && !(/^\d+$/.test(lastPage))) ? segment : lastPage ?? segment) : formatString(segment) + ' '}
                        </p>
                        {index < segments.length - 1 && <FaAngleRight className='' color='gray'/>}
                    </div> 
                </Link>
            </li>
        );
    });

    return (
        <nav>
            <ul className='flex w-full gap-2'>
                {paginationLinks}
            </ul>
        </nav>
    );
}

export default Pagination;
