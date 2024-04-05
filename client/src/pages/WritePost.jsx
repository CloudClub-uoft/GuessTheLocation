import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import upload_arrow_img from "../img/upload-arrow.png";

const WritePost = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploadMessage, setUploadMessage] = useState();

  // Preview Image
  function handlePreviewImg(e) {
    setUploadMessage(); // Clear upload message
    let file = e.target.files[0];
    if (file != undefined) {
      // If file is not empty
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
    setFileToUpload(file); // Store the chosen file in variable "fileToUpload"
  }

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
            'Successfully uploaded "' + fileToUpload.name + '"!'
          );
        })
        .catch((err) => {
          // TODO: proper error handling
          // Error
          console.log(err);
        });
    }
  }

  return (
    <div className="write">
      <p className="page-title">NEW POST</p>
      <p className="page-tip">
        here’s a tip - if you are using your phone, take your photo it in
        landscape mode, on x0.5 zoom for the best quality!
      </p>
      <div className="write__cards">
        <div className="write__left-card">
          <p className="write__left-card-text">
            <b>step 1:</b> upload photo
          </p>
          {/* Same component as Home Post Card but no "a" tag */}
          <div className="home-post">
            <div className="rectangle">
              <div className="text-wrapper">User 1</div>
              <div className="text-wrapper-2">Current Date</div>
            </div>
            <div>
              <a href>
                <label for="getFile">
                  <img
                    className="image upload-arrow-image"
                    
                    alt="test image"
                    src={upload_arrow_img}
                    
                  />
                </label> 
                
              </a>
              <input
                type="file"
                name="image"
                accept="image/*"
                id="getFile"
                onChange={handlePreviewImg}
                className=""
              />
            </div>
          </div>
        </div>

        <div className="write__right-card">
          <p className="write__right-card-text">
            <b>step 2:</b> identify location
          </p>
          <div className="home-post">
            <div className="rectangle">
              <div className="text-wrapper">User 1</div>
              <div className="text-wrapper-2">Current Date</div>
            </div>
            <img className="image" alt="test image" />
          </div>
        </div>
      </div>

      <div>IMAGE PREVIEW</div>
      <img width={500} src={imagePreview} />
      <h3>{uploadMessage}</h3>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handlePreviewImg}
      />
      <div class="col-md-12 text-right">
        {/* Upload button */}
        <button onClick={handleImgUpload}>Upload Image</button>
      </div>
    </div>

    // <div className="add">
    //   <div className="content">
    //     {/* <input type="text" placeholder="Title" /> */}
    //     <div>IMAGE PREVIEW</div>
    //     {/* Image to Preview */}
    //     <img width={350} src={imagePreview} />
    //     <h3>{uploadMessage}</h3>
    //   </div>
    //   <div className="menu">
    //     <div className="item">
    //       {/* <h1>Publish</h1>
    //       <span>
    //         <b> Status: </b> Draft
    //       </span>
    //       <span>
    //         <b> Visibility: </b> Public
    //       </span> */}

    //       <input
    //         type="file"
    //         name="image"
    //         accept="image/*"
    //         onChange={handlePreviewImg}
    //       />
    //       <div class="col-md-12 text-right">
    //         {/* Upload button */}
    //         <button onClick={handleImgUpload}>Upload Image</button>
    //       </div>
    //       {/* </form> */}

    //       {/* <div className="buttons">
    //         <button>Save as draft</button>

    //       </div> */}
    //     </div>
    //     {/* <div className="item">
    //       <h1>Category</h1>
    //       <input type="radio" name="temp" value="temp1" id="temp1" />
    //       <label htmlFor="temp1">temp1</label>
    //       <input type="radio" name="temp" value="temp2" id="temp2" />
    //       <label htmlFor="temp2">temp2</label>
    //       <input type="radio" name="temp" value="temp3" id="temp3" />
    //       <label htmlFor="temp3">temp3</label>
    //       <input type="radio" name="temp" value="temp4" id="temp4" />
    //       <label htmlFor="temp4">temp4</label>
    //     </div> */}
    //   </div>
    // </div>
  );
};

export default WritePost;
