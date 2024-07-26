"use client"

import CheckoutOrderSummary from '@/components/store/checkout/CheckoutOrderSummary'
import ReviewOrder from '@/components/store/checkout/ReviewOrder'
import OrderPlacedPopup from './OrderPlacedPopup';
import { useState } from 'react';

export default function Checkout() {
    const [openPopUp, setOpenPopUp] = useState(false);
  return (
    <div className='contain mt-[5rem] pb-6 grid gap-6 md:grid-cols-12 items-start'>
        <ReviewOrder />
        <CheckoutOrderSummary setOpenPopUp={setOpenPopUp} />
        {openPopUp && <OrderPlacedPopup setOpenPopUp={setOpenPopUp}/>}
    </div>
  )
}
