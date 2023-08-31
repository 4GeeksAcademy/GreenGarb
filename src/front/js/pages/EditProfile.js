import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import axios from 'axios';


const EditProfile = () => {
  const {store, actions } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [files, setFiles] = useState(null);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log
    const formData = new FormData();
    console.log(files)
    formData.append('profile_image', files[0]);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('new_password', newPassword);
    console.log('Form Data:', formData); 

    try {
      await actions.updateUserProfile(formData);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file"  onChange={ e=>setFiles(e.target.files)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;

