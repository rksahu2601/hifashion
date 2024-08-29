import Checkout from "@/components/store/checkout/Checkout";
import { getUserSession } from "@/lib/getSession";

export default async function CheckoutPage() {
  const user = await getUserSession()

  return (
    <Checkout user={user} />
  )
}
