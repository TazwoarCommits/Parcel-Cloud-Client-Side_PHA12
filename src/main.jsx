import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="max-w-screen-2xl mx-auto font-Poppins">
    <Toaster />
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
