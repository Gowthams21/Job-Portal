import React from 'react';
import {FaSuitcase,FaBuilding,FaUsers,FaUserPlus} from "react-icons/fa"

const HeroSection = () => {

  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a Job that Suits</h1>
          <h1>Your Intrest and Skills</h1>
          <p>Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries. It does not have any meaningful content and is often used to fill spaces in design mockups </p>
        </div>

        <div className='image'>
          <img src="heroS.jpg" alt="hero" />
        </div>
      </div>

      <div className='details'>{
        details.map(element => {
          return (
            <div className='card' key={element.id}>
              <div className='icon'>{element.icon}</div>
              <div className='content'>
                <h3>{element.title}</h3>
                <p>{element.subTitle}</p>
              </div>
              </div>
          );
        })}
      </div>
  
    </div>
  )
}

export default HeroSection;