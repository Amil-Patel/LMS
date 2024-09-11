import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={require("../../../assets/image/Logo.png")} />
        </div>

        <div className="nav-top-section">
          <div className="nav-left-section">
            <input type="checkbox" id="btn" />
            <span for="btn" className="menu-btn">
              <i className="fa-solid fa-bars"></i>
            </span>

            <div className="search-container">
              <input type="text" placeholder="Search" />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          <div className="nav-right-section">
            <i className="fa-solid fa-bell"></i>
            <span className="nav-right-section language-dropdown">
              <img src={require("../../../assets/image/Flag.png")} />
              <p>English</p>
              <i className="fa-solid fa-angle-down"></i>
            </span>
            <span className="nav-right-section profile-box">
              <img src={require("../../../assets/image/profile-logo.png")} />
              <p>
                <b>Moni Roy</b>
                <br />
                Admin
              </p>
              <i className="fa-solid fa-angle-down"></i>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
