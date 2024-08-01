"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TsidebarLink } from "./Sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type TSidebarProps = {
  link: TsidebarLink;
};

export default function SidebarLink({ link }: TSidebarProps) {
  const [showSubLinks, setShowSubLinks] = useState(false);

  const pathName = usePathname();
  const pathNameArr = pathName.split("/");

  const linkArr = link.href.split("/");

  console.log(linkArr);

  const subLinksVariants = {
    close: {
      height: 0,
      transition: { type: "tween" },
    },
    open: {
      height: 120,
      transition: { type: "tween" },
    },
  };

  return (
    <li>
      <Link
        onClick={() => setShowSubLinks((prev) => !prev)}
        href={link.href}
        className={cn(
          "flex items-center justify-between gap-2 py-3 px-4 rounded-md text-primary text-sm hover:translate-x-[5px] transition duration-500",
          pathNameArr[2] === linkArr[2] ? "bg-primary/5" : ""
        )}
      >
        <div className="flex items-center gap-2">
          <span>{link.icon}</span>
          <p className="font-semibold">{link.label}</p>
        </div>
        {link.subLinks && (
          <ChevronDown
            className={cn(
              "transition duration-500",
              showSubLinks ? "rotate-180 " : ""
            )}
          />
        )}
      </Link>
      {link.subLinks && (
        <motion.div
          variants={subLinksVariants}
          initial="close"
          animate={showSubLinks ? "open" : "close"}
          className={cn(
            "flex flex-col justify-center border-l-2 pl-3 ml-6 overflow-hidden transition duration-300",
            showSubLinks ? "mb-3" : "mb-0"
          )}
        >
          {link.subLinks.map((subLink, i) => {
            const sublinkArr = subLink.href.split("/");
            return (
              <Link
                className={cn(
                  "hover:translate-x-[5px] transition duration-500 py-2 px-4 rounded-md text-primary text-sm",
                  pathNameArr[2] === sublinkArr[2] ? "bg-primary/5" : ""
                )}
                key={i}
                href={subLink.href}
              >
                {subLink.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </li>
  );
}
