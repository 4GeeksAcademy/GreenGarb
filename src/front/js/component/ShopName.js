import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopName = () => {
  const [shopName, setShopName] = useState('');

  useEffect(() => {
    // Fetch the seller's shop name from the backend
    const fetchShopName = async () => {
      try {
        const response = await axios.get('process.env.REACT_APP_BACKEND_URL + /api/seller/shop');
        setShopName(response.shop_name);
      } catch (error) {
        console.error('Error fetching shop name:', error);
      }
    };

    fetchShopName();
  }, []);

  return (
    <div className="seller-shop-name">
      <h3>Shop Name: {shopName}</h3>
    </div>
  );
};

export default ShopName;