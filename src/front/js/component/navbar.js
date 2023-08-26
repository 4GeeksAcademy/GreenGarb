import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useContext } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"
import greenGarb from "../../img/greenGarb.png"




export const Navbar = () => {

	// const navigate = useNavigate()
	// const { store, actions } = useContext(Context)

	// useEffect = (() => {

	// 	if(!store.token){
	// 		navigate('/login')}
	// 	else {
	// 		navigate('/user/id')}
		
	// },[store.token])



	return (
		<div>
		<nav className="navbar navbar-light nav-color p-0">
			<div className="container-fluid justify-content-around align-middle">
				<div className="navbar-brand">
					<Link to="/">
						<div className="nav-logo">
							<img className="logo ms-3" src={greenGarb}></img>
						</div>
					</Link>
				</div>

				<div className="align-middle input-div col-5">
					<input classname="nav-input w-100" type="text" placeholder="search"></input>
				</div>

				<div className="icons position-absolute end-0 me-5 justify-content-between">
					<Link to='/favorites'><i className="fas fa-heart fa-xl me-2"></i></Link>
					<Link to='/cart'><i className="fas fa-cart-arrow-down fa-xl me-2"></i></Link>
					<Link to="/user"><i className="fas fa-user fa-xl"></i></Link>
				</div>

				<div className="ml-auto">
				</div>
			</div>
		</nav>


			{/*------------catalog menu---------------------------------------------------- */}


		<nav className="navbar navbar-expand-lg  navbar-light bg-light lower-nav justify-content-start mb-5">
			<div className="container">
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">

					<div className="dropdown me-3">
					<button className="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Mens
					</button>
					<div className="dropdown-menu" aria-labelledby="MensDropDown">
						<a className="dropdown-item" href="#">Tops</a>
						<a className="dropdown-item" href="#">Bottoms</a>
					</div>
					</div>


					
					<div className="dropdown me-3">
					<button className="btn btn-light border border-dark dropdown-toggle" type="button" id="WomensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Womens
					</button>
					<div className="dropdown-menu" aria-labelledby="WomensDropDown">
						<a className="dropdown-item" href="#">Tops</a>
						<a className="dropdown-item" href="#">Bottoms</a>
					</div>
					</div>


					<div className="dropdown me-3">
					<button className="btn btn-light border border-dark dropdown-toggle" type="button" id="ShoesDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Shoes
					</button>
					<div className="dropdown-menu" aria-labelledby="ShoesDropDown">
						<a className="dropdown-item" href="#">Sneakers</a>
						<a className="dropdown-item" href="#">Boots</a>
						<a className="dropdown-item" href="#">Sandals</a>
					</div>
					</div>
					</ul>
				</div>
			</div>
		</nav>

		
		
		</div>
	);
};
