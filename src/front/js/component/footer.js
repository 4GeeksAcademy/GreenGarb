import React, { Component } from "react";
import "../../styles/footer.css"

export const Footer = () => {
	const year = new Date().getFullYear();

	return (<footer className="footer mt-auto py-3 text-center">
		<div class="shop">
			<div class="card-header">
				Shop
			</div>
			<div class="card-body">

				<p>site map</p>
				<p>register</p>


			</div>
		</div>
		<div class="shop">
			<div class="card-header">
				Sell
			</div>
			<div class="card-body">
				<p>
					seller faq
				</p>

				<p>start selling</p>

			</div>
		</div>


		<div class="shop">
			<div class="card-header">
				about
			</div>
			<div class="card-body">
				<p>
					about us
				</p>

				<p>our ethical approach</p>

			</div>
		</div>
		<div class="shop">
			<div class="card-header">
				Help
			</div>
			<div class="card-body">
				<p>
					contact us
				</p>

			</div>
		</div>
		{/* <div>
			<p>All Rights Reserved</p>

		</div> */}


	</footer>)
};










