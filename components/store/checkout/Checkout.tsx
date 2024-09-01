"use client";

import CheckoutOrderSummary from "@/components/store/checkout/CheckoutOrderSummary";
import ReviewOrder from "@/components/store/checkout/ReviewOrder";
import OrderPlacedPopup from "./OrderPlacedPopup";
import { useState } from "react";
import { TUserSession } from "@/lib/getSession";

type PropType = {
  user: TUserSession | null;
};

export default function Checkout({ user }: PropType) {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [orderId, setOrderId] = useState("");
  return (
    <div className="contain mt-[5rem] pb-6 grid gap-6 md:grid-cols-12 items-start">
      <ReviewOrder user={user}/>
      <CheckoutOrderSummary setOpenPopUp={setOpenPopUp} setOrderId={setOrderId}/>
      {openPopUp && <OrderPlacedPopup orderId={orderId} setOrderId={setOrderId} setOpenPopUp={setOpenPopUp} />}
    </div>
  );
}
