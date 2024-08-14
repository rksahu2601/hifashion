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
import { generateSlug } from "@/lib/genSlug";
import { deleteImage } from "@/actions/uploadThingActions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  categoryName: z.string().min(2, "minimum of 2 characters"),
  categoryDescription: z.string(),
});

export type CatFormType = z.infer<typeof formSchema>;

export default function CreateNewCategoryForm() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const removeImage = async (url: String) => {
    setImageUrl("");
    const key = url.split("/")[4]
    await deleteImage(key)
  };

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
    data.slug = generateSlug(data.categoryName)
    console.log(data);
    const parsedData = formSchema.parse(data);
    try {
      setLoading(true);
      await createCategory(data);
      toast.success("Category created succesfully!.");
      setLoading(false);
      reset();
      setImageUrl("");
      router.push("/dashboard/categories")
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
            <div className="group opacity-0 hover:opacity-100 absolute inset-0 bg-slate-900 bg-opacity-50 grid place-items-center transition-smooth">
                  <button
                    type="button"
                    onClick={() => removeImage(imageUrl)}
                    className="bg-white shadow text-sm p-1 rounded-sm font-medium translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth"
                  >
                    Remove
                  </button>
          </div>
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
        </div>
      </div>
    </form>
  );
}
