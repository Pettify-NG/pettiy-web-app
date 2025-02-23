import Image from 'next/image';
import Link from 'next/link';

import authImage from '../../public/auth-image.png';
import logo from "../../public/1-resized.png";

interface Props {
  greetingText?: string;
  pageName?: string;
  altPage?: string;
  altPageText?: string;
  altPageUrl?: string;
  children: React.ReactNode;
}

export default function AuthLayout(props: Readonly<Props>) {
  const {
    greetingText = '',
    pageName = '',
    altPage = '',
    altPageText = '',
    altPageUrl = '',
    children,
  } = props;

  return (
    <>
      <div className='p-4 bg-white h-50px fixed w-full shadow-md'>
         <Link href='/'>
            <Image src={logo} alt='Urban Overstock Logo' className='w-[100px] h-[50px]' />
          </Link>
      </div>

      <div className='flex space-between gap-6 bg-white w-full px-10 py-6 bg-blue-200'>
        <div className='w-full w-1/2 rounded shadow-lg bg-white flex justify-center align-start flex-col border-red'>
            <p className='font-bold text-3xl mb-4 text-black'>
              {pageName}
            </p>
          {children}
        </div>

        <div className='w-1/2 h-[40rem] rounded shadow-lg relative p-4 border border-red-400'>
          <Image 
            src={authImage} 
            alt='Hero image' 
            fill
            className='object-cover rounded'
          />
        </div>
      </div>
    </>
  );
}