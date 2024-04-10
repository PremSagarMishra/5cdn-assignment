'use client'
import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { AppContext } from '../Comp';

const Page = () => {
  const [opacity, setOpacity] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [selection, setSelection] = useState("greyscale")
  const { imgSrc, setImgSrc } = useContext(AppContext)

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  const handleApplyFilter = async () => {
    try {
      if(imgSrc==""){
        alert("Upload image")
        return;
      }
      const response = await fetch('/api/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imgSrc,
          contrast: selection === 'contrast' ? contrast : undefined,
          grayscale: selection === 'greyscale',
          opacity: selection === 'opacity' ? opacity : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const { processedImage } = await response.json();
      setImgSrc(processedImage);
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <label style={{ fontWeight: "bold" }}>Type</label>
        <FormControl style={{ width: "100%", border: "1px solid white", borderRadius: "10px", marginTop: "10px" }}>
          <Select value={selection} onChange={handleChange} style={{ color: "white" }} displayEmpty>
            {/* <MenuItem value="contrast">Contrast</MenuItem> */}
            <MenuItem value="greyscale">Greyscale</MenuItem>
            {/* <MenuItem value="opacity">Opacity</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      {selection === 'opacity' && <input type='number' placeholder='Enter the value' value={opacity} onChange={(e) => { setOpacity(e.target.value) }}></input>}
      {selection === 'contrast' && <input type='number' placeholder='Enter the value' value={contrast} onChange={(e) => { setContrast(e.target.value) }}></input>}
      <button className='submit-btn' onClick={handleApplyFilter}>Apply filter</button>
     
    </div>
  )
}

export default Page