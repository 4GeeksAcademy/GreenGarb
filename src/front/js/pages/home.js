import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			
			<div className="container banner mt-5">
				<div className="banner-text position-absolute bottom-0 end-0 pe-4">
					<h1>Bootstrap big banner picture</h1>
					<p className="homePtags">jumbotron home page banner with big picture</p>
				</div>
			</div>

				
				{/* catalog */}

			<div className="catalog mt-5 mb-5">
				<div>
					<h2 className="section-titles rounded container">Catalog</h2>
				</div>
					<div className="d-inline-flex row justify-content-around">
						<div className="col-3 rounded womens-box">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Womens</p>
						</div>
						
						<div className="col-3 rounded mens-box">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Mens</p>
						</div>
						<div className="col-3 rounded shoes-box">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Shoes</p>
						</div>
					</div>
			</div>


				{/* popular finds */}

				<div className="popular-finds mt-5 mb-5">
				<div>
					<h2 className="section-titles rounded container">Popular Finds</h2>
				</div>
				<div className="d-inline-flex row justify-content-around">
						<div className="col-3 recycle-box rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Recycled Clothing</p>
						</div>
						<div className="col-3 organic-box rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Organic Fibers</p>
						</div>
						<div className="col-3 hemp-box rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Hemp</p>
						</div>
						<div className="col-3 sustain-box rounded">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Sustainably Made</p>
						</div>
					</div>
				</div>


				{/* featured sellers */}

				<div className="featured-sellers mt-5 mb-5">
					<h2 className="section-titles rounded container">Featured Shops</h2>
				</div>

				<div className="container featured-seller ">
					<div className="d-flex h-100">
						<div className="shop-img col-6">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">shop name</p>
						</div>

							<div className="col-6 right-side-shop">
									<div className="d-flex shop-img-div">
										<img className="img-box col-4" src="https://images.pexels.com/photos/8916600/pexels-photo-8916600.jpeg?auto=compress&cs=tinysrgb&w=600"/>
										<img className="img-box col-4" src="https://images.pexels.com/photos/8916600/pexels-photo-8916600.jpeg?auto=compress&cs=tinysrgb&w=600"/>
										<img className="img-box col-4" src="https://images.pexels.com/photos/8916600/pexels-photo-8916600.jpeg?auto=compress&cs=tinysrgb&w=600"/>
									</div>
								

									<div className="shop-bottom">
										<p className='homePtags'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
							</div>
					</div>	
				</div>

				<div className="container featured-seller ">
					<div className="d-flex h-100">
						<div className="shop-img col-6">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">shop name</p>
						</div>

							<div className="col-6 right-side-shop">
									<div className="d-flex shop-img-div">
										<img className="img-box col-4" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"/>
										<img className="img-box col-4" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"/>
										<img className="img-box col-4" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"/>
									</div>
								

									<div className="shop-bottom">
										<p className='homePtags'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
							</div>
					</div>	
				</div>

				<div className="container featured-seller">
					<div className="d-flex h-100">
						<div className="shop-img col-6">
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">shop name</p>
						</div>

							<div className="col-6 right-side-shop">
									<div className="d-flex shop-img-div">
										<img className="img-box col-4" src="https://images.pexels.com/photos/6311602/pexels-photo-6311602.jpeg?auto=compress&cs=tinysrgb&w=600"/>
										<img className="img-box col-4" src="https://images.pexels.com/photos/6311602/pexels-photo-6311602.jpeg?auto=compress&cs=tinysrgb&w=600"/>
										<img className="img-box col-4" src="https://images.pexels.com/photos/6311602/pexels-photo-6311602.jpeg?auto=compress&cs=tinysrgb&w=600"/>
									</div>
								

									<div className="shop-bottom">
										<p className='homePtags'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
							</div>
					</div>	
				</div>

			



		
			
		</div>
	);
};