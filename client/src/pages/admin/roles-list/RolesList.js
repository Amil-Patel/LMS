import React, { useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/roles-list/roles-list.css";

function RolesList() {
  const [assignRoll, setAssignRoll] = useState(false); // state for open assign roles


   // Function of assign roles
   const assignRoles = () => {
    setAssignRoll(!assignRoll);
  };


  const tableData = [
    { id: 1, name: "Admin", type: "System", count: 5 },
    { id: 2, name: "Student", type: "System", count: 10},
    { id: 3, name: "Student", type: "", count: 25 },
    { id: 4, name: "Admin", type: "", count: 42 },
  ];

  
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
        </div>

      <div className="course-form-container"  style={{display:"flex", gap:"20px"}}>
        <div className="list-data">
          <table>
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
              {tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.count}</td>
                      <td>
                  <span className="list" onClick={assignRoles}>
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
                  ))}
            </tbody>
          </table>
          </div>

         
            <div className="roll-container">
              <h5>Add Roll</h5>
              <form>
                <div className="form-group">
                  <label>Role Name</label>
                  <input
                    type="text"
                    placeholder="Enter Roll Name"
                    className="col12input"
                  />
                </div>

                <div className="roll-btn">
                  <button type="submit" className="primary-btn module-btn">
                    Save
                  </button>
                </div>
              </form>
            </div>
</div>

 {/* Add User Modal */}
 {assignRoll && (
          <div className="modal">
            <div className="add-lesson-container" style={{ width: "60%" }}>
              <div class="quiz-top-header">
                <div class="quiz-header">
                  <h5>
                  Assign Roles
                  </h5>
                </div>
                <div>
                  <button class="primary-btn module-btn" style={{marginRight:"20px"}}>Save</button>
                  <span onClick={assignRoles}>
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
              <table>
            <thead>
              <tr>
                <th>Modules</th>
                <th>Features</th>
                <th>View</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Course</td>
                <td>Course</td>
                <td className="assign-checkbox"><input type="checkbox" /></td>
                <td className="assign-checkbox"><input type="checkbox" /></td>
                <td className="assign-checkbox"><input type="checkbox" /></td>
                <td className="assign-checkbox"><input type="checkbox" /></td>
              </tr>
              
            </tbody>
          </table>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default RolesList;
