import React, { useMemo, useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/course/course.css";
import "../../../assets/css/main.css";
import { NavLink } from "react-router-dom";

const AllCourse = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);


  const [user, setUser] = useState([
    {
      title: "Christine Brooks",
      category: "Security",
      price: "$49.99",
      enrollment: "enrollment: 25",
      lession: "lession: 25",
      author: "Ramesh Chaudhry",
      status: 0,
    },
    {
      title: "Christine Brooks",
      category: "Security",
      price: "$37.12",
      enrollment: "enrollment: 25",
      lession: "lession: 25",
      author: "Ramesh Chaudhry",
      status: 1,
    },
    {
      title: "Christine Brooks",
      category: "Security",
      price: "$89.23",
      enrollment: "enrollment: 25",
      lession: "lession: 25",
      author: "Ramesh Chaudhry",
      status: 0,
    },
    {
      title: "Christine Brooks",
      category: "Security",
      price: "$56.99",
      enrollment: "enrollment: 30",
      lession: "lession: 30",
      author: "Ramesh Chaudhry",
      status: 1,
    }
  ]);

  const handleStatusChange = (index) => {
    const updatedUser = [...user];
    updatedUser[index].status = updatedUser[index].status === 0 ? 1 : 0;
    setUser(updatedUser);
  };


  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // sorting table

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...user];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [user, sortConfig]);


  return (
    <>
      <Hoc />
      <div class="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Courses</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          {/* <div className="hero-inner-logo">
            <img
              src={require("../../../assets/image/pdf-logo.png")}
              alt="PDF Logo"
            />
            <img
              src={require("../../../assets/image/x-logo.png")}
              alt="X Logo"
            />
          </div> */}
        </div>
        
        <div className="course-form-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title <i class="fa-solid fa-sort"  onClick={() => handleSort('title')}></i></th>
              <th>Category <i class="fa-solid fa-sort"  onClick={() => handleSort('category')}></i></th>
              <th>Price <i class="fa-solid fa-sort"  onClick={() => handleSort('price')}></i></th>
              <th>Enrollments <i class="fa-solid fa-sort"  onClick={() => handleSort('enrollment')}></i></th>
              <th>Lessions <i class="fa-solid fa-sort"  onClick={() => handleSort('lession')}></i></th>
              <th>Author <i class="fa-solid fa-sort"  onClick={() => handleSort('author')}></i></th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
          {sortedData.map((i, index) => {
            return (
            <tr key={index}>
              <td className="id">{index + 1}</td>
              <td>
                <h6><NavLink to={"/manage-course"}>{i.title}</NavLink></h6>
              </td>
              <td>{i.category}</td>
              <td>{i.price}</td>
              <td>{i.enrollment}</td>
              <td>{i.lession}</td>
              <td>{i.author}</td>
              <td>
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={i.status === 1}
                          onChange={() => handleStatusChange(index)}
                        />
                        <span class="slider"></span>
                      </label>
                </td>
                <td>
                      <div
                        className={`menu-container ${
                          activeDropdown === index ? "active" : ""
                        }`}
                      >
                        <div
                          class="menu-button"
                          onClick={() => toggleDropdown(index)}
                        >
                          {" "}
                          ⋮{" "}
                        </div>
                        {activeDropdown === index && (
                          <div className="menu-content">
                            <a
                              // onClick={() => {
                              //   editToggleModal();
                              // }}
                              className="add-button"
                              style={{ cursor: "pointer" }}
                            >
                              <p>Edit</p>
                            </a>
                            <p
                              // onClick={() => deleteToggleModal(index)} // Open delete modal
                              style={{ cursor: "pointer" }}
                            >
                              Delete
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
            </tr>
            )
             })}
          </tbody>
        </table>
        </div>
        
      </div>
    </>
  );
};

export default AllCourse;
