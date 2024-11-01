import React from 'react'
import '../../../assets/css/client/navbar.css';

const Navbar = () => {
  return (
    <>
      <nav className='navbar-section'>
        <div className='navbar-logo'>
          <img src={require("../../../assets/image/Logo.png")} alt="logo" />
        </div>
        <div className='navbar-pages'>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Blog</li>
            <li>Page <i class="fa-solid fa-angle-down"></i></li>
            <li>LearnPress Add-On</li>
            <li>Premium Theme</li>
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
