import { confirmStripePayment } from "@/actions/stripePaymentActions";
import Checkout from "@/components/store/checkout/Checkout";
import { getUserSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function CheckoutPage({searchParams:{payment_intent}}:{searchParams:{payment_intent: string | undefined}}) {
  const user = await getUserSession()

  if(!user) {
    redirect("/signin?role=user")
  }

    // Check if stripe payment was successfulngjmr
      const {orderId, success} = await confirmStripePayment({payment_intent: payment_intent})

  return (
    <Checkout user={user} orderedId={orderId} paymentSuccess={success}/>
  )
}
