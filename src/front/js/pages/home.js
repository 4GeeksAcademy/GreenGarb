import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			
			<div className="container banner mt-5">
				<div className="banner-text position-absolute bottom-0 end-0 pe-4">
					<h1>Bootstrap big banner picture</h1>
					<p>jumbotron home page banner with big picture</p>
				</div>
			</div>

				
				{/* catalog */}

			<div className="catalog mt-5 mb-5">
				<div>
					<h2 className="section-titles rounded container">Catalog</h2>
				</div>
					<div className="d-inline-flex row justify-content-around">
						<div className="col-3 img-boxes rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">Womens</p>
						</div>
						<div className="col-3 img-boxes rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">Mens</p>
						</div>
						<div className="col-3 img-boxes rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">Shoes</p>
						</div>
					</div>
			</div>


				{/* popular finds */}

				<div className="popular-finds mt-5 mb-5">
				<div>
					<h2 className="section-titles rounded container">Popular Finds</h2>
				</div>
				<div className="d-inline-flex row justify-content-around">
						<div className="col-3 img-boxes rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">Recycled Clothing</p>
						</div>
						<div className="col-3 img-boxes rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">Organic Fibers</p>
						</div>
						<div className="col-3 img-boxes rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">Hemp</p>
						</div>
						<div className="col-3 img-boxes rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">Sustainably Made</p>
						</div>
					</div>
				</div>


				{/* featured sellers */}

				<div className="featured-sellers mt-5 mb-5">
					<h2 className="section-titles rounded container">Featured Shops</h2>
				</div>
				<div className="container">
					<div className="row">
						<div className="shop-boxes col-6">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text">shop name</p>
						</div>
							<div className="col-6">
								<div className="sub-boxes">
									<div className="row">
										<div className="img-box col-4"></div>
										<div className="img-box col-4"></div>
										<div className="img-box col-4"></div>
									</div>
								</div>
									<div className="shop-bottom">
										<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
							</div>
					</div>	
				</div>


			



		
			
		</div>
	);
};
