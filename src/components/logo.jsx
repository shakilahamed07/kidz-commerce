"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Logo() {
  const Router = useRouter();
  return (
    <div onClick={()=>{Router.push("/")}} className='flex justify-center items-center gap-2 cursor-pointer'>
        <Image className='w-8 sm:w-12' src="/assets/logo.png" alt="alt" width={50} height={40} />
        <h1 className='font-bold sm:text-2xl'>Kidz <span className='text-primary'>Commerce</span></h1>
    </div>
  )
}
