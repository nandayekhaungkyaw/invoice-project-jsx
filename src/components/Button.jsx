import React from 'react'
;

const Button = ({icon,name,type="button"}) => {
  return (
    <button type={type}  className="text-white bg-gradient-to-r flex flex-row gap-2 justify-center items-center from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{icon}  {name}</button>
  )
}

export default Button