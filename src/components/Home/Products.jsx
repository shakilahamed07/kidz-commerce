import React from 'react'
import { ProductCard } from '../Card/ProdactCard'
import { GetProducts } from '@/action/server/products'

export default async function Products() {

    const products = (await GetProducts()) || [];

  return (
    <div>
        <h2 className='sm:text-2xl  font-bold text-center sm:mb-10 mb-5'>Our Product</h2>
        <div className="max-w-[1400px] mx-auto px-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  md:gap-8 gap-2 justify-items-center mb-10">
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
