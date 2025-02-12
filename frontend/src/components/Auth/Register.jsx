import React, { useState, useContext } from 'react';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import API from "../../utils/axiosConfig";
import toast from 'react-hot-toast';
import { Navigate, Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from 'react-icons/ri';
import { Context } from '../../main.jsx';
import "../../App.css";
import "../../g.css";


const Register = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("http://localhost:4000/api/v1/user/register", {
        email,
        password,
        phone,
        name,
        role
      });
  
      toast.success("Registration successful!");
      setEmail("");
      setPassword("");
      setPhone("");
      setName("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="authpage">
      <div className="container">
        <div className="header">
          <img src="logo.png" alt="logo" />
          <h3>Create an Account</h3>
        </div>

        <form onSubmit={handleRegister}>
          <div className="inputTag">
            <label>Register as</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Admin">Admin</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          <div className="inputTag">
            <label>Name</label>
            <div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Gowtham" />
              <FaPencilAlt />
            </div>
          </div>

          <div className="inputTag">
            <label>Email</label>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="gowtham@gmail.com" />
              <MdOutlineMailOutline />
            </div>
          </div>

          <div className="inputTag">
            <label>Phone Number</label>
            <div>
              <input type="number" value={phone} onChange={(e)=> setPhone(e.target.value)}
 placeholder="123456789" />
              <FaPhoneFlip />
            </div>
          </div>

          <div className="inputTag">
            <label>Password</label>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
              <RiLock2Fill />
            </div>
          </div>

          <button onClick={handleRegister} type='submit'>Register</button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>

      <div className="banner">
        <img src="register.png" alt="register" />
      </div>
    </div>
  );
};

export default Register;
