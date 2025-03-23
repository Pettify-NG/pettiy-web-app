"use client";

import { IoMdSettings } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { MdOutlinePets } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";

// const adminDetails = JSON.parse(localStorage.getItem("pettify-details") ?? "");

export const sellerLinks: ISidebarLink[] = [
  { name: 'home', icon: <IoMdHome />, page: '/dashboard' },
  {
    name: 'pet listings',
    icon: <MdOutlinePets />,
    page: '/dashboard/pets',
  },
  {
    name: 'accessories listings',
    icon: <MdOutlinePets />,
    page: '/dashboard/accessories'
  },
  {
    name: 'orders',
    icon: <MdOutlinePets />,
    page: '/dashboard/orders',
  },
  {
    name: 'wallet',
    icon: <FaWallet />,
    page: '/dashboard/wallet',
  },
  {
    name: 'profile',
    icon: <IoMdPerson />,
    page: `/dashboard/profile`
  },
  // { name: 'settings', icon: <IoMdSettings />, page: '/dashboard/settings' },
  // { name: 'notification', icon: <LuMail />, page: '/admin/dashboard/notifications' },
];

export type ISidebarLink = {
  name: string;
  page: string;
  icon: React.ReactNode;
  // children?: ILink[];
}

// type ILink = {
//   name: string;
//   page: string;
//   children?: {
//     name: string;
//     page: string;
//   }[];
// };

// export type RootLink = {
//   title: string;
//   root: string;
//   icon: React.ReactNode;
//   children: ILink[];
// };
