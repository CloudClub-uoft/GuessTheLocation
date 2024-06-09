import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import gray_bg_img from "../img/gray_bg.png";

const WritePost = () => {
  const [imagePreview, setImagePreview] = useState(gray_bg_img);
  const [imageSelected, setImageSelected] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploadMessage, setUploadMessage] = useState();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  })

  const [map, setMap] = useState((null));
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [markerKey, setMarkerKey] = useState(0);
  const [coordinates, setCoordinates] = useState(null);
  const [showCoordinates, setShowCoordinates] = useState(false);

  // Image Preview Handler
  function handlePreviewImg(e) {
    setUploadMessage(); // Clear upload message
    let file = e.target.files[0];
    if (file != undefined) {
      // If file is not empty
      setImagePreview(URL.createObjectURL(file));
      setImageSelected(true);
    } else {
      setImagePreview(gray_bg_img);
      setImageSelected(false);
    }
    setFileToUpload(file); // Store the chosen file in variable "fileToUpload"
  }

  // Image Submit Handler
  function handleImgUpload() {
    if (fileToUpload != undefined) {
      // If file is not empty
      const formData = new FormData(); // New formData object to be used in axios
      formData.append("file", fileToUpload);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios
        .post("/posts/postImage", formData, config) // Call to backend API to upload the chosen file
        .then((res) => {
          // Success
          setUploadMessage(
            'Successfully submitted "' + fileToUpload.name + '"!'
          );
        })
        .catch((err) => {
          // TODO: proper error handling
          // Error
          console.log(err);
        });
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
  };

  // Display
  if (isLoaded) {
    return (
      <div className="write">
        <p className="page-title">NEW POST</p>
        <p className="page-tip">
          here's a tip - if you are using your phone, take your photo it in
          landscape mode, on x0.5 zoom for the best quality!
        </p>
        <div className="write__cards">
          <div className="write__left-card">
            <p className="write__left-card-text">
              <b>step 1:</b> upload photo
            </p>
            <label for="getFile">
              <input
                id="getFile"
                type="file"
                name="image"
                accept="image/*"
                onChange={handlePreviewImg}
                hidden
              />
              {/* Same component as Home Post Card but no "a" tag */}
              <div className="home-post">
                <div className="rectangle">
                  <div>
                    <img className="image" src={imagePreview} />
                    {!imageSelected
                      &&
                      <svg className="upload-arrow-image" viewBox="0 0 116 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M59 114.5V4M59 4L4 41M59 4L112 41" stroke="black" stroke-width="8" stroke-linecap="round" />
                      </svg>
                    }
                  </div>
                  <div className="text-wrapper">User 1</div>
                  <div className="text-wrapper-2">Current Date</div>
                </div>
              </div>
            </label>
          </div>

          <div className="write__right-card">
            <p className="write__right-card-text">
              <b>step 2:</b> identify location
            </p>
            <div className="home-post">
              <div className="rectangle">
                <div className="image">
                  <GoogleMap
                    center={center}
                    zoom={2.5}
                    mapContainerClassName='write-post-map-container'
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
                </div>
                <div className="text-wrapper">long: {markerPosition.lat.toFixed(2)}</div>
                <div className="text-wrapper-2">lat: {markerPosition.lng.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <button className="post-submit-button" onClick={handleImgUpload}>SUBMIT</button>
        <p className="upload-message">{uploadMessage}</p>
      </div>
    );
  }
};

export default WritePost;
