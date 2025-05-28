

import { Pencil } from 'lucide-react'
import React, { use } from 'react'
import { useForm } from 'react-hook-form';
import Button from './Button';



import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import { useNavigate } from 'react-router-dom';
import { EditProfilePassword } from '../services/profile.js';





const EditProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
  initFlowbite();
}, []);
 const navigate=useNavigate()
  const onSubmit = (data) => {

EditProfilePassword(data,navigate)


  };

  return (
  <main>
  {/* Modal toggle */}
 
  {/* Main modal */}
  <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
           Edit Password
          </h3>
          <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5">
        
     <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <input type="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' placeholder="old_password" {...register("old_password", {required: true})} />
      <input type="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' placeholder="new_password" {...register("new_password", {required: true})} />
      <input type="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' placeholder="new_password_confirmation" {...register("new_password_confirmation", {required: true})} />

     <Button type='submit' name='Update' icon={''} />
    </form>

        </div>
      </div>
    </div>
  </div> 
</main>




  )
}

export default EditProfile