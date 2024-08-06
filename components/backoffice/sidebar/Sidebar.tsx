"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BadgePlus, ChevronDown, Grid, Grid2X2, ListIcon, ShoppingBasket, User, Variable } from "lucide-react";
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
    icon: <ShoppingBasket />,
  },
  {
    label: "Categories",
    subLinks: null,
    href: "/dashboard/categories",
    icon: <ListIcon />,
  },
  {
    label: "Custormers",
    subLinks: null,
    href: "/dashboard/categories",
    icon: <User />,
  },
  {
    label: "Coupons",
    subLinks: null,
    href: "/dashboard/categories",
    icon: <BadgePlus />,
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
