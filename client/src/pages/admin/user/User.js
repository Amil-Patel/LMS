import React, { useContext, useEffect, useMemo, useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/user/user.css";
import { NavLink } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { notifyWarning } from "../layout/ToastMessage";
import Loading from "../layout/Loading";
import { userRolesContext } from "../layout/RoleContext";
import { validationEmail, validationName } from "../../../utils/validation";
import moment from "moment-timezone";
const port = process.env.REACT_APP_URL

const User = () => {
  const { userRole, userId, setting } = useContext(userRolesContext);
  const [tab, setTab] = useState("student");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/150");
  const [sameNumber, setSameNumber] = useState(false);
  const [sameNumberForedit, setSameNumberForedit] = useState(false);
  const handleSameNumberChange = (e) => {
    setSameNumber(e.target.checked);
    if (!sameNumber) {
      setAddUser((prev) => ({ ...prev, whatsapp_number: prev.contact }));
    } else {
      setAddUser((prev) => ({ ...prev, whatsapp_number: "" }));
    }
  };
  const handleEditSameNumberChange = (e) => {
    const isChecked = e.target.checked;
    setSameNumberForedit(isChecked);

    if (isChecked) {
      setEditData((prev) => ({ ...prev, whatsapp_number: prev.contact }));
    } else {
      setEditData((prev) => ({ ...prev, whatsapp_number: "" }));
    }
  };


  const handleChangeTab = (tabName) => {
    setTab(tabName);
    filterUserData(tabName);
  };

  //check the user permission
  const roleName = userRole || "superAdmin";
  const [checkUserPerm, setCheckUserPerm] = useState([]);
  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${port}/checkingUserPermission`, {
          params: { name: roleName }
        });
        setCheckUserPerm(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [roleName]);

  //check the user permission
  const studentPermCateId = 9;
  const instructurerPermCateId = 10;
  const adminPermCateId = 11;
  const [student, setStudent] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [instructure, setInstructor] = useState(false);
  const checkePermissionForAdd = async () => {
    try {
      if (checkUserPerm.length > 0) {
        const studentPerm = checkUserPerm.find(perm => perm.perm_cate_id === studentPermCateId && perm.can_add === 1);
        const adminPerm = checkUserPerm.find(perm => perm.perm_cate_id === adminPermCateId && perm.can_add === 1);
        const instructurePerm = checkUserPerm.find(perm => perm.perm_cate_id === instructurerPermCateId && perm.can_add === 1);

        setStudent(!!studentPerm);
        setAdmin(!!adminPerm);
        setInstructor(!!instructurePerm);
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  };
  //check permission for view
  const [studentView, setStudentView] = useState(true);
  const [adminView, setAdminView] = useState(false);
  const [instructureView, setInstructorView] = useState(false);
  const checkePermissionForView = async () => {
    try {
      const studentPerm = checkUserPerm.find(perm => perm.perm_cate_id === studentPermCateId && perm.can_view === 1);
      const adminPerm = checkUserPerm.find(perm => perm.perm_cate_id === adminPermCateId && perm.can_view === 1);
      const instructurePerm = checkUserPerm.find(perm => perm.perm_cate_id === instructurerPermCateId && perm.can_view === 1);

      setStudentView(!!studentPerm);
      setAdminView(!!adminPerm);
      setInstructorView(!!instructurePerm);
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  };

  //check permission for edit
  const [studentEdit, setStudentEdit] = useState(false);
  const [adminEdit, setAdminEdit] = useState(false);
  const [instructureEdit, setInstructureEdit] = useState(false);
  const checkePermissionForEdit = async () => {
    try {
      const studentPerm = checkUserPerm.find(perm => perm.perm_cate_id === studentPermCateId && perm.can_edit === 1);
      const adminPerm = checkUserPerm.find(perm => perm.perm_cate_id === adminPermCateId && perm.can_edit === 1);
      const instructurePerm = checkUserPerm.find(perm => perm.perm_cate_id === instructurerPermCateId && perm.can_edit === 1);

      setStudentEdit(!!studentPerm);
      setAdminEdit(!!adminPerm);
      setInstructureEdit(!!instructurePerm);
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  };
  //check permission for delete
  const [studentDelete, setStudentDelete] = useState(false);
  const [adminDelete, setAdminDelete] = useState(false);
  const [instructureDelete, setInstructureDelete] = useState(false);
  const checkePermissionForDelete = async () => {
    try {
      const studentPerm = checkUserPerm.find(perm => perm.perm_cate_id === studentPermCateId && perm.can_delete === 1);
      const adminPerm = checkUserPerm.find(perm => perm.perm_cate_id === adminPermCateId && perm.can_delete === 1);
      const instructurePerm = checkUserPerm.find(perm => perm.perm_cate_id === instructurerPermCateId && perm.can_delete === 1);

      setStudentDelete(!!studentPerm);
      setAdminDelete(!!adminPerm);
      setInstructureDelete(!!instructurePerm);
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Function to toggle visibility of add user modal
  const userToggleModal = () => {
    setAddUserOpen(!addUserOpen);
    checkePermissionForAdd();
  };

  // Function to toggle visibility of edit user modal
  const editUserToggleModal = async (id) => {
    if (editUserOpen) {
      setEditUserOpen(false);
      setActiveDropdown(false);
    } else {
      setEditUserOpen(true);
      if (id) {
        try {
          await getDataForEdit(id);
        } catch (error) {
          console.error("Error fetching data for edit:", error);
        }
      }
      setActiveDropdown(false);
      checkePermissionForAdd();
    }
  };


  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (checkUserPerm.length > 0) {
          await checkePermissionForView();
          await checkePermissionForEdit();
          await checkePermissionForDelete();
        }
      } catch (error) {
        console.error("Error checking permissions:", error);
      }
    };

    checkPermissions();
  }, [checkUserPerm]);
  //add user section start
  const [addUser, setAddUser] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    description: "",
    gender: "",
    dob: "",
    address: "",
    profile: null,
    contact: "",
    whatsapp_number: "",
    country: "",
    email: "",
    password: "",
    role_id: "",
    status: "",
    created_by: userId,
    updated_by: userId,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const [newImage, setNewImage] = useState(null);
  const [filename, setFilename] = useState("")
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFilename(file.name)
    if (file) {
      setAddUser({ ...addUser, profile: file });
      setNewImage(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationName(addUser.first_name)) {
      notifyWarning("Please enter a valid first name.");
      return;
    }
    if (!validationEmail(addUser.email)) {
      notifyWarning("Please enter a valid email address.");
      return;
    }
    if (addUser.password.length < 8) {
      notifyWarning("Password must be at least 8 characters long.");
      return;
    }
    if (addUser.role_id === "") {
      notifyWarning("Please select a role.");
      return;
    }
    if (addUser.status === "") {
      notifyWarning("Please select a status.");
      return;
    }
    if (addUser.contact === "") {
      notifyWarning("Please enter a contact number.");
      return;
    }
    if (addUser.whatsapp_number === "") {
      notifyWarning("Please enter a whatsapp number.");
      return;
    }
    if (addUser.gender === "") {
      notifyWarning("Please select a gender.");
      return;
    }
    if (addUser.dob === "") {
      notifyWarning("Please enter a date of birth.");
      return;
    }
    if (addUser.profile === "") {
      notifyWarning("Please select a profile image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", addUser.first_name);
    formData.append("middle_name", addUser.middle_name);
    formData.append("last_name", addUser.last_name);
    formData.append("description", addUser.description);
    formData.append("gender", addUser.gender);
    formData.append("dob", addUser.dob);
    formData.append("address", addUser.address);
    formData.append("profile", addUser.profile);
    formData.append("contact", addUser.contact);
    formData.append("whatsapp_number", addUser.whatsapp_number);
    formData.append("country", addUser.country);
    formData.append("email", addUser.email);
    formData.append("password", addUser.password);
    formData.append("role_id", addUser.role_id);
    formData.append("status", addUser.status);
    formData.append("created_by", addUser.created_by);
    formData.append("updated_by", addUser.updated_by);
    try {
      const res = await axiosInstance.post(`${port}/addingUserMaster`, formData);
      setAddUserOpen(false);
      getAllUserData();
      setAddUser({
        first_name: "",
        middle_name: "",
        last_name: "",
        description: "",
        gender: "",
        dob: "",
        address: "",
        profile: null,
        contact: "",
        whatsapp_number: "",
        country: "",
        email: "",
        password: "",
        role_id: "",
        status: "",
      })
      setNewImage(null);
      setSameNumber(false);
      setFilename("")
      setLoading(false);
    } catch (error) {
      console.error("Error adding user:", error);
      setLoading(false);
    }
  }

  //get all user data for display on the table

  const [userData, setUserData] = useState([]);
  const [allUserData, setAllUserData] = useState([]);

  const getAllUserData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingUserMasterData`);
      setAllUserData(res.data);
      if (studentView) {
        filterUserData("student", res.data);
      } else if (instructureView) {
        filterUserData("instructure", res.data);
      } else if (adminView) {
        filterUserData("admin", res.data);
      } else {
        setUserData([]);
      }
      setLoading(false);
      setTab("student");
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const filterUserData = (roleName, data = allUserData) => {
    if (roleName) {
      const filteredData = data.filter((user) => user.role_id === roleName);
      setUserData(filteredData);
    } else {
      setUserData(data);
    }
  };
  //delete data section start
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteToggleModal = (id) => {
    setDeleteId(id);
    setDeleteOpen(!deleteOpen);
    setActiveDropdown(false)
  };
  const deleteUserData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`${port}/deletingUserMaster/${deleteId}`);
      getAllUserData();
      setDeleteOpen(false);
      setLoading(false);
    } catch (error) {
      notifyWarning("Can't delete user!");
      setLoading(false);
      setDeleteOpen(false);
    }
  }

  //edit user data section start
  const [editData, setEditData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    description: "",
    gender: "",
    dob: "",
    address: "",
    profile: null,
    contact: "",
    whatsapp_number: "",
    country: "",
    email: "",
    password: "",
    role_id: "",
    status: "",
    updated_by: userId,
  });
  const getDataForEdit = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingUserMasterDataWithId/${id}`);
      const time = moment.unix(res.data.dob).tz(setting.timezone).format("YYYY-MM-DD");
      setEditData((prev) => ({
        ...prev,
        ...res.data,
        dob: time
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const [newEditImage, setNewEditImage] = useState(null);
  const [editfilename, setEditFilename] = useState("")
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFilename(file.name);
      setNewEditImage(file);
      setEditData({ ...editData, profile: file });
    }
  };


  const editUserData = async () => {
    if (!validationName(editData.first_name)) {
      notifyWarning("Please enter a valid first name.");
      return;
    }
    if (!validationEmail(editData.email)) {
      notifyWarning("Please enter a valid email address.");
      return;
    }
    if (editData.password.length < 8) {
      notifyWarning("Password must be at least 8 characters long.");
      return;
    }
    if (editData.role_id === "") {
      notifyWarning("Please select a role.");
      return;
    }
    if (editData.status === "") {
      notifyWarning("Please select a status.");
      return;
    }
    if (editData.contact === "") {
      notifyWarning("Please enter a contact number.");
      return;
    }
    if (editData.whatsapp_number === "") {
      notifyWarning("Please enter a whatsapp number.");
      return;
    }
    if (editData.gender === "") {
      notifyWarning("Please select a gender.");
      return;
    }
    if (editData.dob === "") {
      notifyWarning("Please enter a date of birth.");
      return;
    }
    if (editData.profile === "") {
      notifyWarning("Please select a profile image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", editData.first_name);
    formData.append("middle_name", editData.middle_name);
    formData.append("last_name", editData.last_name);
    formData.append("description", editData.description);
    formData.append("gender", editData.gender);
    formData.append("dob", editData.dob);
    formData.append("address", editData.address);
    if (newEditImage) {
      formData.append("profile", newEditImage);
    }
    formData.append("contact", editData.contact);
    formData.append("whatsapp_number", editData.whatsapp_number);
    formData.append("country", editData.country);
    formData.append("email", editData.email);
    formData.append("password", editData.password);
    formData.append("role_id", editData.role_id);
    formData.append("status", editData.status);
    formData.append("updated_by", editData.updated_by);
    try {
      const res = await axiosInstance.put(`${port}/updatingUserMaster/${editData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getAllUserData();
      setEditUserOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUserData();
  }, [studentView, adminView, instructureView]);

  //status change code start
  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`${port}/updatingUserMasterStatus/${id}`, {
        status: status,
      });
      getAllUserData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //search data logic
  const [searchQuery, setSearchQuery] = useState("");
  const filtereData = useMemo(() => {
    return userData.filter((item) => {
      return (
        (item?.first_name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || "") ||
        (item?.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) || "") ||
        (item?.contact?.toLowerCase()?.includes(searchQuery.toLowerCase()) || "") ||
        (item?.country?.toLowerCase()?.includes(searchQuery.toLowerCase()) || "")
      );
    });
  }, [userData, searchQuery]);

  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Users</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-bar" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            {roleName !== "SuperAdmin" && (
              <>
                {(userRole === "superAdmin" || studentView) && (
                  <li onClick={() => handleChangeTab("student")}>
                    <NavLink className={tab === "student" ? "active-tab" : ""}>
                      USER
                    </NavLink>
                  </li>
                )}
                {(userRole === "superAdmin" || instructureView) && (
                  "|"
                )}
                {(userRole === "superAdmin" || instructureView) && (
                  <li onClick={() => handleChangeTab("instructure")}>
                    <NavLink className={tab === "instructure" ? "active-tab" : ""}>
                      INSTRUCTOR
                    </NavLink>
                  </li>
                )}
                {(userRole === "superAdmin" || adminView) && (
                  "|"
                )}
                {(userRole === "superAdmin" || adminView) && (
                  <li onClick={() => handleChangeTab("admin")}>
                    <NavLink className={tab === "admin" ? "active-tab" : ""}>
                      ADMIN
                    </NavLink>
                  </li>
                )}
                {userRole === "superAdmin" && (
                  "|"
                )}
                {userRole === "superAdmin" && (
                  <li onClick={() => handleChangeTab("superAdmin")}>
                    <NavLink className={tab === "superAdmin" ? "active-tab" : ""}>
                      super Admin
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>
          <button className="primary-btn module-btn" onClick={userToggleModal}>
            Add New
          </button>
        </div>

        <div className="course-form-container">
          {/* Basic Info Tab */}
          {tab == "student" && (
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
                  {(userRole === "superAdmin" ||
                    (studentEdit || studentDelete)) ? (
                    <th>Action</th>
                  ) : null
                  }
                </tr>
              </thead>
              <tbody>
                {
                  filtereData.length === 0 ? (
                    <tr>
                      <td colSpan="9">No user data found</td>
                    </tr>
                  ) : (
                    filtereData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="profile-img">
                          <img src={`../upload/${item.profile}`} />
                        </td>
                        <td>{item.first_name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.gender}</td>
                        <td>{item.country}</td>
                        <td>
                          <label htmlFor="switch" className="switch">
                            <input id="switch" type="checkbox" checked={item.status === 1}
                              onChange={() => handleStatusChange(item.id, item.status)} />
                            <span className="slider"></span>
                          </label>
                        </td>
                        {(userRole === "superAdmin" ||
                          (studentEdit || studentDelete)) ? (
                          <td>
                            <div
                              className={`menu-container ${activeDropdown === index ? "active" : ""
                                }`}
                            >
                              <div
                                className="menu-button"
                                onClick={() => toggleDropdown(index)}
                              >
                                {" "}
                                ⋮{" "}
                              </div>
                              {activeDropdown === index && (
                                <div className="menu-content">
                                  {(userRole === "superAdmin" ||
                                    studentEdit) && (
                                      <a
                                        style={{ cursor: "pointer" }}
                                      >
                                        <p onClick={() => editUserToggleModal(item.id)}>Edit</p>
                                      </a>
                                    )
                                  }
                                  {(userRole === "superAdmin" ||
                                    studentDelete) && (
                                      <a
                                        style={{ cursor: "pointer" }}
                                      >
                                        <p onClick={() => deleteToggleModal(item.id)}>Delete</p>
                                      </a>
                                    )
                                  }
                                </div>
                              )}
                            </div>
                          </td>
                        ) : (null)
                        }

                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          )}
          {tab == "instructure" && (
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
                  {(userRole === "superAdmin" ||
                    (instructureEdit || instructureDelete)) ? (
                    <th>Action</th>
                  ) : null
                  }
                </tr>
              </thead>
              <tbody>
                {
                  filtereData.length === 0 ? (
                    <tr>
                      <td colSpan="9">No instructure data found</td>
                    </tr>
                  ) : (
                    filtereData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="profile-img">
                          <img src={`../upload/${item.profile}`} />
                        </td>
                        <td>{item.first_name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.gender}</td>
                        <td>{item.country}</td>
                        <td>
                          <label htmlFor="switch" className="switch">
                            <input id="switch" type="checkbox" checked={item.status === 1}
                              onChange={() => handleStatusChange(item.id, item.status)} />
                            <span className="slider"></span>
                          </label>
                        </td>
                        {(userRole === "superAdmin" ||
                          (instructureEdit || instructureDelete)) ? (
                          <td>
                            <div
                              className={`menu-container ${activeDropdown === index ? "active" : ""
                                }`}
                            >
                              <div
                                className="menu-button"
                                onClick={() => toggleDropdown(index)}
                              >
                                {" "}
                                ⋮{" "}
                              </div>
                              {activeDropdown === index && (
                                <div className="menu-content">
                                  {(userRole === "superAdmin" ||
                                    instructureEdit) && (
                                      <a
                                        style={{ cursor: "pointer" }}
                                      >
                                        <p onClick={() => editUserToggleModal(item.id)}>Edit</p>
                                      </a>
                                    )
                                  }
                                  {(userRole === "superAdmin" ||
                                    instructureDelete) && (
                                      <a
                                        style={{ cursor: "pointer" }}
                                      >
                                        <p onClick={() => deleteToggleModal(item.id)}>Delete</p>
                                      </a>
                                    )
                                  }
                                </div>
                              )}
                            </div>
                          </td>
                        ) : (null)
                        }

                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          )}
          {tab == "admin" && (
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
                  {(userRole === "superAdmin" ||
                    (adminEdit || adminDelete)) ? (
                    <th>Action</th>
                  ) : null
                  }
                </tr>
              </thead>
              <tbody>
                {
                  filtereData.length === 0 ? (
                    <tr>
                      <td colSpan="9">No admin data found</td>
                    </tr>
                  ) : (
                    filtereData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="profile-img">
                          <img src={`../upload/${item.profile}`} />
                        </td>
                        <td>{item.first_name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.gender}</td>
                        <td>{item.country}</td>
                        <td>
                          <label htmlFor="switch" className="switch">
                            <input id="switch" type="checkbox" checked={item.status === 1}
                              onChange={() => handleStatusChange(item.id, item.status)} />
                            <span className="slider"></span>
                          </label>
                        </td>
                        {(userRole === "superAdmin" ||
                          (adminEdit || adminDelete)) ? (
                          <td>
                            <div
                              className={`menu-container ${activeDropdown === index ? "active" : ""
                                }`}
                            >
                              <div
                                className="menu-button"
                                onClick={() => toggleDropdown(index)}
                              >
                                {" "}
                                ⋮{" "}
                              </div>
                              {activeDropdown === index && (
                                <div className="menu-content">
                                  {(userRole === "superAdmin" ||
                                    adminEdit) && (
                                      <a
                                        style={{ cursor: "pointer" }}
                                      >
                                        <p onClick={() => editUserToggleModal(item.id)}>Edit</p>
                                      </a>
                                    )
                                  }
                                  {(userRole === "superAdmin" ||
                                    adminDelete) && (
                                      <a
                                        style={{ cursor: "pointer" }}
                                      >
                                        <p onClick={() => deleteToggleModal(item.id)}>Delete</p>
                                      </a>
                                    )
                                  }
                                </div>
                              )}
                            </div>
                          </td>
                        ) : (null)
                        }

                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          )}
          {tab == "superAdmin" && (
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
                {
                  filtereData.length === 0 ? (
                    <tr>
                      <td colSpan="9">No super admin data found</td>
                    </tr>
                  ) : (
                    filtereData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="profile-img">
                          <img src={`../upload/${item.profile}`} />
                        </td>
                        <td>{item.first_name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.gender}</td>
                        <td>{item.country}</td>
                        <td>
                          <label htmlFor="switch" className="switch">
                            <input id="switch" type="checkbox" checked={item.status === 1}
                              onChange={() => handleStatusChange(item.id, item.status)} />
                            <span className="slider"></span>
                          </label>
                        </td>
                        <td>
                          <div
                            className={`menu-container ${activeDropdown === index ? "active" : ""
                              }`}
                          >
                            <div
                              className="menu-button"
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
                                  <p onClick={() => editUserToggleModal(item.id)}>Edit</p>
                                </a>
                                <p
                                  onClick={() => deleteToggleModal(item.id)}// Open delete modal
                                  style={{ cursor: "pointer" }}
                                >
                                  Delete
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          )}
        </div>

        {/* Add User Modal */}
        {addUserOpen && (
          <div className="modal">
            <div className="add-lesson-container" style={{ width: "60%" }}>
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Add New User</h5>
                </div>
                <div>
                  <button
                    className="primary-btn module-btn"
                    style={{ marginRight: "20px" }}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <span onClick={userToggleModal}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
              <form>
                {/* first / middle / last  name */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label htmlFor="first_name">
                      First Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      value={addUser.first_name}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label htmlFor="middle_name">Middle Name</label>
                    <input
                      type="text"
                      name="middle_name"
                      id="middle_name"
                      value={addUser.middle_name}
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
                      value={addUser.last_name}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* email / password */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="email">
                      Email<span className="required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={addUser.email}
                      onChange={handleChange}
                      placeholder="email"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={addUser.password}
                      onChange={handleChange}
                      placeholder="password"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* status / publish date */}
                <div className="flex-row flex-row80">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="role_id">User Roll</label>
                    <select id="role_id" className="col12input" name="role_id" onChange={handleChange}>
                      <option value="">Select Role</option>
                      {roleName === "superAdmin" && (
                        <>
                          <option value="student">Student</option>
                          <option value="admin">Admin</option>
                          <option value="instructure">Instructor</option>
                          <option value="superAdmin">Super Admin</option>
                        </>
                      )}
                      {student && (
                        <>
                          <option value="student">Student</option>
                        </>
                      )}
                      {instructure && (
                        <>
                          <option value="instructure">Instructor</option>
                        </>
                      )}
                      {admin && (
                        <>
                          <option value="admin">Admin</option>
                        </>
                      )}
                    </select>

                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="status">Status</label>
                    <select id="status" className="col12input" name="status" onChange={handleChange}>
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* contact / whatsapp number */}
                <div className="flex-row " style={{ gap: "20px" }}>
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label htmlFor="contact">
                      Contact Number<span className="required">*</span>
                    </label>
                    <input
                      id="contact"
                      type="text"
                      name="contact"
                      value={addUser.contact}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="col12input"
                    />
                  </div>
                  <div className="chekbox" style={{ width: "23%" }}>
                    <input id="same_whatsapp" type="checkbox" checked={sameNumber}
                      onChange={handleSameNumberChange} />
                    <label htmlFor="same_whatsapp">Same WhatsApp</label>
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
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
                      value={addUser.whatsapp_number}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="col12input"
                      disabled={sameNumber}
                    />
                  </div>
                </div>

                {/* address / country */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      value={addUser.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="country">Country</label>
                    <input
                      id="country"
                      type="text"
                      name="country"
                      value={addUser.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="col12input"
                    />
                  </div>
                </div>

                {/* gender / DOB / profile image */}
                <div style={{ display: "flex" }}>
                  <div className="flex-row" style={{ width: "45%" }}>
                    <div className="form-group mb-0" style={{ width: "48%" }}>
                      <label htmlFor="gender">Gender</label>
                      <select id="gender" className="col12input" name="gender" onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group mb-0" style={{ width: "48%" }}>
                      <label htmlFor="dob">DOB</label>
                      <input
                        id="dob"
                        type="date"
                        name="dob"
                        value={addUser.dob}
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
                      <label htmlFor="profile">
                        Profile Picture <span className="required">*</span>
                      </label>
                      <input
                        id="profile"
                        type="text"
                        placeholder=""
                        className="col12input"
                        value={filename || ""}
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
                      name="profile"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      accept="image/*"
                    />

                    <div>
                      {
                        newImage ? (
                          <img src={URL.createObjectURL(newImage)} style={{ width: "67px", maxHeight: "67px" }} alt="Selected Thumbnail" />
                        ) : (
                          <img
                            src={imageSrc}
                            style={{ width: "67px", maxHeight: "67px" }}
                            alt="Selected Thumbnail"
                          />
                        )
                      }

                    </div>
                  </div>
                </div>

                {/* user about details */}
                <div className="flex-row" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "100%" }}>
                    <label htmlFor="description">About User</label>
                    <textarea
                      id="description"
                      type="text"
                      name="description"
                      value={addUser.description}
                      onChange={handleChange}
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
              <div className="quiz-top-header">
                <div className="quiz-header">
                  <h5>Edit New User</h5>
                </div>
                <div>
                  <button
                    className="primary-btn module-btn"
                    style={{ marginRight: "20px" }}
                    onClick={editUserData}
                  >
                    Save
                  </button>
                  <span onClick={editUserToggleModal}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
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
                      value={editData?.first_name}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label htmlFor="middle_name">Middle Name</label>
                    <input
                      id="middle_name"
                      type="text"
                      name="middle_name"
                      value={editData?.middle_name}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label htmlFor="last_name">
                      Last Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      value={editData?.last_name}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>
                </div>

                {/* email / password */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="email">
                      Email<span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editData?.email}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="text"
                      name="password"
                      value={editData?.password}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>
                </div>

                {/* status / publish date */}
                <div className="flex-row flex-row80">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="role_id">User Roll</label>
                    <select id="role_id" className="col12input" name="role_id" value={editData?.role_id || ""} onChange={handleEditChange}>
                      <option value="">Select Role</option>
                      {roleName === "SuperAdmin" && (
                        <>
                          <option value="student">Student</option>
                          <option value="admin">Admin</option>
                          <option value="instructure">Instructor</option>
                          <option value="superAdmin">Super Admin</option>
                        </>
                      )}
                      {student && (
                        <>
                          <option value="student">Student</option>
                        </>
                      )}
                      {instructure && (
                        <>
                          <option value="instructure">Instructor</option>
                        </>
                      )}
                      {admin && (
                        <>
                          <option value="admin">Admin</option>
                        </>
                      )}
                    </select>

                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="status">Status</label>
                    <select id="status" className="col12input" name="status" value={editData?.status ?? ""} onChange={handleEditChange}>
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* contact / whatsapp number */}
                <div className="flex-row " style={{ gap: "20px" }}>
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label htmlFor="contact">
                      Contact Number<span className="required">*</span>
                    </label>
                    <input
                      id="contact"
                      type="text"
                      name="contact"
                      value={editData?.contact}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>
                  <div className="chekbox" style={{ width: "23%" }}>
                    <input id="sameNumberForedit" type="checkbox" checked={editData?.contact == editData?.whatsapp_number ? true : false}
                      name="sameNumberForedit"
                      onChange={handleEditSameNumberChange} />
                    <label htmlFor="sameNumberForedit">Same WhatsApp</label>
                  </div>

                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label htmlFor="whatsapp_number">
                      WhatsApp
                      <label htmlFor="whatsapp_number">
                        <span className="required">*</span>
                      </label>
                    </label>
                    <input
                      id="whatsapp_number"
                      type="text"
                      name="whatsapp_number"
                      value={editData?.whatsapp_number}
                      onChange={handleEditChange}
                      className="col12input"
                      disabled={sameNumberForedit}
                    />
                  </div>
                </div>

                {/* address / country */}
                <div className="flex-row">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      value={editData?.address}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={editData?.country}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>
                </div>

                {/* gender / DOB / profile image */}
                <div style={{ display: "flex" }}>
                  <div className="flex-row" style={{ width: "45%" }}>
                    <div className="form-group mb-0" style={{ width: "48%" }}>
                      <label htmlFor="gender">Gender</label>
                      <select className="col12input" id="gender" name="gender" value={editData?.gender || ""} onChange={handleEditChange}>
                        <option value="">Select Gender</option>
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
                        value={editData?.dob}
                        onChange={handleEditChange}
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
                      <label htmlFor="profile">
                        Profile Picture <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="profile"
                        placeholder=""
                        className="col12input"
                        name="profile"
                        value={editfilename || (editData.profile && editData.profile.name) || ""}
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
                      name="profile"
                      onChange={handleEditImageChange}
                      style={{ display: "none" }}
                      accept="image/*"
                    />

                    <div>
                      {newEditImage ? (
                        <img
                          src={URL.createObjectURL(newEditImage)}
                          style={{ width: "67px", maxHeight: "67px" }}
                          alt="Selected Thumbnail"
                        />
                      ) : (
                        editData?.profile && (
                          <img
                            src={`../upload/${editData?.profile}`}
                            style={{ width: "67px", maxHeight: "67px" }}
                            alt="Profile Thumbnail"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* user about details */}
                <div className="flex-row" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "100%" }}>
                    <label htmlFor="description">About User</label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      value={editData?.description}
                      onChange={handleEditChange}
                      className="col12input"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Delete Confirmation Modal */}
        {deleteOpen && (
          <div className="modal">
            <div className="modal-container">
              <h5>Delete User</h5>
              <p>Are you sure you want to delete the user ?</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={deleteUserData} className="primary-btn">
                  Confirm
                </button>
                <button onClick={deleteToggleModal} className="secondary-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div >
    </>
  );
};

export default User;
