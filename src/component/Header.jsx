'use client'
import React, { useState, useContext } from 'react';
import Link from "next/link";
import { AppContext } from '@/app/Comp';

const Header = () => {
  const {link,setLink} = useContext(AppContext);

  const links = ["resize", "blur", "filter", "flip", "rotate"];

  return (
    <div className='header'>
      <span className='logo'>Image Optimizer</span>
      <ul className="right">
        {links.map((linkItem, index) => (
          <li key={index}>
            <Link 
  className={link=== linkItem ? "active link" : "link"} 
  href={"/" + linkItem} 
  onClick={() => setLink(linkItem)}
>
  {linkItem.toUpperCase()}
</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
