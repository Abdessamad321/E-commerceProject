import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./Components/cart/cartcontext.jsx";
// import { LikeProvider } from "./Components/like/likecontext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      {/* <LikeProvider> */}
        <App />
      {/* </LikeProvider> */}
    </CartProvider>
  </React.StrictMode>
);
