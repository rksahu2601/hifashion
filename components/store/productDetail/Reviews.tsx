"use client"

import ReactStars from 'react-stars'
import Image from "next/image";
import React, { useState } from "react";

export default function Reviews() {
  const [rating, setRating]=useState<number>()
  const [comment, setComment]=useState("")
  const handleRating = (rat: number)=>{
    setRating(rat)
  }

  const handleReview =()=>{
    const review ={rating, comment}
    if(rating && comment){
      console.log("Review", review);
    }
  }

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-4 md:mb-6">Reviews & Ratings</h1>
      <div className="flex flex-col gap-3">
        <div className="border border-slate-200 p-2 rounded-md flex items-start justify-between">
          <article className="flex items-center gap-2 max-w-[80%]">
            <Image
              src="/test1.jpg"
              width={500}
              height={500}
              alt="user image"
              className="w-8 aspect-square rounded-full object-cover"
            />
            <div>
              <h2 className="font-medium ">Kathryn Murphy</h2>
              <p className="text-slate-600 text-sm ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad perspiciatis laboriosam provident voluptates nostrum sequi velit, minus expedita. Enim, harum.
              </p>
            </div>
          </article>
          <p className="text-xs text-slate-500">1 week ago</p>
        </div>
        <div className="border border-slate-200 p-2 rounded-md flex items-start justify-between">
          <article className="flex items-center gap-2 max-w-[80%]">
            <Image
              src="/test1.jpg"
              width={500}
              height={500}
              alt="user image"
              className="w-8 aspect-square rounded-full object-cover"
            />
            <div>
              <h2 className="font-medium ">Kathryn Murphy</h2>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis sequi ipsa perspiciatis, minus accusamus eligendi id ut quidem voluptatem quae cumque asperiores error dolorum reprehenderit dignissimos dolores expedita nostrum assumenda!
              </p>
            </div>
          </article>
          <p className="text-xs text-slate-500">1 week ago</p>
        </div>
        <div className="border border-slate-200 p-2 rounded-md flex items-start justify-between">
          <article className="flex items-center gap-2 max-w-[80%]">
            <Image
              src="/test1.jpg"
              width={500}
              height={500}
              alt="user image"
              className="w-8 aspect-square rounded-full object-cover"
            />
            <div>
              <h2 className="font-medium ">Kathryn Murphy</h2>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, velit.
              </p>
            </div>
          </article>
          <p className="text-xs text-slate-500">1 week ago</p>
        </div>
        <div className="border border-slate-200 p-2 rounded-md flex items-start justify-between">
          <article className="flex items-center gap-2 max-w-[80%]">
            <Image
              src="/test1.jpg"
              width={500}
              height={500}
              alt="user image"
              className="w-8 aspect-square rounded-full object-cover"
            />
            <div>
              <h2 className="font-medium ">Kathryn Murphy</h2>
              <p className="text-slate-600 text-sm">
                I recently purchased and its really nice.
              </p>
            </div>
          </article>
          <p className="text-xs text-slate-500">1 week ago</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start flex-1 mt-6">
      <h1 className="font-semibold mb-2  text-lg">Add a review</h1>
      <div className="mb-6">
        <h2 className="font-medium mb-3">Tap to add a rating</h2>
        <ReactStars
          count={5}
          onChange={handleRating}
          size={24}
          color2={'#ffd700'} />
      </div>
        <div className="w-full">
          <textarea
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          placeholder="Say something about this product..."
          className="w-full md:w-[80%] border border-slate-300 p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm"
        />
        <button disabled={!comment && !rating} onClick={handleReview} className="bg-[#1e1e1e] disabled:opacity-50 disabled:cursor-not-allowed  w-[6rem] border-none text-sm px-3 text-white py-1.5 rounded-md block mt-3">Send</button>
        </div>
      </div>
    </div>
  );
}
