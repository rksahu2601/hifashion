"use client";

import Image from "next/image";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomStarRating from "@/components/custom-star-rating";
import toast from "react-hot-toast";
import { CreateReview } from "@/actions/reviewActions";
import { TReviews } from "@/types/supabaseTypes";
import Button from "@/components/Button";
import { getTimeAgo } from "@/lib/getTimeAgo";

export default function Reviews({
  productId,
  reviews,
  hasBoughtProduct,
}: {
  productId: number;
  reviews: TReviews[] | null;
  hasBoughtProduct: boolean | null;
}) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = () => {
    if (!rating) {
      toast.error("Please add a rating");
      return
    }
    if (!comment) {
      toast.error("Please add a comment");
      return
    }
    setLoading(true)
    CreateReview({ rating, comment, productId })
      .then((res) => {
        return res;
      })
      .then((data) => {
        if (data.success) {
          toast.success("Review added");
          setLoading(false)
        }
        if (data.error) {
          toast.error(data.error);
          setLoading(false)
        }
      }).finally(()=>{
        setLoading(false)
      })
    console.log("Review", rating, comment, productId);
  }

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-4 md:mb-6">Reviews & Ratings</h1>
      <div className="flex flex-col gap-3">
        {reviews?.length ? (
          reviews.map((review, i) => (
            <div
              key={i}
              className="border border-slate-200 p-2 rounded-md flex items-start justify-between"
            >
              
              <article className="flex items-center gap-2 max-w-[80%]">
                <Image
                  src={review.userImage || "/profile.png"}
                  width={500}
                  height={500}
                  alt="user image"
                  className="w-8 aspect-square rounded-full object-cover"
                />
                <div>
                  <h2 className="font-medium ">{review.username}</h2>
                  <p className="text-slate-600 text-sm ">{review.comment}</p>
                </div>
              </article>
              <div>
              <CustomStarRating className="my-2" small rating={review.rating as number} readonly />
              <p className="text-xs text-slate-500">{getTimeAgo(review.created_at)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>This product has no review yet.</p>
        )}
      </div>
      {
        hasBoughtProduct ? (
          <Dialog >
        <DialogTrigger className="mt-3" asChild>
          <button className="font-medium text-lg border-b">Add a review</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What do you think about this product ?</DialogTitle>
            <DialogDescription>
              Select a rating and leave a comment.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 items-start flex-1 mt-3">
            <CustomStarRating
              rating={rating}
              setRating={setRating}
              className="mb-3"
            />
            <div className="w-full">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Say something about this product..."
                className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:border-secondary placeholder:text-sm"
              />
              <Button loading={loading} onClick={handleReview} className="min-w-[6rem] mt-3" solid label={loading ? "Submitting" : "Submit"} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
        ) : (
          <p className="text-sm mt-2 text-gray-600">You need to purchase this product to be able to give a review.</p>
        )
      }
    </div>
  );
}
