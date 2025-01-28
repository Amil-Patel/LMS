import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userRolesContext } from "./RoleContext";
import axiosInstance from "../utils/axiosInstance";
const port = process.env.REACT_APP_URL;

const Navbar = () => {
  const { userId, userRole } = useContext(userRolesContext);
  const [userData, setUserData] = useState([]);

  //get user data
  const getUserData = async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(`${port}/gettingUserMasterDataWithId/${userId}`);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
  }, [userId]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/profile")
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <NavLink to="/admin/dashboard">
            <img src={require("../../../assets/image/Logo.png")} alt="logo" />
          </NavLink>
        </div>

        <div className="nav-top-section">
          <div className="nav-left-section">
            <div className="search-container">
              <input id="search" type="text" placeholder="Search" />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          <div className="nav-right-section">
            <i className="fa-solid fa-bell"></i>
            <span className="nav-right-section language-dropdown">
              <p>English</p>
              <i className="fa-solid fa-angle-down"></i>
            </span>
            <span className="nav-right-section profile-box cursor-pointer " onClick={handleClick} >
              {userData?.profile ?
                <img src={`../../upload/${userData?.profile}`} alt="profile" />
                :
                <img src={require("../../../assets/image/default-profile.png")} alt="profile" />
              }
              <p>
                <b>{userData?.first_name}</b>
                <br />
                {userRole}
              </p>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
