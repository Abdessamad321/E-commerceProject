
import React from 'react';
import { useCart } from '../../Components/cart/cartcontext';
import './CheckOut.css'
import paypal from '../../assets/how-paypa.png';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Checkout = () => {
    const { cart, dispatch  } = useCart();

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
        };
    const totalSum = cart.reduce((sum, item) => sum + item.price, 0);

    const shippingPrice = 5;

    const totalPrice = totalSum + shippingPrice;


    return (
        <div className='checkout-page'>
            <div className="desc-product">
        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
            ) : (
            <div>
                <ul>
                {cart.map((item) => (
                    <li className='checkout-products-list' key={item._id}>
                    <img className='product-image' src={item.product_image} alt="" />
                    <div className='product-details'>
                        <h3>{item.product_name}</h3>
                        <p>{item.long_description}</p>
                    </div>
                    <div className='product-price'>
                        ${item.price}
                    </div>
                    <div className='product-remove'>
                    {/* Add a Remove button here */}
                    <IconButton
                    onClick={() => removeFromCart(item._id)}
                    color="secondary"
                    aria-label="remove"
                    >
                    <DeleteIcon />
                    </IconButton>
                </div>
                    </li>
                ))}
                </ul>
            </div>
            )}
            </div>
            <div className='checkout-summary'>
            <h2>Order Summary:</h2>
            <div className='summary-item'>
            <span>Products Total:</span>
            <span>${totalSum.toFixed(2)}</span>
            </div>
            <div className='summary-item'>
            <span>Shipping:</span>
            <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className='summary-item total'>
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className='payment-method'>
            <h2>Payment Method:</h2>
            <img style={{ width: '150px' }}src={paypal} alt='paypal logo' />
            </div>
        </div>
        </div>
        )
};

export default Checkout;