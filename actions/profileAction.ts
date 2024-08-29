"use server";

import { getUserSession } from "@/lib/getSession";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export async function createProfile(data: {
  firstname: string;
  lastname: string;
  userId: string;
}) {
  const supabase = createClient();
  console.log("PROFILRE HERE")

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: data.userId, firstname: data.firstname, lastname: data.lastname, updated_at: new Date().toISOString(), })
    .select();

    if(error){
        console.log("FROM PROFILE CREATE", error)
        redirect(`/signup?message=${error.message}`)
    }
}

// type TProfileDetails = {
//     address: string;
//     city: string;
//     firstname: string;
//     lastname: string;
//     phone: number;
//     zipcode: string;
// }

export async function editProfile(profileDetails: FieldValues){
  const supabase = createClient()

  const user = await getUserSession()
  if(!user){
    return {
      message: "Unauthorized Access",
    }
  }

  const {data, error} = await supabase.from("profiles").update({ phone: profileDetails.phone, zipcode: profileDetails.zipcode, city: profileDetails.city, address: profileDetails.address}).eq("id", user.id)

  if(error){
    console.log("[UPDATE_PROFILE]: ", error )
    return {
      message: "Something went wrong",
      success: false,
    }
  }

  revalidatePath("/checkout")
  return {
    message: "Delivery information updated succesfully",
    success: true,
  }
}