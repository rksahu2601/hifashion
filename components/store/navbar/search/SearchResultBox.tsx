import { motion } from "framer-motion";
import SearchResultBoxItem from "./SearchResultBoxItem";

type PropType = {
  openSearchDropdown: boolean;
};

export default function SearchResultBox({ openSearchDropdown }: PropType) {
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
      <SearchResultBoxItem />
      <SearchResultBoxItem />
      <SearchResultBoxItem />
      <SearchResultBoxItem />
      <SearchResultBoxItem />
    </motion.div>
  );
}
