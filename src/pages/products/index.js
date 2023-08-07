'use client'
import Header from '@/components/header'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Products() {
    const [products,setProducts] = useState([]);
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products',{
          params: {
            limit: 20,
          },
        });
        setProducts(response.data.products)
      } catch (err) {}
    };
  
    useEffect(()=> {
      fetchProducts();
    }, []);
  
    return (
      <main className='bg-slate-600 min-h-screen '>
        <div className='text-white'>
          <Header/>
          <div className='flex justify-between items-center m-5 p-5 '>
            <h1 className="font-bold text-3xl ">Products</h1>
            <Link href='/products/add'><button className=' bg-blue-600 px-4 py-2 hover:bg-blue-500  font-medium rounded-lg mr-5 text-white'>Add New Products</button></Link>
          </div>
          <div className='grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 m-5 '>
          {(() => {
            if (products && products.length >0) {
              return products.map((item) => (
                  <div className='bg-slate-800 p-3 rounded-lg flex-col justify-center items-center w-96 mb-5 relative lg:w-80'>
                      <img src={item['thumbnail']} alt="" className='h-[200px] w-[400] rounded-lg mb-3 ml-1 mt-2' width={400} height={200}/>
                      <h1 className='text-lg font-medium ml-1'>{item['title']}</h1>
                      <h1 className='text-m font-medium ml-1'>Rp {item['price']}</h1>
                      <div className='flex justify-between mt-5 ml-1'>
                        <Link href='/'><button className=' bg-white px-4 py-2 border-4 border-red-500  hover:bg-red-500 hover:text-white font-bold rounded-lg mr-5 text-red-500'>Remove</button></Link>
                        <Link href={'/products/'+ item['id']}><button className=' bg-white px-4 py-2 border-4 border-emerald-600  hover:bg-emerald-600 hover:text-white font-bold rounded-lg mr-2 text-emerald-600'>Edit</button></Link>
                      </div>
                  </div>
              ))}
          }) ()}
          </div>
        </div>
      </main>
    )
}
