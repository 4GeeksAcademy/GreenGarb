import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const WomensCatalog = () => {
    const {store, actions} = useContext(Context)
    const cloudinaryUrl="https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"
    const [liked, setliked] = useState(false)
    let params = useParams()
    console.log(params, store.products[0]?.category)
    console.log(store.products)


    //favorite button function
    useEffect(() => {
        if (
            store.favorites.find((x) => {
                for (let i in x) {
                    if (store.products[i] && store.products[i].id === x[i].id) {
                        return true;
                    }
                }
            })
        ) {
            setliked(true);
        } else {
            setliked(false);
        }
    }, [store.favorites]);




    return(
        <div>
            <h1 className="text-center my-5 fw-bold">{params.category}</h1>

            {/* filter menus */}

            <nav className="navbar navbar-expand-lg  navbar-light border border-2 border-bottom-0 lower-nav justify-content-start my-2">

            <div className="container-fluid">
				<button className="navbar-toggler mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#catalogDropDown" aria-controls="catalogDropDown" aria-expanded="false" aria-label="Toggle navigation">
					<span>Filter <span className="fas fa-sliders-h"></span></span>
				</button>

				<div class="collapse navbar-collapse mb-1" id="catalogDropDown">
					<ul class="navbar-nav">

                        <div className="dropdown ms-5 me-1">
                        <button className="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sub-Category
                        </button>
                        <div className="dropdown-menu" aria-labelledby="MensDropDown">
                            <a className="dropdown-item" href="#">Tops</a>
                            <a className="dropdown-item" href="#">Bottoms</a>
                        </div>
                        </div>

                        <div className="dropdown me-2">
                        <button className="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Size
                        </button>
                        <div className="dropdown-menu" aria-labelledby="MensDropDown">
                            <a className="dropdown-item" href="#">Small</a>
                            <a className="dropdown-item" href="#">Medium</a>
                            <a className="dropdown-item" href="#">Large</a>

                        </div>
                        </div>

                        <div className="dropdown me-2">
                        <button className="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Conditon
                        </button>
                        <div className="dropdown-menu" aria-labelledby="MensDropDown">
                            <a className="dropdown-item" href="#">New</a>
                            <a className="dropdown-item" href="#">Used</a>
                        </div>
                        </div>
                    </ul>
                </div>
            </div>


            <div className="dropdown position-absolute end-0 me-3">
            <button className="btn btn-light border border-dark dropdown-toggle sortButton" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort
            </button>
            <div className="dropdown-menu" aria-labelledby="MensDropDown">
                <a className="dropdown-item" href="#">Lowest to Highest Price</a>
                <a className="dropdown-item" href="#">Highest to Lowest Price</a>
            </div>
            </div>

            </nav>

            {/* product selection section */}

            
            <div className="d-flex p-1 catalog-imgs my-5 d-flex justify-content-md-around catalog-row">

                {store.products.filter((item, index) => item.category === params.category).map((product, index) => (
               
               <div className="card col-sm-3 d-flex mb-2" key = {index}>
                <div className="card-img-div">
                    <button className="heart-button btn" onClick={() => {actions.addFavorites(product)}}>
                    <i class="far fa-heart" style={{color: 'red'}}></i>
                    </button>
                    <Link to={`/products/${product.id}`}>
                        <img className="card-img-top" src={cloudinaryUrl+product.imageset[0]?.image} alt="Card image cap"></img>
                    </Link>
                    
                </div>
                   <div className="card-body p-1">
                   <p className="card-title text-center mb-0">{product.title}</p>
                   <p className="text-center">{product.price}</p>
                   <div className="d-flex justify-content-end mt-2">
                       
                       
                   </div>
                   </div>
               </div> 
               ))  }

            
            </div>


        </div>
    )
}