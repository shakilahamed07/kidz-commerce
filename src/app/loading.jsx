import React from 'react'
import Logo from '../components/logo'

export default function Loading() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <div className="animate-pulse grayscale-80">
            <Logo/>
        </div>
    </div>
  )
}
