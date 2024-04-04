'use client'
import { useState } from "react";
import "./globals.css";
import Compress from "./Compress";
import Header from "./Header";

export default function Home() {
  const [imgSrc, setImgSrc] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="main">
      <div className="image">
        {imgSrc ? (
          <img id="preview" src={imgSrc} alt="Image Preview" />
        ) : (
          <p>Upload image to preview</p>
        )}
      </div>
      <label className="file-label">
        Upload Image
        <input
          className="file-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </label>

      <Compress image={imgSrc} setImgSrc={setImgSrc}/>

    </main>
  );
}
