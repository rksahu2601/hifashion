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

type TOrderData ={
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  email: string;
  zipcode?: string;
  phone: number;
  paymentType: "Cash on Delivery" | "Stripe";
  orderId: string;
  checkoutItems: string[]
}

export async function createOrder(orderData: TOrderData){
  const {firstname, lastname, city, address, zipcode, email, phone, paymentType, orderId, checkoutItems}=orderData;
    const supabase = createClient()

    const user=await getUserSession()
    if(!user){
        throw new Error("Unathorized Access!")
    }

    try {
        const {error} = await supabase.from("orders").insert({firstname, lastname, city, address, zipcode, email, phone, paymentType, orderId, orderItems:checkoutItems})
        if(error){
            console.log("create order error", error); 
            return {
              success: false
            } 
        }
        return {
          success: true
        } 
    } catch (error) {
        console.log( error);        
    }
  
    revalidatePath('/dashboard/orders')
  } 