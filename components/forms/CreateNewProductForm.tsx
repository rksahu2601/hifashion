"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../backoffice/CustomInput";
import CustomTextarea from "../backoffice/CustomTextarea";
import CustomSelect from "../backoffice/CustomSelect";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "../Button";

const formSchema = z.object({
  productName: z.string().min(2, "minimum of 2 characters"),
  productDescription: z.string().min(2, "minimum of 2 characters"),
  category: z.string(),
  quantity: z.string(),
  sku: z.string(),
  price: z.string().min(2, "add a price"),
});

// export type FormType = z.infer<typeof formSchema>;

export default function CreateNewProductForm() {
  const [selectedColors, setSelectedColors] = useState<String[]>([]);

  const [variants, setVariants] = useState<String[]>([]);
  const [variant, setVariant] = useState("");
  const [showVariantInput, setShowVariantInput] = useState(false)

  const [imageUrls, setImageUrls] = useState<String[]>([]);

  const selectOptions = ["Bags", "Hoodies"];

  const ColorVariant = [
    {
      name: "White",
      value: "#FFFFFF",
    },
    {
      name: "Black",
      value: "#000000",
    },
  ];

  const selectColor = (colorValue: String) => {
    let addedcolors;
    const isAdded = selectedColors.some((item) => item === colorValue);
    isAdded
      ? (addedcolors = selectedColors.filter((item) => item !== colorValue))
      : (addedcolors = [...selectedColors, colorValue]);
    setSelectedColors(addedcolors);
  };

  const addVariant = () => {
    if(!variant) return
    setVariants((prev)=>[variant, ...prev])
    setVariant("")
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      category: "Hoodies",
      quantity: "1",
      sku: "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    data.availableColors = selectedColors;
    data.variants = variants;

    if(imageUrls.length < 1) {
      toast.error("Upload at least one image")
      return
    }
    data.images = imageUrls;
    console.log(data);
    reset();
    setSelectedColors([]);
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
              label="Product Name"
              placeholder="Name of the product..."
              name="productName"
              mutedLabel
              register={register}
              errors={errors}
            />
            <CustomTextarea
              label="Description"
              name="productDescription"
              placeholder="Product Description"
              mutedLabel
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Category</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <CustomSelect
              name="category"
              label="Category"
              options={selectOptions}
              mutedLabel
              register={register}
            />
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Inventory</h1>
          <div className="flex gap-4 border border-slate-300 p-4 rounded-md">
            <CustomInput
              label="Quantity"
              placeholder="In stock"
              name="quantity"
              mutedLabel
              register={register}
              errors={errors}
            />
            <CustomInput
              label="SKU(optional)"
              placeholder="sku"
              name="sku"
              mutedLabel
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Colors</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <div className="flex flex-col gap-2 items-start flex-1">
              <p className="font-semibold text-sm text-slate-500">
                Select Available Colors
              </p>
              <div className="flex flex-wrap gap-2 items-center mt-3">
                {ColorVariant.map((color) => {
                  const isSelected = selectedColors.some(
                    (item) => item === color.value
                  );
                  return (
                    <div
                      onClick={() => selectColor(color.value)}
                      key={color.name}
                      className={cn(
                        "w-16 py-2 border-2 hover:border-primary rounded grid place-items-center cursor-pointer",
                        isSelected ? "border-primary" : ""
                      )}
                    >
                      <p
                        className={cn(
                          "mb-2 text-sm",
                          isSelected ? "font-bold" : "font-medium"
                        )}
                      >
                        {color.name}
                      </p>
                      <div
                        style={{ backgroundColor: `${color.value}` }}
                        className="aspect-square w-6 rounded-full border border-gray-400"
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Variants</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium">Product Variant</p>
              <button onClick={()=>setShowVariantInput(prev=>!prev)} type="button"  className="text-primary text-sm flex gap-1 items-center font-semibold">
                <Plus className="w-4 h-4" /> <span>Add variants</span>
              </button>
            </div>
            {showVariantInput && <div className=" bg-white flex items-center gap-2">
              <input
              type="text"
              value={variant}
              onChange={(e)=>setVariant(e.target.value)}
                placeholder="e.g: 46, 47 for shoes or White XL for clothes..."
                className="w-full focus:outline-none h-9 hover:border-primary/40 hover:shadow-md border border-slate-300 rounded px-2"
              />
              <button disabled={!variant} onClick={addVariant} className="disabled:opacity-50 bg-primary rounded px-3 h-9 text-white" type="button">Add</button>
            </div>}
            <div className="flex flex-wrap gap-3">
              {variants.length > 0 && variants.map((item, i)=>{
                return(
                  <div key={i} className="flex item-center gap-2 bg-secondary/20 rounded-full px-3 py-1 mt-3" >
                    <button onClick={()=>setVariants(prev=>prev.filter(variant=>variant!==item))} type="button"><X className="w-4 h-4" /></button>
                    <span className="text-secondary/60 font-semibold text-xs capitalize">{item}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
      <div className="flex-1">
        <section className="w-full">
        <h1 className="text-xl font-semibold mb-4">Product Images</h1>
          <div className={cn("border border-slate-300 p-4 rounded-md gap-3 mb-3 items-center grid-cols-6", imageUrls.length > 0 ? "xl:grid" : "")}>
          {imageUrls.length < 4 && (
            <UploadDropzone
                className={cn("dropzone product text-xs h-full mb-3 xl:mb-0", imageUrls.length < 3 ? "col-span-3" : "col-span-2")}
                endpoint="productImagesUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res[0].url);
                  if(res[0].url) setImageUrls(prev => [res[0].url, ...prev])
                    else toast.error("Something went wrong!")
                }}
                onUploadError={(error: Error) => {
                  console.log(error.message)
                  toast.error("An error occured!")
              }}
            />)}
            <div className={cn(" grid grid-cols-2 gap-3 grid-rows-2", imageUrls.length === 4 ? "col-span-full" : imageUrls.length < 3 ? "col-span-3" : "col-span-4", imageUrls.length > 0 && "h-[14rem] xl:h-[14rem]")}>
              {imageUrls.map((url, i)=>{
                return (
                  <div key={i} className={cn("relative rounded-md overflow-hidden", imageUrls.length === 3 ? "first:row-span-2" : imageUrls.length === 4 ? "row-span-1" : imageUrls.length === 2 ? "row-span-1 col-span-3" : "row-span-full col-span-full")}>
                    <Image className="object-cover" src={url as string} fill alt="" />
                    <div className="group opacity-0 hover:opacity-100 absolute inset-0 bg-slate-900 bg-opacity-50 grid place-items-center"><button type="button" onClick={()=>setImageUrls(prev=>prev.filter(item=>item!==url))} className="bg-white shadow text-sm p-1 rounded-sm font-medium translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">Remove</button></div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Shipping and Delivery</h1>
          <div className=" border border-slate-300 p-4 rounded-md">
            <CustomTextarea
              label="Free delivery(optional)"
              name="freeDelivery"
              placeholder="eg: Free delievery to Ikeja, abuja etc..."
              mutedLabel
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Pricing</h1>
          <div className=" border border-slate-300 p-4 rounded-md">
            <CustomInput
              label="Price"
              placeholder="eg:2000"
              name="price"
              mutedLabel
              isPrice
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <div className="w-full flex"><Button label="Add Product" solid className="border rounded bg-secondary border-none px-3 py-2 mt-4 ml-auto"/></div>
      </div>
    </form>
  );
}