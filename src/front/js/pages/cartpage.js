import react from "react";
import React, { useState } from "react";
import "../../styles/cartpage.css";
import { medium } from "@cloudinary/url-gen/qualifiers/fontHinting";
import { Items } from "../component/items";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Link } from "react-router-dom";





const CartPage = () => {
    // ...
    const items = [{ name: "$30", size: "Mens Greengarb Cotton T", image: "https://cdni.llbean.net/is/image/wim/224547_7101_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2" },
    { name: "$45", size: "Women's Brushed Plaid Jacket", image: "https://cdni.llbean.net/is/image/wim/520825_0_44?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2" },
    { name: "$95", size: "Women's Navy and Blue Hoodie", image: "https://cdni.llbean.net/is/image/wim/520372_0_46?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2" }]



    return (
        <div style={{ width: "100%" }}>
            <form className="my-form">
                <div className="form-header text-center">
                    <h1>My Cart</h1>

                </div>
                <div className="products gap-2 justify-content-center d-flex m-0">

                    {items.map((tshirts, index) => {
                        return (
                            <Items key={index} item={tshirts} />
                        )
                    }
                    )}
                </div>
                <div className="d-flex justify-content-center">

                    <div className="card checkout">
                        <ul className="list-group">
                            <li className="list-group-item col-6">subtotal $170.00 </li>
                            <li className="list-group-item col-6">total $190.40</li>
                            <Link to="/Checkout">
                                <button type="button" class="btn btn-outline-success btn-sm col-6">Checkout</button>
                            </Link>



                        </ul>


                    </div>
                </div>






            </form>


        </div>
    )

};

export default CartPage;
