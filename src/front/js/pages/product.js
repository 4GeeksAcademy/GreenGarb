import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";
import axios from 'axios';
import Spinner from "../component/Spinner";


export const Product = () => {
    const [seller, setSeller] = useState({});
    const [product, setProduct] = useState({});
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingSeller, setLoadingSeller] = useState(true);
    const [errorProduct, setErrorProduct] = useState(null);
    const [errorSeller, setErrorSeller] = useState(null);

    const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/";
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(process.env.BACKEND_URL + `api/products/${id}`);
                setProduct(productResponse.data);
                setLoadingProduct(false);

                const sellerid = productResponse.data.seller_id;

                const sellerResponse = await axios.get(process.env.BACKEND_URL + `api/sellers/${sellerid}`);
                setSeller(sellerResponse.data);
                setLoadingSeller(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorProduct(error.message);
                setLoadingProduct(false);
                setErrorSeller(error.message);
                setLoadingSeller(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);


    // Define a function to render error messages
    const renderError = (error) => (
        <div className="error-message">
            <p>Error: {error}</p>
        </div>
    );
    const activeIndex = 0;
    const numImages = product.imageset?.length || 0;

    return (
        <div>
            {loadingProduct || loadingSeller ? (
                <Spinner /> 
            ) : errorProduct || errorSeller ? (
                // Display error message if an error occurred
                renderError(errorProduct || errorSeller)
            ) : (
                // Render the product details once data is available
                <div className="container d-flex">
                    <div className="row w-100 m-0 first-product-row">
                        <div className="product-img-div mb-3 col-sm-7">
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    {product.imageset?.map((image, index) => (
                                        <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
                                            <img
                                                src={`${cloudinaryUrl}${image.image}`}
                                                className="d-block w-100"
                                                alt={`Image ${index}`}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {numImages > 1 && (
                                    <>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="favorite-product">
                                <p><i className="fas fa-heart heartIcon me-1"></i>Favorite Product</p>
                            </div>
                        </div>

                        <div className="right-side-product-div col-sm-5">

                            <div className="product-shop-info d-flex my-2">
                                <div className="seller-thumbnail me-2">
                                    <img src={seller && seller.img ? cloudinaryUrl + seller.img : blankProfile}
                                        alt="Seller"
                                    />
                                </div>
                                <div className="shop-name ms">
                                    <p><strong>{seller.shop_name}</strong></p>
                                </div>
                            </div>
                            <div className="product-specs">
                                <h2>{product.title}</h2>
                                <h4 className="mt-2">${product.price}</h4>
                                <h5 className="mt-2">Conditon:{product.condition}</h5>
                                <h5 className="mt-2">Made Of: {product.material}</h5>
                                <p className="mt-0 mb-0">Size: {product.size}</p>
                                <p className="mt-0">Color: {product.color}</p>
                            </div>

                            <div className="product-description container ps-0 mt-4">
                                <div className="product-tags row gx-0 ">
                                    <strong>Description:</strong>

                                </div>
                                <p>{product.description}</p>
                            </div>

                            <div className="product-actions mb-3">
                                <button className="product-button d-block"> Add to Cart</button>
                                <button className="product-button d-block mt-3">Buy Now</button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div >
    )
}