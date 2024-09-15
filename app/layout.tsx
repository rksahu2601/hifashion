import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HIFASHION",
  description: "Ecommerce fashion store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmsans.className}>
        {children}
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
