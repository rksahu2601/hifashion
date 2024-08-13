"use client";

import CustomInput from "../backoffice/CustomInput";
import { FieldValues, useForm } from "react-hook-form";
import CustomTextarea from "../backoffice/CustomTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import toast from "react-hot-toast";
import { createCategory } from "@/actions/categoryActions";

const formSchema = z.object({
  categoryName: z.string().min(2, "minimum of 2 characters"),
  categoryDescription: z.string(),
});

export type CatFormType = z.infer<typeof formSchema>;

export default function CreateNewCategoryForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryDescription: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    if (!imageUrl) {
      toast.error("Add a category image.");
      return;
    }
    data.categoryImage = imageUrl;
    console.log(data);
    // const parsedData = formSchema.parse(data);
    try {
      setLoading(true);
      await createCategory(data);
      toast.success("Category created succesfully!.");
      setLoading(false);
      reset();
      setImageUrl("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-6"
    >
      <div className="flex-1">
        <section className="w-full">
          <h1 className="text-xl font-semibold mb-4">Description</h1>
          <div className=" border border-slate-300 p-4 rounded-md">
            <CustomInput
              label="Category Name"
              placeholder="Name of the product..."
              name="categoryName"
              mutedLabel
              register={register}
              errors={errors}
            />
            <CustomTextarea
              label="Description"
              name="categoryDescription"
              placeholder="Category Description"
              mutedLabel
              register={register}
              errors={errors}
            />
          </div>
        </section>
      </div>
      <div className="flex-1 ">
        <h1 className="text-xl font-semibold mb-4">Category Image</h1>
        {imageUrl ? (
          <div className="rounded-lg overflow-hidden relative">
            <Image
              src={imageUrl}
              width={500}
              height={500}
              className=""
              alt="category image"
            />
            <button
              onClick={() => setImageUrl("")}
              className="bg-white text-xs rounded py-1 px-2 font-semibold transition duration-50 absolute top-2 right-2 text-black hover:opacity-65"
              type="button"
            >
              Remove
            </button>
          </div>
        ) : (
          <UploadDropzone
            className="dropzone"
            endpoint="categoryImageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res[0]);
              if (res[0].url) setImageUrl(res[0].url);
              else toast.error("Something went wrong!");
            }}
            onUploadError={(error: Error) => {
              console.log(error.message);
              toast.error("An error occured!");
            }}
          />
        )}
        <div className="w-full flex">
          <Button
            loading={loading}
            disabled={loading}
            label={loading ? "Please wait..." : "Create Category"}
            solid
            className="border rounded bg-secondary border-none px-3 py-2 mt-4 ml-auto"
          />
          {/* <button type="submit" className="border rounded bg-secondary border-none px-3 py-2 mt-4 ml-auto">{loading ? "Please wait..." : "Create Category"}</button> */}
        </div>
      </div>
    </form>
  );
}
