import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import axios from "axios";
import "../../styles/home.css";
import blankProfile from "../../img/blankProfile.png"


export const Shop = () => {

    const navigate = useNavigate()
    const [sellerData, setSellerData] = useState(null);
    const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"
    const { sellerId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.BACKEND_URL + `api/sellers/${sellerId}`);
                setSellerData(response.data); // Use response.data to set sellerData
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [sellerId]);
    

    return (

        <>
            {sellerData && (
                <div>
                    <div className="user-header-div justify-content-center d-flex mb-3">
                        <div className="user-img-div-parent rounded-circle">
                            <img className="user-img-div rounded-circle"
                                src={sellerData && sellerData.img ? cloudinaryUrl + sellerData.img : blankProfile}
                                alt="Profile"
                            />
                        </div>
                        <h2 className="ms-2 align-self-center"><i class="fa-solid fa-store"></i>{sellerData.shop_name}</h2>

                    </div >
                    <div className="p-3 text-md-center">{sellerData.description}</div>

                    <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
                        <div className="d-flex justify-content-center">

                        <h1 className="text-center">Selling</h1>

                        </div>

                    </nav>


                    {/* sellers-listing */}

                    <div className="sellers-listing justify-content-center  row p-4 gx-0">
                        {sellerData.products?.map((product, index) => (
                            <div className="card col-sm-3 d-flex mb-2 me-2" key={index}>
                                <div className="card-img-div">
                                    
                                    <Link to={'/products/' + product.id}>
                                        <img className="card-img-top" src={cloudinaryUrl + product.imageset[0].image} />
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <h5 className="card-title">${product.price}</h5>
                                    <div className="d-flex justify-content-end mt-2">

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}