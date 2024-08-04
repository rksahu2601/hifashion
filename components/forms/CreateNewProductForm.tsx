"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../backoffice/CustomInput";
import CustomTextarea from "../backoffice/CustomTextarea";
import CustomSelect from "../backoffice/CustomSelect";

const formSchema = z.object({
  productName: z.string().min(2, "minimum of 2 characters"),
  productDescription: z.string().min(2, "minimum of 2 characters"),
  category: z.string(),
  quantity: z.string(),
  sku: z.string(),
});

// export type FormType = z.infer<typeof formSchema>;

export default function CreateNewProductForm() {
  const selectOptions = ["Bags", "Hoodies"];

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
    console.log(data);
    reset()
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
          <h1 className="text-xl font-semibold mb-4">Variants</h1>
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
          <h1 className="text-xl font-semibold mb-4">Inventory</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <div className="flex flex-col gap-2 items-start flex-1">
              <p className="font-semibold text-sm text-slate-500">
                Available Colors
              </p>
              <div className="flex gap-1 items-center mt-3">
                <div className="w-7 aspect-square border-2 border-transparent hover:border-gray-300 rounded-full grid place-items-center cursor-pointer">
                  <div className="aspect-square w-5 bg-red-600 rounded-full border border-gray-400"></div>
                </div>
                <div className="w-7 aspect-square border-2 border-transparent hover:border-gray-300 rounded-full grid place-items-center cursor-pointer">
                  <div className="aspect-square w-5 bg-blue-600 rounded-full border border-gray-400"></div>
                </div>
                <div className="w-7 aspect-square border-2 border-transparent hover:border-gray-300 rounded-full grid place-items-center cursor-pointer">
                  <div className="aspect-square w-5 bg-yellow-400 rounded-full border border-gray-400"></div>
                </div>
                <div className="w-7 aspect-square  border-2 hover:border-gray-300 border-gray-400 rounded-full grid place-items-center cursor-pointer">
                  <div className="aspect-square w-5 bg-white rounded-full border border-gray-400"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start flex-1 mt-4">
              <p className="font-semibold text-sm text-slate-500">
                Available Sizes
              </p>
              <div className="flex gap-1 items-center mt-3">
                <div className="w-12 h-12 border rounded grid place-items-center">
                  S
                </div>
                <div className="w-12 h-12 border rounded grid place-items-center">
                  L
                </div>
                <div className="w-12 h-12 border rounded grid place-items-center">
                  XL
                </div>
                <div className="w-12 h-12 border rounded grid place-items-center">
                  2XL
                </div>
                <div className="w-12 h-12 border rounded grid place-items-center">
                  3XL
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex-1 ">
        <button className="border rounded px-3 py-2">Submit</button>
      </div>
    </form>
  );
}
