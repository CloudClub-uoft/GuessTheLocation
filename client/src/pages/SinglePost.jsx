import React from 'react'
import Edit from "../img/temp2.jpg"
import Delete from "../img/temp3.jpg"
import Menu from "../components/Menu"
import { Link } from 'react-router-dom'

const Single = () => {
  return (
    <div className='single'>
      <div className="content">
        <img src="https://images.pexels.com/photos/5850083/pexels-photo-5850083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <div className="user">
          <img src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>
        <div className='info'>
          <span>Celine</span>
          <p>Posted 2 days ago</p>
        </div>
        <div className="edit">
          <Link to={`/write?edit=$2`}></Link>
          <img src={Edit} alt=""/>
          <img src={Delete} alt=""/>
        </div>
        <h1>Title</h1>
        <p>Some description</p>
      </div>

      <Menu />
    </div>
  )
}

export default Single;