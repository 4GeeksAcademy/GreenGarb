import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			
			<div className="container banner mt-5">
				<div className="col-12 banner-text mx-0">
					<h1>Bootstrap big banner picture</h1>
					<p>jumbotron home page banner with big picture</p>
				</div>
			</div>

			<div className="catalog mt-5 mb-5">
				<div>
					<h2>Catalog</h2>
				</div>
				<div className="d-inline-flex row justify-content-around">
					<div className="col-3">
						<img src="https://lh3.googleusercontent.com/-w-vj8zhs9sk/WtsrbrEnwUI/AAAAAAAAdXU/BcxGl8WGWr04BgPpJzzrrjNnBveAWOOVQCHMYCw/s0/african-women-fashion-styles0951.jpg" className="img-boxes rounded" alt="..."></img>
					</div>
					<div className="col-3">
						<img src="https://lh3.googleusercontent.com/-w-vj8zhs9sk/WtsrbrEnwUI/AAAAAAAAdXU/BcxGl8WGWr04BgPpJzzrrjNnBveAWOOVQCHMYCw/s0/african-women-fashion-styles0951.jpg" className="img-boxes rounded" alt="..."></img>
					</div>
					<div className="col-3">
						<img src="https://lh3.googleusercontent.com/-w-vj8zhs9sk/WtsrbrEnwUI/AAAAAAAAdXU/BcxGl8WGWr04BgPpJzzrrjNnBveAWOOVQCHMYCw/s0/african-women-fashion-styles0951.jpg" className="img-boxes rounded" alt="..."></img>
					</div>
				</div>

				<div className="popular-finds mt-5 mb-5">
				<div>
					<h2>Popular Finds</h2>
				</div>
				<div className="d-inline-flex row justify-content-around">
					<div className="col-3">
						<img src="https://lh3.googleusercontent.com/-w-vj8zhs9sk/WtsrbrEnwUI/AAAAAAAAdXU/BcxGl8WGWr04BgPpJzzrrjNnBveAWOOVQCHMYCw/s0/african-women-fashion-styles0951.jpg" className="img-boxes rounded" alt="..."></img>
					</div>
					<div className="col-3">
						<img src="https://lh3.googleusercontent.com/-w-vj8zhs9sk/WtsrbrEnwUI/AAAAAAAAdXU/BcxGl8WGWr04BgPpJzzrrjNnBveAWOOVQCHMYCw/s0/african-women-fashion-styles0951.jpg" className="img-boxes rounded" alt="..."></img>
					</div>
					<div className="col-3">
						<img src="https://lh3.googleusercontent.com/-w-vj8zhs9sk/WtsrbrEnwUI/AAAAAAAAdXU/BcxGl8WGWr04BgPpJzzrrjNnBveAWOOVQCHMYCw/s0/african-women-fashion-styles0951.jpg" className="img-boxes rounded" alt="..."></img>
					</div>
					<div className="col-3">
						<img src="https://lh3.googleusercontent.com/-w-vj8zhs9sk/WtsrbrEnwUI/AAAAAAAAdXU/BcxGl8WGWr04BgPpJzzrrjNnBveAWOOVQCHMYCw/s0/african-women-fashion-styles0951.jpg" className="img-boxes rounded" alt="..."></img>
					</div>
				</div>
				</div>

				<div className="featured-sellers mt-5 mb-5">
					<h2>Featured Shops</h2>
				</div>


			</div>



		
			
		</div>
	);
};
