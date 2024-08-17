"use server"

import { revalidatePath } from 'next/cache';
import { createClient } from '../lib/supabase/server';
import { getUserSession } from '@/lib/getSession';
import { FieldValues } from 'react-hook-form';
import { TCategory } from '@/types/supabaseTypes';
import { deleteImage } from './uploadThingActions';

type DataType = {
    categoryId?: string;
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

  export async function editCategory(data:DataType){
    const supabase = createClient()

    const user=await getUserSession()
    if(!user || user.role !== "admin"){
        throw new Error("Unathorized Access!")
    }

    try {
        const {error} = await supabase.from("categories").update({name:data.categoryName, description: data.categoryDescription, image: data.categoryImage, slug: data.slug}).eq("id", data.categoryId)
        if(error){
            console.log("category error", error);  
        }
    } catch (error) {
        console.log( error);        
    }
  
    revalidatePath('/dashboard/categories')
  } 

  export async function deleteCategory(data: TCategory) {
    const supabase = createClient();
  
    const user = await getUserSession();
    console.log("User", user)
    if (!user || user.role !== "admin") {
      throw new Error("Unathorized Access!");
    }
  
    try {
      const res = await supabase
        .from("categories")
        .delete()
        .eq("id", data.id);
  
      if (res.status === 204) {
          await deleteImage(data.image?.split("/")[4]!);
        };
    } catch (error) {
      console.log(error);
    }
  
    revalidatePath("/dashboard/categories");
  }