import React from 'react'

// fungsi DeleteConfirmation ini akan menerima 3 props, yaitu productName, onConfirm, dan onCancel.
// productName akan digunakan untuk menampilkan nama produk yang akan dihapus.
// onConfirm akan digunakan untuk menghapus produk.
// onCancel akan digunakan untuk membatalkan penghapusan produk.
export default function DeleteConfirmation({ productName, onConfirm, onCancel }) {
  return (
    <div className="bg-white rounded-lg absolute max-w-[30rem] p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg text-black">Delete this product</h1>
          <button className="text-black hover:text-red-600" type="button" onClick={onCancel}>
            close
          </button>
        </div>
        <div className="mb-3">
          <p className="text-black">Are you sure want to delete {productName}?</p>
        </div>
        <div className="flex justify-center items-center w-full space-x-3">
          <button
            type="button"
            className="px-4 py-1 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg"
            onClick={onConfirm}
          >
            OK
          </button>
          <button
            type="button"
            className="px-4 py-1 text-red-600 hover:bg-red-600 hover:text-white rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
  )
}
