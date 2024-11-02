import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";

import ClientProvider from "@/components/ClientProvider";

const inter = DM_Sans({ subsets: ["latin"] });
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pettify",
  description: "Pettify Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
