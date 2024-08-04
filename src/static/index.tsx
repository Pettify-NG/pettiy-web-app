import { FiShoppingCart } from 'react-icons/fi';
import { LuMail } from 'react-icons/lu';
import {
  MdWallpaper,
} from 'react-icons/md';
import { IoMdSettings } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";

export const links: ISidebarLink[] = [
  { name: 'home', icon: <IoMdHome />, page: '/admin' },
  { name: 'orders', icon: <FiShoppingCart />, page: '/admin/orders' },
  {
    name: 'listings',
    icon: <MdWallpaper />,
    page: '/admin/listings',
  },
  {
    name: 'customers',
    icon: <FaUsers />,
    page: '/admin/customers',
  },
  {
    name: 'users',
    icon: <FaUsers />,
    page: '/admin/users',
  },
  {
    name: 'merchants',
    icon: <FaUsersCog />,
    page: '/admin/merchants',
  },
  { name: 'notification', icon: <LuMail />, page: '/admin/dashboard/notifications' },
  // { name: 'settings', icon: <IoMdSettings />, page: '/admin/dashboard/settings' },
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
