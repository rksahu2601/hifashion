"use server"

import { revalidatePath } from 'next/cache';
import { createClient } from '../lib/supabase/server';
import { CatFormType } from '@/components/forms/CreateNewCategoryForm';
import { getUserSession } from '@/lib/getSession';

export async function createCategory(data){
    const supabase = createClient()

    const user=await getUserSession()
    if(!user || user.role !== "admin"){
        throw new Error("Unathorized Access!")
    }

    try {
        const {error} = await supabase.from("categories").insert({name:data.categoryName, description: data.categoryDescription, image: data.categoryImage})
        if(error){
            console.log("category error", error);  
        }
    } catch (error) {
        console.log( error);        
    }
  
    revalidatePath('/dashboard/categories')
  } 