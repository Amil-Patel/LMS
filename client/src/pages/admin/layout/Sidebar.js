import React, { useState } from "react";
import "../../../assets/css/sidebar.css";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const location = useLocation();

  // List of paths where "Course" should be highlighted
  const coursePaths = [
    "/all-course",
    "/add-course",
    "/course-category",
    "/course-coupon",
  ];

  const settingPathes = ["/payment-setting", "/notification-setting"];

  const isCourseActive = coursePaths.includes(location.pathname);
  const isSettingActive = settingPathes.includes(location.pathname);

  const toggleDropdown = (menu, event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setActiveDropdown((prevMenu) => (prevMenu === menu ? null : menu));
  };

  return (
    <>
      <aside className="sidebar active">
        <div className="sidebar-top">
          <ul>
            <li className="main-li">
              <a href="#" onClick={(e) => toggleDropdown("dropdown1", e)}>
                <i className="fa-solid fa-gauge-high"></i>{" "}
                <span>Dashboard</span>
              </a>
            </li>

            <li className="main-li">
              <a
                href="#"
                onClick={(e) => toggleDropdown("course", e)}
                className={isCourseActive ? "active" : ""}
              >
                <i className="fa-solid fa-border-all"></i>
                <span>Course</span>
                <i
                  className={`fa-solid ${
                    activeDropdown === "course"
                      ? "fa-angle-up"
                      : "fa-angle-down"
                  }`}
                ></i>
              </a>
              {activeDropdown === "course" && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={"/all-course"}>
                      <i class="fa-solid fa-caret-right"></i>All Course
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/add-course"}>
                      <i class="fa-solid fa-caret-right"></i>Add New Course
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/course-category"}>
                      <i class="fa-solid fa-caret-right"></i>Course Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/course-coupon"}>
                      <i class="fa-solid fa-caret-right"></i>Coupons
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="main-li">
              <NavLink to={"/enrollements"}>
                <i class="fa-solid fa-registered"></i>
                <span>Enrollements</span>
              </NavLink>
            </li>

            <li className="main-li">
              <NavLink to={"/inquiry"}>
                <i class="fa fa-question-circle"></i>
                <span>Inquiry</span>
              </NavLink>
            </li>

            <li className="main-li">
              <NavLink to={"/payment"}>
                <i class="fa fa-inr" aria-hidden="true"></i>
                <span>Payment</span>
              </NavLink>
            </li>
            <li className="main-li">
              <NavLink to={"/roles-list"}>
                <i class="fa fa-indent" aria-hidden="true"></i>
                <span>Roles List</span>
              </NavLink>
            </li>
            <li className="main-li">
              <NavLink to={"/user"}>
                <i class="fa-regular fa-user"></i>
                <span>User</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* -------------------- setting ----------------------- */}

        <div className="sidebar-bottom">
          <ul>
            <li className="main-li">
              <NavLink to={"/profile"}>
                <i class="fa-regular fa-user"></i>
                <span>Profile</span>
              </NavLink>
            </li>
            <li className="main-li">
              <a
                href="#"
                onClick={(e) => toggleDropdown("setting", e)}
                className={isSettingActive ? "active" : ""}
              >
                <i className="fa-solid fa-gear"></i>
                <span>Setting</span>
                <i
                  className={`fa-solid ${
                    activeDropdown === "setting"
                      ? "fa-angle-up"
                      : "fa-angle-down"
                  }`}
                ></i>
              </a>
              {activeDropdown === "setting" && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={"/payment-setting"}>
                      <i class="fa-solid fa-caret-right"></i>Payment Setting
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/notification-setting"}>
                      <i class="fa-solid fa-caret-right"></i>Notification
                      Setting
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="main-li">
              <a href="#">
                <i className="fa-solid fa-power-off"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
