"use client";

import Button from "@/components/Button";
import { useCartStore } from "@/store/cart-store";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

export default function StripeCheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const cart = useCartStore((state) => state.cart);
  const cartTotal = cart.reduce((acc, currVal) => {
    return acc + currVal.qty * currVal.price!;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (stripe === null || elements === null) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/checkout`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Something went wrong!");
        }
      })
      .finally(() => setIsLoading(false));

      
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <p className="my-2 text-xs md:text-sm text-red-600">{errorMessage}</p>
      )}
      <PaymentElement />
      {stripe && (
        <Button
          loading={isLoading}
          disabled={isLoading || !stripe || !elements}
          label={`Pay $${cartTotal.toFixed(2)}`}
          solid
          className="w-full mt-3"
        />
      )}
    </form>
  );
}
