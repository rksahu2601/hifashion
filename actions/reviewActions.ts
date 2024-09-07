"use server";

import { getUserSession } from "@/lib/getSession";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type PropType = {
  rating: number;
  comment: string;
  productId: number;
};

export async function CreateReview({ rating, comment, productId }: PropType) {
  if (!rating || !comment) {
    return {
      error: "No rating or comment",
      status: 400,
      success: false,
    };
  }

  const user = await getUserSession();
  if (!user) {
    return {
      error: "Unauthorized",
      status: 401,
      success: false,
    };
  }

  const supabase = createClient();
  const { error } = await supabase.from("reviews").insert({rating, comment, username: `${user.firstname} ${user.lastname}`, productId})
  if(error){
    return {
        error: "Internal Server error",
        status: 500,
        success: false,
      };
  }

  revalidatePath(`/product/${productId}`)

  return {
    error: null,
    status: 201,
    success: true,
  };
}
