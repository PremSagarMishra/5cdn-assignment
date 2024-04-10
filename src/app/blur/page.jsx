'use client'
import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Comp'

const Blur = () => {
  const { imgSrc, setImgSrc} = useContext(AppContext)
  const [blurValue, setBlurValue] = useState(0)


  const style = { width: "100%", display: "flex", flexDirection: "column", gap: "10px " }

  const handleBlur = async () => {
    try {

      if(imgSrc==""){
        alert("Upload image")
        return;
      }
      const response = await fetch('/api/blur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imgSrc, blur: blurValue }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      const { blurredImage } = await response.json()
      setImgSrc(blurredImage)
    } catch (error) {
      console.error('Error blurring image:', error)
    }
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value)
    if (isNaN(value) || value < 0 || value > 100) {
      setBlurValue(0)
    } else {
      setBlurValue(value)
    }
  }

  return (
    <div style={style}>
      <label style={{ fontSize: "24px" }}>Enter Blur Value</label>
      <input
        type="text"
        placeholder="Enter a value between 0 to 100"
        onChange={handleInputChange}
      />
      <button className="submit-btn" onClick={handleBlur}>
        Blur
      </button> 
    </div>
  )
}

export default Blur;