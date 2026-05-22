import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { ScrollProvider } from './context/ScrollContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollProvider>
      <App />
    </ScrollProvider>
  </BrowserRouter>,
)
