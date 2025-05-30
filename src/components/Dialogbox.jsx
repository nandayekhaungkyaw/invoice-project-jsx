import React from 'react'

const Dialogbox = ({children,name}) => {
  return (
       <div>
  
  <div id={name} tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-6 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 pt-3">
        <button type="button" className="absolute top-1 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={name}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only ">Close modal</span>
        </button>
         {children}
      </div>
    </div>
  </div>
</div>

  )
}

export default Dialogbox