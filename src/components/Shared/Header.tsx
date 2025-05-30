"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BiBell } from "react-icons/bi";
import { CgMenu } from "react-icons/cg";
import { FiMail } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { TbCalendar } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

import TextInput from "../Global/TextInput";
import UserAvatar from "./UserAvatar";
import { profile } from "console";

export interface AdminType {
  createdAt: string;
  email: string;
  firstname: string;
  username: string;
  id: number;
  lastname: string;
  profileImage: string | null;
  status: "ACTIVATED";
  token: string;
  twoFactorAuth: number;
  updatedAt: string;
  role: "SELLER";
  uuid: string;
  verified: number;
}

export default function Header({
  isOpen,
  toggleSidebar,
}: //   unreadNotifications,
//   dropDown,
//   setDropDown,
//   logOutRef
{
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
    if (typeof window !== "undefined") {
      const admin_info = localStorage.getItem("pettify-details");

      if (admin_info) {
        setAdminDetails(JSON.parse(admin_info).user);
      }

      console.log(adminDetails);
    }
  }, []);

  return (
    <div
      className={`border-b-[1px] border-b-gray-100 p-4 flex items-center justify-between md:px-8 fixed top-0 left-0 w-full z-30 bg-white ${
        isOpen ? "lg:left-[16.66%] lg:w-5/6" : "lg:left-[8.33%] lg:w-11/12"
      }`}
    >
      <button
        className="font-bold capitalize text-2xl text-gray-700 lg:hidden"
        onClick={toggleSidebar}
      >
        <CgMenu />
      </button>

      <div
        className="hidden cursor-pointer font-bold text-gray-700 lg:flex items-center justify-center"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <CgClose className="h-[20px] w-[20px]" />
        ) : (
          <CgMenu className="h-[20px] w-[20px] " />
        )}
      </div>

      <div className="flex items-center w-full justify-between mx-4">
        <h3 className="font-semibold">Welcome, {adminDetails?.username}</h3>
      </div>

      <div className="flex items-center gap-8">
        <div className="h-12 w-[2px] bg-gray-200"></div>

        {/* <div className="flex flex-row items-center gap-4">
          <UserAvatar
            name={`${adminDetails?.username}`}
            // title={adminDetails?.role}
            // dropDown={dropDown}
            // setDropDown={setDropDown}
            // logOutRef={logOutRef}
          />
        </div> */}
      </div>
    </div>
  );
}
