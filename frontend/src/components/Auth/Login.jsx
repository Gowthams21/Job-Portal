import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import API from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Context } from "../../main.jsx";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import "../../g.css";

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    console.log("Sending Data:", { email, password, role });

    try {
        const response = await API.post(
            "http://localhost:4000/api/v1/user/login",
            { email, password, role },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Response:", response.data);
        
        if (response.data.success) {
            toast.success("✅ Login successful!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

            localStorage.setItem("token", response.data.token);
            setIsAuthorized(true);

            setTimeout(() => {
                navigate("/");
            }, 2000);  // Redirect after showing toast
        } else {
            toast.error(response.data.message || "Invalid credentials!");
        }
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="authpage">
      <div className="container">
        <div className="header">
          <img src="logo.png" alt="logo" />
          <h3>Login to Account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login as</label>
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
            <label>Email</label>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="gowtham@gmail.com" required />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit">Login</button>
          <p className="sum">Don't have an account? <a href="/register">Register Now</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
