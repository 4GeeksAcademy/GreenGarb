import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/checkout.css";
import CartPage from './cartpage';

export const Checkout = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"

  useEffect(() => {

    // if (!store.cart.length) {
    //   navigate('/cart')
    // } else {
    //   // 
    actions.fetchUserData();
    // }
  }, []);

  const cartItemCount = store.cart.length;
  const cartItems = store.cart;
  const itemText = cartItems === 1 ? "item" : "items";

  // Replace commas with spaces in the user's name
  const userName = store.user.name?.replace(/,/g, ' ');

  const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  return (
    <div className='checkout-container mb-5 content-container'>
      <h1 className='checkoutHeader text-center p-2 bg-light p-0'>Checkout ({cartItemCount} {itemText})</h1>
      <div className='ship row border-bottom '>
        <div className='col-5'>
          <h5>  1    Shipping address</h5>
        </div>
        <div className='col'>
          <p>{userName}<br />
            123 test st<br />
            test, test 12345<br />
          </p>
        </div>
      </div>
      <div className='payment row border-bottom my-2 '>
        <div className='col-5'>
          <h5>  2    Payment method</h5>
        </div>
        <div className='col'>
          <p><i className="fa-brands fa-cc-mastercard"></i>   Mastercard ending in 1234<br />
            Billing addresss: Same as shipping address.

          </p>
        </div>
      </div>
      <div className="cart-items my-2">
        <div className='col-12'>
          <h5>  3    Review items and shipping</h5>
        </div>

        {cartItems.map((item, index) => (
          <div key={index} className=" mb-3 border rounded" style={{maxWidth: "1140px"}}>
            <div className="row ">
              <div className="col-5">
                <img className="img-fluid  rounded-start" style={{maxHeight: "200px"}} src={cloudinaryUrl + item.imageset[0].image} alt={item.name} />
              </div>
              <div className="col">
                <div className="card-body">
                  <p className=''>{item.title}</p>
                  <p><strong>Price: ${item.price}</strong></p>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add subtotal, taxes, and total */}
      <div className="order-summary">
        <h5>Order Summary</h5>
        <p>Total: ${calculateSubtotal(cartItems)}</p>

        {/* Add a "Place Order" button */}
        <button className="place-order-button">Place Order</button>
      </div>

    </div>
  );
};
