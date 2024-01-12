import React from 'react';
import style from '../style.scss'; 
import testPic from '../img/testPic.jpg'


//Username, date, picture are currently arbitrary. Still need to wrap this in a link and make it clickable
const HomePostCard = ({username, date}) =>{
    return(
        <div className='home-posts'>
            <div className='home-posts-group'>
                <div className="overlap-group">
                    <div className="rectangle">
                        <div className="text-wrapper">{username}</div>
                        <div className="text-wrapper-2">{date}</div>
                    </div>
                    <img className="image" alt="test image" src={testPic}/>
                </div>
            </div>
        </div>
    )
}

export default HomePostCard