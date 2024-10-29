import React, { useState, useContext } from "react";
import "../../../assets/css/sidebar.css";
import useCheckRolePermission from "./CheckRolePermission";
import { userRolesContext } from "./RoleContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import LogOutModal from "./LogOutModal";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { userRole } = useContext(userRolesContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const courseMaster = useCheckRolePermission("Course Master");
  const viewCourse = courseMaster.length > 0 && courseMaster[0].can_view === 1 ? 1 : 0;
  const addCourse = courseMaster.length > 0 && courseMaster[0].can_add === 1 ? 1 : 0;

  const courseCategory = useCheckRolePermission("Course Category");
  const viewCourseCate = courseCategory.length > 0 && courseCategory[0].can_view === 1 ? 1 : 0;

  const courseCoupon = useCheckRolePermission("Course Coupon");
  const viewCourseCoupon = courseCoupon.length > 0 && courseCoupon[0].can_view === 1 ? 1 : 0;
  const userData = useCheckRolePermission("Student");
  const viewUserData = userData.length > 0 && userData[0].can_view === 1 ? 1 : 0;
  const instrucatureData = useCheckRolePermission("Instructor");
  const viewInstrucatureData = instrucatureData.length > 0 && instrucatureData[0].can_view === 1 ? 1 : 0;
  const adminData = useCheckRolePermission("Admin");
  const viewAdminData = adminData.length > 0 && adminData[0].can_view === 1 ? 1 : 0;
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

  // Function to open the logout modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Function to close the logout modal
  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  // Function to confirm logout
  const handleConfirmLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    setShowLogoutModal(false);
    navigate("/admin");
  };

  return (
    <>
      <aside className="sidebar active">
        <div className="sidebar-top">
          <ul>
            <li className="main-li">
              <NavLink to="/dashboard">
                <i className="fa-solid fa-gauge-high"></i>{" "}
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="main-li">
              {(userRole === "superAdmin" || (addCourse === 1 || viewCourse === 1 || viewCourseCate === 1 || viewCourseCoupon === 1)) && (
                <a
                  href="#"
                  onClick={(e) => toggleDropdown("course", e)}
                  className={isCourseActive ? "active" : ""}
                >
                  <i className="fa-solid fa-border-all"></i>
                  <span>Course</span>
                  <i
                    className={`fa-solid ${activeDropdown === "course"
                      ? "fa-angle-up"
                      : "fa-angle-down"
                      }`}
                  ></i>
                </a>
              )}

              {activeDropdown === "course" && (
                <ul className="dropdown-menu">
                  <li>
                    {(userRole === "superAdmin" || viewCourse === 1) && (
                      <NavLink to={"/all-course"}>
                        <i className="fa-solid fa-caret-right"></i>All Course
                      </NavLink>
                    )}
                  </li>
                  <li>
                    {(userRole === "superAdmin" || addCourse === 1) && (
                      <NavLink to={"/add-course"}>
                        <i className="fa-solid fa-caret-right"></i>Add New Course
                      </NavLink>
                    )}
                  </li>
                  <li>
                    {(userRole === "superAdmin" || viewCourseCate === 1) && (
                      <NavLink to={"/course-category"}>
                        <i className="fa-solid fa-caret-right"></i>Course Category
                      </NavLink>
                    )}
                  </li>
                  <li>
                    {(userRole === "superAdmin" || viewCourseCoupon === 1) && (
                      <NavLink to={"/course-coupon"}>
                        <i className="fa-solid fa-caret-right"></i>Coupons
                      </NavLink>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li className="main-li">
              <NavLink to={"/enrollements"}>
                <i className="fa-solid fa-registered"></i>
                <span>Enrollements</span>
              </NavLink>
            </li>

            <li className="main-li">
              <NavLink to={"/inquiry"}>
                <i className="fa fa-question-circle"></i>
                <span>Inquiry</span>
              </NavLink>
            </li>

            <li className="main-li">
              <NavLink to={"/payment"}>
                <i className="fa fa-inr" aria-hidden="true"></i>
                <span>Payment</span>
              </NavLink>
            </li>
            {userRole === "superAdmin" && (
              <li className="main-li">
                <NavLink to={"/roles-list"}>
                  <i className="fa fa-indent" aria-hidden="true"></i>
                  <span>Roles List</span>
                </NavLink>
              </li>
            )}
            <li className="main-li">
              {(userRole === "superAdmin" || viewUserData === 1 && viewAdminData === 1 && viewInstrucatureData === 1) && (
                <NavLink to={"/user"}>
                  <i className="fa-regular fa-user"></i>
                  <span>User</span>
                </NavLink>
              )}
            </li>
          </ul>
        </div>

        {/* -------------------- setting ----------------------- */}

        <div className="sidebar-bottom">
          <ul>
            <li className="main-li">
              <NavLink to={"/profile"}>
                <i className="fa-regular fa-user"></i>
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
                  className={`fa-solid ${activeDropdown === "setting"
                    ? "fa-angle-up"
                    : "fa-angle-down"
                    }`}
                ></i>
              </a>
              {activeDropdown === "setting" && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={"/payment-setting"}>
                      <i className="fa-solid fa-caret-right"></i>Payment Setting
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/notification-setting"}>
                      <i className="fa-solid fa-caret-right"></i>Notification
                      Setting
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>


            <li className="main-li">
              <a href="#" onClick={handleLogoutClick}>
                <i className="fa-solid fa-power-off"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <LogOutModal
        showModal={showLogoutModal}
        handleClose={handleCloseModal}
        handleConfirmLogout={handleConfirmLogout}
      />
    </>
  );
};

export default Sidebar;
