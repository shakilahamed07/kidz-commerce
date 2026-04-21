import { getCart } from '@/action/server/cart'
import Chackout from '@/components/ShoppingCart/Chackout'
import React from 'react'

export default async function ChackoutPage() {

    const cartData = await getCart() || [];
    const frometedData = cartData.map((item)=>({
        ...item,
        _id: item._id.toString()
    }))

  return (
    <div>
        <Chackout cartItems={frometedData}></Chackout>
    </div>
  )
}
