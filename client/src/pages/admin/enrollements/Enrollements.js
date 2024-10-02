import React, { useState } from "react";
import "../../../assets/css/enrollement/enrollement.css";
import Hoc from "../layout/Hoc";

function Enrollements() {
  const [addOpen, setAddOpen] = useState(false);

  const [courses, setCourses] = useState([
    { id: 1, name: "Security Service", status: true },
  ]);

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
            <input id="search-input" type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <a onClick={addToggleModal} style={{ cursor: "pointer" }}>
            <button className="primary-btn module-btn">+ Add</button>
          </a>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
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
                <td>1</td>
                <td className="profile-img"><img src={require("../../../assets/image/user_img.jpeg")} alt="User" /></td>
                <td>
                  <h6>Christine Brooks</h6>
                  <p>example@gmail.com</p>
                </td>
                <td>{course.name}</td>
                <td>LifeTime</td>
                <td>Online / Manual</td>
                <td>
                  <label htmlFor="coursestatus" className="switch">
                    <input
                      type="checkbox"
                      name="status"
                      id="coursestatus"
                      checked={course.status}
                      onChange={() => handleToggle(course.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>
                <td className="del_icon">
                  <span className="delete">
                    <i className="fa-regular fa-trash-can"></i>
                  </span>
                  <span className="edit">
                    <i className="fa-solid fa-pencil"></i>
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
            <h5>Add Enrollements</h5>
            <form className="coupon-form">
              <div className="form-group">
                <label htmlFor="studentname">
                  Student Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="studentname"
                  id="studentname"
                  className="col12input"
                  placeholder="Enter Student Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency">Select Currentcy</label>
                <select
                  name="currency"
                  id="currency"
                  form="currencyform"
                  className="col12input"
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
    </>
  );
}

export default Enrollements;
