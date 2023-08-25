import React, { useState } from 'react';
import axios from 'axios';
import ShopName from '../component/ShopName';

const ProductUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = e => {
    const newImages = Array.from(e.target.files);
    setImages(newImages);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('color', color);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('condition', condition);
      formData.append('color', color);
      formData.append('size', size);
      formData.append('images', images);


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
        console.log(response.data)
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
    <div className="container-xxl bd-gutter mt-3 my-md-4 ">
      <h2 className="mb-4 text-center">Add Product</h2>
      <div className="row ">
        <aside className="bd-sidebar mt-4 col-3">
          <nav className="left-nav" role="navigation" aria-label="Secondary navigation">
            <div className="group-hd mb-3"><strong>Store's Name</strong></div>
            {/* <div className="group-hd mb-3"><SellerShopName /></div> */}
            <ul className='list-unstyled pb-3'>
              <li className="mb-3">My Listing</li>
              <li className="mb-3">Pending order</li>
              <li className="mb-3">Selling History</li>
              <li className="mb-3">Message</li>
              <li className="mb-3">Go Back</li>
            </ul>
          </nav>
        </aside>

        <main className="bd-main order-1 col">
          <form className='row'>
            <div className="mb-3">
              <input
                type="text"
                placeholder='Product name'
                className="form-control"
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="6"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3 col-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                placeholder='1'
                id="quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3 col-6">
              <input
                type="text"
                placeholder='Color'
                className="form-control"
                id="color"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
            </div>
            <div className="mb-3 col-6">
              <input
                type="text"
                placeholder='Size'
                className="form-control"
                id="size"
                value={size}
                onChange={e => setSize(e.target.value)}
              />
            </div>
            {/* Add more form fields with Bootstrap classes */}
            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Images
              </label>
              <input
                type="file"
                className="form-control"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3 col-6">
            <select
              className="form-select"
              aria-label="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="" disabled>Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
          <div className="mb-3 col-6">
            <select
              className="form-select"
              aria-label="Condition"
              value={condition}
              onChange={e => setCondition(e.target.value)}
            >
              <option value="" disabled>Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpload}
            >
              Upload Product
            </button>
          </form>
        </main>
      </div>
    </div>

  );
};
export default ProductUpload;