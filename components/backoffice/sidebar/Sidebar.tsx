"use client";
import { motion } from "framer-motion";
import { Grid, Grid2X2 } from "lucide-react";
import Link from "next/link";

type SideBarType = {
  showSideBar: boolean;
};

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
      className="h-screen w-80 bg-white box-shadow z-[990] fixed top-16 left-0 p-5"
    >
      <ul>
        {sideBarLinks.map((link, i) => (
          <li key={i}>
            <div className="flex items-center gap-2 bg-primary/5 mb-3 py-3 px-4 rounded-md text-primary">
              <span>{link.icon}</span>
              <Link href={link.href} className="font-semibold">{link.label}</Link>
            </div>
            {link.subLinks &&
              <div>
                {link.subLinks.map((subLink, i) => (
                <Link key={i} href={subLink.href}>
                  {subLink.label}
                </Link>
              ))}</div>}
          </li>
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
