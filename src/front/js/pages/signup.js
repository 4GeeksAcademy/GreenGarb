import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      navigate("/login");
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
    const name = `${firstName},${lastName}`;
    await actions.signup(email, username, password, name);
    navigate("/login");
  } catch (error) {
    // Handle errors here, such as displaying an error message to the user.
    console.error(error);
  }
};
  return (
    <div className="text-center ">
      <div className="container py-3 mb-3 h-100 ">
        <div className="row d-flex justify-content-start align-items-center h-100 mb-5  ">
          <h2><strong>Sign Up</strong></h2>
        </div>
        <form onSubmit={handleSignup}>
          <div className="row d-flex justify-content-center p-4  create-form">
            <div className="col-md-6">
              <div className="form-group">
                <div className="row text-start">
                  <div className="col">
                    <label htmlFor="first-name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col ">
                    <label htmlFor="last-name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group text-start">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group text-start">
                <label htmlFor="email" className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group text-start">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div class="d-grid">
                <button type="submit" className="btn btn-success">Sign Up</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="container">
      <SignUpForm />
    </div>
  );
}

function App() {
  return <SignUpPage />;
}

export default App;
