import Link from 'next/link'
import React from 'react'
import { FaFaceSadTear } from 'react-icons/fa6'

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <FaFaceSadTear className='text-primary mb-5 animate-pulse' size={40} />
        <h1 className='text-2xl font-bold'>Page Not Found!</h1>
        <Link href={'/'} className='btn btn-primary mt-5'>Back Home</Link>
    </div>
  )
}
