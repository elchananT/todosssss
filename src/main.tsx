import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SigninForm from "./components/SinginForm.tsx";
import SingupForm from "./components/SingupForm.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
        <StrictMode>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<SigninForm />} />
                <Route path="/register" element={<SingupForm />} />
            </Routes>
      </StrictMode>,
  </BrowserRouter>
)
