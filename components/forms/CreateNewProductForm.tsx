"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../backoffice/CustomInput";
import CustomTextarea from "../backoffice/CustomTextarea";
import CustomSelect from "../backoffice/CustomSelect";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Button from "../Button";
import ProductVariants from "./../backoffice/products/ProductVariants";
import ProductImages from "../backoffice/products/ProductImages";

const formSchema = z.object({
  productName: z.string().min(2, "minimum of 2 characters"),
  productDescription: z.string().min(2, "minimum of 2 characters"),
  category: z.string(),
  quantity: z.string(),
  sku: z.string(),
  price: z.string().min(2, "please add a price"),
});

// export type FormType = z.infer<typeof formSchema>;

export default function CreateNewProductForm() {
  const [selectedColors, setSelectedColors] = useState<String[]>([]);

  const [variants, setVariants] = useState<String[]>([]);
  const [variant, setVariant] = useState("");
  const [showVariantInput, setShowVariantInput] = useState(false);

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
    {
      name: "Red",
      value: "#FF0000",
    },
    {
      name: "Blue",
      value: "#0000FF",
    },
    {
      name: "Yellow",
      value: "#FFFF00",
    },
    {
      name: "Gray",
      value: "#808080",
    },
    {
      name: "Green",
      value: "#008000",
    },
    {
      name: "Purple",
      value: "#800080",
    },
    {
      name: "Navy",
      value: "#000080",
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

    if (imageUrls.length < 1) {
      toast.error("Upload at least one image");
      return;
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
              <div className="flex flex-wrap justify-center gap-2 items-center mt-3">
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
        <ProductVariants
          variant={variant}
          setVariant={setVariant}
          variants={variants}
          setVariants={setVariants}
          showVariantInput={showVariantInput}
          setShowVariantInput={setShowVariantInput}
        />
      </div>
      <div className="flex-1">
        <ProductImages imageUrls={imageUrls} setImageUrls={setImageUrls} />
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
        <div className="w-full flex">
          <Button
            label="Add Product"
            solid
            className="border rounded bg-secondary border-none px-3 py-2 mt-4 ml-auto"
          />
        </div>
      </div>
    </form>
  );
}
