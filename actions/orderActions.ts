"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";
import { getUserSession } from "@/lib/getSession";
import { FieldValues } from "react-hook-form";

type DataType =
  | {
      categoryId?: string;
      categoryName: string;
      categoryDescription: string;
      categoryImage: string;
      slug: string;
    }
  | FieldValues;

type TOrderData = {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  email: string;
  zipcode?: string;
  phone: number;
  paymentType: "Cash on Delivery" | "Stripe";
  orderId: string;
  checkoutItems: string[];
};

export async function createOrder(orderData: TOrderData) {
  const {
    firstname,
    lastname,
    city,
    address,
    zipcode,
    email,
    phone,
    paymentType,
    orderId,
    checkoutItems,
  } = orderData;
  const supabase = createClient();

  const user = await getUserSession();
  if (!user) {
    throw new Error("Unathorized Access!");
  }

  try {
    const { error } = await supabase
      .from("orders")
      .insert({
        firstname,
        lastname,
        city,
        address,
        zipcode,
        email,
        phone,
        paymentType,
        orderId,
        orderItems: checkoutItems,
      });
    if (error) {
      console.log("create order error", error);
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/orders");
}

export const setOrderAsCompleted = async (id: number) => {
  const supabase = createClient();

  const user = await getUserSession();
  if (!user || user?.role !== "admin") {
    throw new Error("Unathorized Access!");
  }

  try {
    const { error } = await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("id", id);
    if (error) {
      return {
        success: false,
      };
    }

    revalidatePath("/dashboard/orders")
    revalidatePath(`/dashboard/orders/${id}`)
    return {
      success: true,
    };
  } catch (error) {
    console.log("[SET_ORDER_AS_COMPLETED]", error);
    return {
      success: false,
    };
  }
};
