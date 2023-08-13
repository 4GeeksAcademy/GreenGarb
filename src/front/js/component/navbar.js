import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"




export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-success p-0">
			<div className="container-fluid justify-content-between">
				<div className="navbar-brand">
					<Link to="/Contact">
						<div className="nav-logo"></div>
					</Link>
				</div>

				<div className="d">
					<input type="text" placeholder="search"></input>
				</div>

				<div className="icons position-absolute end-0 me-5 justify-content-between">
					<i class="fas fa-heart fa-xl me-2"></i>
					<i class="fas fa-cart-arrow-down fa-xl me-2"></i>
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
