import React, { useState } from "react";
import propTypes from "prop-types"

export const Items = (product) => {

    return (

        <div class="card">
            <img src={product.item.image} class="" alt="..." width="200px" />
            <div class="card-body">
                <h5 class="cotton tshirt">{product.item.name}</h5>
                {/* <p class="card-text">Large Mens Cotton tshirt</p>
                <p class="card-text">Womens tshirt</p> */}
                <a href="#" class="btn btn-success">{product.item.size}</a>

            </div>
        </div>
    )


}
Items.propTypes = {
    match: propTypes.object,
}


