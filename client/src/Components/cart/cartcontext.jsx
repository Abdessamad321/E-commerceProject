import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return [...state, action.payload];
//     // Add other cases for removing items, updating quantities, etc.
//     default:
//       return state;
//   }
// };
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const updatedCart = [...state, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    // Add other cases for removing items, updating quantities, etc.
    default:
      return state;
  }
};

// In your component, where you use useReducer for the cart:
// const [cart, dispatch] = useReducer(cartReducer, []);

// const addToCart = (product) => {
//   dispatch({
//     type: 'ADD_TO_CART',
//     payload: product,
//   });
// };

// Make sure to load the cart from localStorage when the component mounts
// useEffect(() => {
//   const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//   dispatch({
//     type: 'LOAD_CART_FROM_STORAGE',
//     payload: storedCart,
//   });
// }, []);

// Add additional cases in the reducer for other cart actions as needed.


const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
