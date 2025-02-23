'use client';
// import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';
// import '@uppy/webcam/dist/style.min.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import '../app/globals.css'

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   AOS.init();
  //   // AOS.init({
  //   //   once: true,
  //   // });
  // }, []);

  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
