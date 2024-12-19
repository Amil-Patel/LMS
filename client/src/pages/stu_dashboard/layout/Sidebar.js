import React, { useState, useEffect, useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { userRolesContext } from "../../admin/layout/RoleContext";
import axiosInstance from "../../client/utils/axiosInstance";
import { NavLink, useLocation } from 'react-router-dom';
const port = process.env.REACT_APP_URL;
const Sidebar = () => {
  const { stuUserId } = useContext(userRolesContext);
  const location = useLocation();
  const menus = [
    { name: "Dashboard", link: "/student/dashboard", icon: "fa-solid fa-gauge-high" },
    { name: "Courses", link: "/student/learning", icon: "fa-solid fa-border-all" },
    { name: "profile", link: "/student/stu-profile", icon: "fa-regular fa-heart" },
    { name: "Purchase", link: "/student/purchase", icon: "fa-regular fa-folder-open" }
  ];
  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    if (!stuUserId) return
    try {
      const response = await axiosInstance.get(`${port}/gettingUserMasterDataWithId/${stuUserId}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
  }, [stuUserId]);

  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("/student/learning");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) {
        setOpen(true);
      } else if (window.innerWidth < 900) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="main_stu_dashboard_sidebar flex">
      <aside
        className={`bg-[#F9F9FB] duration-500 ${isMobile
          ? open
            ? "open px-4 absolute"
            : "collapsed px-1 absolute"
          : "w-72 px-6"
          }`}
      >
        <div className="py-3 flex justify-end">
          {isMobile && (
            <HiMenuAlt3
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <div className="sidebar-profile-section mt-4 text-center">
          <img
            src={`../upload/${userData.profile}`}
            alt="profile"
            className={`mx-auto rounded-full duration-500 ${open ? "w-20 h-20" : "w-10 h-10"
              }`}
          />
          {open && (
            <>
              <h3 className="pt-3 text-black font-semibold">{`${userData.first_name} ${userData.last_name}`}</h3>
              <p>{userData.email}</p>
            </>
          )}
        </div>
        <div className="stu-sidebar-menu mt-8 flex flex-col gap-1.5">
          {menus.map((menu, i) => (
            <div className="tooltip" key={i}>
              <NavLink
                to={menu.link}
                onClick={() => setActiveMenu(menu.name)}
                className={`sidebar_li flex items-center px-5 py-3.5 text-base rounded-md cursor-pointer
                  ${location.pathname === menu.link
                    ? "bg-blue-500 text-white"
                    : "text-black hover:bg-gray-200"
                  }`}
              >
                <i className={`${menu.icon} text-lg`}></i>
                <span
                  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                >
                  {menu.name}
                </span>
              </NavLink>
              {!open && <span className="tooltiptext">{menu.name}</span>}
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
