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
              <NavLink to="/view-course1">Home</NavLink>
            </li>
            <li>
              <NavLink to="/view-course1">Courses</NavLink>
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
              <NavLink to="/view-course">Premium Theme</NavLink>
            </li>
          </ul>
        </div>
        <div className='navbar-login-section'>
          <a> Login </a> /
          <a> Register </a>
          <div className='login-section-icon'><i className="fa-solid fa-magnifying-glass"></i></div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
