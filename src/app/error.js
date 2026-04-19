'use client'
import Link from 'next/link'
import React from 'react'
import { MdError } from 'react-icons/md'

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <MdError className='text-primary mb-5 animate-pulse' size={40} />
        <h1 className='text-2xl font-bold'>Something Wrong 404!</h1>
        <Link href={'/'} className='btn btn-primary mt-5'>Back Home</Link>
    </div>
  )
}
