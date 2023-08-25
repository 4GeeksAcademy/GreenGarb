import React, { useState } from 'react';
import axios from 'axios';

const ProductUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    // ... add other state variables for form fields
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('quantity', quantity);
    
  
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + '/api/products',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          }
        );
  
        if (response.status === 201) {
          // Product uploaded successfully, do something (e.g., show a success message)
        } else {
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error uploading product:', error);
        // Handle error (e.g., show an error message)
      }
    };
  
    return (
        <div className="container mt-5">
          <h2 className="mb-4">Upload a New Product</h2>
          
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            {/* Add more form fields with Bootstrap classes */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpload}
            >
              Upload Product
            </button>
          </form>
        </div>
      );
    };
  export default ProductUpload;