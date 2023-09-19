import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import shoes from "../../img/shoes.jpeg"
import womensClothing from "../../img/womensClothes.jpeg"
import mensClothes from "../../img/mensClothes.webp"
import blankProfile from "../../img/blankProfile.png"
import summer_banner from "../../img/summer-banner.jpg"
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"

	const getRandomProducts = () => {
		const products = store.products;
		if (products.length < 4) {
			return products; // If there are fewer than 4 products, return all available products
		} else {
			const randomIndices = [];
			while (randomIndices.length < 4) {
				const randomIndex = Math.floor(Math.random() * products.length);
				if (!randomIndices.includes(randomIndex)) {
					randomIndices.push(randomIndex);
				}
			}
			return randomIndices.map(index => products[index]);
		}
	};
	const sellers = store.seller
	function extractProduct(seller) {
		const featuredProduct = seller.products[0]; // Assuming the first product is featured
		return {
			sellerName: seller.shop_name,
			sellerImage: seller.img,
			sellerId: seller.id,
			featuredProduct: {
				image: featuredProduct?.imageset[0]?.image || '', // Use the first image if available
			},
		};
	}
	const featuredSellers = sellers.slice(2, 5).map(extractProduct);

	// Get 4 random products
	const randomProducts = getRandomProducts();

	return (
		<div className="text-center">

			<div className="container banner mt-5">
				<div className="banner-text position-absolute bottom-0 end-0 pe-4">
					Greengarb
					<p className="homePtags">jumbotron home page banner with big picture</p>
				</div>
			</div>


			{/* catalog */}

			<div className="catalog mt-5 mb-5">
				<div>
					<h2 className="section-titles rounded container">Catalog</h2>
				</div>
				<div className="d-inline-flex row justify-content-around">
					<div className="col-3 rounded womens-box" onClick={() => navigate('/catalog/womens')} style={{ backgroundImage: 'url(' + womensClothing + ')' }}>
						<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Womens</p>
					</div>

					<div className="col-3 rounded mens-box" onClick={() => navigate('/catalog/mens')} style={{ backgroundImage: 'url(' + mensClothes + ')' }}>
						<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Mens</p>
					</div>
					<div className="col-3 rounded shoes-box" onClick={() => navigate('/catalog/shoes')} style={{ backgroundImage: 'url(' + shoes + ')' }}>
						<p className="position-absolute bottom-0 end-0 pe-4 fs-4 text homePtags">Shoes</p>
					</div>
				</div>
			</div>


			{/* popular finds */}

			<div className="popular-finds mt-5 mb-5 text-center">
				<div>
					<h2 className="section-titles rounded container">Popular Finds</h2>
				</div>
				<div className="d-inline-flex flex-wrap justify-content-center ">
					{randomProducts.map((product, index) => (
						<div
							className="col-12 col-md-6 col-lg-3  " // Use Bootstrap's responsive column classes
							key={index}
						>
							<Link
								to={`/products/${product.id}`}
								className="text-decoration-none d-inline-block text-center"
							>
								<div className="popular-finds-div text-center">
									<img
										src={`${cloudinaryUrl}${product.imageset[0]?.image}`}
										alt={`Product ${index}`}
										className="mx-auto"
									/>
									<p className="mt-2">{product.name}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>


			{/* featured sellers */}

			<div className="featured-sellers mt-5 mb-5">
				<div>
					<h2 className="section-titles rounded container">Featured Shops</h2>
				</div>
				<div className="d-inline-flex flex-wrap justify-content-center ">
					<div className=" mt-5 mb-3 p-2 col-12 col-md-6 col-lg-3">
						<p className="mt-5">Local Shops? Green Garb has it.</p>
						<h2 className="">
							Discover shops in the US
						</h2>
						<Link className="" to={'#'}>
							<button type="button" class="btn btn-light btn-lg btn-outline-success">Shop from local makers</button>
						</Link>
					</div>




					{/* mapping happens here */}
					{featuredSellers.map((seller, index) => (
						<div className=" featuredSellerCards mt-5 mb-3 p-2 col-12 col-md-6 col-lg-3" key={index}>

							<div className=" rounded">
								<Link to={'/shop/' + seller.sellerId}>
									<img
										className="featured-product-image mx-auto"
										src={`${cloudinaryUrl}${seller.featuredProduct.image}`}
										alt={`Featured Product ${index}`}

									/>
								</Link>
							</div>
							<div className="card-body text-center">
								<Link to={'/shop/' + seller.sellerId}>
									<div className="d-flex justify-content-center me-5  ">
										<div className="seller-thumbnail me-2">
											<img
												src={`${cloudinaryUrl}${seller.sellerImage}`}
												alt={`Seller ${seller.sellerName}`}
											/>
										</div>
										<div className="shop-name  ">
											<p><strong>{seller.sellerName}</strong></p>


										</div>

									</div>
								</Link>
							</div>


						</div>
					))}
				</div>
			</div>
		</div>
	);
};