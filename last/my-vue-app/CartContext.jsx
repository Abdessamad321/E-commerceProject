// import React, { createContext, useContext, useReducer } from 'react';

// // Define the initial state
// const initialState = {
//   cart: [],
// };

// // Create the CartContext
// export const CartContext = createContext();

// // Define the cartReducer function
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return {
//         ...state,
//         cart: [...state.cart, action.payload],
//       };
//     // Add other cases as needed
//     default:
//       return state;
//   }
// };

// // Create the CartProvider component
// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
// };

// // Create the useCart hook
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };


// cartContext.jsx

import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  cart: [],
  likedProducts: [],
};

// Create the CartContext
export const CartContext = createContext();

// Define the cartReducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'ADD_TO_LIKED_PRODUCTS':
      return {
        ...state,
        likedProducts: [...state.likedProducts, action.payload],
      };
    // Add other cases as needed
    default:
      return state;
  }
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

// Create the useCart hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
