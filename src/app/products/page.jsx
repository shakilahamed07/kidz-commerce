import Products from '@/components/Home/Products'
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'

export const metadata = {
  title: "All Products | Kidz Commerce",
  description:
    "Browse all kids products including toys, fashion, and essentials at Kidz Commerce.",

  openGraph: {
    type: "website",
    url: "https://kidz-commerce.vercel.app/products",
    title: "All Kids Products | Kidz Commerce",
    description:
      "Explore a wide range of kids toys, fashion, and daily essentials. Shop easily with Kidz Commerce.",
    siteName: "Kidz Commerce",
    images: [
      {
        url: "https://i.ibb.co.com/jZv89xBj/Screenshot-2026-04-15-225121.png",
        width: 1200,
        height: 630,
        alt: "Kidz Commerce Products Page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "All Kids Products | Kidz Commerce",
    description:
      "Explore toys, fashion, and essentials for kids in one place.",
    images: [
      "https://i.ibb.co.com/jZv89xBj/Screenshot-2026-04-15-225121.png",
    ],
  },
};

export default async function PoductsPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className='mb-10'>
        <Products/>
    </div>
  )
}
