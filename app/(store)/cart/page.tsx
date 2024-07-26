import CartItems from '@/components/store/cart/CartItems'
import CartOrderSummary from '@/components/store/cart/CartOrderSummary'

export default function page() {
  return (
    <div className='contain md:grid gap-6 items-start grid-cols-12 py-4 mt-[5rem]'>
      <CartItems />
      <CartOrderSummary />
    </div>
  )
}
