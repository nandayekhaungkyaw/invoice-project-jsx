import React, {  useEffect, useState } from 'react'
import { create } from 'zustand';
import { getVouchers } from '../services/voucher';
import VoucherPagination from './VoucherPagination';
import { data, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, View } from 'lucide-react';
import VoucherSearch from './VoucherSearch';
import { handleArrangement } from '../services/voucher';

const VoucherTable = () => {
const [vouchers,setVouchers]=useState([]);
const [data,setData]=useState([]);

useEffect(() => {
  const fetchVouchers = async () => {
    const fetching = await getVouchers();
  
     console.log(fetching)
      setVouchers(fetching.data);
        setData(fetching);
        
  };
  fetchVouchers();
 
}, []);

 const handleup=async (total)=>{
  const response= await handleArrangement("asc",setData,total);
  setVouchers(response);

 }

 const handledown=async (total)=>{
  const response=await handleArrangement("desc",setData,total);
  setVouchers(response);

 }

  return (
    <div className=' mt-6'>
        
<VoucherSearch setVouchers={setVouchers} setData={setData} data={data} />
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 flex flex-row gap-2 justify-center items-center">
          <div className=' flex flex-col gap-2'>
               <span onClick={()=>handleup("id")} className=' size-4'><ChevronUp /></span>
          <span onClick={()=>handledown("id")}>  <ChevronDown /></span>
          </div>
          id
        </th>
         <th scope="col" className="px-6 py-3">
          voucher_id
        </th>
        <th scope="col" className="px-6 py-3">
         Customer Info
        </th>
        <th scope="col" className="px-6 py-3 flex flex-row gap-2 justify-start items-center">
          <div className=' flex flex-col gap-2'>
               <span onClick={()=>handleup("total")} className=' size-4'><ChevronUp /></span>
          <span onClick={()=>handledown("total")}>  <ChevronDown /></span>
          </div>
        
        
       
         Net Total
        </th>
        <th scope="col" className="px-6 py-3  ">
         <div className=' flex flex-row justify-center items-center'>
           <div className=' flex flex-col gap-2 '>
               <span onClick={()=>handleup("created_at")} className=' size-4'><ChevronUp /></span>
          <span onClick={()=>handledown("created_at")}>  <ChevronDown /></span>
          </div>
        created_at
         </div>
        </th>
        <th scope="col" className="px-6 py-3">
         updated_at
        </th>
        <th scope="col" className="px-6 py-3">
        View
        </th>

      </tr>
    </thead>
    <tbody>
     {Array.isArray(vouchers) && vouchers.length > 0 ?
        vouchers.map((item, index) => (
        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.id}
          </th>
          <td className="px-6 py-4">
            {item.voucher_id}
          </td>
          <td className="px-6 py-4 flex flex-col gap-2">
           <span> {item.customer_name}</span>
           <span> {item.customer_email}</span>
          </td>
          <td className="px-6 py-4">
            ${item.net_total?.toFixed(2)}
          </td>
          <td className="px-6 py-4">
            {new Date(item.created_at).toLocaleDateString()}
          </td>
          <td className="px-6 py-4">
            {new Date(item.updated_at).toLocaleDateString()}
          </td>
            <td className="px-6 py-4 text-right">
                <Link to={"/invoice/"+item.id} className='text-blue-400 hover:underline flex items-center justify-center'>  <View className='size-7' /></Link>
            </td>
        </tr>
        )) :
      (  <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
          No vouchers found.
        </td>
      </tr>)
     }
    </tbody>
  </table>
</div>
{Array.isArray(vouchers) && vouchers.length > 0 && (<VoucherPagination data={data} setData={setData} setVouchers={setVouchers}/>)}


    </div>
  )
}

export default VoucherTable