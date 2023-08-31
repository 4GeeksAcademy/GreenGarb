import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Product = () => {
    const {store, actions} = useContext(Context)
    let params = useParams()
    let id = parseInt(params.id)
    let item = store.products[id]



    // fetch('https://fictional-space-meme-vgj9r5qpp4v26g4r-3001.app.github.dev/api/product')

    // .then(response =>  response.json())
    // .then( data => {
    //     console.log('data', data)
    // })
    // .catch(error => console.log(error))



    return(

        <div>

            <div className="container d-flex">
                <div className="row w-100 m-0">
                    <div className="product-img-div mb-3 col-sm-6">
                        <img className="product-img" src={item.image}/>
                    </div>

                    <div className="right-side-product-div col-sm-5">
                        <div className="product-specs">
                            <h2>{item.title}</h2>
                            <h5 className="mt-2">{item.price}</h5>
                            {/* <p className="mt-2">Size</p> */}
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
                       <h5>Made Of: {item.material}</h5> 
                    </div>

                    <div className="col-6 mb-3">
                        <h5>Conditon: {item.condition}</h5>
                    </div>
                    
                </div>
                <p>{item.description}</p>
            </div>

                        {/* ------product seller info-------------- */}

                <div className="product-shop-info d-flex justify-content-around mt-3">
                <div className="shop-name"> 
                    <p>shop name prop</p>
                </div>

                <div className="favorite-product">
                    <p><i className="fas fa-heart me-1"></i>Favorite Product</p>
                </div>
            </div>


        </div>
    )
}