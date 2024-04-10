'use client'
import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { AppContext } from '../Comp';

const Resize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { imgSrc, setImgSrc } = useContext(AppContext)
  const [type, setType] = React.useState('cover');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleResize = async () => {
    try {
      if(imgSrc==""){
        alert("Upload image")
        return;
      }
      if (width <= 0 || height <= 0) {
        console.error('Invalid width or height');
        return;
      }
  
      const response = await fetch('/api/resize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imgSrc, newWidth: width, newHeight: height ,resizeType: type  }),
      });

      const { resizedImage } = await response.json();
      setImgSrc(resizedImage);
    } catch (error) {
      console.error('Error resizing image:', error);
      throw error;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <label>Type</label>
        <FormControl style={{ width: "100%", border: "1px solid white", borderRadius: "10px", marginTop: "10px" }}>
          <Select
            className='select'
            value={type}
            onChange={handleChange}
            style={{ color: "white" }}
            displayEmpty
          >
            <MenuItem value="cover">Crop</MenuItem>
            <MenuItem value="fitandfill">Fit and Fill</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: 'flex', flexDirection: "column", width: "40%", gap: "10px" }}>
          <label>Width</label>
          <input type='number' value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <div style={{ display: 'flex', flexDirection: "column", width: "40%", gap: "10px" }}>
          <label>Height</label>
          <input type='number' value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
      </div>
      <button className='submit-btn' onClick={handleResize}>Resize</button>
    </div>
  )
}

export default Resize;