import React from 'react'
import Header from '@/components/header'
import { useRouter } from 'next/router'

export default function Edit() {
    const router = useRouter()
    const id = router.query.id
    
  return (
    <div className='bg-slate-600 min-h-screen text-white'>
        <Header/>
        <div className='flex m-3 p-5 '>
          <h1 className="font-bold text-3xl ">Edit Product {id}</h1>
        </div>
        <div className='m-3 p-5'>
          <form action="">
          <label className="block mb-2" >
            <span className="block text-lg font-medium text-white mb-2 ">Title</span>
            <input type="email" className="p-2 rounded-lg w-80 text-black"/>
          </label>
          <label className="block mb-2" >
            <span className="block text-lg font-medium text-white mb-2 ">Price</span>
            <input type="email" className="p-2 rounded-lg w-80 text-black"/>
          </label>
          <button type='submit' className=' bg-emerald-600  px-4 py-2  hover:bg-emerald-500  font-bold rounded-lg mr-2 mt-4 text-white'>Save</button>
          </form>
        </div>
    </div>
  )
}
