import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Hoc from "../layout/Hoc";

function Inquiry() {
  const [editOpen, setEditOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const [courses, setCourses] = useState([
    { id: 1, name: "Security Service", status: true },
  ]);

  const handleEditClick = (course) => {
    setCurrentCourse(course);
    setEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditOpen(false);
    setCurrentCourse(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle editing logic here
    handleCloseEditModal();
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
            <h5>Inquiry</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student name</th>
              <th>Contact info</th>
              <th>Country</th>
              <th>Message</th>
              <th>Inquiry Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>
                  <h6>Christine Brooks</h6>
                  <p>Address Details is over Here</p>
                </td>
                <td>
                  <p>Email: admin@gmail.com</p>
                  <p>Call: +919510672871</p>
                  <p>wp: 9510672871</p>
                </td>
                <td>India</td>
                <td className="inq_message">
                  <p>Message Submitted By User will Appear Here</p>
                </td>
                <td className="succes" >
                  <p style={{backgroundColor:"#daf8da"}}>succes</p>
                </td>
                <td className="del_icon">
                  <span className="view">
                    <i class="fa-regular fa-eye"></i>
                  </span>
                  <span
                    className="edit"
                    onClick={() => handleEditClick(course)}
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editOpen && currentCourse && (
        <div className="modal">
          <div className="modal-container">
            <h3>Edit Status</h3>
            <form className="coupon-form">
              <div className="form-group">
                <label>
                  Inquiry Status<span className="required">*</span>
                </label>
                <input
                  type="radio"
                  name="fav_language"
                  value="CSS"
                  className="cur_sel"
                />
                <span for="right" className="text1">
                  Succes
                </span>

                <input
                  type="radio"
                  name="fav_language"
                  value="CSS"
                  className="cur_sel"
                  id="right"
                />
                <span for="right" className="text1">
                  Panding
                </span>

                <input
                  type="radio"
                  name="fav_language"
                  value="CSS"
                  className="cur_sel"
                  id="right"
                />
                <span for="right" className="text1">
                  Rejectd
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button
                  onClick={handleCloseEditModal}
                  className="back-to-coupons"
                >
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

export default Inquiry;
