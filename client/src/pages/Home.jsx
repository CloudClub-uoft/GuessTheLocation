import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import style from '../style.scss';
import axios from 'axios';
import HomePostCard from '../components/HomePostCard';
import HomeSignupCard from '../components/HomeSignupCard';


const Home = () => {
  //getting userData with postID
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: don't hard code this route - use .env variables
        const response = await axios.get('http://localhost:3000/posts/recent/3');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className='new-home-page'>
      <div className='title-bar'>
        <div className='text-wrapper'>
          <p className='title-prefix'>CloudClub's</p>
          <h1 className='title'>GUESS THE LOCATION</h1>
          <p className='game-description'>The ultimate location guessing game!</p>
        </div>
        <HomeSignupCard />
      </div>
      <div className='text-container'>
        <h2>RECENT POSTS</h2>
      </div>
      
      <div className='postcard-container'>
        {posts.map((post, index, postID) => (
          <HomePostCard
            postID={post.postID}
            key={index}
            username={'@'.concat(post.userID)}
            date={post.postTime.substring(0, 10)}
          />
        ))}
      </div>
      <div className='button-guess-container'>
        <a href='/guess' className='button-guess-page'>Take a Guess</a></div>
    </div>
  )

}

export default Home;
