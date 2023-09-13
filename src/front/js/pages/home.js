import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import shoes from "../../img/shoes.jpeg"
import womensClothing from "../../img/womensClothes.jpeg"
import mensClothes from "../../img/mensClothes.webp"
import blankProfile from "../../img/blankProfile.png"
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

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
						<div className="col-3 rounded womens-box" onClick={ () => navigate('/catalog/womens')} style={{ backgroundImage: 'url(' + womensClothing + ')' }}>
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Womens</p>
						</div>
						
						<div className="col-3 rounded mens-box" onClick={ () => navigate('/catalog/mens')} style={{ backgroundImage: 'url(' + mensClothes + ')' }}>
							<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Mens</p>
						</div>
						<div className="col-3 rounded shoes-box" onClick={ () => navigate('/catalog/shoes')} style={{ backgroundImage: 'url(' + shoes + ')' }}>
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

				<div className="featuredSellerStart">
					<h1>Discover Eco Shops</h1>
					<button type="button" onClick={ () => navigate('/catalog')} className="btn btn-success">Shop from Eco Sellers </button>
				</div>

				<div className="container d-flex p-1 my-5 d-flex justify-content-md-between">

					{/* mapping happens here */}
					<div class="card featuredSellerCards">
						<div className="card-img-div rounded">
						<Link to={'#'}>
							<img class="card-img-top rounded" style={{ backgroundImage: 'url(' + womensClothing + ')' }}/>
						</Link>
						</div>
						<div class="card-body d-flex">
						<div className="circle-img-div rounded-circle">
							<img className="circle-img rounded-circle" style={{ backgroundImage: 'url(' + blankProfile + ')'}}/>
						</div>
						<h5 class="card-title card-title-seller m-auto">seller prop</h5>
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
										<p className='FeaturedDescription'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
							</div>
					</div>	
				</div>

			



		
			
		</div>
	);
};