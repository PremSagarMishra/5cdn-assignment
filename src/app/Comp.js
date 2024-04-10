'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/component/Header';
import Image from '@/component/Image';
import { createContext } from 'react';
import { useRouter } from 'next/navigation';

export const AppContext = createContext();

const Comp = ({ children }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [link,setLink] = useState("resize")
  const router = useRouter();

  useEffect(() => {
    // Redirect to /resize if no image is uploaded
    if (!imgSrc) {
      router.push('/resize');
    }
  }, [imgSrc, router]);

  return (
    <AppContext.Provider value={{ imgSrc, setImgSrc ,link,setLink}}>
      <Header />
      <div className="main-container">
        <Image imgSrc={imgSrc} setImgSrc={setImgSrc} />
        <div className="children">{children}</div>
      </div>
    </AppContext.Provider>
  );
};

export default Comp;