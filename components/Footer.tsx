import Link from "next/link";
import { RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="contain text-primary">
      <hr />
      <div className="flex items-center justify-between text-sm py-6">
        <Link href="/">
          <div className="flex items-center">
            <span className="uppercase">Logo</span>
          </div>
        </Link>
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