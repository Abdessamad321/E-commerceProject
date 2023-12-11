import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import paypal from '../../assets/how-paypa.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCart } from '../../Components/cart/cartcontext';

const ProductDetail = () => {
{const { productId } = useParams();
const navigate = useNavigate();
const { likedProducts, dispatch } = useCart();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const fetchProduct = async () => {
    try {
    const response = await axios.get(`http://localhost:7000/v1/products/${productId}`);
    setProduct(response.data[0]);
    } catch (error) {
    console.error('Error fetching product details:', error);
    setError('Error loading product details. Please try again later.');
    } finally {
    setLoading(false);
    }
};

fetchProduct();
}, [productId]);

const handleFavorite = async () => {
const isLiked = likedProducts.some((likedProduct) => likedProduct._id === product._id);

if (isLiked) {
    dispatch({ type: 'REMOVE_FROM_LIKED_PRODUCTS', payload: product._id });
} else {
    await dispatch({ type: 'ADD_TO_LIKED_PRODUCTS', payload: product });
}
};

if (loading) {
return <div>Loading...</div>;
}

if (error) {
return <div>{error}</div>;
}

if (!product) {
return <div>No product data available</div>;
}

const goBack = () => {
navigate(`/Shop`);
};

return (
<div className='card-details'>
    <div className="shoppingcard">
    <img style={{ height: '500px', width: '500px' }} src={product.product_image} alt={product.product_name} />
    <div className='shoppingcard-details'>
        <div className="nameSku">
        <h1>{product.product_name}</h1>
        <p>{product.sku}</p>
        </div>
        {product.options && product.options.includes('In Stock') ? (
        <p style={{ color: 'green', paddingBottom: '10px', fontWeight: '800' }}>{product.options}</p>
        ) : (
        <p style={{ color: 'red', paddingBottom: '10px' }}>{product.options}</p>
        )}
        <p style={{ paddingBottom: '2rem' }}>{product.long_description}</p>
        <div className='pricee' style={{ paddingBottom: '2rem' }}>
        <span style={{ fontSize: '2em', color: '#590404' }}>${Math.floor(product.price)}</span>
        <span style={{ fontSize: '1.5em' }}>.{Math.floor((product.price % 1) * 100)}</span>
        </div>
        <div className='payment'>
        <p style={{ fontSize: '1rem', paddingBottom: '10px' }}>Payment Methods</p>
        <img
            style={{ width: '150px', background: '#f9e9c8', padding: '0 20px', borderRadius: '16px' }}
            src={paypal}
            alt=""
        />
        </div>

        <div className='cardFooter'>
        <button className='button1'>Buy Now</button>
        <button className='button2' onClick={handleFavorite}>
            <FavoriteIcon style={{ fontSize: '2rem', color: likedProducts.some((p) => p._id === product._id) ? 'red' : 'white' }} />
        </button>
        </div>
    </div>
    </div>
</div>
);}
};

export default ProductDetail;