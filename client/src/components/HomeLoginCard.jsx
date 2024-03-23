import React, { useState } from 'react';
import axios from 'axios';

const HomeLoginCard = () =>{
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
        <div className='login'>
            <div className='login-card-box'>
                <form onSubmit={handleSubmit}>
                {/* <label className='email-label' for='email'>email</label>
                <input className = 'email-input' type='email' id='email' name='email' required minlength="2" maxlength="50"/> */}
                <label className='username-label' for='username'>username</label>
                <input className='username-input' id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className='pass-label' for='pass'>password</label>
                <input className='password-input' type="password" id="pass" name="password" minlength="4" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='signup-button' type='submit'>SIGN IN</button>
                </form>
            </div>
            
        </div>
    )
}

export default HomeLoginCard;