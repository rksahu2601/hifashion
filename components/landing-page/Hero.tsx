import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="mt-16">
      <h1 className="text-3xl md:text-5xl lg:text-8xl w-screen font-medium mb-3 leading-3 lg:tracking-[20px] text-primary">EXPERIENCE EXCELLENCE</h1>
      <div className="w-screen h-[60vh] md:h-[80vh] relative overflow-hidden">
        <Image className="object-cover" src="/image9.jpg" alt="hero-image" fill />
      <p className="text-sm md:text-base text-white/80 absolute top-6 left-6 max-w-xl leading-wider">Elevate your style with our curated fashion collection, Explore now for the ultimate wardrobe collection</p>
      <Link className="px-3 py-2 border border-white/80 rounded-full text-white/80 absolute bottom-12 right-6" href="/store">Explore now</Link>
      </div>
    </div>
  );
}
