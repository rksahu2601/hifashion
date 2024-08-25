"use client"

import CartItem from '@/components/store/cart/CartItem'
import { useCartStore } from '@/store/sortingStore';
import { motion } from 'framer-motion';

export default function CartItems() {
    const variants = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

      const cart = useCartStore(state=>state.cart)
      console.log("CARTITEM:", cart)
    
  return (
    <motion.section
    variants={variants}
    initial="initial"
    whileInView="animate"
    className='col-span-8 border shadow rounded-md p-3 md:p-4  md:pr-6  md:overflow-y-auto md:max-h-[40rem] scroll-p-6'>
        <div className="flex justify-between items-center mb-3 md:mb-6 w-full">
          <h2 className='font-semibold text-2xl md:text-3xl'>Shopping Cart</h2>
          <h2 className='font-semibold text-2xl md:text-3xl'>3 items</h2>
        </div>
        <hr />
        {cart.map((item, i)=>(
          <CartItem key={i} cartItem={item} />
        ))}

      </motion.section>
  )
}
