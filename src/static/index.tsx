import { IoMdSettings } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { MdOutlinePets } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

export const sellerLinks: ISidebarLink[] = [
  { name: 'home', icon: <IoMdHome />, page: '/dashboard' },
  {
    name: 'pet listings',
    icon: <MdOutlinePets />,
    page: '/dashboard/pet-listings',
  },
  {
    name: 'payout',
    icon: <GiReceiveMoney />,
    page: '/dashboard/payouts',
  },
  {
    name: 'profile',
    icon: <IoMdPerson />,
    page: '/dashboard/profile',
  },
  { name: 'settings', icon: <IoMdSettings />, page: '/dashboard/settings' },
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
