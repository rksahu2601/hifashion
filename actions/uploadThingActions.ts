"use server"

import { getUserSession } from "@/lib/getSession";
import { UTApi } from "uploadthing/server";
 
const utapi = new UTApi();

export async function deleteImage(key:string){
 const user=await getUserSession()
    if(!user || user.role !== "admin"){
        throw new Error("Unathorized Access!")
    }

    try {
        await utapi.deleteFiles(key);
    } catch (error) {
        console.log( error);        
    }
  } 