import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-success">
			<div className="container">
				<Link to="/Contact">
					<span className="navbar-brand mb-0 h1">Greengarb</span>
				</Link>
				<div className="ml-auto">
				</div>
			</div>
		</nav>
	);
};
