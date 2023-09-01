import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

function Seller() {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error messages

  const [formData, setFormData] = useState({
    shop_name: '',
    description: '',
    email: '',
    address: '',
    img: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const img = event.target.files;
    setFormData({
      ...formData,
      img: img[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await actions.createSeller(formData);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while creating the seller.');
      }
    }
  };

  return (
    <div className="seller-container">
      <h2>Create Seller</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="seller-form">
        <div className="form-group">
          <label htmlFor="shop_name">Shop Name</label>
          <input
            type="text"
            id="shop_name"
            name="shop_name"
            value={formData.shop_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="img">Profile Image</label>
          <input
            type="file"
            className="form-control-file"
            id="img"
            name="img"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Seller
        </button>
      </form>
    </div>
  );
}

export default Seller;
