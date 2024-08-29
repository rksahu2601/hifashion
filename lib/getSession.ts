import { TProfile } from "@/types/supabaseTypes";
import { createClient } from "./supabase/server"

export interface TUserSession extends TProfile {
    email: string | undefined;
  }

export const getUserSession = async ()=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()

    if(!user) {
        return null
    }

    // get user profile
    const {data: profile, error}=await supabase.from("profiles").select().eq("id", user.id).single()
    if(error) throw new Error("Could not fetch user Profile!")
        return {
            ...profile, email: user.email
            
    }
}