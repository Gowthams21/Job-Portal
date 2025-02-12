import React,{useContext} from 'react';
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import HotItWorks from "../Home/HowitWorks.jsx";
import HeroSection from "../Home/HeroSection.jsx";
import PopularCategories from "../Home/PopularCategories.jsx";
import PopularCompanies from "../Home/PopularCompanies.jsx";





const Home = () => {
  const {isAuthorized} =useContext(Context);
  if(!isAuthorized){
    return <Navigate to="/login"/>;
  }
  
  return (
    <section className="homePage page">
      <HeroSection />
      <HotItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>

  )
}

export default Home