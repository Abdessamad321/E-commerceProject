import React, { useState, useEffect } from "react";
import "./Favorites.css";
import Button from "@mui/material/Button";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(
      (favoriteProduct) => favoriteProduct.id !== productId
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favoritepage">
    <span>Favorites</span>
    <div className="favorites">
      {favorites.length === 0 ? (
        <span>No favorites found.</span>
      ) : (
        favorites.map((favorite) => (
          <div key={favorite.id} className="card">
            <img
              className="product--image"
              src={favorite.product_image}
              alt={favorite.product_name}
            />
            <div className="cart-text">
              <h3>{favorite.product_name}</h3>
              <p>{favorite.short_description}</p>
              <p className="price">{favorite.price}</p>
              <div className="addbutton">
                <Button
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    borderRadius: 8,
                    border: "none",
                    outline: 0,
                    padding: 5,
                    margin: 10,
                    backgroundColor: "#590404",
                    color: "#fff",
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                  onClick={() => removeFromFavorites(favorite.id)}
                >
                  Remove from Favorites
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  );
};

export default Favorites;
