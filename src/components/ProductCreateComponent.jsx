import { Store } from 'lucide-react';
import React from 'react'
import { storeProduct } from '../services/products.js';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const ProductCreateComponent = () => {
    const navigate=useNavigate();

      const { register, handleSubmit,reset, formState: { errors } } = useForm();
  
    const onSubmit = (data) => {
        console.log(data)
        storeProduct(data,navigate,reset)
        
    }

      return (
    
    <div>
        
<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mt-5">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
    <input type='text'  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="product_name" {...register("product_name", {required: true})} />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
    <input type="number"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="price" {...register("price", {required: true})}/>
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input {...register("go_back", )} type="checkbox"  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
    </div>
    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">After Create,go back to product table</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
</form>


    </div>
  )
}

export default ProductCreateComponent