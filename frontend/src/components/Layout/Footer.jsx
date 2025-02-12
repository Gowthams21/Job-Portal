import {Context} from "../../main";
import {Link} from 'react-router-dom';
import {FaFacebookF,FaYoutube,FaLinkedin} from 'react-icons/fa';
import {RiInstagramFill} from "react-icons/ri";
import React, { useContext } from 'react';

const Footer = () => {
  const {isAuthorized, user} = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Gowtham</div>
      <div>
        <Link to={"/"} target="_blank">  <FaFacebookF/>  </Link>
        <Link to={"/"} target="_blank">  <FaYoutube/>  </Link>
        <Link to={"/"} target="_blank">  <FaLinkedin/>  </Link>
        <Link to={"/"} target="_blank">  <RiInstagramFill/>  </Link>
        {isAuthorized && (
          <Link to={`/profile/${user._id}`}>Profile</Link>
        )}
      </div>
    </footer>

  )
}

export default Footer;