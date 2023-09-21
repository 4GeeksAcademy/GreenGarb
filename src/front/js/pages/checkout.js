import React, { useState } from 'react';
import "../../styles/checkout.css";
import CartPage from './cartpage';

export const Checkout = () => {





  const { cartItems, shippingAddress, paymentInfo } = useState([]);

  console.log(CartPage.items)


  return (
    <div className='checkout-container'>
      <h2 className='checkoutHeader'>Checkout</h2>
      <div className='p-1 justify-content-end d-flex m-0'>

        {/* <ul> */}
        <CartPage />
        {/* {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))} */}
        {/* </ul> */}
      </div>
      <div>
        <h3>Shipping Address</h3>
        <input className='checkoutInput'
          type="text"
          name="shippingAddress"
          value={shippingAddress}
        // onChange={this.handleInputChange}

        />
      </div>
      <div>
        <h3>Payment Information</h3>
        <input
          type="text"
          name="paymentInfo"
          value={paymentInfo}
        // onChange={this.handleInputChange}

        />
      </div>
      {/* <button onClick={this.handleCheckout} className={styles.button}>Checkout</button> */}
    </div>
  );



}
