import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { LoggedInProvider } from './context/LoggedInContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoggedInProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoggedInProvider>

  </StrictMode>
)
