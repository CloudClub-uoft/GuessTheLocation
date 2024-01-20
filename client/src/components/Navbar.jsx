import React from 'react'
import Logo from "../img/logo.png"
import {Link} from 'react-router-dom'

const OldNavbar = () =>{
  return (
    <div className="old-navbar">
      <div className='container'>
        <div className='logo'>
          <img src={Logo} alt="logo" />
        </div>
        <div className='links'>
          <Link className='link' to="/?cat=art">
            <h6>My Guesses</h6>
          </Link>
          <Link className='link' to="/?cat=art">
            <h6>Something else</h6>
          </Link>
          <span>Name</span>
          <span>Logout</span>
          <span className="post">
            <Link className="link" to="/post">Post</Link>
          </span>
        </div>
      </div>
    </div>
    
  )
}

const Navbar = () => {
  
  return (
    <div className="navbar">
      <div className='about-github-buttons'>
        <a className='about-button'>ABOUT</a>
        <a href='https://github.com/CloudClub-uoft/GuessTheLocation' target = '_blank' className='github-button'>GITHUB</a>
      </div>
      <img className='logo' src={Logo} alt='CloudClub logo'></img>
      <a href='/login' className='signin-button'>SIGN-IN</a>
    </div>
  )
}



export default Navbar;