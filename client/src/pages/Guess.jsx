import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import style from '../style.scss';
import axios from 'axios';
import HomePostCard from '../components/HomePostCard';
import HomeSignupCard from '../components/HomeSignupCard';

const Guess = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    })

    const [map, setMap] = useState((null));
    const [center, setCenter] = useState({ lat: 0, lng: 0 })
    const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
    const [markerKey, setMarkerKey] = useState(0);
    const [coordinates, setCoordinates] = useState(null);
    const [showCoordinates, setShowCoordinates] = useState(false);
    const [distance, setDistance] = useState("N/A");
    const [score, setScore] = useState(0);

    // For navigating between the three panels
    const [selectedPanel, setSelectedPanel] = useState(null);
    const handleOnClick = (panel, event) => {
        setSelectedPanel(panel);
        if (panel === 'map') {
            updateCoordinates(event);
        }
    }


    const onClickMap = (e) => {
        setMarkerPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
        setMarkerKey(markerKey + 1);
        setShowCoordinates(false);
        setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        axios
            .post('/make_guess/process_guess', { lat: e.latLng.lat(), lng: e.latLng.lng() })
            .then((res) => {
                setDistance(res.data.distance);
                setScore(res.data.score);
            })
            .catch((err) => {
                // TODO: better error handling
                console.log(err);
            })
    };

    const updateCoordinates = (e) => {
        setCoordinates(markerPosition);
        setShowCoordinates(true);

        e.preventDefault();
        axios.post('/make_guess', coordinates)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    };


    // For the actual website we'll make a call to the backend to get images dynamically
    const dummy_posts = [

    ];
    const commonLoad = (
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
                            <button>Take a Guess</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    if (!isLoaded) {
        return commonLoad;
    }
    else {
        return (
            <>
                {commonLoad}
                <div className='home2'>

                    <div className='button_container'>
                        <button className='topMap' onClick={(event) => handleOnClick('map', event)}>TAKE A GUESS</button>
                        <button className='topMap' onClick={() => handleOnClick('post')}>VIEW POST</button>
                        <button className='topMap' onClick={() => handleOnClick('leaderboard')}>LEADERBOARD</button>
                    </div>

                    {selectedPanel === 'map' &&
                        <GoogleMap
                            center={center}
                            zoom={2.5}
                            mapContainerClassName='guess-panel-container'
                            options={{
                                streetViewControl: false,
                                fullscreenControl: false,
                                gestureHandling: 'greedy',
                                minZoom: 2.5,
                            }}
                            onLoad={map => setMap(map)}
                            onClick={onClickMap}
                        >
                            <Marker key={markerKey} position={markerKey ? markerPosition : { lat: null, lng: null }} />
                        </GoogleMap>
                    }
                    {(selectedPanel === 'map' && showCoordinates) && (
                        <div>
                            <p>Latitude: {coordinates ? coordinates.lat : ''}</p>
                            <p>Longitude: {coordinates ? coordinates.lng : ''}</p>
                        </div>
                    )}
                    {selectedPanel === 'post' && <><div className='guess-panel-container'>Post</div></>}
                    {selectedPanel === 'leaderboard' && <><div className='guess-panel-container'>Leaderboard</div></>}
                    <p> Distance: {Math.round(distance)} km, Score: {Math.round(score)} pts</p>
                </div>
            </>
        );
    }
}

export default Guess;