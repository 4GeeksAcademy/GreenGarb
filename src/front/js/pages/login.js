import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      console.log('Login successful!');
      console.log(`Username: ${username}`);
    } else {
      console.log("Please fill in all fields.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="container">
      <Login />
    </div>
  );
}

function App() {
  return <LoginPage />;
}

export default App;
