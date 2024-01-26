import React, { useState } from 'react'

const WritePost = () => {
  const [imagePreview, setImagePreview] = useState(null);

  function handlePreviewImg(e) {
    console.log(e.target.files);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className='add'>
      <div className='content'>
        <input type="text" placeholder="Title"/>
        <div>IMAGE PREVIEW</div>
        <img
          width={350}
          src = {imagePreview}
        />
      </div>
      <div className='menu'>
        <div className='item'>
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
        
        <form action="/postupload" method="POST" encType="multipart/form-data">
        <input type="file" name="image" accept="image/*" onChange={handlePreviewImg}/>
        <div class="col-md-12 text-right">
          <button>Upload Image</button>
        </div>
        </form>

          <div className="buttons">
            <button>Save as draft</button>

            {/* <button>Upload Image</button> */}
          </div>
        </div>
        <div className='item'>
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
  )
}

export default WritePost;