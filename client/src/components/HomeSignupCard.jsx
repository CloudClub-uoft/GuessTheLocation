import React from 'react';

const HomeSignupCard = () =>{
    return (
        <div className='signup'>
            <div className='signup-card-box'>
                <label className='email-label' for='email'>email</label>
                <input className = 'email-input' type='email' id='email' name='email' required minlength="2" maxlength="50"/>
                <label className='username-label' for='username'>username</label>
                <input className='username-input' id="username" name="username" type="text" required/>
                <label className='pass-label' for='pass'>password</label>
                <input className='password-input' type="password" id="pass" name="password" minlength="8" required />
            </div>
            <button className='signup-button' type='button'>SIGN UP</button>
        </div>
    )
}

export default HomeSignupCard;