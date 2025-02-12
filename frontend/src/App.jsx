import React, { useEffect, useContext } from 'react';
import "./App.css";
import { Context } from './main.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/components/Auth/Login.jsx';
import Register from '../src/components/Auth/Register.jsx';

import Navbar from '../src/components/Layout/Navbar.jsx';
import Footer from '../src/components/Layout/Footer.jsx';

import Home from '../src/components/Home/Home.jsx';
import HeroSection from "../src/components/Home/HeroSection.jsx"

import Jobs from './components/Job/Jobs.jsx';
import JobDetails from './components/Job/jobDetails.jsx';
import MyJobs from './components/Job/MyJobs.jsx';
import PostJob from './components/Job/PostJob.jsx';

import Application from './components/Application/Application.jsx';
import MyApplication from './components/Application/MyApplications.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import axios from "axios";
import Toaster from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/job/getall' element={<Jobs />} />
        <Route path='/job/:id' element={<JobDetails />} />
        <Route path='/job/post' element={<PostJob />} />
        <Route path='/job/me' element={<MyJobs />} />
        <Route path='/application/:id' element={<Application />} />
        <Route path='/application/me' element={<MyApplication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {/* <Toaster /> */}
    </Router>
  );
};

export default App;
