import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import runCronJob from "@/lib/cron/cronJob";
import { createClient } from "@/lib/supabase/server";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HIFASHION",
  description: "Ecommerce fashion store.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const supabase = createClient()
 const {data, error} = await supabase.from("products").select().eq("status", "scheduled")
 if(data?.length) runCronJob()

  return (
    <html lang="en">
      <body className={dmsans.className}>
        {children}
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
