import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Compress = ({ image, setImgSrc }) => {
  const [width,setWidth]=useState(220)
  const [height,setHeight]=useState(300)
  const [isOpen, setIsOpen] = useState(false);
  const [quality, setQuality] = useState(50);
  const [format, setFormat] = useState("");
  const [compressedImageData, setCompressedImageData] = useState(null);

  const compressImage = async () => {
    if(width==null || height==null || quality==0 || format==null){
      alert("Enter the values")
      return
    }

    try {
      console.log('Request sending');
      const response = await fetch('/api/optimize-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image, height, width, quality, format }),
      });

      if (!response.ok) {
        throw new Error('Failed to compress image');
      }

      const data = await response.json();
      setImgSrc(URL.createObjectURL(new Blob([Buffer.from(data.compressedImage, 'base64')])));
      setCompressedImageData(data.compressedImage);
      alert('Image compressed successfully!');
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Failed to compress image.');
    }
  };
  const downloadCompressedImage = () => {
    if (!compressedImageData) return;

    const downloadLink = document.createElement('a');
    const imageData = `data:image/${format || 'jpeg'};base64,${compressedImageData}`;
    downloadLink.href = imageData;
    downloadLink.download = 'compressed_image.jpg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className='component'>
      <div className='top'>
        <p>Image Compressor</p>
        <span onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </span>
      </div>
      {isOpen && (
        <div className='bottom'>
          <div style={{ display: 'flex', gap: "20px",flexWrap:"wrap", alignItems:'center'}}>
            <div>
            <label for="width">Width: </label>
            <input type='number'  id="width" placeholder='Width' onChange={(e)=>{setWidth(e.target.value)}} value={width}/>
            </div>
            <div>
            <label for="height">Height: </label>
            <input type='number' id="height" placeholder='Height' onChange={(e)=>{setHeight(e.target.value)}} value={height}/>
            </div>
          </div>
          <br />
          <input
            type="range"
            id="qualityRange"
            min="0"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
          />
          <label htmlFor="qualityRange">Quality:{quality}%</label>
          <br /><br />
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">Select the image format</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
          </select>
          <button id="compressButton" onClick={compressImage}>Compress Image</button>
          {compressedImageData && (
            <button onClick={downloadCompressedImage} id='downloadbutton'>
              Download Compressed Image
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Compress;