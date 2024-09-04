import Checkout from "@/components/store/checkout/Checkout";
import { getUserSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const user = await getUserSession()

  if(!user) {
    redirect("/signin?role=user")
  }

  return (
    <Checkout user={user} />
  )
}
