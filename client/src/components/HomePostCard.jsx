import React, { useState, useEffect } from 'react';
import style from '../style.scss';
import testPic from '../img/testPic.jpg'
import axios from 'axios';
//Username, date, picture are currently arbitrary. Still need to wrap this in a link and make it clickable
const HomePostCard = ({ username, date, postID }) => { //image to be added as a parameter
    const [image, setImage] = useState()
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get('http://localhost:3000/posts/image/'+ postID);
                setImage(Buffer.from(response.data.image, "binary").toString("base64"))
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };
        fetchImage();
    });
    return (
        <a href='/post/:id' className='home-post'>
            <div className="rectangle">
                <div className="text-wrapper">{username}</div>
                <div className="text-wrapper-2">{date}</div>
            </div>
            <img className="image" alt="image retrieval failed" src={`data:image/jpeg;base64,${image}`} />
        </a>
    )   
}

export default HomePostCard