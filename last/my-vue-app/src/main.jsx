import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from "../CartContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)

// index.js or App.js
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { CartProvider } from "../CartContext";

// ReactDOM.render(
//   <React.StrictMode>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
