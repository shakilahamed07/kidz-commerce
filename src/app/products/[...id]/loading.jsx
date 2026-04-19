import ProductCardSkeleton from '@/components/Skeleton/ProductCardSkeleton'
import { ProductDetailsSkeleton } from '@/components/Skeleton/ProductDetailsSkeleton'
import React from 'react'

export default function Loading() {
  return (
    <div className=''>
      <ProductDetailsSkeleton/>
    </div>
  )
}
