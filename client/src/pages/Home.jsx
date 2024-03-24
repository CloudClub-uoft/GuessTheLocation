import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import style from '../style.scss';
import axios from 'axios';
import HomePostCard from '../components/HomePostCard';
import HomeSignupCard from '../components/HomeSignupCard';


const Home = () =>{
  
  let user1 = 'tester_111';
  let user2 = 'tester_123';
  let user3 = 'tester_567';

  let userString1 = '@'.concat(user1);
  let userString2 = '@'.concat(user2);
  let userString3 = '@'.concat(user3);

  let postDate = "10/12/2111";


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
        <HomePostCard
          username={userString1}
          date={postDate}
          className='postcard-1'
          key='postcard-1'
        />
        <HomePostCard
          username={userString2}
          date={postDate}
          className='postcard-2'
          key='postcard-2'
        />
        <HomePostCard
          username={userString3}
          date={postDate}
          className='postcard-3'
          key='postcard-3'
        />

      </div>
      <div className='button-guess-container'>
        <a href='/guess' className='button-guess-page'>Take a Guess</a>
      </div>
    </div>
  )

}

export default Home;
