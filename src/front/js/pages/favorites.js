import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import blankProfile from "../../img/blankProfile.png"


export const Favorites = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [sellerData, setSellerData] = useState(null);
    const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!sessionStorage.getItem('token')) {
                    navigate('/login');
                } else {
                    const data = await actions.fetchSellerData();
                    setSellerData(data);

                }
            } catch (error) {
                console.error('Error fetching seller data:', error);
            }
        };

        fetchData();

    }, []);

    return (

        <>
            <div className="user-header-div justify-content-center d-flex mb-3">
                <div className="user-img-div-parent rounded-circle">
                <img className="user-img-div rounded-circle"
                    src={sellerData && sellerData.img ? cloudinaryUrl + sellerData.img : blankProfile}
                    alt="Profile"
                />
                </div>

            </div >

            <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
                        <div className="d-flex justify-content-center">

                            <ul className="navbar-nav col-sm-12">
                                <li className="nav-item user-menu">
                                    <a className="nav-link active" aria-current="page" href="#">Purchase History</a>
                                </li>
                                <li className="nav-item user-menu">
                                    <Link className="nav-link active" to="/user/edit">Edit Profile</Link>
                                </li>
                                <li className="nav-item user-menu">
                                    {store.user && Array.isArray(store.user.seller) && store.user.seller.length === 0 ? (
                                        <Link className="nav-link active" to="/newstore">
                                            New Shop
                                        </Link>
                                    ) : (
                                        <Link className="nav-link active" to="/yourshop">
                                            Your Shop
                                        </Link>
                                    )}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" onClick={() => actions.logout()} to="/">logout</Link>
                                </li>
                            </ul>

                        </div>
                    </nav>


                    {/* sellers-listing */}

            <h1 className="text-center">Your Favorites</h1>

            <div className="d-flex p-1 catalog-imgs my-5 d-flex justify-content-md-around catalog-row">
                {sellerData?.products.map((product, index) => (
                    <div className="card col-sm-3 d-flex mb-2" key={index}>
                        <div className="card-img-div">
                            <button className="trashButton">
                            <i class="fas fa-trash-alt" style={{color: 'red'}}></i>
                            </button>
                            <Link to={'/products/' + product.id}>
                              <img className="card-img-top" src={cloudinaryUrl + product.imageset[0].image}/>
                            </Link>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <div className="d-flex justify-content-end mt-2">

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}