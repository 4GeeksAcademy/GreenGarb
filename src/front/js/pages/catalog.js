import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const Catalog = () => {
    const {store, actions} = useContext(Context)



    fetch('https://fictional-space-meme-vgj9r5qpp4v26g4r-3001.app.github.dev/api/product')

    .then(response =>  response.json())
    .then( data => {
        console.log('data', data)
    })
    .catch(error => console.log(error))



    return(
        <div>
            <h1 className="text-center my-5 fw-bold">title prop </h1>

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
               
               <div className="card w-25 d-flex me-2" key = {index}> 
               <img className="card-img-top" src={product.image} alt="Card image cap"></img>
                   <div className="card-body">
                   <h5 className="card-title">{product.title}</h5>
                   <div className="d-flex justify-content-end mt-2">
                       {/* <a className="btn btn-danger me-1" onClick={() => {actions.addFavorite(product.price)}}>
                           <i class="fa fa-heart ms-1"></i>
                       </a> */}
                       <Link to={'/product/' + index} className="btn btn-primary">Learn More</Link>
                   </div>
                   </div>
               </div> 
               ))  }

                {/* <div className="border border-dark col-3">
                    <Link to='#'>prodcut 123..</Link>
                </div>

                <div className="border border-dark col-3">
                    <Link to='#'>prodcut 123..</Link>
                </div>

                <div className="border border-dark col-3">
                    <Link to='#'>prodcut 123..</Link>
                </div>

                <div className="border border-dark col-3">
                    <Link to='#'>prodcut 123..</Link>
                </div> */}
            </div>


        </div>
    )
}