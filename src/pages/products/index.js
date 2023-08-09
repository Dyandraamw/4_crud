'use client'
import Header from '@/components/header'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'
import DeleteConfirmation from '@/components/DeleteConfirmation'

export default function Products() {
    const [products,setProducts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false); // state untuk menampilkan atau menyembunyikan popup konfirmasi penghapusan produk
    const [productToDelete, setProductToDelete] = useState(null); // state untuk menyimpan data produk yang akan dihapus

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
  
    // fungsi showDeleteConfirmation akan menerima satu parameter, yaitu data produk yang akan dihapus.
    const showDeleteConfirmation = (product) => {
      setProductToDelete(product); // menyimpan data produk yang akan dihapus ke state productToDelete
      setShowConfirmation(true); // menampilkan popup konfirmasi penghapusan produk
    };
  
    const hideDeleteConfirmation = () => {
      setShowConfirmation(false); // menyembunyikan popup konfirmasi penghapusan produk
      setProductToDelete(null); // menghapus data produk yang akan dihapus dari state productToDelete
    };
  
    // fungsi deleteProduct akan menerima satu parameter, yaitu id produk yang akan dihapus.
    const deleteProduct = async (id) => {
      try {
        // mengirim request ke API untuk menghapus produk
        const response = await axios.delete(`https://dummyjson.com/products/${id}`);
        if (response.data.isDeleted) {
          // jika produk berhasil dihapus, maka kita akan menghapus produk dari state products
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
          // menyembunyikan modal konfirmasi
          hideDeleteConfirmation();
        }
      } catch (err) {
        console.error('Error deleting product:', err);
      }
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
                  <div key={item.id} className='bg-slate-800 p-3 rounded-lg flex-col justify-center items-center w-96 mb-5 relative lg:w-80'>
                      <img src={item['thumbnail']} alt="" className='h-[200px] w-[400] rounded-lg mb-3 ml-1 mt-2' width={400} height={200}/>
                      <h1 className='text-lg font-medium ml-1'>{item['title']}</h1>
                      <h1 className='text-m font-medium ml-1'>Rp {item['price']}</h1>
                      <div className='flex justify-between mt-5 ml-1'>
                        <button
                          onClick={() => showDeleteConfirmation(item)} // menampilkan popup konfirmasi penghapusan produk
                          className='bg-white px-4 py-2 border-4 border-red-500 hover:bg-red-500 hover:text-white font-bold rounded-lg mr-5 text-red-500'
                        >
                          Remove
                        </button>
                        <Link href={'/products/'+ item['id']}><button className=' bg-white px-4 py-2 border-4 border-emerald-600  hover:bg-emerald-600 hover:text-white font-bold rounded-lg mr-2 text-emerald-600'>Edit</button></Link>
                      </div>
                  </div>
              ))}
              else {
                return (
                  <div className='flex justify-center items-center w-full'>
                    <h1 className='text-xl font-bold'>No Products Found ...</h1>
                  </div>
                )
              }
          }) ()}
          </div>
          {/* menampilkan modal konfirmasi jika showConfirmation bernilai true */}
          {showConfirmation && (
            <div className='fixed top-0 left-0 z-[80] w-full h-screen bg-slate-600/50 backdrop-blur-sm transition-all delay-200 flex justify-center items-center'>
              <DeleteConfirmation
                productName={productToDelete.title} // mengambil nama produk yang akan dihapus
                onConfirm={() => deleteProduct(productToDelete.id)} // menghapus produk
                onCancel={hideDeleteConfirmation} // menyembunyikan modal konfirmasi
              />
            </div>
          )}
        </div>
      </main>
    )
}
