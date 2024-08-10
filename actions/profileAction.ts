"use server";

import { createClient } from "@/lib/supabase/server";

export async function createProfile(data: {
  firstname: string;
  lastname: string;
  userId: string | undefined;
}) {
  const supabase = createClient();
  console.log("PROFILRE HERE")

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: data.userId, username: "Test", firstname: data.firstname,  updated_at: new Date().toISOString(), })
    .select();

    if(error){
        console.log("FROM PROFILE CREATE", error)
    }
}
