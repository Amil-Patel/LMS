import React from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/roles-list/roles-list.css";

function RolesList() {
  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Roles List</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <a
            className="add-button"
            style={{ cursor: "pointer" }}
          >
            <button className="primary-btn">+ Add</button>
          </a>
        </div>

          <table style={{ width: "" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Total Users</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Admin</td>
                <td>System</td>
                <td>2</td>
                <td>
                  <span className="list">
                    <i class="fa-solid fa-list-check"></i>
                  </span>
                  <span className="edit">
                    <i class="fa-solid fa-pencil"></i>
                  </span>
                  <span className="xmark edit">
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Students</td>
                <td>System</td>
                <td>42</td>
                <td>
                  <span className="list">
                    <i class="fa-solid fa-list-check"></i>
                  </span>
                  <span className="edit">
                    <i class="fa-solid fa-pencil"></i>
                  </span>
                  <span className="xmark edit">
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Students</td>
                <td></td>
                <td>42</td>
                <td>
                  <span className="list">
                    <i class="fa-solid fa-list-check"></i>
                  </span>
                  <span className="edit">
                    <i class="fa-solid fa-pencil"></i>
                  </span>
                  <span className="xmark edit">
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

      </div>
    </>
  );
}

export default RolesList;
