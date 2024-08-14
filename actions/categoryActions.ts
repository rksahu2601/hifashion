"use server"

import { revalidatePath } from 'next/cache';
import { createClient } from '../lib/supabase/server';
import { getUserSession } from '@/lib/getSession';
import { FieldValues } from 'react-hook-form';

type DataType = {
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
    slug: string;
} | FieldValues

export async function createCategory(data:DataType){
    const supabase = createClient()

    const user=await getUserSession()
    if(!user || user.role !== "admin"){
        throw new Error("Unathorized Access!")
    }

    try {
        const {error} = await supabase.from("categories").insert({name:data.categoryName, description: data.categoryDescription, image: data.categoryImage, slug: data.slug})
        if(error){
            console.log("category error", error);  
        }
    } catch (error) {
        console.log( error);        
    }
  
    revalidatePath('/dashboard/categories')
  } 