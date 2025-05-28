import React from 'react'
import { getProducts } from './../services/products';



const Pagination = ({data,setProduct,setPagination}) => {
  console.log(data)
 
  const handleFetch= async (url,setPagination) => {
    const response = await getProducts(url,setPagination);
  setProduct(response);}
   
  return (
<div>
  {data && data.meta && (<div className=' mt-4 flex justify-between w-full items-center'>
    <p className=' inline-block'>{data.meta.from} to {data.meta.to}  of total {data.meta.total}</p> 

  <nav aria-label="Page navigation example w-full flex flex-row gap-6 justify-between items-center">
   
    <ul className="inline-flex -space-x-px text-base h-10">
     
      {data.meta.links.map((link, index) => (
        <li key={index}>
          <button 
          disabled={!link.url}
            onClick={() => handleFetch(link.url,setPagination)} 
            className={`flex items-center justify-center px-4 h-10 leading-tight ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
            {link.label== '&laquo; Previous' ? 'Previous' : link.label == 'Next &raquo;' ? 'Next' : link.label}
          </button>
        </li>
      ))}
      
      
    </ul>
  </nav>
</div>)}
</div>

  )
}

export default Pagination