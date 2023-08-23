import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
import greenGarb from "../../img/greenGarb.png"




export const Navbar = () => {
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
					<input classname="nav-input w-100  m-0" type="text" placeholder="search"></input>
				</div>

				<div className="icons position-absolute end-0 me-5 justify-content-between">
					<i class="fas fa-heart fa-xl me-2">
						<Link to='/favorites'></Link>
					</i>
					<i class="fas fa-cart-arrow-down fa-xl me-2">
						<Link to='/cart'></Link>
					</i>
					<i class="fas fa-user fa-xl">
						<Link to="/user"></Link>
					</i>
				</div>

				<div className="ml-auto">
				</div>
			</div>
		</nav>


			{/*------------catalog menu---------------------------------------------------- */}


		<nav className="navbar navbar-light bg-light lower-nav justify-content-start mb-5">

			<div class="dropdown ms-5 me-3">
			<button class="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Mens
			</button>
			<div class="dropdown-menu" aria-labelledby="MensDropDown">
				<a class="dropdown-item" href="#">Tops</a>
				<a class="dropdown-item" href="#">Bottoms</a>
			</div>
			</div>


			
			<div class="dropdown me-3">
			<button class="btn btn-light border border-dark dropdown-toggle" type="button" id="WomensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Womens
			</button>
			<div class="dropdown-menu" aria-labelledby="WomensDropDown">
				<a class="dropdown-item" href="#">Tops</a>
				<a class="dropdown-item" href="#">Bottoms</a>
			</div>
			</div>


			<div class="dropdown me-3">
			<button class="btn btn-light border border-dark dropdown-toggle" type="button" id="ShoesDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Shoes
			</button>
			<div class="dropdown-menu" aria-labelledby="ShoesDropDown">
				<a class="dropdown-item" href="#">Sneakers</a>
				<a class="dropdown-item" href="#">Boots</a>
				<a class="dropdown-item" href="#">Sandals</a>
			</div>
			</div>
		</nav>

		
		
		</div>
	);
};
