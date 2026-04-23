import { getOrader } from '@/action/server/createOder'
import MyOrder from '@/components/MyOders/MyOrder';
import React from 'react'

export default async function MyOrders() {

    const orders = await getOrader() || [];

    // Nested map use kore items-er bhetorer _id-keo string kora holo
    const formetedOders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(), // Main order ID
      items: order.items.map((item) => ({
        ...item,
        _id: item._id.toString(), // Inside items array ID
        productId: item.productId?.toString() || item.productId // Product ID string conversion
      }))
    }));

  return (
    <div className='my-5'>
        <MyOrder orders={formetedOders}></MyOrder>
    </div>
  )
}