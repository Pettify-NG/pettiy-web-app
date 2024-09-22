import { IoMdSettings } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { MdOutlinePets } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

export const sellerLinks: ISidebarLink[] = [
  { name: 'home', icon: <IoMdHome />, page: '/dashboard/seller' },
  {
    name: 'pet listings',
    icon: <MdOutlinePets />,
    page: '/dashboard/seller/listings',
  },
  {
    name: 'payout',
    icon: <GiReceiveMoney />,
    page: '/dashboard/seller/payout',
  },
  {
    name: 'profile',
    icon: <IoMdPerson />,
    page: '/dashboard/seller/profile',
  },
  { name: 'settings', icon: <IoMdSettings />, page: '/admin/dashboard/settings' },
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
