import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='flex justify-center items-center gap-2'>
        <Image className='w-8 sm:w-12' src="/assets/logo.png" alt="alt" width={50} height={40} />
        <h1 className='font-bold sm:text-2xl'>Kidz <span className='text-primary'>Tory</span></h1>
    </div>
  )
}
