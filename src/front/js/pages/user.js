import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import blankProfile from "../../img/blankProfile.png"




export const User = () => {

    const navigate = useNavigate()
	const { store, actions } = useContext(Context)
    const [userData, setUserData] = useState({})


    useEffect(() => {

        if (!sessionStorage.getItem('token')) {
            navigate('/login')
        } else {
            // Fetch user data if the user is authenticated
            actions.fetchUserData();
            setUserData(userData)
        }
    }, [store.token]);
    console.log(store.user)



    return (

        <>
            {sessionStorage.getItem('token') ? (
                <div>
                    <div className="user-header-div justify-content-center d-flex mb-3">
                        <div className="user-img-div-parent rounded-circle">
                        <img
                            className="user-img-div rounded-circle "
                            src={store.user && store.user.pictures ? cloudinaryUrl + store.user.pictures : blankProfile}
                            alt="Profile"

                        />
                        </div>
                        <h2 className="ms-2 align-self-center"> <i className="fa-solid fa-user"></i> {store.user.username || "Loading..."}</h2>
                    </div>

                    <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
                        <div className="d-flex justify-content-center">

                            <ul className="navbar-nav col-sm-12">
                                <li className="nav-item user-menu">
                                    <a className="nav-link active" aria-current="page" href="#">Purchase History</a>
                                </li>
                                <li className="nav-item user-menu">
                                    <Link className="nav-link active" to="/favorites">Your Favorites</Link>
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
                </div>
            ) : (
                // Render a message or component when not authenticated
                <div>
                    <p>Please log in to access this page.</p>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </>
    );
};