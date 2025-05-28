import React, { useCallback, useRef } from 'react'
import { set, useForm } from 'react-hook-form';
import { searchProduct } from '../services/products';

import { getProducts } from './../services/products';

const ProductSearch = ({setPagination,setProduct}) => {

   const searchTimeoutRef = useRef(undefined); // used for optional clear

const debounce = (func, timeout = 2000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

const debouncedSearch = useCallback(
  debounce(async (searchTerm, setPagination) => {
    const result = await searchProduct(searchTerm, setPagination);
    setProduct(result);
    console.log(`Searching for: ${searchTerm}`);
  }, 2000),
  []
);

const handleSearch =async (event) => {
  const searchTerm = event.target.value;
  if(searchTerm=== '') {
 const response=await   getProducts(undefined, setPagination);
    setProduct(response);
   
  }

  if (searchTerm) {
    debouncedSearch(searchTerm, setPagination);
  } else {
    clearTimeout(searchTimeoutRef.current);
  }
};
  return (
    <div className=' max-w-sm'>
 
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input onChange={handleSearch} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name and price" required />
     
    </div>
  
</div>

  )
}

export default ProductSearch