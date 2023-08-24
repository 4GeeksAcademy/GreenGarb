import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Yourshop = () => {

	// const navigate = useNavigate()
	// const { store, actions } = useContext(Context)

	// useEffect = (() => {

	// 	if(!store.token){
	// 		navigate('/login')}
		
	// },[store.token])

    return(

        <>
            <div className="user-header-div justify-content-center d-flex mb-3">
                <div className="user-img-div rounded-circle">
                    {/* <img className="user-img" src="https://images.pexels.com/photos/4355345/pexels-photo-4355345.jpeg?auto=compress&cs=tinysrgb&w=600"/> */}
                </div>
                    <h2 className="ms-2 align-self-center"><i class="fa-solid fa-store"></i> shop name</h2>
            </div>

            <nav class="navbar navbar-expand-md navbar-light bg-light justify-content-center">
            <div class="d-flex justify-content-center">
                
                <ul class="navbar-nav border border-danger col-sm-12">
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" aria-current="page" href="#">Selling History</a>
                    </li>
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" href="#">Favorites</a>
                    </li>
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" href="#">Add Items</a>
                    </li>
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" href="#">Pending Orders</a>
                    </li>
                </ul>
                
            </div>

        </nav>

        <h1 className="text-center">Selling</h1>
        </>
    )
}