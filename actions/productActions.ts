"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";
import { getUserSession } from "@/lib/getSession";
import { FieldValues } from "react-hook-form";

type DataType = {
  productName: string;
  productDescription: string;
  category: string;
  quantity: string;
  sku: string;
  price: string;
  color: string;
  categorySlug: string;
  deliveryInfo: string;
  gender: string;
  variants: string[];
  images: string[];
} | FieldValues;

export async function createProduct(data: DataType) {
  const supabase = createClient();

  const user = await getUserSession();
  if (!user || user.role !== "admin") {
    throw new Error("Unathorized Access!");
  }

  try {
    const { error } = await supabase
      .from("products")
      .insert({
        name: data.productName,
        description: data.productDescription,
        images: data.images,
        category: data.category,
        quantity: data.quantity,
        sku: data.sku,
        price:data.price,
        color: data.color,
        variants: data.variants,
        categorySlug: data.categorySlug,
        gender: data.gender,
        deliveryInfo: data.deliveryInfo
      });
    if (error) {
      console.log("Product error", error);
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/products");
}
