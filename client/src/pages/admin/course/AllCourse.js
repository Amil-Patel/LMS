import React, { useContext, useEffect, useMemo, useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/course/course.css";
import "../../../assets/css/main.css";
import { NavLink } from "react-router-dom";
import { userRolesContext } from "../layout/RoleContext";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../layout/Loading";
import useCheckRolePermission from "../layout/CheckRolePermission";
const port = process.env.REACT_APP_URL

const AllCourse = () => {
  const { userRole, userId } = useContext(userRolesContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  //getting course data
  const [courseData, setCourseData] = useState([]);
  const getCourseData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseMasterData`);
      setCourseData(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const [deleteId, setDeleteId] = useState(null);
  const deleteToggleModal = (index) => {
    setDeleteOpen(!deleteOpen);
    setDeleteId(index);
  };

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.delete(`${port}/deletingCourseMaster/${deleteId}`);
      getCourseData();
      setDeleteOpen(false)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    getCourseData();
  }, [])
  const perm = useCheckRolePermission("Course Master");
  const editCoursePermission = perm.length > 0 && perm[0].can_edit === 1 ? 1 : 0;
  const deleteCoursePermission = perm.length > 0 && perm[0].can_delete === 1 ? 1 : 0;



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
    let sortableItems = [...courseData];
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
  }, [courseData, sortConfig]);


  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Courses</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-input" type="text" placeholder="Search" />
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
                <th>Title <i className="fa-solid fa-sort" onClick={() => handleSort('course_title')}></i></th>
                <th>Category <i className="fa-solid fa-sort" onClick={() => handleSort('course_cate')}></i></th>
                <th>Price <i className="fa-solid fa-sort" onClick={() => handleSort('course_price')}></i></th>
                <th>Enrollments <i className="fa-solid fa-sort" onClick={() => handleSort('enrollment')}></i></th>
                <th>Lessions <i className="fa-solid fa-sort" onClick={() => handleSort('lession')}></i></th>
                <th>Author <i className="fa-solid fa-sort" onClick={() => handleSort('author')}></i></th>
                <th>Status</th>
                {
                  editCoursePermission == 1 || deleteCoursePermission == 1 ? (

                    <th>Action</th>
                  ) : (
                    ""
                  )
                }
              </tr>
            </thead>

            <tbody>
              {sortedData.map((i, index) => {
                let auther = i.auther;
                try {
                  auther = JSON.parse(auther);
                  if (typeof auther === 'string') {
                    auther = JSON.parse(auther);
                  }
                } catch (e) {
                  auther = "Invalid data";
                }
                const formattedData = Array.isArray(auther) ? auther.join(", ") : "Invalid data";

                return (
                  <tr key={index}>
                    <td className="id">{index + 1}</td>
                    <td>
                      <h6><NavLink to={`/manage-course/${i.id}`}>{i.course_title}</NavLink></h6>
                    </td>
                    <td>{i.course_cate}</td>
                    <td>{i.course_price}</td>
                    <td>{i.enrollment}</td>
                    <td>{i.lession}</td>
                    <td>
                      {formattedData}
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          id="status"
                          checked={i.status === 1}
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
                    {
                      editCoursePermission == 1 || deleteCoursePermission == 1 ? (
                        <td>
                          <div
                            className={`menu-container ${activeDropdown === index ? "active" : ""
                              }`}
                          >
                            <div
                              className="menu-button"
                              onClick={() => toggleDropdown(index)}
                            >
                              {" "}
                              ⋮{" "}
                            </div>
                            {activeDropdown === index && (
                              <div className="menu-content">
                                {
                                  editCoursePermission == 1 && (
                                    <a
                                      style={{ cursor: "pointer" }}
                                    >
                                      <NavLink to={`/edit-course/${i.id}`}>
                                        <p>

                                          Edit
                                        </p>
                                      </NavLink>
                                    </a>
                                  )
                                }
                                {
                                  deleteCoursePermission == 1 && (
                                    <p
                                      onClick={() => deleteToggleModal(i.id)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Delete
                                    </p>
                                  )
                                }

                              </div>
                            )}
                          </div>
                        </td>
                      ) : ("")
                    }

                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>


      {/* Delete Confirmation Modal */}
      {deleteOpen && (
        <div className="modal">
          <div className="modal-container">
            <h5>Delete Coupon</h5>
            <p>Are you sure you want to delete this coupon?</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="primary-btn" onClick={handleDelete}>
                Delete
              </button>
              <button onClick={deleteToggleModal} className="secondary-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCourse;
