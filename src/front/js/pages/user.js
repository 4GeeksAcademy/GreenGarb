import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const  User = () => {

    const navigate = useNavigate()
	const { store, actions } = useContext(Context)

	// useEffect = (() => {

	// 	if(!store.token){
	// 		navigate('/login')}
		
	// },[store.token])

    fetch('https://fictional-space-meme-vgj9r5qpp4v26g4r-3001.app.github.dev/api/user',{
        headers:{
            Authorization:'Bearer '+ store.token
        }
    })
    .then(response =>  response.json())
    .then( data => {
        console.log('data', data)
    })
    .catch(error => console.log(error))




    return(

        <>
        <div className="user-header-div justify-content-center d-flex mb-3">
            <div className="user-img-div rounded-circle">
                {/* <img className="user-img" src="https://images.pexels.com/photos/4355345/pexels-photo-4355345.jpeg?auto=compress&cs=tinysrgb&w=600"/> */}
            </div>
            <h2 className="ms-2 align-self-center"> {User.username}username</h2>
        </div>

        <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
            <div className="d-flex justify-content-center">
                
                <ul className="navbar-nav border border-danger col-sm-12">
                    <li className="nav-item  border border-primary">
                    <a className="nav-link active" aria-current="page" href="#">Purchase History</a>
                    </li>
                    <li className="nav-item  border border-primary">
                    <a className="nav-link active" href="#">Favorites</a>
                    </li>
                    <li className="nav-item  border border-primary">
                    <a className="nav-link active" href="#">Edit Profile</a>
                    </li>
                    <li className="nav-item  border border-primary">
                    <Link className="nav-link active" to="/yourshop">Your Shop</Link>
                    </li>
                </ul>
                
            </div>
        </nav>
        
        </>
    )
}