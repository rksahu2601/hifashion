"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, Grid, Grid2X2 } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import SidebarLinks from "./SidebarLink";
import SidebarLink from "./SidebarLink";


type SideBarType = {
  showSideBar: boolean;
};

export type TsidebarLink ={
  label: string;
  href: string;
  icon: ReactElement;
  subLinks: {
    label: string;
    href: string;
  }[] | null;
}

const sideBarLinks = [
  {
    label: "Overview",
    subLinks: null,
    href: "/dashboard/overview",
    icon: <Grid2X2 />,
  },
  {
    label: "My Shop",
    subLinks: [
      {
        label: "Products",
        href: "/dashboard/products",
      },
      {
        label: "Orders",
        href: "/dashboard/orders",
      },
      {
        label: "Customers",
        href: "/dashboard/customers",
      },
    ],
    href: "#",
    icon: <Grid />,
  },
  {
    label: "Categories",
    subLinks: null,
    href: "/dashboard/categories",
    icon: <Grid />,
  },
];

export default function Sidebar({ showSideBar }: SideBarType) {

  const variants = {
    close: {
      x: "-100%",
      transition: { type: "tween" },
    },
    open: {
      x: 0,
      transition: { type: "tween" },
    },
  };

  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate={showSideBar ? "open" : "close"}
      className="h-screen w-80 bg-white border-r z-[990] fixed top-16 left-0 p-5"
    >
      <ul>
        {sideBarLinks.map((link, i) => (
          <SidebarLink key={i} link={link} />
        ))}
      </ul>
    </motion.nav>
  );
}

// {
//   sideBarLinks.map((link, i)=>(
//     <div key={i}>
//       {link.icon}
//       <Link href={link.href}>{link.label}</Link>
//       {link.subLinks && link.subLinks.map((subLink, i)=>(
//         <Link key={i} href={subLink.href}>{subLink.label}</Link>
//       ))}
//     </div>
//   ))
// }
