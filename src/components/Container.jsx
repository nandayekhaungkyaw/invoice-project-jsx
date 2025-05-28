import React from 'react'

const Container = ({children,css=''}) => {
  return (
    <div className={` max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8  ${css}`}>
      
        {children}
      
    </div>
  )
}

export default Container