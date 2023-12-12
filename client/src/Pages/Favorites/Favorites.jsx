// import React, { useState, useEffect } from "react";
// import "./Favorites.css";
// import Button from "@mui/material/Button";

// const Favorites = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(storedFavorites);
//   }, []);

//   const removeFromFavorites = (productId) => {
//     const updatedFavorites = favorites.filter(
//       (favoriteProduct) => favoriteProduct._id !== productId
//     );
//     setFavorites(updatedFavorites);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   return (
//     <div className="favoritepage">
//     <span>Favorites</span>
//     <div className="favorites">
//       {favorites.length === 0 ? (
//         <span>No favorites found.</span>
//       ) : (
//         favorites.map((favorite) => (
//           <div key={favorite._id} className="card">
//             <img
//               className="product--image"
//               src={favorite.product_image}
//               alt={favorite.product_name}
//             />
//             <div className="cart-text">
//               <h3>{favorite.product_name}</h3>
//               <p>{favorite.short_description}</p>
//               <p className="price">${favorite.price}</p>
//               <div className="addbutton">
//                 <Button
//                   style={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: 0,
//                     borderRadius: 8,
//                     border: "none",
//                     outline: 0,
//                     padding: 5,
//                     margin: 10,
//                     backgroundColor: "#590404",
//                     color: "#fff",
//                     textAlign: "center",
//                     cursor: "pointer",
//                     fontSize: 14,
//                   }}
//                   onClick={() => removeFromFavorites(favorite._id)}
//                 >
//                   Remove from Favorites
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
//   );
// };

// export default Favorites;


import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Favorites.css';

const Favorites = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    // Load liked products from localStorage on component mount
    const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];

    // Ensure that likedProductsArray is always an array
    const likedProductsArray = Array.isArray(storedLikedProducts)
      ? storedLikedProducts
      : Object.values(storedLikedProducts || {});

    setLikedProducts(likedProductsArray);
  }, []);

  useEffect(() => {
    // Update component state when localStorage changes
    const handleStorageChange = () => {
      const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
      const likedProductsArray = Array.isArray(storedLikedProducts)
        ? storedLikedProducts
        : Object.values(storedLikedProducts || {});
      setLikedProducts(likedProductsArray);
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const removeFromFavorites = (productId) => {
    const updatedLikedProducts = likedProducts.filter(
      (likedProduct) => likedProduct._id !== productId
    );

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
  };

  return (
    <div className='favoritepage'>
      {/* <h1>Liked Products</h1> */}
     <span>Favorites</span>
      <div className='liked-products'>
      {likedProducts.length === 0 ? (
        <span>No favorites found.</span>
      ) : (
        <>
        {likedProducts.map((likedProduct, index) => (
          <div key={index} className='card'>
            <div className="imageprdcts">
              <img className="product--image" src={likedProduct.product_image} alt="product image" />
            </div>
            <div className="cart-text">
              <span className="prdctname">{likedProduct.product_name}</span>
              <p className="ellipsis">{likedProduct.short_description}</p>
              <p className="price">
                <span style={{ fontSize: "1.5em", color:'#590404' }}>${Math.floor(likedProduct.price)}</span>
                <span style={{ fontSize: "1em"}}>.{Math.floor((likedProduct.price % 1) * 100)}</span>
              </p>
              <div className="buttons">
                <Button 
                  onClick={() => removeFromFavorites(likedProduct._id)}
                  style={{
                    position: "absolute",
                    bottom: '0',
                    right: '0',
                    borderRadius: "8px",
                    border: "none",
                    outline: 0,
                    padding: "9px",
                    margin: "10px",
                    backgroundColor: "#590404",
                    color: "#fff",
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                  }}
                >
                  Remove from Favorites
                </Button>
                
              </div>
            </div>
          </div>
        ))} 
        </>
        )}
        </div>
   </div>
  );
};

export default Favorites;