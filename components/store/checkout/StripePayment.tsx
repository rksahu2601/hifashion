"use client";

import { CreatePaymentIntent } from "@/actions/stripePaymentActions";
import { generateOrderId } from "@/lib/genOrderId";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-details-store";
import {  useState } from "react";
import toast from "react-hot-toast";
import StripeCheckoutFormProvider from "./StripeCheckoutFormProvider";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState<string | null | undefined>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const checkoutState = useCheckoutStore((state) => ({
    firstname: state.firstname,
    lastname: state.lastname,
    address: state.address,
    city: state.city,
    email: state.email,
    zipcode: state.zipcode,
    phone: state.phone,
    paymentType: state.paymentType,
  }));

  const cart = useCartStore((state) => state.cart);

  const handleOrderProcessing = async () => {
    if (
      !checkoutState.firstname ||
      !checkoutState.lastname ||
      !checkoutState.address ||
      !checkoutState.city ||
      !checkoutState.email ||
      !checkoutState.paymentType ||
      !checkoutState.phone
    ) {
      toast.error("Please fill the delivery information.");
      return;
    }
    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsLoading(true);

    const orderData = {
      ...checkoutState,
      checkoutItems: cart,
    };

    // check paymentIntentId in localStorage
    const PaymentIntentIdFromStorage =
      typeof localStorage != "undefined" &&
      localStorage.getItem("paymentIntentId")
        ? JSON.parse(localStorage.getItem("paymentIntentId")!)
        : null;

    const response = await CreatePaymentIntent({
      orderData,
      paymentIntentId: PaymentIntentIdFromStorage,
    });

    if (response) {
      // set paymentIntentId in localStorage
      localStorage.setItem(
        "paymentIntentId",
        JSON.stringify(response.paymentIntentId)
      );
      setClientSecret(response.clintSecret);
    }
    setIsLoading(false);
  };

  console.log("CLIENT SECTET", clientSecret);

  return (
    <>
      {clientSecret === null && (
        <button onClick={handleOrderProcessing} className={cn("mt-4 flex items-center gap-1.5", !isLoading && "underline")}>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? "Setting up stripe..." : "Pay with stripe"}
        </button>
      )}
      {clientSecret && (
        <StripeCheckoutFormProvider clientSecret={clientSecret} />
      )}
    </>
  );
}
