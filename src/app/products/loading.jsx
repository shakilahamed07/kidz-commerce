import ProductCardSkeleton from '@/components/Skeleton/ProductCardSkeleton'
import React from 'react'

export default function Loading() {
  return (
    <div className='max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-5 justify-items-center'>
        {
          [...Array(8)].map((_ , index) => (
            <ProductCardSkeleton key={index}/>
          ))
        }
    </div>
  )
}
