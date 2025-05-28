import React, { use, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';


import SaleTable from './SaleTable';
import {  useNavigate } from 'react-router-dom';
import productStore from '../store/productStore';
import { voucherCreate } from '../services/sale';

const SaleForm = () => {
  const navigate=useNavigate();
  function generateVoucherId() {
  const date = new Date();
  const yyyyMMdd = date.toISOString().slice(0, 10).replace(/-/g, "");

  const randomFourDigits = Math.floor(1000 + Math.random() * 9000); // ensures 4 digits

  return `INV-${yyyyMMdd}-${randomFourDigits}`;
}

const voucherId = generateVoucherId();
     const { register, handleSubmit, formState: { errors },reset } = useForm();
     const {total,tax,netTotal,VoucherProducts}=productStore();
  const onSubmit = (data) => {

      const payload = {
    voucher_id: data.voucher_id,
    customer_name: data.customer_name,
    customer_email: data.customer_email,
    sale_date: data.sale_date,
  
    total: total,
    tax: tax,
    net_total: netTotal,
    records: VoucherProducts.map((product) => ({
      product_id: product.id,
      product: {
        id: product.product_id || product.id,
        product_name: product.product_name,
        price: product.price,
        created_at: product.created_at || new Date().toISOString(),
      },
      quantity: String(product.quantity),
      cost: product.amount,
      created_at: new Date().toISOString(),
    })),
  };


  
   console.log("Payload for API:", payload); // Clean, readable JSON
   voucherCreate(payload,navigate,reset)
  };
  console.log(errors);
   
    const [today] = useState(() => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  });


  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className=" mt-4">
      
      <div className="space-y-4">
        <div className='grid grid-cols-4 gap-6'>
                {/* Voucher ID */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Voucher ID</label>
          <input
            type="text"
            placeholder="Enter voucher ID"
            defaultValue={voucherId}
            readOnly
            {...register("voucher_id", { required: true })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Customer Name</label>
          <input
            type="text"
            {...register("customer_name", { required: true })}
            placeholder="Enter customer name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Customer Email */}
         <div>
          <label className="block text-gray-700 font-medium mb-1">Customer Email</label>
          <input
            type="email"
            {...register("customer_email", { required: true })}
            placeholder="kyawkyaw@gmil.com"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
            <label className="block min-w-[150px] text-gray-700 font-medium mb-1">Sale Date</label>
            <input
            defaultValue={today}
            {...register("sale_date", { required: true })}
                type="date"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        </div>
      </div>
      
      
    </form>

    <SaleTable  />

    <div className=' flex justify-end'>
       <button
     onClick={handleSubmit(onSubmit)}
              type="submit"
              className=" bg-cyan-500 w-1/4 self-end   h-[60px] mt-4    text-white py-3 rounded-md font-semibold hover:bg-cyan-700 transition"
            >
            Create Voucher
            </button>
    </div>
    </div>
  );
};

export default SaleForm;
