"use client";

import { motion } from "framer-motion";
import SearchResultBoxItem from "./SearchResultBoxItem";
import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

type PropType = {
  openSearchDropdown: boolean;
  setOpenSearchDropdown: Dispatch<SetStateAction<boolean>>;
};

export default function SearchResultBox({
  openSearchDropdown,
  setOpenSearchDropdown,
}: PropType) {
  const variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={openSearchDropdown ? "animate" : "initial"}
      transition={{ duration: 0.5 }}
      className="w-[33rem] p-4 bg-white border h-fit rounded absolute top-[3.2rem] right-0 shadow-md"
    >
      <X onClick={()=>setOpenSearchDropdown(false)} className="ml-auto mb-2 cursor-pointer"/>
      <div>
        <SearchResultBoxItem setOpenSearchDropdown={setOpenSearchDropdown} />
        <SearchResultBoxItem setOpenSearchDropdown={setOpenSearchDropdown} />
        <SearchResultBoxItem setOpenSearchDropdown={setOpenSearchDropdown} />
        <SearchResultBoxItem setOpenSearchDropdown={setOpenSearchDropdown} />
        <SearchResultBoxItem setOpenSearchDropdown={setOpenSearchDropdown} />
      </div>
    </motion.div>
  );
}
