import { fontBangla } from '@/app/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineArrowRight, HiOutlineShoppingBag } from 'react-icons/hi'
import { MdOutlineStars } from 'react-icons/md'
import styles from './Beanar.module.css';

export default function Beanar() {
  return (
    <div className="relative overflow-hidden bg-base-100">
      {/* Background Decor (Optional) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      
      <div className='container mx-auto lg:flex text-center lg:text-start justify-between items-center gap-12 px-6 md:px-10 py-16 lg:py-24 relative z-10'>
        
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          {/* Discount Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-bold animate-pulse mx-auto lg:mx-0 w-fit">
            <MdOutlineStars size={20} />
            Up to 15% Discount on All Toys!
          </div>

          <h1 className={`${fontBangla.className} lg:text-7xl text-5xl font-black md:mb-6 lg:leading-[1.2] sm:leading-tight leading-snug max-w-2xl`}>
            আপনার সন্তানদের একটি উজ্জ্বল <span className='text-primary relative inline-block'>
              ভবিষ্যৎ দিন
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="#570DF8" strokeWidth="4" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className='text-gray-500 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium'>
            Discover a world of educational toys designed to spark creativity and logical thinking in your little ones.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link href="/products" className='btn btn-primary btn-lg rounded-2xl shadow-xl shadow-primary/20 gap-2 group'>
              <HiOutlineShoppingBag size={22} />
              Shop Now
              <HiOutlineArrowRight className='group-hover:translate-x-1 transition-transform' />
            </Link>
            
            <div className="flex items-center gap-3 px-4">
               <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                  <div className="avatar border-white w-10">
                    <img src="https://i.pravatar.cc/100?img=1" />
                  </div>
                  <div className="avatar border-white w-10">
                    <img src="https://i.pravatar.cc/100?img=2" />
                  </div>
                  <div className="avatar border-white w-10">
                    <img src="https://i.pravatar.cc/100?img=3" />
                  </div>
                </div>
                <div className="text-start">
                   <p className="text-xs font-bold">1k+ Happy Kids</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Trusted Store</p>
                </div>
            </div>
          </div>
        </div>

        {/* Right Image with Floating Effect */}
        <div className="flex-1 flex justify-center lg:justify-end mt-16 lg:mt-0 relative">
          <div className={`relative ${styles.animateFloat}`}>
             {/* Decorative Circle behind image */}
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 blur-2xl"></div>
            
            <Image 
              src={'/assets/hero.png'} 
              alt='Premium Kids Toys' 
              width={600} 
              height={500} 
              className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              priority
            />

            {/* Floating Card Detail */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 shadow-2xl rounded-2xl hidden md:flex items-center gap-3 z-20 border border-base-200">
               <div className="bg-green-100 p-2 rounded-xl text-green-600">
                  <MdOutlineStars size={24} />
               </div>
               <div className="text-start">
                  <p className="text-xs font-black">Top Rated</p>
                  <p className="text-[10px] opacity-60">Learning Kits</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}