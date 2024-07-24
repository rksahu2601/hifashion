import CheckoutOrderSummary from '@/components/store/checkout/CheckoutOrderSummary'
import ReviewOrder from '@/components/store/checkout/ReviewOrder'

export default function Checkout() {
  return (
    <div className='contain mt-[5rem] pb-6 grid gap-6 md:grid-cols-12 items-start'>
        <ReviewOrder />
        <CheckoutOrderSummary />
    </div>
  )
}
