import React, { useEffect, useState } from "react";
import Edit from "../img/temp2.jpg";
import Delete from "../img/temp3.jpg";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import axios from "axios";

const Single = () => {
  const [imageURL, setImageURL] = useState();
  const [loaded, setLoaded] = useState(false); // check whether image data is loaded

  useEffect(handleGetImage, []);

  var filename = "CloudClub.png";

  function handleGetImage() {
    console.log(loaded);
    axios
      .get("/getimage", {
        // Call to back-end route
        params: {
          key: filename,
        },
      })
      .then((res) => {
        let imagedata = new Uint8Array(res.data.image.data); // raw data of the image converted to uint8Array

        // let fileExt = res.data.fileExtension;
        var blob = new Blob(
          [imagedata.buffer] /*{ type: "image/" + fileExt }*/
        ); // Create Blob (Binary Large Object) from raw data

        let url = URL.createObjectURL(blob); // Create image source URL from Blob
        setImageURL(url);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="single">
      <div className="content">
        {/* <button onClick={handleGetImage}>Button</button> */}
        {loaded == true ? (
          <img src={imageURL} alt={filename} />
        ) : (
          <h2>loading...</h2>
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
