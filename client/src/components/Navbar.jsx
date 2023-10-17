import React from 'react'
import Logo from "../img/temp1.jpg"
import {Link} from 'react-router-dom'

const Navbar = () => {
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
}

export default Navbar;