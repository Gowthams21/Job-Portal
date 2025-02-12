import React, { useContext, useState } from 'react'

const jobDetails = () => {
  const {id}=useParams();
  const {job,setJob}=useState({});
  const navigateTo=useNavigate();

  const {isAuthorized, user}= useContext(Context);

  useEffect(()=>{ 
    axios.get()
  },[]
)


  return (
    <div></div>
  )
}

export default jobDetails;