"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
