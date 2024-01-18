import React from 'react'
import Logo from "../img/logo.png"
import {Link} from 'react-router-dom'

const Navbar = () => {
  /*
  return (
    <div className="navbar ">
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
  */
  return (
    <div className="navbar">
      <button className='about-button'>ABOUT</button>
      <button className='github-button'>GITHUB</button>
      <img className='logo' src={Logo} alt='CloudClub logo'></img>
      <button className='signin-button'>SIGN-IN</button>
    </div>
  )
}



export default Navbar;