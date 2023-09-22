import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import ShopName from '../component/ShopName';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { update } from 'lodash';



export const EditProduct = () => {
  const { store, actions } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [errorProduct, setErrorProduct] = useState(null)
  const cloudinaryUrl="https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"

  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const productResponse = await axios.get(process.env.BACKEND_URL + `api/products/${id}`);
            setProduct(productResponse.data);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorProduct(error.message);
            setLoading(false);
        }
    };

    if (id) {
        fetchData();
    }
}, [id]);



  const subCategories = {
    mens: ['Tops', 'Bottoms'],
    womens: ['Tops', 'Bottoms'],
    shoes: ['Sneakers', 'Boots', 'Sandals']
  };


  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = FormData();
      formData.set('title', title);
      formData.set('description', description);
      formData.set('price', price);
      formData.set('color', color);
      formData.set('category', category);
      formData.set('sub_category', subCategory);
      formData.set('material', material);
      formData.set('quantity', quantity);
      formData.set('condition', condition);
      formData.set('color', color);
      formData.set('size', size);

      for (let i = 0; i < files.length; i++) {
        formData.append(`file`, files[i]);
      }


      const response = await actions.createProduct(formData);

      if (response) {
        navigate(`/products/${response.id}`);
      } else {
        console.log('Error:', response)
        // Handle other response statuses or errors here
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container ">
      <h2 className="mb-4 text-center">Edit Product</h2>
      <div className="row row mb-3 p-3">
        

        <form className='row' onSubmit={handleUpload}> 
          <div className="mb-3">
            <input
              type="text"
              placeholder='Title'
              className="form-control "
              id="title"
              value={product.title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="6"
              value={product.description}
              onChange={e => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3 col-6">
            <label for="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={product.price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label for="Quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              placeholder='1'
              id="quantity"
              value={product.quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <input
              type="text"
              placeholder='Color'
              className="form-control"
              id="color"
              value={product.color}
              onChange={e => setColor(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <input
              type="text"
              placeholder='Size'
              className="form-control"
              id="size"
              value={product.size}
              onChange={e => setSize(e.target.value)}
              required
            />
          </div>
          {/* Add more form fields with Bootstrap classes */}
          <div className="mb-3">
            <label for="images" className="form-label">
              Images
            </label>
            <input
              type="file"
              className="file-loading w-100"
              id="images"
              multiple
              accept="image/*"
            //   value={product?.imageset?.image}
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
          <div className="mb-3 col-6">
            <select
              className="form-select"
              aria-label="Category"
              value={product.category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Category</option>
              <option value="mens">Men</option>
              <option value="womens">Women</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
          <div className="mb-3 col-6">
            <select
              className="form-select"
              aria-label="Condition"
              value={product.condition}
              onChange={e => setCondition(e.target.value)}
              required
            >
              <option value="" disabled>Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div className="mb-3 col-6">
            <select
              className="form-select"
              aria-label="Subcategory"
              value={product.subCategory}
              onChange={e => setSubCategory(e.target.value)}
              required
            >
              <option value="" disabled>Subcategory</option>
              {subCategories[category] &&
                subCategories[category].map((sub, index) => (
                  <option key={index} value={sub}>{sub}</option>
                ))}
            </select>
          </div>
          <div className="mb-3 col-6">
            <input
              type="text"
              placeholder='Material'
              className="form-control"
              id="material"
              value={product.material}
              onChange={e => setMaterial(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success mb-3"
          >
            Update Product
          </button>
          <button className="btn-secondary mb-3" type="button" onClick={handleGoBack}>
            Go Back
          </button>
          <button className="btn-danger" type="button" onClick={handleGoBack}>
            DELETE
          </button>
        </form>
      </div>
    </div>

  );
};
