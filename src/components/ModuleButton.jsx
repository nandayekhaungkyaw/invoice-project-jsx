import React from 'react'
import { Link } from 'react-router-dom'


const ModuleButton = ({name,icon,url}) => {
  return (
    <Link to={url} className='flex flex-col min-h-[100px]  gap-2 h-full  rounded-sm p-4 items-center justify-center  bg-blue-700 text-white '>
        {icon}
         {name}
    </Link>
  )
}

export default ModuleButton