import React from 'react';
import {FaUserPlus} from "react-icons/fa";
import {MdFindInPage} from "react-icons/md";
import {IoMdSend} from "react-icons/io";

const HowitWorks = () => {
  return (
    <div className='howitworks'>
      <div className='container'>
        <h3>How Project Works</h3>
        <div className='banner'>
          <div className='card'>
            <FaUserPlus/>
            <p>Create Account</p>
            <p>Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries. It does not have any meaningful content and is often used to fill spaces in design mockups</p>
          </div>
          <div className='card'>
            <MdFindInPage/>
            <p>Create Account</p>
            <p>Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries. It does not have any meaningful content and is often used to fill spaces in design mockups</p>
          </div>
          <div className='card'>
            <IoMdSend/>
            <p>Create Account</p>
            <p>Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries. It does not have any meaningful content and is often used to fill spaces in design mockups</p>
          </div>



        </div>
      </div>
    </div>
  )
}

export default HowitWorks;