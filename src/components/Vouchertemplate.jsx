import React from 'react';

const Vouchertemplate = ({data,others}) => {
  console.log(data)
  return (
     <div className="overflow-x-auto border border-black w-full">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-lime-200 text-left text-sm font-semibold">
            <th className="border border-black px-2 py-1 text-center align-middle leading-[2rem] w-16">Item #</th>
            <th className="border border-black px-2 py-1 text-center align-middle leading-[2rem]">Product Name</th>
            <th className="border border-black px-2 py-1  align-middle leading-[2rem] w-20 text-center">Quantity</th>

            <th className="border border-black px-2 py-1  align-middle leading-[2rem] w-24 text-center">Unit Price</th>
            <th className="border border-black px-2 py-1  align-middle leading-[2rem] w-24 text-center">Amount</th>
          </tr>
        </thead>

        {/* Table Body (Empty rows for layout only) */}
        <tbody>
        {data?.map((item, i) => (

            <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 items-center`}>
              <td className="border border-black px-2 py-1 text-center h-8">{i+1}</td>
              <td className="border border-black px-2 py-1 text-center">{item.product.product_name}</td>
              <td className="border border-black px-2 py-1 text-center">{item.quantity}</td>
              <td className="border border-black px-2 py-1 text-center">{item.product.price}</td>
           
              <td className="border border-black px-2 py-1 text-center">{item.cost}</td>
            </tr>
        ))}
        </tbody>

        {/* Table Footer for Discount and Total */}
        <tfoot>
          <tr>
            <td colSpan="4" className="border border-black px-2 py-1 text-right font-semibold">
             Total
            </td>
            <td className="border border-black px-2 py-1">{others.total}</td>
          </tr>
           <tr>
            <td colSpan="4" className="border border-black px-2 py-1 text-right font-semibold">
            Tax
            </td>
            <td className="border border-black px-2 py-1">{others.tax}</td>
          </tr>
          <tr>
            <td colSpan="4" className="border border-black px-2 py-1 text-right font-bold">
             Net Total
            </td>
            <td className="border border-black px-2 py-1">{others.net_total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
   
  );
};

export default Vouchertemplate;
// This component is a simple voucher template that can be used in a React application.
