import React, { useState, useContext, useEffect } from "react";
import { userRolesContext } from "../layout/RoleContext";
import Hoc from "../layout/Hoc";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../layout/Loading";
import { validationEmail, validationName } from "../../../utils/validation";
import { notifyWarning } from "../layout/ToastMessage";
import moment from "moment-timezone";
const port = process.env.REACT_APP_URL;

const Profile = () => {
  const [newImage, setNewImage] = useState(null); // New selected image
  const [fileName, setFileName] = useState(""); // Display file name
  const { userId,setting } = useContext(userRolesContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/150');
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [sameNumber, setSameNumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //get user data
  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingUserMasterDataWithId/${userId}`);
      const time = moment.unix(res.data.dob).tz(setting.timezone).format("YYYY-MM-DD");
      setUserData((prevState) => ({
        ...prevState,
          ...res.data,
          dob: time, 
      }));
      // setUserData(res.data);
      setOldPassword(res.data.password);
      setImageSrc(res.data.profile);
      setFileName(res.data.profile);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const handleSameNumberChange = (e) => {
    setSameNumber(e.target.checked);
    if (!sameNumber) {
      setUserData((prev) => ({ ...prev, whatsapp_number: prev.contact }));
    } else {
      setUserData((prev) => ({ ...prev, whatsapp_number: "" }));
    }
  };

  //handle input chnage
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //password hide & show
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //input file chnage
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setNewImage(file); // Set new image
    }
  };
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  //save user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationName(userData.first_name)) {
      notifyWarning("Please enter a valid first name.");
      return;
    }
    if (!validationEmail(userData.email)) {
      notifyWarning("Please enter a valid email address.");
      return;
    }
    if (userData.password.length < 8) {
      notifyWarning("Password must be at least 8 characters long.");
      return;
    }
    if (userData.role_id === "") {
      notifyWarning("Please select a role.");
      return;
    }
    if (userData.status === "") {
      notifyWarning("Please select a status.");
      return;
    }
    if (userData.contact === "") {
      notifyWarning("Please enter a contact number.");
      return;
    }
    if (userData.whatsapp_number === "") {
      notifyWarning("Please enter a whatsapp number.");
      return;
    }
    if (userData.gender === "") {
      notifyWarning("Please select a gender.");
      return;
    }
    if (userData.dob === "") {
      notifyWarning("Please enter a date of birth.");
      return;
    }
    if (userData.profile === "") {
      notifyWarning("Please select a profile image.");
      return;
    }
    // Check if new password and confirm password are the same
    setLoading(true)
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false)
      return;
    }
    const updatedUserData = new FormData();
    
    // Append user data to FormData
    updatedUserData.append('first_name', userData.first_name);
    updatedUserData.append('middle_name', userData.middle_name);
    updatedUserData.append('last_name', userData.last_name);
    updatedUserData.append('email', userData.email);
    updatedUserData.append('contact', userData.contact);
    updatedUserData.append('whatsapp_number', userData.whatsapp_number);
    updatedUserData.append('address', userData.address);
    updatedUserData.append('country', userData.country);
    updatedUserData.append('gender', userData.gender);
    updatedUserData.append('dob', userData.dob);
    updatedUserData.append('description', userData.description);

    // Check if the new password is empty, if so, keep the old password
    const passwordToUse = newPassword === "" && confirmPassword === "" ? oldPassword : newPassword;
    updatedUserData.append('password', passwordToUse);

    // Append the selected profile image
    if (newImage) {
      updatedUserData.append('profile', newImage);
    }

    try {
      // Make the API request using updatedUserData with the new password
      await axiosInstance.put(`${port}/updatingUserMaster/${userId}`, updatedUserData);
      getUserData();
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Profile</h5>
          </div>

          <a>
            <button onClick={handleSubmit} className="primary-btn module-btn">Save</button>
          </a>
        </div>

        <div className="course-form-container ">
          <form>
            {/* first / middle / last  name */}
            <div className="flex-row">
              <div className="form-group mb-0" style={{ width: "32%" }}>
                <label htmlFor="first_name">
                  First Name<span className="required">*</span>
                </label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="col12input"
                />
              </div>

              <div className="form-group mb-0" style={{ width: "32%" }}>
                <label htmlFor="middle_name">Middle Name</label>
                <input
                  id="middle_name"
                  type="text"
                  name="middle_name"
                  value={userData.middle_name}
                  onChange={handleChange}
                  placeholder="Enter Middle Name"
                  className="col12input"
                />
              </div>

              <div className="form-group mb-0" style={{ width: "32%" }}>
                <label htmlFor="last_name">
                  Last Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="col12input"
                />
              </div>
            </div>

            {/* email / password */}
            <div className="flex-row" style={{ gap: "30px" }}>
              <div className="form-group mb-0" style={{ width: "38%" }}>
                <label htmlFor="email">
                  Email<span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="col12input"
                />
              </div>

              <div className="form-group mb-0" style={{ width: "23%" }}>
                <label htmlFor="contact">
                  Contact Number<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={userData.contact}
                  onChange={handleChange}
                  placeholder="Enter Contact No."
                  className="col12input"
                />
              </div>
              <div className="chekbox" style={{ width: "16%" }}>
                <input id="same_whatsapp" type="checkbox" checked={sameNumber} onChange={handleSameNumberChange} />
                <label htmlFor="same_whatsapp">Same WhatsApp</label>
              </div>

              <div className="form-group mb-0" style={{ width: "23%" }}>
                <label htmlFor="whatsapp_number">
                  WhatsApp
                  <label htmlFor="whatsapp_number">
                    <span className="required">*</span>
                  </label>
                </label>
                <input
                  type="text"
                  id="whatsapp_number"
                  name="whatsapp_number"
                  value={userData.whatsapp_number}
                  onChange={handleChange}
                  placeholder="Enter Contact No."
                  className="col12input"
                />
              </div>
            </div>

            {/* address / country */}
            <div className="flex-row flex-row80">
              <div className="form-group mb-0" style={{ width: "48%" }}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  className="col12input"
                  value={userData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-0" style={{ width: "48%" }}>
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="col12input"
                  value={userData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* gender / DOB / profile image */}
            <div style={{ display: "flex" }}>
              <div className="flex-row" style={{ width: "45%" }}>
                <div className="form-group mb-0" style={{ width: "48%" }}>
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" value={userData.gender} onChange={handleChange} className="col12input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group mb-0" style={{ width: "48%" }}>
                  <label htmlFor="dob">DOB</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
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
                  <label htmlFor="profile_picture">
                    Profile Picture <span className="required">*</span>
                  </label>
                  <input
                    id="profile_picture"
                    type="text"
                    name="profile_picture"
                    onChange={handleFileChange}
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
                  name="profile_picture"
                  onChange={handleFileChange}
                />

                <div>
                  {newImage ? (
                    <img
                      src={URL.createObjectURL(newImage)} // Show new image if selected
                      style={{ width: "67px", maxHeight: "67px" }}
                      alt="Selected Thumbnail"
                    />
                  ) : (
                    <img
                      src={`../upload/${imageSrc}` || 'https://via.placeholder.com/150'} // Show existing image or placeholder
                      style={{ width: "67px", maxHeight: "67px" }}
                      alt="Profile Thumbnail"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* user about details */}
            <div className="flex-row" style={{ border: "none", padding: " 0" }}>
              <div className="form-group mb-0" style={{ width: "100%" }}>
                <label htmlFor="description">About User</label>
                <textarea
                  type="text"
                  placeholder="Enter Your About Details"
                  className="col12input"
                  id="description"
                  name="description"
                  value={userData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ width: "30%" }}>
              <label htmlFor="old_password">Old Password</label>
              <input
                id="old_password"
                type="password"
                name="password"
                placeholder="Old Password"
                value={oldPassword}
                readOnly
                className="col12input"
              />
            </div>

            {/* new Password  */}

            <div
              className="flex-row flex-row80"
              style={{ border: "none", width: "64%", padding: "20px 0 0 0" }}
            >
              <div style={{ width: "47%", position: 'relative' }} >
                <label htmlFor="new_password">New Password</label>
                <input
                  name="password"
                  value={newPassword}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="new_password"
                  placeholder="New Password"
                  className="col12input"
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{ position: 'absolute', right: '8px', top: '71%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                >
                  {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                </span>
              </div>

              <div>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="col12input"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
