import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import axios from "axios";




export const Login = () => {

  const [username, setUsername] =  useState('')
  const [password, setPassword] = useState('')
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
 

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await actions.login(username, password);

      if (!response.error) {
        // Redirect to user profile page on successful login
        navigate(`/user/${store.idUser}`);
      } else {
        // Handle login error here, such as displaying error message to user
        console.error("Login error:", response.error);
      }
    } catch (error) {
      // Handle any other errors that might occur during login
      console.error("An error occurred during login:", error);
    }
  };



  return(

    
    <div className="text-center mt-5">
			<h1>Please Sign In </h1>
			

			<form className="container w-25 p-4 bg-light" onSubmit={(e) => submit(e)}>
			<div className="form-group ">
				<label for="userName">Username</label>
				<input type="text" className="form-control" id="userName" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
			</div>

			<div className="form-group mt-2">
				<label for="loginPassword">Password</label>
				<input type="password" className="form-control" id="loginPassword" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
			</div>

			<div className="form-check d-flex justify-content-center mb-2">
				<input type="checkbox" className="form-check-input me-1" id="dropdownCheck2"></input>
				<label className="form-check-label" for="dropdownCheck2">
				Remember me
				</label>
			</div>
			
			<button type="submit" className="btn btn-primary mt-2">Sign in</button>

			<div className="mt-2">
				<Link to={'./signup'}>
				<a href="#">New User? Create Account Here</a>
				</Link>
			</div>
			</form>
{/* } */}

		</div>
	);
  



}



