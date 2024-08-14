"use client";

import { deleteImage } from "@/actions/uploadThingActions";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

type PropType = {
  imageUrls: String[];
  setImageUrls: Dispatch<SetStateAction<String[]>>;
};

export default function ProductImages({ imageUrls, setImageUrls }: PropType) {
  const removeImage = async (url: String) => {
    setImageUrls((prev) => prev.filter((item) => item !== url));
    const key = url.split("/")[4]
    await deleteImage(key)
  };

  return (
    <section className="w-full">
      <h1 className="text-xl font-semibold mb-4">Product Images</h1>
      <div
        className={cn(
          "border border-slate-300 p-4 rounded-md gap-3 mb-3 items-center grid-cols-6",
          imageUrls.length > 0 ? "xl:grid" : ""
        )}
      >
        {imageUrls.length < 4 && (
          <UploadDropzone
            className={cn(
              "dropzone product text-xs h-full mb-3 xl:mb-0",
              imageUrls.length < 3 ? "col-span-3" : "col-span-2"
            )}
            endpoint="productImagesUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res[0]);
              if (res[0].url) setImageUrls((prev) => [res[0].url, ...prev]);
              else toast.error("Something went wrong!");
            }}
            onUploadError={(error: Error) => {
              console.log(error.message);
              toast.error("An error occured!");
            }}
          />
        )}
        <div
          className={cn(
            " grid grid-cols-2 gap-3 grid-rows-2",
            imageUrls.length === 4
              ? "col-span-full"
              : imageUrls.length < 3
              ? "col-span-3"
              : "col-span-4",
            imageUrls.length > 0 && "h-[14rem] xl:h-[14rem]"
          )}
        >
          {imageUrls.map((url, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "relative rounded-md overflow-hidden",
                  imageUrls.length === 3
                    ? "first:row-span-2"
                    : imageUrls.length === 4
                    ? "row-span-1"
                    : imageUrls.length === 2
                    ? "row-span-1 col-span-3"
                    : "row-span-full col-span-full"
                )}
              >
                <Image
                  className="object-cover"
                  src={url as string}
                  fill
                  alt=""
                />
                <div className="group opacity-0 hover:opacity-100 absolute inset-0 bg-slate-900 bg-opacity-50 grid place-items-center transition-smooth">
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="bg-white shadow text-sm p-1 rounded-sm font-medium translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
