import { createClient } from "./supabase/server"

export const getUserSession = async ()=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()

    if(!user) {
        return null
    }

    // get user profile
    const {data: profile, error}=await supabase.from("profiles").select().eq("id", user.id).single()
    console.log("fetched profile",profile)
    if(error) throw new Error("Could not fetch user Profile!")
        return {
            email: user.email,
            role: profile.role,
            firstname: profile.firstname,
            lastname: profile.lastname,
    }
}