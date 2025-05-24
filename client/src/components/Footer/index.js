import React from 'react'
import "./style.css";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className="footer">
        <div className="logo">
          <img src={assets.logo} alt='logo' id='footer-logo'/>
        </div>
        <p>All right reserved. Copyright © imageX</p>
        <div className="social-icons">
          <span>
            <img src={assets.facebook_icon} alt='social media' />
          </span>
          <span>
            <img src={assets.twitter_icon} alt='social media' />
          </span>
          <span>
            <img src={assets.instagram_icon} alt='social media' />
          </span>
        </div>
      </div>
  )
}

export default Footer