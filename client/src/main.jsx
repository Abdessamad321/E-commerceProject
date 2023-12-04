import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './Components/cart/cartcontext.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CartProvider>,
)
