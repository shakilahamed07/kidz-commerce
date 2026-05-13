import { getSinglePoducts } from '@/action/server/products';
import UpdateProduct from '@/components/Dashboard/UpdateProduct';
import React from 'react'

export default async function UpdateSingleProduct({params}) {
    const { id } = await params;
    const res = await getSinglePoducts(id[0]);
  return (
    <div>
        <UpdateProduct product={res} />
    </div>
  )
}
