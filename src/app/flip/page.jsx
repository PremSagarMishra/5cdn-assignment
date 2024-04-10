'use client'
import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useContext } from 'react'
import { AppContext } from '../Comp'

const page = () => {
  const [flip, setFlip] = React.useState('')
  const { imgSrc, setImgSrc } = useContext(AppContext)

  const handleChange = (event) => {
    setFlip(event.target.value)
  }

  const handleFlipImage = async () => {
    try {
      if(imgSrc==""){
        alert("Upload image")
        return;
      }
      const response = await fetch('/api/flip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imgSrc, flipType: flip }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      const { flippedImage } = await response.json()
      setImgSrc(flippedImage)
    } catch (error) {
      console.error('Error flipping image:', error)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <label style={{ fontSize: '24px' }}>Flip</label>
      <FormControl
        style={{ width: '100%', border: '1px solid white', borderRadius: '10px' }}
      >
        <Select
          value={flip}
          onChange={handleChange}
          style={{ color: 'white' }}
          displayEmpty
        >
          <MenuItem value="">
            <em>--Select Flip Type--</em>
          </MenuItem>
          <MenuItem value="horizontal">Horizontal</MenuItem>
          <MenuItem value="vertical">Vertical</MenuItem>
        </Select>
      </FormControl>
      <button className="submit-btn" onClick={handleFlipImage}>
        Flip Image
      </button>
    </div>
  )
}

export default page