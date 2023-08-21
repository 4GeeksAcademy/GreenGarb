import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Product = () => {



    return(

        <div>

            <div className="container d-flex">
                <div className="row w-100 m-0">
                    <div className="product-img-div mb-3 col-sm-6">
                        <img className="product-img" src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600"/>
                    </div>

                    <div className="right-side-product-div col-sm-5 border border-primary">
                        <div className="product-specs">
                            <h2>prop title</h2>
                            <p className="mt-2">$Price</p>
                            <p className="mt-2">Size</p>
                        </div>

                        <div className="product-actions border border-primary">
                            <button className="product-button d-block mt-3"> Add to Cart</button>
                            <button className="product-button d-block mt-3">Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>


            {/*---------product description section------------------------ */}


            <div className="product-description container mt-4">
                <div className="product-tags row">
                    <div className="col-6">
                       <h5>Made Of:</h5> 
                    </div>

                    <div className="col-6">
                        <h5>Conditon:</h5>
                    </div>
                    
                </div>
                <p>description props lorem lskdi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>


        </div>
    )
}