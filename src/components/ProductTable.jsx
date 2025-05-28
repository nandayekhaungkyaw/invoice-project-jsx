
import ProductSkeletonRow from './ProductSkeletonRow';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Delete, Pencil, Plus } from 'lucide-react';
import Swal from 'sweetalert2'
import { deleteProduct, handleArrangeProducts } from './../services/products';

import ProductSearch from './ProductSearch';



const ProductTable = ({product,pagination,setPagination,setProduct}) => {
   if (Array.isArray(product) && product.length > 0) {
      console.log(pagination)
   }

  const handleDelete =async (id) => {
 

   await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
         const currentPageUrl = pagination.meta.links.find(link => link.active)?.url;
        deleteProduct(id,currentPageUrl,setPagination,setProduct); // Assuming deleteProduct is a function that handles the deletion
        // Call your delete function here
        console.log(`Product with id ${id} deleted`);
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
      }
    })
  }

  const handleup=async (sortby)=>{
    handleArrangeProducts(sortby,setProduct,setPagination,"asc");
   

  }

    const handledown=async (sortby)=>{
          handleArrangeProducts(sortby,setProduct,setPagination,"desc");
    
  }


  return (
   <div>
    <div className="flex flex-row justify-between items-center mt-4">
     <ProductSearch setPagination={setPagination} setProduct={setProduct}/>
      <Link to="/product_create" className="text-white flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Plus className=' size-4' />  Add Product
      </Link>
    </div>
  <div className="relative overflow-x-auto  sm:rounded-lg mt-4">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 flex flex-row gap-2 justify-start items-center">
              <div className=' flex flex-col gap-2 '>
               <span onClick={()=>handleup("id")} className=' size-4'><ChevronUp /></span>
          <span onClick={()=>handledown("id")}>  <ChevronDown /></span>
          </div>
          Id
          </th>
          <th scope="col" className="px-6 py-3">
           Product Name
          </th>
          <th scope="col" className="px-6 py-3 flex flex-row gap-2 justify-start items-center">
             <div className=' flex flex-col gap-2 '>
               <span onClick={()=>handleup("price")} className=' size-4'><ChevronUp /></span>
          <span onClick={()=>handledown("price")}>  <ChevronDown /></span>
          </div>
           Price
          </th>
          <th scope="col" className="px-6 py-3">
          created_at
          </th>
              <th scope="col" className="px-6 py-3">
        updated_at
          </th>
          <th scope="col" className="px-6 py-3 flex flex-row">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(product) && product.length > 0 ?
            product.map((item,index) => (
                 <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
         {item.id}
          </th>
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.product_name}
          </th>
          <td className="px-6 py-4">
           {item.price}
          </td>
          <td className="px-6 py-4">
           {item.created_at}
          </td>
          <td className="px-6 py-4">
           {item.updated_at}
          </td>
          <td className="px-6 py-4 text-right flex flex-row gap justify-center items-center">
           <Link to={`/product/${item.id}`} className=' border-1 hover:text-blue-600 p-2 rounded-sm rounded-r-none'><Pencil className=' size-4' /></Link>
 <button onClick={() => handleDelete(item.id)} className=' border-1 p-2 rounded-sm hover:text-red-600 rounded-l-none'><Delete className=' size-4' /></button>
          </td>
        </tr>
        )) :Array.isArray(product) && product.length === 0 ? ( <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"><td className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white" colSpan={6}>No data found</td></tr>) :

       <ProductSkeletonRow/> }
       
      
      </tbody>
    </table>
  </div>
</div>

  )
}

export default ProductTable