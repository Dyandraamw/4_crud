import React from 'react'
import Link from 'next/link'

export default function header() {
  return (
    <nav className='bg-slate-700  w-full '>
        <div className='flex justify-between p-5'>
            <h1 className='text-emerald-400 text-2xl font-bold'><Link href='/'>Tokolaku</Link></h1>
            <div className='flex '>
                <button className=' bg-white px-4 py-2 hover:bg-slate-200  font-medium rounded-lg mr-5 text-black'>Profile</button>
                <button className=' bg-red-600 px-4 py-2 hover:bg-red-500  font-medium rounded-lg text-white mr-5'>Logout</button>
            </div>
        </div>
    </nav>
  )
}
