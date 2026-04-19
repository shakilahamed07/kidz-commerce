import { fontBangla } from '@/app/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Beanar() {
  return (
    <div className='lg:flex text-center lg:text-start space-y-15 lg:space-y-0 justify-center items-center gap-10 px-10 md:py-20 py-10'>
        <div className="space-y-5">
            <h1 className={`${fontBangla.className} lg:text-6xl text-5xl font-bold md:mb-10 mb-3 lg:leading-24 sm:leading-20 leading-14  max-w-xl mx-auto`}>আপনার সন্তানদের একটি উজ্জ্বল <span className='text-primary'>ভবিষ্যৎ দিন</span></h1>
            <p className='text-gray-800'>Buy every toy with up to 15% discount</p>
            <Link className='btn btn-primary btn-outline' href="/products">Explore products</Link>
        </div>
        <div className="flex justify-center">
            <Image src={'/assets/hero.png'} alt='hero image' width={500} height={400}/>
        </div>
    </div>
  )
}
