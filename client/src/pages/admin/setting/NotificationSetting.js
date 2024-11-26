import React, { useContext, useEffect, useState } from "react";
import Hoc from "../layout/Hoc";
import { notifySuccess, notifyError, notifyWarning } from "../layout/ToastMessage";
import "../../../assets/css/setting.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import useCheckRolePermission from "../layout/CheckRolePermission";
import Loading from "../layout/Loading";
import axiosInstance from "../utils/axiosInstance";
import { userRolesContext } from "../layout/RoleContext";

const port = process.env.REACT_APP_URL;

function NotificationSetting() {
  const [tab, setTab] = useState("smtp");
  const { userRole } = useContext(userRolesContext);
  const [getSmtp, setGetSmtp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addSmtp, setAddSmtp] = useState({
    protocol: "",
    smtp_crypto: "",
    smtp_host: "",
    smtp_port: "",
    smtp_from_email: "",
    smtp_username: "",
    smtp_password: "",
  });

  const perm = useCheckRolePermission("Notification Setting");
  const addNotificationPermission = perm.length > 0 && perm[0].can_add === 1 ? 1 : 0;
  const editNotificationPermission = perm.length > 0 && perm[0].can_edit === 1 ? 1 : 0;


  //get smtp data
  const getSmtpData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingSmtpSettingData`);
      setGetSmtp(res.data);
      if (res.data.length > 0) {
        setAddSmtp(res.data[0]); // Assuming you want to edit the first entry
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSmtp({ ...addSmtp, [name]: value });
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveSmtp = async () => {
    setLoading(true);
    const {
      protocol,
      smtp_crypto,
      smtp_host,
      smtp_port,
      smtp_from_email,
      smtp_username,
      smtp_password
    } = addSmtp;

    // Validate required fields
    if (!protocol || !smtp_crypto || !smtp_host || !smtp_port || !smtp_from_email || !smtp_username || !smtp_password) {
      notifyWarning("All fields are required.");
      setLoading(false);
      return;
    }

    // Validate email format
    if (!validateEmail(smtp_from_email)) {
      notifyWarning("Invalid form email format.");
      setLoading(false);
      return;
    }

    // Validate port is a number
    if (isNaN(smtp_port) || smtp_port <= 0 || smtp_port > 65535) {
      notifyWarning("Invalid port number. Port must be between 1 and 65535.");
      setLoading(false);
      return;
    }

    // Uncomment this block once validation is successful
    try {
      const hasSmtpData = getSmtp.length > 0;
      const canEdit = hasSmtpData && userRole === "superAdmin" || editNotificationPermission == 1;
      const canAdd = !hasSmtpData && userRole === "superAdmin" || addNotificationPermission == 1;

      if (canEdit) {
        // Update existing SMTP setting
        await axiosInstance.put(`${port}/updatingSmtpSettingData/${getSmtp[0].id}`, addSmtp);
        notifySuccess("SMTP setting updated successfully.");
      } else if (canAdd) {
        // Add new SMTP setting
        await axiosInstance.post(`${port}/addSmtpSettingData`, addSmtp);
        notifySuccess("SMTP setting added successfully.");
      } else {
        notifyWarning(hasSmtpData ? "Edit not permitted." : "Add not permitted.");
      }

      getSmtpData();
    } catch (error) {
      notifyError("An error occurred while saving SMTP settings.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeTab = (tabName) => {
    setTab(tabName);
  };
  useEffect(() => {
    getSmtpData();
  }, [])
  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h4>Notification Setting</h4>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-input" type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          {(tab === "smtp" && userRole === "superAdmin" || addNotificationPermission == 1 || editNotificationPermission == 1) && (
            <a>
              <button className="primary-btn module-btn" disabled={tab === "email"} onClick={saveSmtp}>Save</button>
            </a>
          )}

        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            <li onClick={() => handleChangeTab("smtp")}>
              <NavLink className={tab === "smtp" ? "active-tab" : ""}>
                Smtp Setting
              </NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("email")}>
              <NavLink className={tab === "email" ? "active-tab" : ""}>
                Email Template
              </NavLink>
            </li>
          </ul>
        </div>

        {tab == "smtp" && (
          <div className="main_pay_sec" id="smp">
            <div className="protocol">
              <label htmlFor="protocol">Protocol</label>
              <span id="etc">(smtp, ssmtp, mail)*</span>
              <p>
                <input id="protocol" name="protocol" type="text" placeholder="smtp" value={addSmtp.protocol}
                  onChange={handleChange} className="col6input" />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <label htmlFor="currency">Currency</label>
              <p>
                <select name="smtp_crypto" id="currency" value={addSmtp.smtp_crypto} className="col12input" onChange={handleChange} form="currencyform">
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                </select>
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <label htmlFor="smtp_host">SMTP Host</label>
              <p>
                <input
                  type="text"
                  name="smtp_host"
                  id="smtp_host"
                  value={addSmtp.smtp_host}
                  placeholder="admire.herosite.pro"
                  className="col8input"
                  onChange={handleChange}
                />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <label htmlFor="smtp_port">Port</label>
              <p>
                <input type="number" name="smtp_port" value={addSmtp.smtp_port} id="smtp_port" onChange={handleChange} placeholder="465" className="col3input" />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <label htmlFor="smtp_from_email">Email Form</label>
              <p>
                <input
                  type="email"
                  name="smtp_from_email"
                  id="smtp_from_email"
                  value={addSmtp.smtp_from_email}
                  onChange={handleChange}
                  placeholder="support@example.com"
                  className="col8input"
                />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <label htmlFor="smtp_username">Username</label>
              <p>
                <input
                  name="smtp_username"
                  id="smtp_username"
                  type="text"
                  value={addSmtp.smtp_username}
                  onChange={handleChange}
                  placeholder="support@example.com"
                  className="col8input"
                />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <label htmlFor="smtp_password">Password</label>
              <p>
                <input
                  name="smtp_password"
                  id="smtp_password"
                  type="password"
                  value={addSmtp.smtp_password}
                  onChange={handleChange}
                  placeholder="****"
                  className="col8input"
                />
              </p>
            </div>
          </div>
        )}

        {/* Email Table */}

        {tab == "email" && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Lessons</th>
                <th id="action">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <h6>New user registration</h6>
                  <p>Get Notification on new user Register</p>
                </td>
                <td>
                  <p>Admin: New User Registered</p>
                  <p>User: Registered Successfully</p>
                </td>
                <td className="lesson">
                  <p>To admin: New user registered </p>
                  <p>[user_name] User email: [user_email]</p>
                  <p>
                    To user: You have successfully registered with us at
                    [system_name].
                  </p>
                </td>
                <td id="edit">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>
                  <h6>Email verification</h6>
                  <p>Get Notification on email verification</p>
                </td>
                <td>
                  <p>To user: Email verification code</p>
                </td>
                <td className="lesson">
                  <p>
                    To user: You have received an email verification code. Your
                    verification code is [email_verification_code]
                  </p>
                </td>
                <td id="edit">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default NotificationSetting;
