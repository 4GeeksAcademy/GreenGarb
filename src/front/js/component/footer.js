import React, { Component } from "react";
import "../../styles/footer.css"

export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<div class="footer content">

			<footer>
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-sm-4 col-md-3 item">
							<h3>Shop</h3>
							<ul>
								<li><a href="#">Register</a></li>
							</ul>
						</div>
						<div class="col-sm-4 col-md-3 item">
							<h3>Sell</h3>
							<ul>
								<li><a href="#">Start Selling</a></li>
							</ul>
						</div>
						<div class="col-sm-4 col-md-3 item">
							<h3>About</h3>
							<ul>
								<li><a href="#">Our Ethical Approach</a>                              </li>
							</ul>
						</div>
						<div class="col-sm-4 col-md-3 item">
							<h3>Help</h3>
							<ul>
								<li><a href="#">Contact Us</a></li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
};










