import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  console.log("NotFound Page Rendered");
  return (
    <section className='page notfound'>
      <div className='content'>
        <img src="notfound.png" alt="Not Found" />
        <Link to={"/"}>Return to Home</Link>
      </div>
    </section>
  )
}

export default NotFound;
