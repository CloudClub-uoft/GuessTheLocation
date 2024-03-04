import React, { useEffect, useState } from "react";
import Edit from "../img/temp2.jpg";
import Delete from "../img/temp3.jpg";
import Menu from "../components/Menu";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Single = () => {
  const [loaded, setLoaded] = useState(false); // whether image data has been received from axios
  const [imageURL, setImageURL] = useState();   // image URL generated from image data
  const { id } = useParams();   // post id

  useEffect(handleGetImage, []); 

  // var filename = "CloudClub.png";  // Hardcoded image key

  function handleGetImage() {
    axios
      .get("/getimage", {
        // Call to back-end API
        params: {
          key: id,
        },
      })
      .then((res) => {
        let imagedata = new Uint8Array(res.data.image.data); // raw data of the image converted to uint8Array

        // let fileExt = res.data.fileExtension;
        var blob = new Blob(
          [imagedata.buffer] /*{ type: "image/" + fileExt }*/
        );    // Create Blob (Binary Large Object) from raw data

        let url = URL.createObjectURL(blob); // Create image source URL from Blob
        setImageURL(url);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
      });
  }

  return (
    <div className="single">
      <div className="content">
        {/* <button onClick={handleGetImage}>Button</button> */}
        {imageURL ? (
          <img src={imageURL} alt={id} />
        ) : (
          loaded && <h2>Post Not Found!</h2>
        )}

        {/* <img src="https://images.pexels.com/photos/5850083/pexels-photo-5850083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> */}
        <div className="user">
          <img src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>
        <div className="info">
          <span>Celine</span>
          <p>Posted 2 days ago</p>
        </div>
        <div className="edit">
          <Link to={`/write?edit=$2`}></Link>
          <img src={Edit} alt="" />
          <img src={Delete} alt="" />
        </div>
        <h1>Title</h1>
        <p>Some description</p>
      </div>

      <Menu />
    </div>
  );
};

export default Single;
