import { IoMdSettings } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { MdOutlinePets } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { FaWallet } from "react-icons/fa6";

export const sellerLinks: ISidebarLink[] = [
  { name: 'home', icon: <IoMdHome />, page: '/dashboard' },
  {
    name: 'pet listings',
    icon: <MdOutlinePets />,
    page: '/dashboard/pet-listings',
  },
  {
    name: 'customers',
    icon: <IoIosPeople />,
    page: '/dashboard/customers',
  },
  {
    name: 'orders',
    icon: <MdOutlinePets />,
    page: '/dashboard/orders',
  },
  // {
  //   name: 'payouts',
  //   icon: <GiReceiveMoney />,
  //   page: '/dashboard/payouts',
  // },
  {
    name: 'wallet',
    icon: <FaWallet />,
    page: '/dashboard/wallet',
  },
  {
    name: 'profile',
    icon: <IoMdPerson />,
    page: '/dashboard/profile',
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
