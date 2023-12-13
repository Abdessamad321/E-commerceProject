
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Favorites.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Favorites = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];

    const likedProductsArray = Array.isArray(storedLikedProducts)
      ? storedLikedProducts
      : Object.values(storedLikedProducts || {});

    setLikedProducts(likedProductsArray);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
      const likedProductsArray = Array.isArray(storedLikedProducts)
        ? storedLikedProducts
        : Object.values(storedLikedProducts || {});
      setLikedProducts(likedProductsArray);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); 

  const removeFromFavorites = (productId) => {
    const updatedLikedProducts = likedProducts.filter(
      (likedProduct) => likedProduct._id !== productId
    );

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
  };

  return (
    <div className='favoritepage'>
      <span className='span'>Favorites</span>
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
                >
                  <span className="remove-text">Remove from Favorites</span>
                  <span className="remove-icon"> <DeleteForeverIcon/></span>
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