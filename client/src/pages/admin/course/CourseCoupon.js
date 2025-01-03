import React, { useContext, useEffect, useMemo, useState } from "react";
import Hoc from "../layout/Hoc";
import axiosInstance from "../utils/axiosInstance";
import "../../../assets/css/course/addcoupon.css";
import "../../../assets/css/main.css";
import { userRolesContext } from "../layout/RoleContext";
import DeleteModal from "../layout/DeleteModal";
import Loading from "../layout/Loading";
import useCheckRolePermission from "../layout/CheckRolePermission";
import { notifyWarning } from "../layout/ToastMessage";
import moment from "moment-timezone";
const port = process.env.REACT_APP_URL;

const CourseCoupon = () => {
  const { userId, userRole ,setting} = useContext(userRolesContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addCouponData, setAddCouponData] = useState({
    coupon_code: "",
    course_name: [],
    discount_in_percentage: "",
    discount_in_amount: "",
    expired_date: "",
    created_by: userId,
    updated_by: userId,
  });
  const perm = useCheckRolePermission("Course Coupon");
  const addCourseCoupon = perm.length > 0 && perm[0].can_add === 1 ? 1 : 0;
  const editCourseCoupon = perm.length > 0 && perm[0].can_edit === 1 ? 1 : 0;
  const deleteCourseCoupon = perm.length > 0 && perm[0].can_delete === 1 ? 1 : 0;

  const [discountType, setDiscountType] = useState("percentage");

  const generateRandomCode = (num) => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    if (num === 1) {
      setAddCouponData({
        ...addCouponData,
        coupon_code: randomCode,
      });
    }
    if (num === 2) {
      setEditCouponData({
        ...editCouponData,
        coupon_code: randomCode,
      });
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  //get course data
  const [courseData, setCourseData] = useState([]);
  const getCourseData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseMasterData`);
      setCourseData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //get coupon data
  const getCouponData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseCouponData`);
      setCouponData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //add coupon data
  const handleCourseSelection = (e) => {
    const selectedCourseId = parseInt(e.target.value); // Ensure the value is an integer

    if (selectedCourseId && !addCouponData.course_name.includes(selectedCourseId)) {
      setAddCouponData({
        ...addCouponData,
        course_name: [...addCouponData.course_name, selectedCourseId], // Only store IDs
      });
    }
  };


  const handleEditCourseSelection = (e) => {
    const selectedCourseId = parseInt(e.target.value);
    if (
      selectedCourseId &&
      !editCouponData.course_name.includes(selectedCourseId)
    ) {
      setEditCouponData({
        ...editCouponData,
        course_name: [...editCouponData.course_name, selectedCourseId],
      });
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setAddCouponData({
      ...addCouponData,
      course_name: addCouponData.course_name.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };
  const handleEditRemoveKeyword = (indexToRemove) => {
    setEditCouponData({
      ...editCouponData,
      course_name: editCouponData.course_name.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCouponData({
      ...addCouponData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addCouponData.coupon_code) {
      notifyWarning("Please enter a coupon code.");
      return;
    }
    if (!addCouponData.course_name.length) {
      notifyWarning("Please select at least one course.");
      return;
    }
    if (!addCouponData.discount_in_percentage && !addCouponData.discount_in_amount) {
      notifyWarning("Please enter a discount value.");
      return;
    }
    if (!addCouponData.expired_date) {
      notifyWarning("Please select an expiration date.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(`${port}/addingCourseCoupon`, addCouponData);
      getCouponData();
      setAddCouponData({
        coupon_code: "",
        course_name: [],
        discount_in_percentage: "",
        discount_in_amount: "",
        expired_date: "",
      });
      setAddOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //delete code

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(
        `${port}/deletingCourseCoupon/${id}`
      );
      getCouponData();
      setDeleteOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //edit code
  const [editCouponData, setEditCouponData] = useState({
    coupon_code: "",
    course_name: [],
    discount_in_percentage: "",
    discount_in_amount: "",
    expired_date: "",
    updated_by: userId,
  });
  const getCouponDataForEdit = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${port}/gettingCourseCouponDataWithId/${id}`
      );
      let courseName = res.data.course_name;
      
      try {
        courseName = JSON.parse(courseName);
      } catch (e) {
        courseName = [];
      }
      
      res.data.course_name = Array.isArray(courseName) ? courseName : [];
      
      const time = moment.unix(res.data.expired_date).tz(setting.timezone).format("YYYY-MM-DD");
      setEditCouponData((prev)=>({
        ...prev,
        ...res.data,
        expired_date: time
      }));
      setDiscountType(
        res.data.discount_in_percentage ? "percentage" : "amount"
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "discount_in_percentage" && value !== "") {
      setEditCouponData({
        ...editCouponData,
        discount_in_percentage: value,
        discount_in_amount: "",
      });
    } else if (name === "discount_in_amount" && value !== "") {
      setEditCouponData({
        ...editCouponData,
        discount_in_amount: value,
        discount_in_percentage: "",
      });
    } else {
      setEditCouponData({
        ...editCouponData,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (discountType === "percentage") {
      setEditCouponData({
        ...editCouponData,
        discount_in_amount: "",
      });
    }
    if (discountType === "amount") {
      setEditCouponData({
        ...editCouponData,
        discount_in_percentage: "",
      });
    }
    if (!editCouponData.coupon_code) {
      notifyWarning("Please enter a coupon code.");
      return;
    }
    if (!editCouponData.course_name.length) {
      notifyWarning("Please select at least one course.");
      return;
    }
    if (!editCouponData.discount_in_percentage && !editCouponData.discount_in_amount) {
      notifyWarning("Please enter a discount value.");
      return;
    }
    if (!editCouponData.expired_date) {
      notifyWarning("Please select an expiration date.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.put(
        `${port}/updatingCourseCoupon/${editCouponData.id}`,
        editCouponData
      );
      getCouponData();
      setEditOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCouponData();
    getCourseData();
  }, []);
  //status change code
  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`${port}/updatingCourseCouponStatus/${id}`, {
        status: status,
      });
      getCouponData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addToggleModal = () => {
    setAddOpen(!addOpen);
  };

  const editToggleModal = async (id) => {
    if (id) {
      try {
        await getCouponDataForEdit(id);
      } catch (error) {
        console.error("Error fetching coupon data:", error);
      }
    }
    setEditOpen(!editOpen);
  };

  const [deleteId, setDeleteId] = useState(null);
  const deleteToggleModal = (index) => {
    setDeleteOpen(!deleteOpen);
    setDeleteId(index);
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
  const courseLookup = useMemo(() => {
    return courseData.reduce((acc, course) => {
      acc[course.id] = course.course_title;
      return acc;
    }, {});
  }, [courseData]);
  const sortedData = useMemo(() => {
    let sortableItems = [...couponData];
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
  }, [couponData, sortConfig]);

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

  //filterd data
  const filteredData = useMemo(() => {
    return sortedData.filter((item) => {
      const courseIds = JSON.parse(item.course_name); // Parse the course_name to get the array of course IDs
      const courseNames = courseIds.map((courseId) => courseLookup[courseId] || "Invalid course");
      return item.coupon_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.discount_in_percentage).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.discount_in_amount).toLowerCase().includes(searchQuery.toLowerCase()) ||
        courseNames.some((courseName) => courseName.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  }, [sortedData, searchQuery]);


  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Course Coupons</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-input" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="hero-inner-logo">
            <img src={require("../../../assets/image/pdf-logo.png")} alt="pdf" />
            <img src={require("../../../assets/image/x-logo.png")} alt="excel" />
          </div>
          {(userRole === "superAdmin" || addCourseCoupon == 1) && (
            <button onClick={addToggleModal} className="primary-btn module-btn">
              + Add
            </button>
          )}
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style={{ width: "5%", paddingLeft: "10px" }}>Id</th>
                <th style={{ width: "15%" }}>
                  Coupon code{" "}
                  <i
                    className="fa-solid fa-sort"
                    onClick={() => handleSort("coupon_code")}
                  ></i>
                </th>
                <th style={{ width: "25%" }}>
                  Course Name{" "}
                  <i
                    className="fa-solid fa-sort"
                    onClick={() => handleSort("course_name")}
                  ></i>
                </th>
                <th style={{ width: "15%" }}>
                  Discount{" "}
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      handleSort(
                        "discount_in_persentage" || "discount_in_amount"
                      )
                    }
                  ></i>
                </th>
                <th style={{ width: "15%" }}>
                  Validity till{" "}
                  <i
                    className="fa-solid fa-sort"
                    onClick={() => handleSort("expired_date")}
                  ></i>
                </th>
                {(userRole === "superAdmin" || editCourseCoupon == 1) && (
                  <th style={{ width: "10%" }}>Status</th>
                )}
                {(userRole === "superAdmin" || editCourseCoupon == 1 && deleteCourseCoupon == 1) && (
                  <th style={{ width: "10%" }}>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((i, index) => {
                const courseIds = JSON.parse(i.course_name); // Parse the course_name to get the array of course IDs
                const courseNames = courseIds.map((courseId) => courseLookup[courseId] || "Invalid course");

                const formattedData = courseNames.length > 0 ? courseNames.join(", ") : "Invalid data";

                const time = moment.unix(i.expired_date).tz(setting.timezone).format("DD-MM-YYYY");

                return (
                  <tr key={index}>
                    <td style={{ paddingLeft: "10px" }}>{index + 1}</td>
                    <td>{i.coupon_code}</td>
                    <td>{formattedData}</td>
                    <td>
                      {i.discount_in_percentage
                        ? i.discount_in_percentage + "%"
                        : i.discount_in_amount}
                    </td>
                    <td>{time}</td>
                    {(userRole === "superAdmin" || editCourseCoupon == 1) && (
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={i.status === 1}
                            onChange={() => handleStatusChange(i.id, i.status)}
                          />
                          <span className="slider"></span>
                        </label>
                      </td>
                    )}
                    {(userRole === "superAdmin" || editCourseCoupon == 1 && deleteCourseCoupon == 1) && (
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
                              {(userRole === "superAdmin" || editCourseCoupon == 1) && (
                                <a
                                  onClick={() => {
                                    editToggleModal(i.id);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <p>Edit</p>
                                </a>
                              )}
                              {(userRole === "superAdmin" || deleteCourseCoupon == 1) && (
                                <p>
                                  <DeleteModal
                                    onDelete={() => handleDelete(i.id)}
                                  />
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Model */}
        {addOpen && (
          <div className="modal">
            <div className="modal-container">
              <h5>Add Coupon</h5>
              <form className="coupon-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    Coupon code<span className="required">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="coupon_code"
                      className="code-coupon-input"
                      placeholder="Enter coupon code"
                      onChange={handleChange}
                      value={addCouponData.coupon_code}
                    />
                    <button
                      type="button"
                      onClick={() => generateRandomCode(1)}
                      className="generate-btn"
                    >
                      Generate random
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Course Name</label>
                  <select
                    className="form-control col12input"
                    onChange={handleCourseSelection}
                    value={courseData.id}
                  >
                    <option value="" >
                      Select a course
                    </option>
                    {courseData.map((course, index) => (
                      <option key={index} value={course.id}>
                        {course.course_title}
                      </option>
                    ))}
                  </select>
                  <div className="tag-container">
                    {addCouponData.course_name.map((courseId, index) => {
                      const course = courseData.find((course) => course.id === courseId); // Find the course title
                      return (
                        <div className="tag" key={index}>
                          {course?.course_title || "Unknown Course"} {/* Display course title */}
                          <span
                            className="tag-close"
                            onClick={() => handleRemoveKeyword(index)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group" style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Discount Type :</label>
                  <div className="discount-box">
                    <label>
                      <input
                        type="radio"
                        value="percentage"
                        checked={discountType === "percentage"}
                        onChange={() => setDiscountType("percentage")}
                      />
                      Percentage
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                      <input
                        type="radio"
                        value="amount"
                        checked={discountType === "amount"}
                        onChange={() => setDiscountType("amount")}
                      />
                      Amount
                    </label>
                  </div>
                </div>

                <div
                  className="form-group"
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  {discountType === "percentage" && (
                    <div className="flex-item">
                      <label>Discount percentage</label>
                      <div
                        className="input-group"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="number"
                          name="discount_in_percentage"
                          placeholder="0"
                          className="col12input"
                          onChange={handleChange}
                          value={addCouponData.discount_in_percentage || null}
                          style={{ marginTop: "0px" }}
                        />
                        <span className="percentage-icon">%</span>
                      </div>
                    </div>
                  )}
                  {discountType === "amount" && (
                    <div className="flex-item">
                      <label>Discount amount</label>
                      <div
                        className="input-group"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="number"
                          name="discount_in_amount"
                          placeholder="0"
                          className="col12input"
                          onChange={handleChange}
                          value={addCouponData.discount_in_amount || null}
                          style={{ marginTop: "0px" }}
                        />
                        <span className="percentage-icon">$</span>
                      </div>
                    </div>
                  )}

                  <div className="flex-item">
                    <label>
                      Expiry date<span className="required">*</span>
                    </label>
                    <input
                      style={{ marginTop: "8px" }}
                      type="date"
                      defaultValue="yyyy-mm-dd"
                      name="expired_date"
                      value={addCouponData.expired_date}
                      onChange={handleChange}
                      className="col12input"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" className="primary-btn">
                    Submit
                  </button>
                  <button onClick={addToggleModal} className="secondary-btn">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit model */}
        {editOpen && (
          <div className="modal">
            <div className="modal-container">
              <h5>Edit Coupon</h5>
              <form className="coupon-form" onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>
                    Coupon code<span className="required">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="coupon_code"
                      value={editCouponData.coupon_code}
                      className="code-coupon-input"
                      placeholder="Enter coupon code"
                      onChange={handleEditChange}
                    />
                    <button
                      type="button"
                      onClick={() => generateRandomCode(2)}
                      className="generate-btn"
                    >
                      Generate random
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="currency_input">
                    <label>Course Name</label>
                    <select
                      className="form-control"
                      onChange={handleEditCourseSelection}
                      value={editCouponData.course_name}
                    >
                      <option value="">Select a course</option>
                      {courseData.map((course, index) => (
                        <option key={index} value={course.id}>
                          {course.course_title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="tag-container">
                    {editCouponData.course_name.map((courseId, index) => {
                      const course = courseData.find((course) => course.id === courseId);
                      return course ? (
                        <div className="tag" key={index}>
                          {course.course_title}
                          <span
                            className="tag-close"
                            onClick={() => handleEditRemoveKeyword(index)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="form-group" style={{ display: "flex" }}>
                  <label style={{ marginRight: "10px" }}>Discount Type :</label>
                  <div className="discount-box">
                    <label>
                      <input
                        type="radio"
                        value="percentage"
                        checked={discountType === "percentage"}
                        onChange={() => setDiscountType("percentage")}
                      />
                      Percentage
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                      <input
                        type="radio"
                        value="amount"
                        checked={discountType === "amount"}
                        onChange={() => setDiscountType("amount")}
                      />
                      Amount
                    </label>
                  </div>
                </div>

                <div
                  className="form-group"
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  {discountType === "percentage" && (
                    <div className="flex-item">
                      <label>Discount percentage</label>
                      <div
                        className="input-group"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="number"
                          name="discount_in_percentage"
                          value={editCouponData.discount_in_percentage || null}
                          className="col12input"
                          style={{ marginTop: "0px" }}
                          onChange={handleEditChange}
                        />
                        <span className="percentage-icon">%</span>
                      </div>
                    </div>
                  )}
                  {discountType === "amount" && (
                    <div className="flex-item">
                      <label>Discount Amount</label>
                      <div
                        className="input-group"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="number"
                          name="discount_in_amount"
                          value={editCouponData.discount_in_amount || null}
                          className="col12input"
                          style={{ marginTop: "0px" }}
                          onChange={handleEditChange}
                        />
                        <span className="percentage-icon">$</span>
                      </div>
                    </div>
                  )}

                  <div className="flex-item">
                    <label>
                      Expiry date<span className="required">*</span>
                    </label>
                    <input
                      style={{ marginTop: "8px" }}
                      type="date"
                      name="expired_date"
                      value={editCouponData.expired_date}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" className="primary-btn">
                    Update
                  </button>
                  <button onClick={editToggleModal} className="secondary-btn">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
      </div>
    </>
  );
};

export default CourseCoupon;
