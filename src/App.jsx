import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'




function App() {


  return (
    <main className='p-4 font-sans '>

   <Header/>
    
     <Outlet/>
    </main>
  )
}

export default App
