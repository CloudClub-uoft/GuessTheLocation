import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api";
import style from '../style.scss'

const Home = () => {

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  })
  
  const [map,setMap] = useState(/** @type google.maps.Map*/ (null));
  const center = {lat:0,lng:0};
  const [markerPosition, setMarkerPosition] = useState({lat:44,lng:-80});
  const [markerKey,setMarkerKey] = useState(0);
  const [coordinates,setCoordinates] = useState(null);
  const [showCoordinates,setShowCoordinates] = useState(false);

  const onClickMap = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setMarkerKey(markerKey + 1);
    setShowCoordinates(false);
    setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const updateCoordinates = () =>{
    setCoordinates(markerPosition);
    setShowCoordinates(true);
  };
  
  
  // For the actual website we'll make a call to the backend to get images dynamically
  const dummy_posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/5850083/pexels-photo-5850083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/5117913/pexels-photo-5117913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/5282269/pexels-photo-5282269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    
    {
      id: 4,
      title: "Lorem, ipsum.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam ipsa modi eligendi?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloribus nulla voluptatem optio. In doloremque quibusdam optio debitis provident odit.",
      img: "https://images.pexels.com/photos/1684885/pexels-photo-1684885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 7,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, mollitia?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptate aspernatur veniam voluptatem dolorum illo.",
      img: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  if (!isLoaded){
    return (
      <div className='home'>
        <div className='posts'>
          {dummy_posts.map(post => (
            <div className='post' key={post.id}>
              <div className='img'>
                <img src={post.img} alt="" />
              </div>
              <div className='content'>
                <Link to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Make a Guess</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  else{
    return(
      <div className='home'>
        <div className='posts'>
          {dummy_posts.map(post => (
            <div className='post' key={post.id}>
              <div className='img'>
                <img src={post.img} alt="" />
              </div>
              <div className='content'>
                <Link to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Make a Guess</button>
              </div>
            </div>
          ))}
        </div>

        <button onClick = {updateCoordinates}> GOOGLE GUESS </button>
        <GoogleMap 
          center={markerPosition} 
          zoom={2.5} 
          mapContainerClassName='map-container'
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            minZoom: 2.5,
          }}
          onLoad={map => setMap(map)}
          onClick={onClickMap}
          > 
          <Marker key={markerKey} position={markerPosition}/>
        </GoogleMap>
        {showCoordinates && (
          <div>
            <p>Latitude: {coordinates ? coordinates.lat : ''}</p>
            <p>Longitude: {coordinates ? coordinates.lng : ''}</p>
          </div>
        )}
      </div>
    ) 
  }        
}

export default Home;

