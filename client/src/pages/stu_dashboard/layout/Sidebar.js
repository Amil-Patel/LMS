import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "#", icon: "fa-solid fa-gauge-high" },
    { name: "Courses", link: "#", icon: "fa-solid fa-border-all" },
    { name: "Favorites", link: "#", icon: "fa-regular fa-heart" },
    { name: "Documents", link: "#", icon: "fa-regular fa-folder-open" },
    { name: "Logout", link: "#", icon: "fa-solid fa-power-off", margin: true },
  ];

  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
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
      className={`bg-[#F9F9FB] duration-500 ${
        isMobile
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
          src={require("../../../assets/image/course-thumbnail.png")}
          alt="profile"
          className={`mx-auto rounded-full duration-500 ${
            open ? "w-20 h-20" : "w-10 h-10"
          }`}
        />
        {open && (
          <>
            <h3 className="pt-3 text-black font-semibold">Joseph Cena</h3>
            <p>josephcena@gmail.com</p>
          </>
        )}
      </div>
      <div className="stu-sidebar-menu mt-8 flex flex-col gap-1.5">
        {menus.map((menu, i) => (
          <div className="tooltip" key={i}>
            <a
              href={menu.link}
              onClick={() => setActiveMenu(menu.name)}
              className={` sidebar_li flex items-center px-5 py-3.5 text-base rounded-md cursor-pointer
                ${menu.margin && "mt-5"}
                ${
                  activeMenu === menu.name
                    ? "bg-blue-500 text-white"
                    : "text-black hover:bg-gray-200"
                }`}
            >
              <i className={`${menu.icon} text-lg`}></i>
              <span
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </span>
            </a>
            {!open && <span className="tooltiptext">{menu.name}</span>}
          </div>
        ))}
      </div>
    </aside>
  </section>
  );
};

export default Sidebar;
