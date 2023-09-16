import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import axios from 'axios';


const EditProfile = () => {
  const {store, actions } = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log
    const name = `${firstName.trim()}, ${lastName.trim()}`;
    const formData = new FormData();
    console.log(files)
    if (name.trim() !== ',') {
      formData.append('name', name);
    }
    if (email.trim() !== '') {
      formData.append('email', email);
    }
    if (newPassword.trim() !== '') {
      formData.append('new_password', newPassword);
    }
    if (files && files[0]) {
      formData.append('profile_image', files[0]);
    }
  
    console.log('Form Data:', formData); 

    try {
      await actions.updateUserProfile(formData);
      navigate('/user');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  
  };
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="container"> 
      <h2>Edit Profile</h2>
      <form className='row mb-3 p-3' onSubmit={handleSubmit}>
      
          <div className="row mb-3">
                  <div className="col p-0">
                    <label htmlFor="first-name" >
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col ps-3 pe-0">
                    <label htmlFor="last-name" >
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}/>
                      </div>

        </div>
        <div className="row mb-3">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="row mb-3">
          <label for="inputPassword2" >New Password:</label>
          <input type="password" className="form-control" id="inputPassword2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="row mb-3">
          <label>Profile Picture:</label>
          <input type="file"  onChange={ e=>setFiles(e.target.files)} />
        </div>
        <div className="row mb-3">
        <button className='btn-success mb-3' type="submit">Update Profile</button>
        <button className="btn-secondary" type="button" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

