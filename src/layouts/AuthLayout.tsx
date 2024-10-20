import Image from 'next/image';
import Link from 'next/link';

import authImage from '../../public/auth-image.png';
import logo from '../../public/Pettify.png';

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
    <div className='flex space-between '>
      <div className='p-4 bg-white flex flex-col gap-8 items-center md:px-8 xl:px-16 w-full pt-24'>
        <Link href='/'>
          <Image src={logo} alt='Urban Overstock Logo' className='block w-52' />
        </Link>
        <p className='font-bold text-4xl mb-8 text-center'>{pageName}</p>

        {children}

        {/* {altPage && altPageUrl && altPageText && (
          <p className='text-neutral'>
            {altPageText}{' '}
            <Link href={altPageUrl} className='font-semibold text-primary'>
              {altPage}
            </Link>
          </p>
        )} */}
      </div>

      <div className='relative hidden lg:block auth-image w-full h-full logo '>
        <Image src={authImage} alt='Hero image'  />
        {/* {greetingText && (
          <p className='pl-8 absolute bottom-8 left-8 text-primary font-bold text-5xl'>
            Hey <br />
            {greetingText}
          </p>
        )} */}
      </div>
      {/* <div className='relative hidden lg:block w-full h-full auth-image p-8 bg-gray-800'>
        {greetingText && (
          <p className='pl-8 absolute bottom-8 left-8 text-primary font-bold text-5xl'>
            Hey <br />
            {greetingText}
          </p>
        )}
      </div> */}
    </div>
  );
}