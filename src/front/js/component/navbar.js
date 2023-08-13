import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"




export const Navbar = () => {
	return (
		<nav className="navbar navbar-light nav-color p-0">
			<div className="container-fluid justify-content-between align-middle">
				<div className="navbar-brand">
					<Link to="/">
						<div className="nav-logo">greengarb</div>
					</Link>
				</div>

				<div className="align-middle input-div col-5">
					<input classname="align-middle w-100" type="text" placeholder="search"></input>
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
	);
};
