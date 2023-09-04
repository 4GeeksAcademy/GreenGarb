import React, { Component } from "react";
import "../../styles/footer.css"

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
								<a href="#">Register</a>
	  						</li>
							<li>
								<h3>Sell</h3>
								<a href="#">Start Selling</a>	
						    </li>
							
							<li>
								<h3>About</h3>
								<a href="#">Our Ethical Approach</a> 
                            </li>
							<li>
								<h3>Help</h3>
								<a href="#">Contact Us</a>
							</li>	


						</ul>



						<p className="copyright">copyright 2023</p>
					</div>

				</div>

			</footer>

		</div>
	)
};










