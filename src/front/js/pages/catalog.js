import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const Catalog = () => {



    return(
        <div>
            <h1 className="text-center my-2 fw-bold">title prop </h1>

            <nav className="navbar navbar-light border border-2 border-bottom-0 lower-nav justify-content-start my-2">

            <div class="dropdown ms-5 me-3">
            <button class="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sub-Category
            </button>
            <div class="dropdown-menu" aria-labelledby="MensDropDown">
                <a class="dropdown-item" href="#">Tops</a>
                <a class="dropdown-item" href="#">Bottoms</a>
            </div>
            </div>

            <div class="dropdown ms-5 me-3">
            <button class="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Size
            </button>
            <div class="dropdown-menu" aria-labelledby="MensDropDown">
                <a class="dropdown-item" href="#">Small</a>
                <a class="dropdown-item" href="#">Medium</a>
                <a class="dropdown-item" href="#">Large</a>

            </div>
            </div>

            <div class="dropdown ms-5 me-3">
            <button class="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Conditon
            </button>
            <div class="dropdown-menu" aria-labelledby="MensDropDown">
                <a class="dropdown-item" href="#">New</a>
                <a class="dropdown-item" href="#">Used</a>
            </div>
            </div>

            <div class="dropdown ms-5 me-3">
            <button class="btn btn-light border border-dark dropdown-toggle" type="button" id="MensDropDown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort
            </button>
            <div class="dropdown-menu" aria-labelledby="MensDropDown">
                <a class="dropdown-item" href="#">Lowest to Highest Price</a>
                <a class="dropdown-item" href="#">Highest to Lowest Price</a>
            </div>
            </div>


            </nav>


        </div>
    )
}