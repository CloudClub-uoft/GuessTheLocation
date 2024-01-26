import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    console.log("handle submit");
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', {
        username,
        password
      });

      
      console.log('Login successful!', response.data);
      // Handle successful login, e.g., set authentication tokens, redirect, etc.
    } catch (error) {
      console.error('Login failed!', error);
      // Handle login failure, show error message, etc.
    }
  };
  
  return (
    <div className='auth'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>


  )
}

export default Login