import React, { useState, useEffect } from 'react'
import './Favorites.css'



const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(
      (favoriteProduct) => favoriteProduct.id !== productId
    );

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  console.log(favorites);

  return (
    <div className='favoritepage'>
      <h1>Favorites</h1>
      <div className='favorites'>
        {favorites.map((favorite, index) => (
          <div key={index} className='card'>
            <img src={favorite.imageurl} alt={favorite.name} />
            <div className="card-body">
              <h2>{favorite.id}</h2>
              <h3>{favorite.name}</h3>
              <p>{favorite.description}</p>
              <p>{favorite.price}</p>
              <div className="buttons">
                <button onClick={() => removeFromFavorites(favorite.id)}>Remove from Favorites</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;