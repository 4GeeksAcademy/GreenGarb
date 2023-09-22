import react from "react";
import React, { useState, useContext } from "react";
import "../../styles/cartpage.css";
import { medium } from "@cloudinary/url-gen/qualifiers/fontHinting";
import { Items } from "../component/items";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";





const CartPage = () => {
    const { actions, store } = useContext(Context)
    const navigate = useNavigate()
    const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"

    // const cartTotal = (price) => {
    //     let price = store.product.price

    // }


    return (
        <div className="cartContainer container mb-5">

            {store.cart.map((item, index) => (
                
                <div className="cartRows d-flex justify-content-between col-md-6 mb-2 border border-light border-2 rounded">
                    <div className="leftSideCart d-flex">
                        <div className="cartProductImg">
                            <Link to={`/products/${item.id}`}>
                                <img className="card-img-top" src={cloudinaryUrl + item.imageset[0].image} />
                            </Link>
                        </div>

                        <div className="cartProductDetail">
                            <p className="ms-2">{item.title}</p>
                            <p className="ms-2 fw-bold">${item.price}</p>
                            <p className="ms-2">{item.size}</p>
                            <button className="cartTrash btn" onClick={() => { actions.removeFromCart(item) }}>
                                <i class="fas fa-trash-alt" style={{ color: 'red' }}></i>
                            </button>
                        </div>
                    </div>
                </div>   

            ))}


            {(store.cart && store.cart !== null) ?
            <div className="cartTotal m-auto justify-content-center col-md-4">
                <div className="border-bottom  border-2 d-flex justify-content-between">
                    <p>Item(s)</p>
                    <p>price</p>
                </div>
                <div className="border-bottom  border-2 d-flex justify-content-between pt-1">
                    <p>Shipping</p>
                    <p>FREE</p>
                </div>
                <div className="fw-bold d-flex justify-content-between pt-1">
                    <p>Total</p>
                    <p>Total</p>
                </div>
                <button className="checkoutBtn btn btn-success">
                  Checkout
                </button>
            </div>
             : nothing }

            <div>  
                <h2 className="m-auto text-center fw-bold">Your Cart is Empty</h2>
                <div className="emptyCart"></div>
            </div>
        </div>
    )

};

export default CartPage;
