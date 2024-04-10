'use client'
import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Comp'

const page = () => {
  const { imgSrc, setImgSrc } = useContext(AppContext)
  const [rotateDegree, setRotateDegree] = useState(0)

  const style = { width: '100%', display: 'flex', flexDirection: 'column', gap: '10px ' }

  const handleRotateImage = async () => {
    try {
      if(imgSrc==""){
        alert("Upload image")
        return;
      }
      const response = await fetch('/api/rotate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imgSrc, rotateDegree }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      const { rotatedImage } = await response.json()
      setImgSrc(rotatedImage)
    } catch (error) {
      console.error('Error rotating image:', error)
    }
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value)
    if (isNaN(value) || value < 0 || value >= 360) {
      setRotateDegree(0)
    } else {
      setRotateDegree(value)
    }
  }

  return (
    <div style={style}>
      <label style={{ fontSize: '24px' }}>Enter Rotation Degree</label>
      <input
        type="text"
        placeholder="Enter rotating degree"
        onChange={handleInputChange}
      />
      <button className="submit-btn" onClick={handleRotateImage}>
        Rotate
      </button>
    </div>
  )
}

export default page