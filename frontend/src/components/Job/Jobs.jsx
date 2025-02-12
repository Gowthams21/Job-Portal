import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/job/getall", { withCredentials: true });
        console.log("API Response:", res.data);
        setJobs(res.data.jobs || res.data); 
      } catch (error) {
        console.error("Error fetching jobs:", error);
        navigateTo("/login");
      }
    };
  
    fetchJobs();
  }, []);
  

  return (
    <section className='jobs page'>
      <div className='container'>
        <h1>All Available Jobs</h1>
        <div className='banner'>
          {jobs.length > 0 ? (
            jobs.map((element) => (
              <div className='card' key={element.id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/jobs/${element.id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
