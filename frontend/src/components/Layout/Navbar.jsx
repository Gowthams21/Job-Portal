import React, { useState, useContext } from 'react';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {GiHamburgerMenu} from "react-icons/gi";
import { Link } from "react-router-dom";




const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setisAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className='container'>
        <div className='logo'>
          <img src="logo.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu-menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              All Jobs
            </Link>
          </li>
          <li>
            <Link to={"/application/me"} onClick={() => setShow(false)}>
              {
                user && user.role === "Admin" ? "Applicants Applications" : "My Applications"
              }
            </Link>
          </li>
          {
            user && user.role === "Admin" ? (
              <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  Post a Job
                </Link>
              </li>

              <li>
              <Link to={"/job/me"} onClick={() => setShow(false)}>
                View your Job
              </Link>
            </li>
            </>
            ) :(
            <></>
            )
          }
          <button onClick={handleLogout}>Logout</button>
        </ul>
        <div className='hamburger'>
          <GiHamburgerMenu onClick={()=> setShow(!show)} />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
