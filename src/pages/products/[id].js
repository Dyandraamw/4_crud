import React, { useState, useEffect } from 'react'
import Header from '@/components/header'
import { useRouter } from 'next/router'
import axios from 'axios'
import {FcCheckmark} from 'react-icons/fc'

export default function Edit() {
    const router = useRouter()
    const id = router.query.id

    const[title, setTitle] = useState('');
    const[price, setPrice] = useState('');
    const [error, setError] = useState('');
    const[updated, setUpdated] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(false);
    const [updatedPrice, setUpdatedPrice] = useState(false);
    
    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const resp = await axios.get(`https://dummyjson.com/products/${id}`);
                setTitle(resp.data.title);
                setPrice(resp.data.price);

            } catch(err) {
                console.log('Error',err);
            }
        };
        fetchDataProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if( !title || !price) {
          setError('Please fill the data first!!');
          return;
      }
          
        setError('');
        
        try {
            const updatedProduct = {
                title,
                price,
            };

            await axios.put(`https://dummyjson.com/products/${id}`, updatedProduct);
        
        setUpdatedTitle(title);
        setUpdatedPrice(price); 
        setUpdated(true);
        } catch(error) {
            console.log('Error Update Product',error)
        }
    };
    
  return (
    <div className='bg-slate-600 min-h-screen text-white'>
        <Header/>
        <div className='flex m-3 p-5 '>
          <h1 className="font-bold text-3xl ">Edit Product {id}</h1>
        </div>
        <div className='m-3 p-5'>

          <form onSubmit={handleSubmit}>
            {/* title */}
          <label className="block mb-2" >
            <span className="block text-lg font-medium text-white mb-2 ">Title</span>
            <input
              type="text" 
              className="p-2 rounded-lg w-80 text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
             />
          </label>

          
            {/* Price */}
          <label className="block mb-2" >
            <span className="block text-lg font-medium text-white mb-2 ">Price</span>
            <input 
              type="number" 
              className="p-2 rounded-lg w-80 text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}/>
          </label>

            {/*Error Message  */}
            {error && <p className='text-red-500 font-semibold'>{error}</p>}

          <button 
          type='submit' 
          className=' bg-emerald-600  px-4 py-2  hover:bg-emerald-500  font-bold rounded-lg mr-2 mt-4 text-white'>Save</button>
          </form>

        {/* Popup update */}
        {updated && (
          <div className='fixed inset-0 flex items-center justify-center z-50 bg-black opacity-75'>
            <div className='bg-slate-700 p-8 rounded-lg flex flex-col text-white'>
              <h2 className='text-xl font-semibold mb-4 text-white text-center'>Product Successfully Updated!</h2>
              <p className='mb-2'>Title : {updatedTitle}</p>
              <p className='mb-4'>Price : {updatedPrice}</p>
              <FcCheckmark className="text-6xl text-emerald-500 animate-pulse mx-auto mb-4"/>
              <button
                onClick={() => setUpdated(false)} 
                className='bg-emerald-600 px-4 py-2 hover:bg-emerald-400 font-bold rounded-lg mt-4 text-white'
              >
                Close
              </button> 
            </div>
          </div>
          )}
        </div>
    </div>
  )
};