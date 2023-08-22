import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const  User = () => {




    return(

        <>
        <div className="user-header-div justify-content-center d-flex mb-3">
            <div className="user-img-div rounded-circle">
                {/* <img className="user-img" src="https://images.pexels.com/photos/4355345/pexels-photo-4355345.jpeg?auto=compress&cs=tinysrgb&w=600"/> */}
            </div>
            <h2 className="ms-2 align-self-center"> user name</h2>
        </div>

        <nav class="navbar navbar-expand-md navbar-light bg-light justify-content-center">
            <div class="d-flex justify-content-center">
                
                <ul class="navbar-nav border border-danger col-sm-12">
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" aria-current="page" href="#">Purchase History</a>
                    </li>
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" href="#">Favorites</a>
                    </li>
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" href="#">Edit Profile</a>
                    </li>
                    <li class="nav-item  border border-primary">
                    <a class="nav-link active" href="#">Your Shop</a>
                    </li>
                </ul>
                
            </div>
        </nav>
        
        </>
    )
}