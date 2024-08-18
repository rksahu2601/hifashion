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
import { createProduct, editProduct } from "@/actions/productActions";
import { TCategory, TProducts } from "@/types/supabaseTypes";
import { useRouter } from "next/navigation";
import { ColorVariant } from "../constants";

const formSchema = z.object({
  productName: z.string().min(2, "minimum of 2 characters"),
  productDescription: z.string().min(2, "minimum of 2 characters"),
  category: z.string(),
  gender: z.string(),
  quantity: z.string(),
  deliveryInfo: z.string(),
  sku: z.string(),
  price: z.string().min(2, "please add a price"),
});

// export type FormType = z.infer<typeof formSchema>

type PropType = {
  categories: TCategory[] | null;
  product?: TProducts | null;
};

export default function EditProductForm({ categories, product }: PropType) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedColor, setSelectedColor] = useState<String>(
    product?.color || ""
  );

  const [variants, setVariants] = useState<String[]>(product?.variants || []);
  const [variant, setVariant] = useState("");
  const [showVariantInput, setShowVariantInput] = useState(false);

  const [imageUrls, setImageUrls] = useState<String[]>(product?.images || []);

  const categorySelectOptions = categories
    ? categories.map((cat) => cat.name)
    : [];
  const genderOptions = ["male", "female", "both"];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product?.name || "",
      productDescription: product?.description || "",
      category: product?.category || "",
      gender: product?.gender || "male",
      quantity: product?.quantity || "1",
      deliveryInfo: product?.deliveryInfo || "",
      price: product?.price || "",
      sku: product?.sku || "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    data.color = selectedColor;
    data.variants = variants;

    if (imageUrls.length < 1) {
      toast.error("Upload at least one image");
      return;
    }
    data.images = imageUrls;

    const categorySlug = categories?.find(
      (cat) => cat.name === data.category
    )?.slug;
    if (categorySlug) data.categorySlug = categorySlug;

    if (product) data.productId = product.id;
    console.log(data);

    if (product) {
      console.log("edit")
      try {
        setLoading(true);
        await editProduct(data);
        setLoading(false);
        reset();
        setImageUrls([]);
        setVariants([]);
        setSelectedColor("");
        toast.success("Product edited succesfully!.");
        router.push("/dashboard/products");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong");
      }
    } else {
      console.log("create")
      try {
        setLoading(true);
        await createProduct(data);
        setLoading(false);
        reset();
        setImageUrls([]);
        setVariants([]);
        setSelectedColor("");
        toast.success("Product created succesfully!.");
        router.push("/dashboard/products");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong");
      }
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
              options={categorySelectOptions}
              mutedLabel
              register={register}
            />
            <CustomSelect
              name="gender"
              label="Gender"
              options={genderOptions}
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
                Select Available Color
              </p>
              <div className="flex flex-wrap justify-center gap-2 items-center mt-3">
                {ColorVariant.map((color) => {
                  const isSelected = selectedColor === color.value;
                  return (
                    <div
                      onClick={() =>
                        setSelectedColor((prev) =>
                          color.value === prev ? "" : color.value
                        )
                      }
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
              name="deliveryInfo"
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
          {product ? (
            <Button
              loading={loading}
              disabled={loading}
              label={loading ? "Please wait..." : "Edit Product"}
              solid
              className="border rounded bg-secondary border-none px-3 py-2 mt-4 ml-auto"
            />
          ) : (
            <Button
              loading={loading}
              disabled={loading}
              label={loading ? "Please wait..." : "Add Product"}
              solid
              className="border rounded bg-secondary border-none px-3 py-2 mt-4 ml-auto"
            />
          )}
        </div>
      </div>
    </form>
  );
}
