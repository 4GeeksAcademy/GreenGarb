import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import blankProfile from "../../img/blankProfile"
import { User } from "./user";


export const Yourshop = () => {

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
                <div className="user-img-div rounded-circle" style={{ backgroundImage:`url(${blankProfile})` }}>
                    {/* <img className="user-img" src="https://images.pexels.com/photos/4355345/pexels-photo-4355345.jpeg?auto=compress&cs=tinysrgb&w=600"/> */}
                </div>
                    <h2 className="ms-2 align-self-center"><i class="fa-solid fa-store"></i>shop name</h2>
                
            </div>
            <div className="p-3 text-md-center">shop descriptoin about their store and products and whatnot tops tees short recycled brandname etc.........</div>

            <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
            <div className="d-flex justify-content-center">
                
                <ul className="navbar-nav col-sm-12">
                    <li className="nav-item sellers-menu">
                    <a className="nav-link active" aria-current="page" href="#">Selling History</a>
                    </li>
                    <li className="nav-item sellers-menu">
                    <a className="nav-link active" href="#">Favorites</a>
                    </li>
                    <li className="nav-item sellers-menu">
                    <a className="nav-link active" href="#">Add Items</a>
                    </li>
                    <li className="nav-item sellers-menu">
                    <a className="nav-link active" href="#">Pending Orders</a>
                    </li>
                </ul>
                
            </div>

        </nav>

        <h1 className="text-center">Selling</h1>

        <div className="sellers-listing">

            {/* {products.map((product, index) => (
               
               <div className="card w-25 d-flex me-2" key = {index}> 
               <img className="card-img-top" src="https://www.nawpic.com/media/2020/star-wars-nawpic-23.jpg" alt="Card image cap"></img>
                   <div className="card-body">
                   <h5 className="card-title">{product.title}</h5>
                   <div className="d-flex justify-content-end mt-2">
                       <a className="btn btn-danger me-1" onClick={() => {actions.addFavorite(product.price)}}>
                           <i class="fa fa-heart ms-1"></i>
                       </a>
                       <Link to={'/product/' + product.id} className="btn btn-primary">Learn More</Link>
                   </div>
                   </div>
               </div> 
               ))  } */}
        </div>
        </>
    )
}