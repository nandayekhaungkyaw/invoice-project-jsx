import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './route.jsx'
// main.jsx or main.jsx
import 'flowbite';
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
     <RouterProvider router={router} />
  </StrictMode>,
)

