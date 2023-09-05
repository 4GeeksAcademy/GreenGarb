import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const ShoesCatalog = () => {
    const {store, actions} = useContext(Context)
    const cloudinaryUrl="https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"



    useEffect(() => {
      // Fetch products when the component mounts
      actions.fetchProducts();
    }, []);




    return(
        <div>
            <h1 className="text-center my-5 fw-bold"> Shoes </h1>

            {/* filter menus */}

            <nav className="navbar navbar-light border border-2 border-bottom-0 lower-nav justify-content-start my-2">

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

            <div className="dropdown position-absolute end-0 me-3">
            <button className="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort
            </button>
            <div className="dropdown-menu" aria-labelledby="MensDropDown">
                <a className="dropdown-item" href="#">Lowest to Highest Price</a>
                <a className="dropdown-item" href="#">Highest to Lowest Price</a>
            </div>
            </div>

            </nav>

            {/* product selection section */}

            <div className="container-fluid catalog-imgs my-5 d-flex justify-content-between">

                {store.products.map((product, index) => (
               
               <div className="card col-sm-3 d-flex me-1 " key = {index}>
                <div className="card-img-div">
                    <button className="heart-button btn" >
                    <i class="far fa-heart" style={{color: 'red'}}></i>
                    </button>
                    <Link to={'/product/' + index}>
                        <img className="card-img-top" src={cloudinaryUrl+product.imageset[0]} alt="Card image cap"></img>
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

            {/* onClick={() => {actions.addFavorite(product.index)}} */}
            </div>


        </div>
    )
}