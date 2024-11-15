import React from 'react'
import '../../../assets/css/client/navbar.css';
import { NavLink } from 'react-router-dom'
import '../../../assets/css/client/common.css';

const Navbar = () => {
  return (
    <>
      <nav className='navbar-section'>
        <div className='navbar-logo'>
          <img src={require("../../../assets/image/Logo.png")} alt="logo" />
        </div>
        <div className='navbar-pages'>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-course">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/view-course1">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/view-course1">Page <i class="fa-solid fa-angle-down"></i></NavLink>
            </li>
            <li>
              <NavLink to="/view-course1">LearnPress Add-On</NavLink>
            </li>
            <li>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <div className='navbar-login-section'>
          <NavLink to="/">Login </NavLink> /
          <NavLink to="/">Register </NavLink>
          <div className='login-section-icon'><i className="fa-solid fa-magnifying-glass"></i></div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
