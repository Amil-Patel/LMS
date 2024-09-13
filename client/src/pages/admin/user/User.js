import React, { useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/user/user.css";
import { Form, NavLink } from "react-router-dom";

const User = () => {
  const [tab, setTab] = useState("user");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addUserOpen, setAddUserOpen] = useState(false); // state for open add user modal
  const [editUserOpen, setEditUserOpen] = useState(false); // state for open edit user modal

  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/150");
  const [fileName, setFileName] = useState("");

  const handleChangeTab = (tabName) => {
    setTab(tabName);
  };

  // User Table Data
  const data = [
    {
      id: 1,
      profile: require("../../../assets/image/user_img.jpeg"),
      name: "Christine Brooks",
      email: "089 Kutch Green Apt.",
      contact: "+91 9876543210",
      gender: "Male",
      country: "India",
    },

    {
      id: 1,
      profile: require("../../../assets/image/user_img.jpeg"),
      name: "Christine Brooks",
      email: "089 Kutch Green Apt.",
      contact: "+91 9876543210",
      gender: "Female",
      country: "India",
    },

    {
      id: 1,
      profile: require("../../../assets/image/user_img.jpeg"),
      name: "Christine Brooks",
      email: "089 Kutch Green Apt.",
      contact: "+91 9876543210",
      gender: "Male",
      country: "India",
    },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Function to toggle visibility of add user modal
  const userToggleModal = () => {
    setAddUserOpen(!addUserOpen);
  };

  // Function to toggle visibility of edit user modal
  const editUserToggleModal = () => {
    setEditUserOpen(!editUserOpen);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Users</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            <li onClick={() => handleChangeTab("user")}>
              <NavLink className={tab === "user" ? "active-tab" : ""}>
                USER
              </NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("instructure")}>
              <NavLink className={tab === "instructure" ? "active-tab" : ""}>
                instructure
              </NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("admin")}>
              <NavLink className={tab === "admin" ? "active-tab" : ""}>
                admin 
              </NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("super-admin")}>
              <NavLink className={tab === "super-admin" ? "active-tab" : ""}>
                super admin
              </NavLink>
            </li>
          </ul>

          <button className="primary-btn module-btn" onClick={userToggleModal}>
            Add New
          </button>
        </div>

        <div className="course-form-container">
          {/* Basic Info Tab */}
          {tab == "user" && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Gender</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="profile-img">
                      <img src={item.profile} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.gender}</td>
                    <td>{item.country}</td>
                    <td>
                      <label class="switch">
                        <input type="checkbox" />
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
                              style={{ cursor: "pointer" }}
                            >
                              <p onClick={editUserToggleModal}>Edit</p>
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
                ))}
              </tbody>
            </table>
          )}
          {tab=="instructure" && (
            <h4>instructure Tab</h4>
          )}
          {tab=="admin" && (
            <h4>admin Tab</h4>
          )}
          {tab=="super-admin" && (
            <h4>super admin Tab</h4>
          )}
        </div>

        {/* Add User Modal */}
        {addUserOpen && (
          <div className="modal">
            <div className="add-lesson-container" style={{ width: "60%" }}>
              <div class="quiz-top-header">
                <div class="quiz-header">
                  <h5>Add New User</h5>
                </div>
                <div>
                  <button
                    class="primary-btn module-btn"
                    style={{ marginRight: "20px" }}
                  >
                    Save
                  </button>
                  <span onClick={userToggleModal}>
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
              <form>
                {/* first / middle / last  name */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      First Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>Middle Name</label>
                    <input
                      type="text"
                      placeholder="Enter Middle Name"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      Last Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* email / password */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>
                      Email<span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="password"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* status / publish date */}
                <div className="flex-row flex-row80">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>User Roll</label>
                    <select className="col12input">
                      <option value="upcoming">Upcoming</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Status</label>
                    <input
                      type="date"
                      placeholder="Enter Course Title"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* contact / whatsapp number */}
                <div className="flex-row " style={{ gap: "20px" }}>
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      Contact Number<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="9876543210"
                      className="col12input"
                    />
                  </div>
                  <div className="chekbox" style={{ width: "23%" }}>
                    <input type="checkbox" />
                    <label>Same WhatsApp</label>
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      WhatsApp
                      <label>
                        <span className="required">*</span>
                      </label>
                    </label>
                    <input
                      type="text"
                      placeholder="9876543210"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* address / country */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="Address"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* gender / DOB / profile image */}
                <div style={{ display: "flex" }}>
                  <div className="flex-row" style={{ width: "45%" }}>
                    <div className="form-group mb-0" style={{ width: "48%" }}>
                      <label>Gender</label>
                      <select className="col12input">
                        <option value="upcoming">Male</option>
                        <option value="upcoming">Female</option>
                        <option value="upcoming">Other</option>
                      </select>
                    </div>

                    <div className="form-group mb-0" style={{ width: "48%" }}>
                      <label>DOB</label>
                      <input
                        type="date"
                        placeholder="Enter Course Title"
                        className="col12input"
                      />
                    </div>
                  </div>

                  <div
                    className="flex-row"
                    style={{
                      width: "50%",
                      border: "none",
                      marginLeft: "30px",
                      alignItems: "end",
                      gap: "20px",
                      justifyContent: "normal",
                    }}
                  >
                    <div className="form-group mb-0" style={{ width: "50%" }}>
                      <label>
                        Profile Picture <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="col12input"
                        value={fileName}
                        readOnly
                      />
                    </div>

                    <button
                      className="primary-btn module-btn"
                      type="button"
                      onClick={handleButtonClick}
                    >
                      Browse
                    </button>

                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    <div>
                      <img
                        src={imageSrc}
                        style={{ width: "67px", maxHeight: "67px" }}
                        alt="Selected Thumbnail"
                      />
                    </div>
                  </div>
                </div>

                {/* user about details */}
                <div className="flex-row" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "100%" }}>
                    <label>About User</label>
                    <textarea
                      type="text"
                      placeholder="Enter Your About Details"
                      className="col12input"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {editUserOpen && (
          <div className="modal">
            <div className="add-lesson-container" style={{ width: "60%" }}>
              <div class="quiz-top-header">
                <div class="quiz-header">
                  <h5>Edit User</h5>
                </div>
                <div>
                  <button
                    class="primary-btn module-btn"
                    style={{ marginRight: "20px" }}
                  >
                    Update
                  </button>
                  <span onClick={editUserToggleModal}>
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
              <form>
                {/* first / middle / last  name */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      First Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>Middle Name</label>
                    <input
                      type="text"
                      placeholder="Enter Middle Name"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      Last Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* email / password */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>
                      Email<span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="password"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* status / publish date */}
                <div className="flex-row flex-row80">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>User Roll</label>
                    <select className="col12input">
                      <option value="upcoming">Upcoming</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Status</label>
                    <input
                      type="date"
                      placeholder="Enter Course Title"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* contact / whatsapp number */}
                <div className="flex-row " style={{ gap: "20px" }}>
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      Contact Number<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="9876543210"
                      className="col12input"
                    />
                  </div>
                  <div className="chekbox" style={{ width: "23%" }}>
                    <input type="checkbox" />
                    <label>Same WhatsApp</label>
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      WhatsApp
                      <label>
                        <span className="required">*</span>
                      </label>
                    </label>
                    <input
                      type="text"
                      placeholder="9876543210"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* address / country */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="Address"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* gender / DOB / profile image */}
                <div style={{ display: "flex" }}>
                  <div className="flex-row" style={{ width: "45%" }}>
                    <div className="form-group mb-0" style={{ width: "48%" }}>
                      <label>Gender</label>
                      <select className="col12input">
                        <option value="upcoming">Male</option>
                        <option value="upcoming">Female</option>
                        <option value="upcoming">Other</option>
                      </select>
                    </div>

                    <div className="form-group mb-0" style={{ width: "48%" }}>
                      <label>DOB</label>
                      <input
                        type="date"
                        placeholder="Enter Course Title"
                        className="col12input"
                      />
                    </div>
                  </div>

                  <div
                    className="flex-row"
                    style={{
                      width: "50%",
                      border: "none",
                      marginLeft: "30px",
                      alignItems: "end",
                      gap: "20px",
                      justifyContent: "normal",
                    }}
                  >
                    <div className="form-group mb-0" style={{ width: "50%" }}>
                      <label>
                        Profile Picture <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="col12input"
                        value={fileName}
                        readOnly
                      />
                    </div>

                    <button
                      className="primary-btn module-btn"
                      type="button"
                      onClick={handleButtonClick}
                    >
                      Browse
                    </button>

                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    <div>
                      <img
                        src={imageSrc}
                        style={{ width: "67px", maxHeight: "67px" }}
                        alt="Selected Thumbnail"
                      />
                    </div>
                  </div>
                </div>

                {/* user about details */}
                <div className="flex-row" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "100%" }}>
                    <label>About User</label>
                    <textarea
                      type="text"
                      placeholder="Enter Your About Details"
                      className="col12input"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
