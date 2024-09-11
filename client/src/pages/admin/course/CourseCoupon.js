import React, { useEffect, useMemo, useState } from "react";
import Hoc from "../layout/Hoc";
import axios from "axios";
import "../../../assets/css/course/addcoupon.css";
import "../../../assets/css/main.css";
import { NavLink } from "react-router-dom";
const port = process.env.REACT_APP_URL

const CourseCoupon = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [addCouponData, setAddCouponData] = useState({
    coupon_code: "",
    course_name: [],
    discount_in_percentage: "",
    discount_in_amount: "",
    expired_date: "",
  })
  const [discountType, setDiscountType] = useState("percentage");

  const generateRandomCode = (num) => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    if (num === 1) {
      setAddCouponData({
        ...addCouponData,
        coupon_code: randomCode
      })
    }
    if (num === 2) {
      setEditCouponData({
        ...editCouponData,
        coupon_code: randomCode
      })
    }

  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  //get course data
  const [courseData, setCourseData] = useState([]);
  const getCourseData = async () => {
    try {
      const res = await axios.get(`${port}/gettingCourseMasterData`);
      setCourseData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  //get coupon data
  const getCouponData = async () => {
    try {
      const res = await axios.get(`${port}/gettingCourseCouponData`);
      setCouponData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  //add coupon data
  const handleCourseSelection = (e) => {
    const selectedCourse = e.target.value;
    if (selectedCourse && !addCouponData.course_name.includes(selectedCourse)) {
      setAddCouponData({
        ...addCouponData,
        course_name: [...addCouponData.course_name, selectedCourse],
      });
    }
  };
  const handleEditCourseSelection = (e) => {
    const selectedCourse = e.target.value;
    if (selectedCourse && !editCouponData.course_name.includes(selectedCourse)) {
      setEditCouponData({
        ...editCouponData,
        course_name: [...editCouponData.course_name, selectedCourse],
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
    const { name, value } = e.target
    setAddCouponData({
      ...addCouponData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${port}/addingCourseCoupon`, addCouponData)
      getCouponData();
      setAddOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  //delete code

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${port}/deletingCourseCoupon/${deleteId}`);
      getCouponData();
      setDeleteOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  //edit code
  const [editCouponData, setEditCouponData] = useState({
    coupon_code: "",
    course_name: [],
    discount_in_percentage: "",
    discount_in_amount: "",
    expired_date: "",
  })
  const getCouponDataForEdit = async (id) => {
    try {
      const res = await axios.get(`${port}/gettingCourseCouponDataWithId/${id}`);
      let courseName = res.data.course_name;

      try {
        courseName = JSON.parse(courseName);
      } catch (e) {
        courseName = [];
      }

      res.data.course_name = Array.isArray(courseName) ? courseName : [];

      setEditCouponData(res.data);
      setDiscountType(res.data.discount_in_percentage ? "percentage" : "amount");

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
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
    try {
      const res = await axios.put(`${port}/updatingCourseCoupon/${editCouponData.id}`, editCouponData)
      getCouponData();
      setEditOpen(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCouponData();
    getCourseData();
  }, [])
  //status change code
  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(`${port}/updatingCourseCouponStatus/${id}`, { status: status });
      getCouponData();
    } catch (error) {
      console.log(error)
    }
  };

  const addToggleModal = () => {
    setAddOpen(!addOpen);
  };

  const editToggleModal = async (id) => {
    if (id) {
      await getCouponDataForEdit(id);
    }
    setEditOpen(!editOpen);
  };

  const [deleteId, setDeleteId] = useState(null)
  const deleteToggleModal = (index) => {
    setDeleteOpen(!deleteOpen);
    setDeleteId(index)
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


  return (
    <>
      <Hoc />
      <div class="main">
        <div class="main-top-bar">
          <div id="user-tag">
            <h5>Course Coupons</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div class="hero-inner-logo">
            <img src={require("../../../assets/image/pdf-logo.png")} />
            <img src={require("../../../assets/image/x-logo.png")} />
          </div>
          <button onClick={addToggleModal} className="primary-btn module-btn">
            + Add
          </button>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style={{ width: "5%", paddingLeft: "10px" }}>Id</th>
                <th style={{ width: "15%" }}>Coupon code <i class="fa-solid fa-sort" onClick={() => handleSort('coupon_code')}></i></th>
                <th style={{ width: "25%" }}>Course Name <i class="fa-solid fa-sort" onClick={() => handleSort('course_name')}></i></th>
                <th style={{ width: "15%" }}>Discount <i class="fa-solid fa-sort" onClick={() => handleSort('discount_in_persentage' || 'discount_in_amount')}></i></th>
                <th style={{ width: "15%" }}>Validity till <i class="fa-solid fa-sort" onClick={() => handleSort('expired_date')}></i></th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((i, index) => {
                let courseName = i.course_name;

                try {
                  courseName = JSON.parse(courseName);
                } catch (e) {
                  courseName = "Invalid data";
                }

                const formattedData = Array.isArray(courseName) ? courseName.join(", ") : "Invalid data";

                return (
                  <tr key={index}>
                    <td style={{ paddingLeft: "10px" }}>{index + 1}</td>
                    <td>
                      {i.coupon_code}
                    </td>
                    <td>
                      {formattedData}
                    </td>
                    <td>{i.discount_in_percentage ? i.discount_in_percentage + "%" : i.discount_in_amount}</td>
                    <td>{i.expired_date}</td>
                    <td>
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={i.status === 1}
                          onChange={() => handleStatusChange(i.id, i.status)}
                        />
                        <span class="slider"></span>
                      </label>
                    </td>
                    <td>
                      <div
                        className={`menu-container ${activeDropdown === index ? "active" : ""
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
                              onClick={() => {
                                editToggleModal(i.id);
                              }}
                              className="add-button"
                              style={{ cursor: "pointer" }}
                            >
                              <p>Edit</p>
                            </a>
                            <p
                              onClick={() => deleteToggleModal(i.id)} // Open delete modal
                              style={{ cursor: "pointer" }}
                            >
                              Delete
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div class="footer-text">
          <p>Showing 1-09 of 78</p>
          <span class="next-page-icon">
            <i class="fa-solid fa-angle-left"></i>
            <i class="fa-solid fa-angle-right"></i>
          </span>
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
                  <div className="currency_input">
                    <label>Course Name</label>
                    <select
                      className="form-control"
                      onChange={handleCourseSelection}
                      value=""
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      {courseData.map((course, index) => (
                        <option key={index} value={course.course_title}>
                          {course.course_title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="tag-container">
                    {addCouponData.course_name.map((coursename, index) => (
                      <div className="tag" key={index}>
                        {coursename}
                        <span
                          className="tag-close"
                          onClick={() => handleRemoveKeyword(index)}
                        >
                          X
                        </span>
                      </div>
                    ))}
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
                      value=""
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      {courseData.map((course, index) => (
                        <option key={index} value={course.course_title}>
                          {course.course_title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="tag-container">
                    {editCouponData.course_name.map((coursename, index) => (
                      <div className="tag" key={index}>
                        {coursename}
                        <span
                          className="tag-close"
                          onClick={() => handleEditRemoveKeyword(index)}
                        >
                          X
                        </span>
                      </div>
                    ))}
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
