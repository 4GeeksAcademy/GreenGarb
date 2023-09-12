import React, { useContext, useState, useEffect } from "react";
import { Context } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";
import { Actions } from "@cloudinary/url-gen";


export const Product = (props) => {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState()
    const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"
    const params = useParams()
    const productDetail = params.id
    console.log('product Detail', productDetail)
    


    useEffect(() => {
        // Fetch products when the component mounts
        const id = params.id        

        // Fetch the product using the API
        if(productDetail){
        fetch(process.env.BACKEND_URL + `api/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
        }
    }, [productDetail]);

    console.log('imageset', product.imageset)


    // useEffect(() => {
    //     actions.fetchOneProduct();
    // }, [])


    return (

        <div>

            <div className="container d-flex">
                <div className="row w-100 m-0">
                    <div className="product-img-div mb-3 col-sm-6">
                        <img className="product-img" src={cloudinaryUrl+product.imageset?.image}/>
                    </div>

                    <div className="right-side-product-div col-sm-5">
                        <div className="product-specs">
                            <h2>{product.title}</h2>
                            <h5 className="mt-2">{product.price}</h5>
                            <p className="mt-2">{product.size}</p>
                        </div>

                        <div className="product-actions">
                            <button className="product-button d-block"> Add to Cart</button>
                            <button className="product-button d-block mt-3">Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>


            {/*---------product description section------------------------ */}


            <div className="product-description container mt-4">
                <div className="product-tags row">
                    <div className="col-sm-6 mb-3">
                        <h5>Made Of: {product.material}</h5>
                    </div>

                    <div className="col-6 mb-3">
                        <h5>Conditon: {product.condition}</h5>
                    </div>

                </div>
                <p>{product.description}</p>
            </div>

            {/* ------product seller info-------------- */}

            <div className="product-shop-info d-flex justify-content-around mt-3">
                <div className="shop-name">
                    <p><i class="fa-solid fa-store"></i>{product.shopName}</p>
                </div>

                <div className="favorite-product">
                    <p><i className="fas fa-heart heartIcon me-1"></i>Favorite Product</p>
                </div>
            </div>
    


        </div>
    )
}