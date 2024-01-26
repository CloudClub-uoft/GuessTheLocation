import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const WritePost = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploadMessage, setUploadMessage] = useState();

  // Preview Image
  function handlePreviewImg(e) {
    setUploadMessage()
    let file = e.target.files[0];
    if (file != undefined) {
      setImagePreview(URL.createObjectURL(file));
    }
    setFileToUpload(file);
  }

  function handleImgUpload() {
    if (fileToUpload != undefined) {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      console.log(fileToUpload);
      axios
        .post("/postupload", formData, config)
        .then((res) => {
          console.log(res);
          setUploadMessage('Successfully uploaded "' + fileToUpload.name + '"!');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // var formData = new FormData();
    // var imagefile = document.querySelector('#file');
  }

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" />
        <div>IMAGE PREVIEW</div>
        <img width={350} src={imagePreview} />
        <h3>{uploadMessage}</h3>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b> Status: </b> Draft
          </span>
          <span>
            <b> Visibility: </b> Public
          </span>

          {/** 
          <input style={{display:"none"}} type="file" id="file"/>
          <label htmlFor="file">Upload Image</label>
          */}

          {/* <form action="/postupload" method="POST" encType="multipart/form-data"> */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handlePreviewImg}
          />
          <div class="col-md-12 text-right">
            <button onClick={handleImgUpload}>Upload Image</button>
          </div>
          {/* </form> */}

          <div className="buttons">
            <button>Save as draft</button>

            {/* <button>Upload Image</button> */}
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <input type="radio" name="temp" value="temp1" id="temp1" />
          <label htmlFor="temp1">temp1</label>
          <input type="radio" name="temp" value="temp2" id="temp2" />
          <label htmlFor="temp2">temp2</label>
          <input type="radio" name="temp" value="temp3" id="temp3" />
          <label htmlFor="temp3">temp3</label>
          <input type="radio" name="temp" value="temp4" id="temp4" />
          <label htmlFor="temp4">temp4</label>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
