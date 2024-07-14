import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen overflow-y-hidden">
      <Link href="/store" className="px-4 py-2 rounded bg-black text-white">Store</Link>
    </div>
  );
}
