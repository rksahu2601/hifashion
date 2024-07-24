import CartItem from '@/components/store/cart/CartItem'
import CartOrderSummary from '@/components/store/cart/CartOrderSummary'

export default function page() {
  return (
    <div className='contain md:grid gap-6 items-start grid-cols-12 py-4 mt-[5rem]'>
      <section className='col-span-8 border shadow rounded-md p-3 md:p-4  md:pr-6  md:overflow-y-auto md:max-h-[40rem] scroll-p-6'>
        <div className="flex justify-between items-center mb-3 md:mb-6 w-full">
          <h2 className='font-semibold text-2xl md:text-3xl'>Shopping Cart</h2>
          <h2 className='font-semibold text-2xl md:text-3xl'>3 items</h2>
        </div>
        <hr />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </section>
      <section className='border shadow rounded-md p-3 md:p-4 col-span-4'>
      <CartOrderSummary />
      </section>
    </div>
  )
}
