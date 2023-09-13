import React, { Component } from "react";
import "../../styles/footer.css"
import { Link } from "react-router-dom";

export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<div className="footer-content footer content">

			<footer>
				<div className="container">
					<div className="row justify-content-center">
						<ul className="footerlist">
							<li>
								<h3>Shop</h3>
								<Link to={'/signup'}>Register</Link>
							</li>
							<li>
								<h3>Sell</h3>
								<a href="#">Start Selling</a>
							</li>

							<li>
								<h3>About</h3>
								<Link to={'/aboutus'}>Our Ethical Approach</Link>
							</li>
							<li>
								<h3>Help</h3>
								<Link to={'/contact'}>Contact US</Link>
							</li>


						</ul>



						<p className="copyright">copyright 2023</p>
					</div>

				</div>

			</footer>

		</div>
	)
};










