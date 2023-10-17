import React from 'react'

const WritePost = () => {
  return (
    <div className='add'>
      <div className='content'>
        <input type="text" placeholder="Title"/>
        <div>IMAGE PREVIEW</div>
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
          <input style={{display:"none"}} type="file" id="file"/>
          <label htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as draft</button>
            <button>Upload Image</button>
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