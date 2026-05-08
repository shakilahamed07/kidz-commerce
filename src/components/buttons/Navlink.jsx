"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navlink({herf, children}) {
    const pathName = usePathname();
  return (
    <Link className={`${pathName == herf ? "text-primary" : ""} lg:font-medium font-bold`} href={herf}>{children}</Link>
  )
}
