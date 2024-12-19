import React, { useState } from 'react'

import Navbar from '../client/layout/Navbar'
import Breadcrumb from '../client/course/Breadcrumb'
import Sidebar from './layout/Sidebar'

const StudentProfile = () => {

  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/150");
  const [fileName, setFileName] = useState("");

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
      <Navbar />
      <Breadcrumb />
      <div className='main_stu_dashboard'>

        <Sidebar />
        <div className="main static p-0 " >
          <h1 className='font-bold text-3xl top-0 left-0 bg-white z-10 text-black'>Profile</h1>
          <div className="course-form-container shadow-none">
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
              <div className="flex-row" style={{ gap: "30px" }}>
                <div className="form-group mb-0" style={{ width: "38%" }}>
                  <label>
                    Email<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="col12input"
                  />
                </div>

                <div className="form-group mb-0" style={{ width: "23%" }}>
                  <label>
                    Contact Number<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="9876543210"
                    className="col12input"
                  />
                </div>
                <div className="chekbox" style={{ width: "16%" }}>
                  <input type="checkbox" />
                  <label>Same WhatsApp</label>
                </div>

                <div className="form-group mb-0" style={{ width: "23%" }}>
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
              <div className="flex-row flex-row80">
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
              <div className="flex-row" style={{ border: "none", padding: " 0" }}>
                <div className="form-group mb-0" style={{ width: "100%" }}>
                  <label>About User</label>
                  <textarea
                    type="text"
                    placeholder="Enter Your About Details"
                    className="col12input"
                  />
                </div>
              </div>

              <div style={{ width: "30%" }}>
                <label>Old Password</label>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="col12input"
                />
              </div>

              {/* new Password  */}

              <div
                className="flex-row flex-row80"
                style={{ border: "none", width: "64%", padding: "20px 0 0 0" }}
              >
                <div style={{ width: "47%" }}>
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="col12input"
                  />
                </div>

                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="col12input"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>





      </div>
    </>
  )
}

export default StudentProfile
