"use client";

import CheckoutOrderSummary from "@/components/store/checkout/CheckoutOrderSummary";
import ReviewOrder from "@/components/store/checkout/ReviewOrder";
import OrderPlacedPopup from "./OrderPlacedPopup";
import { useEffect, useState } from "react";
import { TUserSession } from "@/lib/getSession";
import { useCartStore } from "@/store/cart-store";

type PropType = {
  user: TUserSession | null;
  orderedId: string;
  paymentSuccess: boolean;
};

export default function Checkout({ user, paymentSuccess, orderedId }: PropType) {
  const [openPopUp, setOpenPopUp] = useState(paymentSuccess);
  const [orderId, setOrderId] = useState(orderedId);

  const clearCart = useCartStore(state=>state.clearCart)

  useEffect(()=>{
    if(paymentSuccess === true){
      localStorage.removeItem("paymentIntentId")
      clearCart()
    }
  }, [])

  return (
    <div className="contain mt-[5rem] pb-6 grid gap-6 md:grid-cols-12 items-start">
      <ReviewOrder user={user} />
      <CheckoutOrderSummary
        setOpenPopUp={setOpenPopUp}
        setOrderId={setOrderId}
      />
      {openPopUp && (
        <OrderPlacedPopup
          orderId={orderId}
          setOrderId={setOrderId}
          setOpenPopUp={setOpenPopUp}
        />
      )}
    </div>
  );
}
