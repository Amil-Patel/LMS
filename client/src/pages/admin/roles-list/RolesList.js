import React, { useEffect, useState } from "react";
import Hoc from "../layout/Hoc";
import axiosInstance from "../utils/axiosInstance";
import "../../../assets/css/roles-list/roles-list.css";
import Loading from "../layout/Loading";
const port = process.env.REACT_APP_URL

function RolesList() {
  const [assignRoll, setAssignRoll] = useState(false);
  const [rollName, setRollName] = useState("");
  const [loading, setLoading] = useState(false);
  const assignRoles = (itemName) => {
    setAssignRoll(!assignRoll);
    setRollName(itemName);
    getRolePermissionData(itemName);
  };

  const tableData = [
    { id: 1, name: "Admin", type: "System", count: 5 },
    { id: 2, name: "Instrunctor", type: "System", count: 10 },
  ];

  //get pemssion group and permission category data 
  const [permissionData, setPermissionData] = useState([]);
  const getPermissionData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingRolePermissionData`);
      setPermissionData(res.data);
      const initialPermissions = res.data.reduce((acc, item) => {
        acc[item.id] = {
          pgname: item.name.split(' ')[0],
          itemName: item.name,
          enable_view: item.enable_view === 1,
          enable_add: item.enable_add === 1,
          enable_edit: item.enable_edit === 1,
          enable_delete: item.enable_delete === 1
        };
        return acc;
      }, {});
      setUpdatedPermissions(initialPermissions);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const groupedPermissions = permissionData.reduce((acc, permission) => {
    const groupName = permission.permission_group.name;
    if (!acc[permission.perm_group_id]) {
      acc[permission.perm_group_id] = {
        pgname: groupName,
        items: []
      };
    }
    acc[permission.perm_group_id].items.push(permission);
    return acc;
  }, {});

  //add code start
  const [updatedPermissions, setUpdatedPermissions] = useState({});
  const handleCheckboxChange = (itemId, field, value) => {
    setUpdatedPermissions(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const dataToUpdate = Object.entries(updatedPermissions).map(([id, fields]) => ({
      id: Number(id),
      pgname: fields.pgname,
      rollName: rollName,
      itemName: fields.itemName,
      enable_view: fields.enable_view ? 1 : 0,
      enable_add: fields.enable_add ? 1 : 0,
      enable_edit: fields.enable_edit ? 1 : 0,
      enable_delete: fields.enable_delete ? 1 : 0,
    }));
    try {
      const res = await axiosInstance.post(`${port}/addingRolePermission`, dataToUpdate);
      setAssignRoll(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //get role permission data for update
  const [rolePermissionData, setRolePermissionData] = useState([]);
  const getRolePermissionData = async (itemName) => {
    setLoading(true);
    const name = itemName;
    try {
      const res = await axiosInstance.get(`${port}/gettingRolePermissionDataForEdit`, {
        params: { name }
      });
      setRolePermissionData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleEditCheckBox = (itemId, field, value) => {
    setRolePermissionData(prev =>
      prev.map(permission =>
        permission.perm_cate_id === itemId ? { ...permission, [field]: value } : permission
      )
    );
  };


  //edit code start
  const handleEdit = async () => {
    setLoading(true);
    const dataToUpdate = rolePermissionData.map(permission => ({
      permid: permission.perm_cate_id,
      enable_view: permission.can_view ? 1 : 0,
      enable_add: permission.can_add ? 1 : 0,
      enable_edit: permission.can_edit ? 1 : 0,
      enable_delete: permission.can_delete ? 1 : 0,
    }));
    try {
      const res = await axiosInstance.put(`${port}/editRolePermission/${rollName}`, dataToUpdate);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    getPermissionData()
  }, [])

  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Roles List</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-bar" type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="course-form-container">
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
                      <span className="list" onClick={() => assignRoles(item.name)}>
                        <i className="fa-solid fa-list-check"></i>
                      </span>
                      {/* <span className="edit">
                        <i className="fa-solid fa-pencil"></i>
                      </span>
                      <span className="xmark edit">
                        <i className="fa-solid fa-xmark"></i>
                      </span> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Add User Modal */}
        {assignRoll && (
          rolePermissionData.length > 0 ? (
            <div className="modal">
              <div className="add-lesson-container" style={{ width: "60%" }}>
                <div className="quiz-top-header">
                  <div className="quiz-header">
                    <h5>Assign Roles</h5>
                  </div>
                  <div>
                    <button className="primary-btn module-btn" onClick={handleEdit} style={{ marginRight: "20px" }}>Save</button>
                    <span onClick={assignRoles}>
                      <i className="fa-solid fa-xmark"></i>
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
                    {Object.entries(groupedPermissions).map(([groupId, group]) =>
                      group.items.map((permission, index) => {
                        const rolePermission = rolePermissionData.find(
                          (permissionData) => permissionData.perm_cate_id === permission.id
                        );
                        return (
                          <tr key={permission.id}>
                            <td>{index === 0 ? group.pgname : ""}</td>
                            <td>{permission.name}</td>

                            <td className="assign-checkbox">
                              {permission.enable_view === 1 && (
                                <input
                                  type="checkbox"
                                  checked={rolePermission?.can_view === 1}
                                  onChange={(e) =>
                                    handleEditCheckBox(
                                      permission.id,
                                      "can_view",
                                      e.target.checked ? 1 : 0
                                    )
                                  }
                                />
                              )}
                            </td>

                            <td className="assign-checkbox">
                              {permission.enable_add === 1 && (
                                <input
                                  type="checkbox"
                                  checked={rolePermission?.can_add === 1}
                                  onChange={(e) =>
                                    handleEditCheckBox(
                                      permission.id,
                                      "can_add",
                                      e.target.checked ? 1 : 0
                                    )
                                  }
                                />
                              )}
                            </td>

                            <td className="assign-checkbox">
                              {permission.enable_edit === 1 && (
                                <input
                                  type="checkbox"
                                  checked={rolePermission?.can_edit === 1}
                                  onChange={(e) =>
                                    handleEditCheckBox(
                                      permission.id,
                                      "can_edit",
                                      e.target.checked ? 1 : 0
                                    )
                                  }
                                />
                              )}
                            </td>

                            <td className="assign-checkbox">
                              {permission.enable_delete === 1 && (
                                <input
                                  type="checkbox"
                                  checked={rolePermission?.can_delete === 1}
                                  onChange={(e) =>
                                    handleEditCheckBox(
                                      permission.id,
                                      "can_delete",
                                      e.target.checked ? 1 : 0
                                    )
                                  }
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>

                </table>
              </div>
            </div>
          ) : (
            <div className="modal">
              <div className="add-lesson-container" style={{ width: "60%" }}>
                <div className="quiz-top-header">
                  <div className="quiz-header">
                    <h5>Assign Roles</h5>
                  </div>
                  <div>
                    <button className="primary-btn module-btn" onClick={handleSave} style={{ marginRight: "20px" }}>Save</button>
                    <span onClick={assignRoles}>
                      <i className="fa-solid fa-xmark"></i>
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
                    {Object.keys(groupedPermissions).map(groupId => (
                      groupedPermissions[groupId].items.map((permission, index) => (
                        <tr key={index}>
                          {/* Display module name only once per group */}
                          <td>{index === 0 ? groupedPermissions[groupId].pgname : ''}</td>
                          <td>{permission.name}</td>

                          <td className="assign-checkbox">
                            {permission.enable_view === 1 && <input type="checkbox" defaultChecked onChange={(e) => handleCheckboxChange(permission.id, 'enable_view', e.target.checked)} checked={updatedPermissions[permission.id]?.enable_view ?? false} />}
                          </td>

                          <td className="assign-checkbox">
                            {permission.enable_add === 1 && <input type="checkbox" defaultChecked onChange={(e) => handleCheckboxChange(permission.id, 'enable_add', e.target.checked)} checked={updatedPermissions[permission.id]?.enable_add ?? false} />}
                          </td>

                          <td className="assign-checkbox">
                            {permission.enable_edit === 1 && <input type="checkbox" defaultChecked onChange={(e) => handleCheckboxChange(permission.id, 'enable_edit', e.target.checked)} checked={updatedPermissions[permission.id]?.enable_edit ?? false} />}
                          </td>

                          <td className="assign-checkbox">
                            {permission.enable_delete === 1 && <input type="checkbox" defaultChecked onChange={(e) => handleCheckboxChange(permission.id, 'enable_delete', e.target.checked)} checked={updatedPermissions[permission.id]?.enable_delete ?? false} />}
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          )

        )}


      </div>
    </>
  );
}

export default RolesList;
