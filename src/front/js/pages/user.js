import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import blankProfile from "../../img/blankProfile.png"




export const  User = () => {

    const navigate = useNavigate()
	const { store, actions } = useContext(Context)
    const [userData, setUserData] = useState()



	useEffect (() => {

		if(!store.token){
			navigate('/login')}
        else {
                fetch('https://fictional-space-meme-vgj9r5qpp4v26g4r-3001.app.github.dev/api/user',{
            headers:{
                Authorization:'Bearer '+ store.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response =>  response.json())
        .then( data => {
            setUserData(data)  
        })
        .catch(error => console.log(error))
        
        }
		
	},[store.token])

        console.log(userData)
    
 



    return(

        <>
        <div className="user-header-div justify-content-center d-flex mb-3">
            <div className="user-img-div rounded-circle" style={{ backgroundImage: 'url(' + blankProfile + ')', backgroundSize: 'contain' }}>
                {/* <img className="user-img" src="https://images.pexels.com/photos/4355345/pexels-photo-4355345.jpeg?auto=compress&cs=tinysrgb&w=600"/> */}
            </div>
            <h2 className="ms-2 align-self-center"> {userData && userData.username || 'Loading'}</h2>
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
                    <a className="nav-link active" href="#">Edit Profile</a>
                    </li>
                    <li className="nav-item user-menu">
                    <Link className="nav-link active" to="/yourshop">Your Shop</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" onClick={() => actions.logout()} to="/">logout</Link>
                    </li>
                </ul>
                
            </div>
        </nav>
        
        </>
    )
}