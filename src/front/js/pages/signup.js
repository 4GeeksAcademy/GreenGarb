import React, { useState } from 'react';

function createElement(tag, attributes = {}, children = []) {
  const Element = React.createElement(tag, attributes, ...children);
  return Element;
}

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && email && password) {
      console.log('Registration successful!');
      console.log(`Username: ${username}`);
      console.log(`Email: ${email}`);
    } else {
      console.log('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button onClick={handleRegister}>Register</button>
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
