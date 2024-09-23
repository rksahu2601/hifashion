"use server";

import { generateOrderId } from "@/lib/genOrderId";
import { getUserSession } from "@/lib/getSession";
import { createClient } from "@/lib/supabase/server";
import { TCartItem } from "@/store/cart-store";
import { revalidatePath } from "next/cache";

import Stripe from "stripe";

type TOrderData = {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  email: string;
  zipcode?: string;
  phone: number;
  paymentType: "Cash on Delivery" | "Stripe";
  checkoutItems: TCartItem[];
};

type PropsType = {
  orderData: TOrderData;
  paymentIntentId: string | null;
};

const calculateOrderAmount = (items: TCartItem[]) => {
  const amount = items.reduce((acc, currVal) => {
    return acc + currVal.qty * currVal.price!;
  }, 0);

  console.log(
    "Calculated order amount",
    Number(amount.toFixed(2))
  );

  return Number(amount.toFixed(2));
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const CreatePaymentIntent = async ({
  orderData,
  paymentIntentId,
}: PropsType) => {
  const {
    firstname,
    lastname,
    city,
    address,
    zipcode,
    email,
    phone,
    paymentType,
    checkoutItems,
  } = orderData;

  const supabase = createClient();
  const user = await getUserSession();
  if (!user) {
    throw new Error("Unathorized Access!");
  }

  if (paymentIntentId) {
    console.log("update", checkoutItems)
    // update Payment Intent
    const existingIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (existingIntent) {
      // update intent
      const updatedIntent = await stripe.paymentIntents.update(
        paymentIntentId,
        { amount: Number((calculateOrderAmount(checkoutItems) * 100).toFixed(2)) }
      );

      // console.log(
      //   "Calculated order amount",
      //   existingIntent.er
      // );

      console.log(
        "existingIntent metadata orderId",
        existingIntent.metadata.orderId
      );

      //   update order
      const existingOrder = await supabase
        .from("orders")
        .select()
        .eq("orderId", existingIntent.metadata.orderId)
        .eq("paymentIntentId", existingIntent.id)
        .single();

      if (existingOrder) {
        const updatedOrder = await supabase.from("orders").update({
          firstname,
          lastname,
          city,
          address,
          zipcode,
          email,
          phone,
          noOfProducts: checkoutItems.length,
          totalPrice: calculateOrderAmount(checkoutItems),
        }).eq("orderId", existingOrder.data?.orderId!).eq("paymentIntentId", existingIntent.id)

        // update order products
        if (!updatedOrder.error) {
          // delete all old order products
          const deletedEntries = await supabase
            .from("orderProduct")
            .delete()
            .eq("orderId", existingOrder.data?.orderId!);

          // create new ones
          if (!deletedEntries.error) {
            checkoutItems.map(async (item) => {
              await supabase.from("orderProduct").insert({
                name: item.name,
                itemId: item.itemId, //unique cart item id
                quantity: item.qty,
                variant: item.variant,
                price: item.price,
                image: item.images[0],
                productId: item.id, //product supabase id (not unique since there could be multiple cart Products with same id but different variants)
                orderId: existingOrder.data?.orderId,
                buyerId: user.id,
              });
            });
          }
        }
      }

      return {
        paymentIntentId:updatedIntent.id,
        clintSecret: updatedIntent.client_secret
      };
    }
  } else {
    console.log("create")
    // Create Payment Intent
    const orderId = generateOrderId();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(checkoutItems) * 100,
      currency: "usd",
      metadata: { orderId },
    });

    // create order
    try {
      const { error } = await supabase.from("orders").insert({
        firstname,
        lastname,
        city,
        address,
        zipcode,
        email,
        phone,
        paymentType,
        orderId,
        noOfProducts: checkoutItems.length,
        totalPrice: calculateOrderAmount(checkoutItems),
        paymentIntentId: paymentIntent.id,
      });
      console.log("db order created");
      
      if (error) {
        console.log("create order error", error);
      }

      // create order products
      checkoutItems.map(async (item) => {
        await supabase.from("orderProduct").insert({
          name: item.name,
          itemId: item.itemId, //unique cart item id
          quantity: item.qty,
          variant: item.variant,
          price: item.price,
          image: item.images[0],
          productId: item.id, //product supabase id (not unique since there could be multiple cart Products with same id but different variants)
          orderId,
          buyerId: user.id,
        });
      });
    } catch (error) {
      console.log(error);
    }

    revalidatePath("/dashboard/orders");
    return {
      paymentIntentId:paymentIntent.id,
      clintSecret: paymentIntent.client_secret
    };;
  }
};

export const confirmStripePayment = async ({payment_intent}:{payment_intent: string | undefined}) =>{
const supabase = createClient()

if(!payment_intent){
  return {
    orderId: "",
    success : false
   }
}
 const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)

 if(paymentIntent.metadata.orderId === null) return {
  orderId: "",
  success : false
 }

 const success = paymentIntent.status === "succeeded";
 if(success) {
  // update order in database
  await supabase.from("orders").update({PaymentStatus: "completed"}).eq("orderId", paymentIntent.metadata.orderId)
  revalidatePath("/dashboard/orders");
 }

 return {
  orderId: paymentIntent.metadata.orderId,
  success
 }
}
