import Link from "next/link";
import Button from "../Button";
import Image from "next/image";

export default function SummerSale() {
  return (
    <section className="contain mt-20 mb-10 h-[30rem] sm:h-[20rem] flex flex-col items-center sm:flex-row">
        <div className="relative h-full w-full">
            <Image
                className="object-top object-cover"
                src="/image12.jpg"
                alt="women image"
                fill
            />
        </div>
        <div className="w-full h-full flex flex-col justify-center bg-primary text-white p-4">
            <h3 className="text-xs font-semibold opacity-80">LIMITED OFFER</h3>
            <p className="text-2xl md:text-3xl font-bold mt-3 mb-8 capitalize">Summer sale - Up to 50% <br />off all products</p>
            <Link href="/store">
                <Button 
                label="SHOP NOW"
                className="rounded-none bg-white text-primary border-none text-xs font-bold px-6"
                />
            </Link>
        </div>
    </section>
  )
}
