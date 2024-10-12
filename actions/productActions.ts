"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";
import { getUserSession } from "@/lib/getSession";
import { FieldValues } from "react-hook-form";
import { TProducts } from "@/types/supabaseTypes";
import { deleteImage } from "./uploadThingActions";
import { cache } from "react";

type DataType =
  | {
      productId?: string;
      productName: string;
      productDescription: string;
      category: string;
      quantity: string;
      sku: string;
      price: string;
      color: string;
      status: "active" | "draft" | "scheduled";
      scheduleDate?: Date | null;
      categorySlug: string;
      deliveryInfo: string;
      gender: string;
      variants: string[];
      images: string[];
    }
  | FieldValues;

export async function createProduct(data: DataType) {
  const supabase = createClient();

  const user = await getUserSession();
  if (!user || user.role !== "admin") {
    throw new Error("Unathorized Access!");
  }

  try {
    const { error } = await supabase.from("products").insert({
      name: data.productName,
      description: data.productDescription,
      images: data.images,
      category: data.category,
      quantity: data.quantity,
      sku: data.sku,
      price: data.price,
      color: data.color,
      status: data.status,
      variants: data.variants,
      categorySlug: data.categorySlug,
      gender: data.gender,
      deliveryInfo: data.deliveryInfo,
      scheduleDate: data.scheduleDate,
    });
    if (error) {
      console.log("Product error", error);
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/store");
}

export async function editProduct(data: DataType) {
  const supabase = createClient();

  const user = await getUserSession();
  if (!user || user.role !== "admin") {
    throw new Error("Unathorized Access!");
  }

  try {
    const { error } = await supabase
      .from("products")
      .update({
        name: data.productName,
        description: data.productDescription,
        images: data.images,
        category: data.category,
        quantity: data.quantity,
        sku: data.sku,
        price: data.price,
        color: data.color,
        status: data.status,
        variants: data.variants,
        categorySlug: data.categorySlug,
        gender: data.gender,
        deliveryInfo: data.deliveryInfo,
        ...(data.status !== "scheduled" && { scheduleDate: null }),
      })
      .eq("id", data.productId);
    if (error) {
      console.log("Product edit error", error);
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/store");
}

export async function deleteProduct(data: TProducts) {
  const supabase = createClient();

  const user = await getUserSession();
  console.log("User", user);
  if (!user || user.role !== "admin") {
    throw new Error("Unathorized Access!");
  }

  try {
    const res = await supabase.from("products").delete().eq("id", data.id);

    if (res.status === 204) {
      data.images.map(async (image: string) => {
        await deleteImage(image.split("/")[4]);
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/store");
}

// export async function setProductAsDraft(id: number) {
//   const supabase = createClient();

//   const user = await getUserSession();
//   if (!user || user.role !== "admin") {
//     throw new Error("Unathorized Access!");
//   }

//   try {
//     const { error } = await supabase
//       .from("products")
//       .update({ status: "draft" })
//       .eq("id", id);
//     if (error) {
//       console.log("Product to draft error", error);
//       return {
//         success: false,
//       };
//     }
//     revalidatePath("/dashboard/products");
//     revalidatePath("/store");

//     return {
//       success: true,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//     };
//   }
// }

export async function setScheduledProductAsActive() {
  const supabase = createClient();

  try {
    const { error, data:scheduledProducts } = await supabase
      .from("products")
      .select()
      .eq("status", "scheduled")
      .lte("scheduleDate", new Date().toISOString());
    if (error) {
      console.log("Product to active error", error);
      return 
    }

    if(scheduledProducts.length){
       const promise = scheduledProducts.map((product)=>{
        console.log("setting producs to active");
        
        return supabase.from("products").update({status:"active", scheduleDate: null}).eq("id", product.id)
       })

       await Promise.all(promise)
    }
  } catch (error) {
    console.log(error);
  }
}
