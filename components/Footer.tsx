import Link from "next/link";
import { RiTwitterXLine } from "react-icons/ri";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="contain text-primary">
      <hr />
      <div className="flex items-center justify-between text-sm py-6">
        <Logo />
        <div className="flex items-center">
          <Link href="https://x.com/IdrisRoti" className="mr-2">
            <RiTwitterXLine />
          </Link>{" "}
          <span>Built by Idris Roti</span>
        </div>
      </div>
    </footer>
  );
}