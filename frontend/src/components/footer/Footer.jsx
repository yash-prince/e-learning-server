import React from 'react';
import "./footer.css";
import { IoLogoFacebook } from "react-icons/io"
import { FaSquareTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";




const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
          <p>
            &copy; 2025 Your E-Learning Platform. All rights reserved. <br/>
            Made with ❤️<a href="">Kumar Prince</a>
          </p>
          <div className="social-links">
            <a href=""><IoLogoFacebook/></a>
            <a href=""><FaSquareTwitter/></a>
            <a href=""><FaInstagramSquare/></a>
            <a href="">< FaSquareThreads/></a>
          </div>
      </div>
    </footer>
  )
}

export default Footer
