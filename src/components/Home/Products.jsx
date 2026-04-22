import React from 'react'
import { ProductCard } from '../Card/ProdactCard'
import { GetProducts } from '@/action/server/products'

export default async function Products() {

    const products = (await GetProducts()) || [];

  return (
    <div>
        <h2 className='text-2xl font-bold text-center mb-10'>Our Product</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-5 justify-items-center mb-10">
            {
                products.map(product => {
                    product._id=product._id.toString();
                    return(
                        <ProductCard key={product._id} product={product}></ProductCard>
                    )
                })
            }
        </div>

    </div>
  )
}
