import React, { useState } from "react";
import "../../../assets/css/enrollement/enrollement.css";
import Hoc from "../layout/Hoc";

function Enrollements() {
  const [addOpen, setAddOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");

  const [courses, setCourses] = useState([
    { id: 1, name: "Security Service", status: true },
  ]);

  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCouponCode(randomCode);
  };

  const addToggleModal = () => {
    setAddOpen(!addOpen);
  };

  // Toggle switch button
  const handleToggle = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, status: !course.status } : course
      )
    );
  };

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Enrollements</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <a
            onClick={addToggleModal}
            className="add-button"
            style={{ cursor: "pointer" }}
          >
            <button className="primary-btn">+ Add</button>
          </a>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student name</th>
              <th>Course Name</th>
              <th>Course Expire</th>
              <th>Enrolled Mode</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="email_tbody">
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>
                  <h6>Christine Brooks</h6>
                  <p>example@gmail.com</p>
                </td>
                <td>{course.name}</td>
                <td>LifeTime</td>
                <td>Online / Manual</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={course.status}
                      onChange={() => handleToggle(course.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>
                <td className="del_icon">
                  <span className="delete">
                    <i class="fa-regular fa-trash-can"></i>
                  </span>
                  <span className="edit">
                    <i class="fa-solid fa-pencil"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Model */}
      {addOpen && (
        <div className="modal">
          <div className="modal-container">
            <h3>Add Enrollements</h3>
            <form className="coupon-form">
              <div className="form-group">
                <label>
                  Student Name<span className="required">*</span>
                </label>
                <div className="input-group">
                  <input type="text" placeholder="Enter Student Name" />
                </div>
              </div>

              <div className="form-group">
                <label>Select Course</label>
                <select
                  name="currency"
                  id="currency"
                  form="currencyform"
                  className="select_course"
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button onClick={addToggleModal} className="back-to-coupons">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
    </>
  );
}

export default Enrollements;
