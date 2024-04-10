'use client'
import React from 'react'
import { ImCross } from "react-icons/im";

const Image = ({ imgSrc, setImgSrc }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadImage = () => {
    if (imgSrc) {
      const link = document.createElement('a');
      link.download = 'image.jpg';
      link.href = imgSrc;
      link.click();
    }
  };

  return (
    <div className="main-image">
      {imgSrc ? (
        <div style={{ position: "relative" }}>
          <button className="img-btn" onClick={() => setImgSrc("")}>
            <ImCross />
          </button>
          <img id="preview" src={imgSrc} alt="Image Preview" />
          <button style={{width:"80%",margin:"10px"}} className="submit-btn" onClick={handleDownloadImage}>Download Image</button>
        </div>
      ) : (
        <label className="file-label">
          Upload Image
          <input className="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};

export default Image