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
  const { userRole, setting } = useContext(userRolesContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  // Get course category
  const [courseCategory, setCourseCategory] = useState();
  const getCourseCategory = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingNotNullCourseCategory`);
      setCourseCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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
    getCourseCategory();
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
  //status change
  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`${port}/updatingCourseStatus/${id}`, {
        status: status,
      });
      getCourseData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      item.course_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);


  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".menu-content") &&
      !event.target.closest(".dropdown-trigger")
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <input id="search-input" type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
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
                <th>Author <i className="fa-solid fa-sort" onClick={() => handleSort('auther')}></i></th>
                <th>Status</th>
                {(userRole === "superAdmin" || editCoursePermission == 1 || deleteCoursePermission == 1) ? (
                  <th>Action</th>
                ) : (
                  ""
                )
                }
              </tr>
            </thead>

            <tbody>
              {filteredData.map((i, index) => {
                let auther = i.auther;
                try {
                  if (typeof auther == 'string') {
                    auther = JSON.parse(auther);
                  }
                } catch (e) {
                  auther = "Invalid data";
                }
                const formattedData = Array.isArray(auther) ? auther.join(", ") : "Invalid data";
                const category = courseCategory?.find((cat) => cat.id === i.course_cate)?.cate_title || 'Unknown Category';
                return (
                  <tr key={index}>
                    <td className="id">{index + 1}</td>
                    <td>
                      <h6><NavLink className="text-sm" to={`/admin/manage-course/${i.id}`}>{i.course_title}</NavLink></h6>
                    </td>
                    <td>{category}</td>
                    <td>{setting.position == "left" ? setting.symbol : ""}{i.course_price}{setting.position == "right" ? setting.symbol : ""}</td>
                    <td>{i.enrollmentCount}</td>
                    <td>{i.lessonCount}</td>
                    <td>
                      {formattedData}
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          id="status"
                          checked={i.status === 1}
                          onChange={() => handleStatusChange(i.id, i.status)}
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
                    {(userRole === "superAdmin" || editCoursePermission == 1 || deleteCoursePermission == 1) ? (
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
                              {(userRole === "superAdmin" ||
                                editCoursePermission == 1) && (
                                  <a
                                    style={{ cursor: "pointer" }}
                                  >
                                    <NavLink to={`/admin/edit-course/${i.id}`}>
                                      <p>

                                        Edit
                                      </p>
                                    </NavLink>
                                  </a>
                                )
                              }
                              {(userRole === "superAdmin" ||
                                deleteCoursePermission == 1) && (
                                  <p
                                    onClick={() => deleteToggleModal(i.id)}
                                    className="cursor-pointer"
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
