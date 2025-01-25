"use client";
import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import Cookies from "universal-cookie";
import profileImg from "../../../public/profile-img.png";

type PropTypes = {
  name: string;
  title?: string;
  //   dropDown: boolean;
  //   setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  //   logOutRef: React.RefObject<HTMLDivElement>;
};

export default function UserAvatar({ name, title = "" }: PropTypes) {
  const cookies = new Cookies();
  // const cookieStore = new Cookies();
  const router = useRouter();

  // const [dropDown, setDropDown] = useState<boolean>(false);

  const handleLogout = () => {
    cookies.remove("urban-token");
    cookies.set("urban-token", "", {
      path: "/",
    });
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-3 relative mr-10">
      <div className="flex flex-row gap-3 items-center">
        <div className="h-4 w-4 bg-green-500 border-2 border-white rounded-full absolute right-[44px] md:right-[50px] bottom-0"></div>
        <Image src={profileImg} alt="Profile Image" width={40} height={40} />

        <div className="flex flex-col">
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>

      {/* <button className='text-gray-600' onClick={() => setDropDown(prev => !prev)}>
        <IoChevronDownOutline />
      </button>

      {
        dropDown && 
        <div ref={logOutRef} className='absolute cursor-pointer py-2 px-2 rounded bg-white text-md top-14 w-full flex justify-center items-center' onClick={() => handleLogout()}>
          <CiLogout />
          <p>Logout</p>
        </div>
      } */}
    </div>
  );
}
