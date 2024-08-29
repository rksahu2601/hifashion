import { create } from "zustand";
import { FieldValues } from "react-hook-form";
import { TPaymentType } from "@/components/store/checkout/CheckoutOrderSummary";

interface TState {
  isLoading: boolean;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  email: string;
  zipcode?: string;
  phone: number;
  paymentType: "Cash on Delivery" | "Stripe";
}

interface TAction {
  setIsLoading: (data: boolean)=>void;
  setDeliveryDetails: (data: FieldValues) => void;
  setPaymentType: (paymentType: TPaymentType) => void;
}

export const useCheckoutStore = create<TState & TAction>()((set) => ({
  isLoading: false,
  firstname: "",
  lastname: "",
  address: "",
  city: "",
  email: "",
  zipcode: "",
  phone: 0,
  paymentType: "Cash on Delivery",
  setDeliveryDetails: (data: FieldValues) =>
    set({
      firstname: data.firstname,
      lastname: data.lastname,
      city: data.city,
      zipcode: data.zipcode,
      address: data.address,
      phone: data.phone,
      email: data.email,
    }),
    setPaymentType: (paymentType:TPaymentType )=>set({
        paymentType: paymentType
    }),
    setIsLoading: (data)=>set({isLoading: data})
}));
