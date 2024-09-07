"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { FaStar } from "react-icons/fa";

type TCustomStarRating = {
  starColor?: string;
  rating?: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  readonly?: boolean;
  className?: string;
};

export default function CustomStarRating({
  starColor = "#FFA500",
  rating,
  setRating,
  readonly=false,
  className,
}: TCustomStarRating) {
  const [hovered, setHovered] = useState<number>(0);

  return (
    <>
      {setRating && (
        <div className={cn("flex", className)}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            
            return (
              <label key={index}>
                <input
                  type="radio"
                  className="hidden"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  color={starValue <= (hovered || rating || 0) ? starColor : "#D3D3D3"}
                  onMouseEnter={() => {
                    setHovered(starValue);
                  }}
                  onMouseLeave={() => {
                    setHovered(0);
                  }}
                  className={cn("w-5 h-5 cursor-pointer")}
                />
              </label>
            );
          })}
        </div>
      )}
      {readonly && (
        <div className={cn("flex", className)}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;

            return (
              <FaStar
                color={starValue <= (rating || 0) ? starColor : "#D3D3D3"}
                key={index}
                className={cn("w-5 h-5")}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
