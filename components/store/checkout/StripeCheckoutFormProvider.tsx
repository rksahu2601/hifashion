"use client";

import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";

import toast from "react-hot-toast";
import StripeCheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function StripeCheckoutFormProvider({
  clientSecret,
}: {
  clientSecret: string | null | undefined;
}) {
  if (clientSecret === null) {
    toast.error("Error, please try again.");
    return;
  }

  return (
    <Elements options={{clientSecret}} stripe={stripePromise} >
        <StripeCheckoutForm />
    </Elements>
  );
}
