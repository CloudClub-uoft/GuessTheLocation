import React, { useState } from 'react';
import axios from 'axios';

const HomeSignupCard = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
  
  
    const handleSubmit = async (e) => {
      console.log("handle submit");
      e.preventDefault();
  
      try {
        const response = await axios.post('/auth/register', {username, email, firstname, lastname, password});
  
        // Handle the response as needed (e.g., show a success message)
        console.log('Registration successful:', response.data);
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('Registration failed:', error);
      }
    };
    
    return (
        <div className='signup'> 
            <div className='signup-card-box'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='email-label' for='email'>Email:</label>
                        <input className = 'email-input' type='email' id='email' name='email' required minlength="2" maxlength="50" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label className='username-label' for='username'>Username:</label>
                        <input className='username-input' id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label className='firstname-label' for='firstname'>First name:</label>
                        <input className='firstname-input' id="firstname" name="firstname" type="text" required value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                    </div>
                    <div>
                        <label className='lastname-label' for='lastname'>Last name:</label>
                        <input className='lastname-input' id="lastname" name="lastname" type="text" required value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    </div>
                    <div>
                        <label className='pass-label' for='pass'>Password: </label>
                        <input className='password-input' type="password" id="pass" name="password" minlength="4" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className='signup-button' type='submit'>SIGN UP</button> {/* Better to let button stay inside <form> to let handleSubmit work without error. */}
                </form>
            </div>   
        </div>
    )
}

export default HomeSignupCard;