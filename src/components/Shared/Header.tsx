'use client';
import { useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi';
import { CgMenu } from 'react-icons/cg';
import { FiMail } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { TbCalendar } from 'react-icons/tb';
import { CgClose } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';

import TextInput from '../Global/TextInput';
import UserAvatar from './UserAvatar';

export interface AdminType {
  createdAt: string;
  email: string;
  firstName: string;
  username: string;
  id: number;
  lastName: string;
  profileImage: string | null;
  status: 'ACTIVATED';
  token: string;
  twoFactorAuth: number;
  updatedAt: string;
  userType: 'ADMIN';
  uuid: string;
  verified: number;
}

export default function Header({
  isOpen,
  toggleSidebar,
//   unreadNotifications,
//   dropDown,
//   setDropDown,
//   logOutRef
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  unreadNotifications: number;
//   dropDown: boolean;
//   setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
//   logOutRef: React.RefObject<HTMLDivElement>;
}) {
  const [adminDetails, setAdminDetails] = useState<null | AdminType>(null);
//   console.log(unreadNotifications);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const admin_info = window.localStorage.getItem('pettify-details');

      if (admin_info) {
        setAdminDetails(JSON.parse(admin_info).user);
      }

      console.log(adminDetails);
    }
  }, [adminDetails]);

  return (
    <div
      className={`border-b-[1px] border-b-gray-100 p-4 flex items-center justify-between md:px-8 fixed top-0 left-0 w-full z-30 bg-white ${
        isOpen ? 'lg:left-[16.66%] lg:w-5/6' : 'lg:left-[8.33%] lg:w-11/12'
      }`}
    >
      <button
        className='font-bold capitalize text-2xl text-gray-700 lg:hidden'
        onClick={toggleSidebar}
      >
        <CgMenu />
      </button>
      <div className="hidden cursor-pointer font-bold text-gray-700 lg:flex items-center justify-center" onClick={toggleSidebar}>
          {isOpen ? <CgClose className='h-[20px] w-[20px]' /> : <CgMenu className='h-[20px] w-[20px] '/>}
      </div>
      {/* <div className='flex w-full justify-between'></div> */}
      <div className='flex items-center w-full justify-between mx-4'>
        <h3 className='font-semibold'>Welcome, {adminDetails?.username}</h3>

        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search...'
            leftIcon={<CiSearch />}
            // onChange={debouncedSearch}
          />
        </div> 
      </div>  
      <div className='flex items-center gap-8'>
        {/* <button className='text-xl'>
          <IoSearchOutline />
        </button> */}
        {/* <Notification icon={<FiMail />} number={unreadNotifications ?? 0} /> */}

        <div className='h-12 w-[2px] bg-gray-200'></div>

        <UserAvatar
          name={`${adminDetails?.firstName} ${adminDetails?.lastName}`}
          title={adminDetails?.userType}
          // dropDown={dropDown} 
          // setDropDown={setDropDown} 
          // logOutRef={logOutRef}
        />
      </div>
    </div>
  );
}
