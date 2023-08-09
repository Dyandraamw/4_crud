import React, { useState } from 'react';
import Header from '@/components/header';
import axios from 'axios';

export default function Add() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !selectedImage) {
      setError('Please fill all data');
      return;
    }

    setError('');

    try {
      const res = await axios.post('https://dummyjson.com/products/add', {
        title,
        price,
      });

      setResponse(res.data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTitle('');
    setPrice('');
  };

  return (
    <div className="bg-slate-600 min-h-screen text-white">
      <Header />
      <div className="flex m-3 p-5">
        <h1 className="font-bold text-3xl">Add</h1>
      </div>
      <div className="m-3 p-5">
        {error && (
          <div className="mb-4">
            <span className="block text-red-500 font-medium mb-2">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="block text-lg font-medium text-white mb-2">Image</span>
            <input
              type="file"
              accept="image/*"
              className="mb-2"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </label>
          <label className="block mb-2">
            <span className="block text-lg font-medium text-white mb-2">Title</span>
            <input
              type="text"
              className="p-2 rounded-lg w-80 text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            <span className="block text-lg font-medium text-white mb-2">Price</span>
            <input
              type="number"
              className="p-2 rounded-lg w-80 text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="bg-emerald-600 px-4 py-2 hover:bg-emerald-500 font-bold rounded-lg mr-2 mt-4 text-white"
          >
            Save
          </button>
        </form>
        {showModal && response && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="bg-slate-600 p-8 rounded-lg flex flex-col ">
              <h2 className="text-xl font-medium mb-4 text-center">Produk berhasil ditambahkan!</h2>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="mb-4 rounded-lg"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              )}
              <p className="mb-2">
                <strong>Title:</strong> {response.title}
              </p>
              <p>
                <strong>Price: Rp</strong> {response.price}
              </p>
              <button
                onClick={closeModal}
                className="bg-emerald-600 px-4 py-2 hover:bg-emerald-500 font-bold rounded-lg mt-4 text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
