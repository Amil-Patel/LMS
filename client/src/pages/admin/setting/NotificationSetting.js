import React, { useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/setting.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function NotificationSetting() {
  const [tab, setTab] = useState("smtp");

  const handleChangeTab = (tabName) => {
    setTab(tabName);
  };
  return (
    <>
      <Hoc />

      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h4>Notification Setting</h4>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <a className="add-button" style={{ cursor: "pointer" }}>
           <button className="primary-btn">Save</button>
            
          </a>
        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            <li onClick={() => handleChangeTab("smtp")}>
              <NavLink>Smtp Setting</NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("email")}>
              <NavLink>Email Template</NavLink>
            </li>
          </ul>
        </div>

        {tab == "smtp" && (
          <div className="main_pay_sec" id="smp">
            <div className="protocol">
              <span>Protocol</span>
              <span id="etc">(smtp, ssmtp, mail)*</span>
              <p>
                <input type="text" placeholder="smtp" className="col6input" />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <span>Currency</span>
              <p>
                <select name="currency" id="currency" form="currencyform">
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
              <span>SMTP Host</span>
              <p>
                <input
                  type="text"
                  placeholder="admire.herosite.pro"
                  className="col8input"
                />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <span>Port</span>
              <p>
                <input type="number" placeholder="465" className="col3input" />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <span>Email Form</span>
              <p>
                <input
                  type="email"
                  placeholder="support@example.com"
                  className="col8input"
                />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <span>Username</span>
              <p>
                <input
                  type="text"
                  placeholder="support@example.com"
                  className="col8input"
                />
              </p>
            </div>

            <div className="protocol" id="pro_2">
              <span>Password</span>
              <p>
                <input
                  type="password"
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
