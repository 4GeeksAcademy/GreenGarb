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
    
      
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await actions.createSeller(formData);
      if (response && response.message === 'Seller created successfully') {
        navigate('/yourshop'); // Redirect if the status code is 201
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while creating the seller.');
      }
    }
  };
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="seller-container container">
      <h2>Create Seller</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="seller-form row mb-3 p-3">
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
        <div className="form-group mb-3">
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
        <div className="form-group mb-3">
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
        <div className="form mb-3">
          <label>Profile Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            
          />
        </div>
        <div className="d-grid">
        <button type="submit" className="submit-button btn-success mb-3">
          Create Seller
        </button>
        <button className="btn-secondary" type="button" onClick={handleGoBack}>
        Go Back
        </button>
        </div>
      </form>
    </div>
  );
}

export default Seller;
