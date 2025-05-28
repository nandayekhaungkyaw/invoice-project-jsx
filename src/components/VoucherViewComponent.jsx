import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewVoucher } from '../services/voucher.js';
import { set } from 'react-hook-form';
import Vouchertemplate from './Vouchertemplate';
import { usePDF } from 'react-to-pdf';


const InvoiceViewComponent = () => {
  const [isPdfMode, setIsPdfMode] = useState(false);

  const [voucher,setVoucher] = useState({});
   const { toPDF, targetRef } = usePDF({filename: 'Invoice.pdf'});
const {id}= useParams()
console.log(id)
useEffect(() => {
  const fetchInvoice = async () => {
    const response=await viewVoucher(id);
    console.log(response);
    setVoucher(response);
  }
  fetchInvoice();

}, [id])

 const handleDownload = async () => {
    setIsPdfMode(true); // Turn on PDF mode
    setTimeout(async () => {
      await toPDF(); // Generate PDF
      setIsPdfMode(false); // Turn off PDF mode
    }, 100); // small delay to ensure re-render
  };

  return (
    <div ref={targetRef} className="bg-white text-black m-4 p-4 relative">
      {Array.isArray(voucher.records) && voucher.records.length > 0 ? (  <div>
       <>

      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
       
        <div className="text-center flex-1">
          <h2 className="text-lg font-bold">Your Business Name</h2>
          <p>Company address, city, state ZIP</p>
          <p>Contact, telephone, fax</p>
          <p>Slogan, Web site, email</p>
        </div>
      </div>

      {/* Voucher Title */}
      <h3 className="text-right text-xl font-semibold text-green-600 border-b-2 border-green-200 pt-2 mb-4">VOUCHER</h3>

      {/* Info section */}
      <div className="flex justify-between mb-4">
        <div>
          <p><span className="font-semibold">Name :</span>{voucher.customer_name}</p>
          <p><span className="font-semibold">Address :</span> {voucher.customer_email}</p>
        </div>
        <div className="text-right">
          <p><span className="font-semibold">Date :</span> {voucher.sale_date}</p>
          <p><span className="font-semibold">Voucher No :</span>{voucher.voucher_id}</p>
        </div>
      </div>


    
    </>

    <Vouchertemplate data={voucher.records} others={voucher}/>
    <div className='flex  mt-3'>
      {isPdfMode &&(<p className=' m-auto  text-3xl'>၀ယ်ယူအား‌ပေးမှုကို ကျေးဇူးတင်ပါသည်</p>)}
{!isPdfMode && (       <button  onClick={handleDownload}  className="text-white  print:hidden  ml-auto   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4 ">Download PDF</button>)}
    </div></div>) :("loading..")}
    </div>
  
  )
}

export default InvoiceViewComponent