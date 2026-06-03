import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from "framer-motion";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </StrictMode>,
)
