import React, { useState, useEffect } from "react";
import Hoc from "../layout/Hoc";
import axios from "axios";
import "../../../assets/css/course/coursecategory.css";
import "../../../assets/css/main.css";
const port = process.env.REACT_APP_URL

const CourseCategory = () => {
  // Sample data for the cards

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [nullCourseCategory, setNullCourseCategory] = useState([]);
  const [firstNullParentData, setFirstNullParentData] = useState([]);

  //get course category data
  const getNullCourseCategoryData = async () => {
    try {
      const res = await axios.get(`${port}/gettingNullCourseCategory`);
      setNullCourseCategory(res.data);
      if (res.data.length > 0) {
        const firstCategory = res.data[0];
        setFirstNullParentData(firstCategory);
        await handleGetCourseDetail(firstCategory.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //add course category data
  const [addCourseCategoryData, setAddCourseCategoryData] = useState({
    cate_title: "",
    cate_parent_id: null,
    cate_thumbnail: null,
    created_by: 1,
    updated_by: 1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCourseCategoryData({
      ...addCourseCategoryData,
      [name]: value
    })
  }
  const [addNewImage, setAddNewImage] = useState(null);
  const handleImageChange = (e) => {
    setAddCourseCategoryData({
      ...addCourseCategoryData,
      [e.target.name]: e.target.files[0]
    })
    setAddNewImage(e.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addCourseCategoryData)
    const formData = new FormData();
    formData.append("cate_title", addCourseCategoryData.cate_title);
    formData.append("cate_parent_id", addCourseCategoryData.cate_parent_id);
    formData.append("cate_thumbnail", addCourseCategoryData.cate_thumbnail);
    formData.append("status", addCourseCategoryData.status);
    formData.append("created_by", addCourseCategoryData.created_by);
    formData.append("updated_by", addCourseCategoryData.updated_by);
    try {
      const res = await axios.post(`${port}/addingCourseCategory`, formData)
      getNullCourseCategoryData();
      setAddOpen(false);
      setAddCourseCategoryData({
        cate_title: "",
        cate_parent_id: null,
        cate_thumbnail: null,
        created_by: 1,
        updated_by: 1,
      })
    } catch (error) {
      console.log(error);
    }
  }
  //get course data with id and clicking on null 
  const [nullCourseDataWithId, setNullCourseDataWithId] = useState([]);
  const [courseDataWithParentId, setCourseDataWithParentId] = useState([]);
  const handleGetCourseDetail = async (id) => {
    try {
      const res = await axios.get(`${port}/gettingNullCourseCategoryWithId/${id}`);
      const res2 = await axios.get(`${port}/gettingCourseCategoryWithParentId/${id}`);
      setCourseDataWithParentId(res2.data);
      setNullCourseDataWithId(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  //delete data code 
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${port}/deletingCourseCategory/${deleteId}`);
      getNullCourseCategoryData();
      setDeleteOpen(false);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getNullCourseCategoryData();
  }, [])



  //edit data section start
  const [editData, setEditData] = useState({
    cate_title: "",
    cate_parent_id: null,
    cate_thumbnail: null,
    updated_by: 1,
  })
  const getDataForEdit = async (id) => {
    try {
      const res = await axios.get(`${port}/gettingCoureseCategoryWithId/${id}`);
      setEditData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    })
  }
  const [newImage, setNewImage] = useState(null);
  const handleEditImageChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.files[0]
    })
    setNewImage(e.target.files[0]);
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cate_title", editData.cate_title);
    formData.append("cate_parent_id", editData.cate_parent_id);
    if (editData.cate_thumbnail !== null) {
      formData.append("cate_thumbnail", editData.cate_thumbnail);
    }
    formData.append("updated_by", editData.updated_by);
    try {
      const res = await axios.put(`${port}/updatingCourseCategory/${editData.id}`, formData)
      getNullCourseCategoryData();
      setEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  //status change

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(`${port}/updatingCourseCategoryStatus/${id}`, { status: status });
      getNullCourseCategoryData();
    } catch (error) {
      console.log(error)
    }
  };

  const addToggleModal = () => {
    setAddOpen(!addOpen);
  };

  const editToggleModal = async (editid) => {
    if (editid) {
      await getDataForEdit(editid);
    }
    setEditOpen(!editOpen);
  };
  const [deleteId, setDeleteId] = useState(null)
  const deleteToggleModal = (id) => {
    setDeleteId(id);
    setDeleteOpen(!deleteOpen);
  };


  return (
    <>
      <Hoc />
      <div class="main">
        <div class="main-top-bar">
          <div id="user-tag">
            <h5>Course Category</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div class="hero-inner-logo">
            <img src={require("../../../assets/image/pdf-logo.png")} />
            <img src={require("../../../assets/image/x-logo.png")} />
          </div>
          <a
            style={{ cursor: "pointer" }}
            onClick={addToggleModal}
          >
            <span className="primary-btn module-btn">+ Add</span>
          </a>
        </div>

        <div className="services-section">
          <div className="security-btn">
            {
              nullCourseCategory.map((course) => (
                <a className="" style={{ cursor: "pointer" }} onClick={() => handleGetCourseDetail(course.id)}>
                  <p>{course.cate_title}</p>
                </a>
              ))
            }
          </div>
          <div className="horizontal-card">
            <div className="card">
              {
                (nullCourseDataWithId?.data || firstNullParentData) ? (
                  <>
                    {nullCourseDataWithId?.data ? (
                      <>
                        <img
                          src={`./upload/${nullCourseDataWithId.data.cate_thumbnail}`}
                          alt={nullCourseDataWithId.data.cate_title}
                          className="card-image"
                        />
                        <div className="content">
                          <h5>{nullCourseDataWithId.data.cate_title}</h5>
                          <p>Sub Course: {nullCourseDataWithId.subcoursecount}</p>
                        </div>
                        <div className="card-actions">
                          <label className="switch" style={{ marginTop: "4px" }}>
                            <input
                              type="checkbox"
                              checked={nullCourseDataWithId.data.status}
                              onClick={() => handleStatusChange(nullCourseDataWithId.data.id, nullCourseDataWithId.data.status)}
                            />
                            <span className="slider"></span>
                          </label>
                          <div className="action-btn">
                            <span
                              onClick={() => {
                                editToggleModal(nullCourseDataWithId.data.id);
                              }}
                              className="edit"
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              onClick={() => deleteToggleModal(nullCourseDataWithId.data.id)}
                              className="delete"
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : firstNullParentData ? (
                      <>
                        <img
                          src={`./upload/${firstNullParentData.cate_thumbnail}`}
                          alt={firstNullParentData.cate_title}
                          className="card-image"
                        />
                        <div className="content">
                          <h5>{firstNullParentData.cate_title}</h5>
                          <p>Sub Course: {firstNullParentData.subcoursecount}</p>
                        </div>
                        <div className="card-actions">
                          <label className="switch" style={{ marginTop: "4px" }}>
                            <input
                              type="checkbox"
                              checked={firstNullParentData.status}
                              onClick={() => handleStatusChange(firstNullParentData.id, firstNullParentData.status)}
                            />
                            <span className="slider"></span>
                          </label>
                          <div className="action-btn">
                            <span
                              onClick={() => {
                                editToggleModal(firstNullParentData.id);
                              }}
                              className="edit"
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              onClick={() => deleteToggleModal(firstNullParentData.id)}
                              className="delete"
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : (
                  <p>No data found</p>
                )
              }


            </div>
          </div>

          <div className="courses-category">
            {
              courseDataWithParentId.length > 0 ? (
                courseDataWithParentId.map((course) => (
                  <div key={course.id} className="card">
                    <img
                      src={`./upload/${course.cate_thumbnail}`}
                      alt={course.cate_title}
                      className="card-image"
                    />
                    <div className="card-content">
                      <h5>{course.cate_title}</h5>
                      <div className="card-actions">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={course.status}
                            onClick={() => handleStatusChange(course.id, course.status)}
                          />
                          <span className="slider"></span>
                        </label>
                        <div className="action-btn">
                          <span
                            onClick={() => {
                              editToggleModal(course.id);
                            }}
                            className="edit"
                          >
                            <i className="fa fa-pencil"></i>
                          </span>
                          <span
                            onClick={() => deleteToggleModal(course.id)}
                            className="delete"
                          >
                            <i className="fa fa-trash"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Sub Course Found</p>
              )
            }

          </div>

          {/* Add Model */}
          {addOpen && (
            <div className="modal">
              <div className="modal-container">
                <h5>Add Course Category</h5>
                <form className="coupon-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>
                      Category Title<span className="required">*</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        className="col12input"
                        placeholder="Enter Category Title"
                        name="cate_title"
                        onChange={handleChange}
                        value={addCourseCategoryData.cate_title}
                        style={{ marginBottom: "10px" }}
                      />
                    </div>

                    <label>
                      Category Parent ID<span className="required">*</span>
                    </label>
                    <div>
                      <select
                        name="cate_parent_id"
                        className="col12input"
                        onChange={handleChange}
                        value={addCourseCategoryData.cate_parent_id}
                      >
                        <option value="NULL">None</option>
                        {
                          nullCourseCategory.map((course, index) => (
                            <option value={course.id} key={index}>{course.cate_title}</option>
                          ))
                        }
                      </select>
                    </div>
                    <label>
                      Category Thumbnail<span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      name="cate_thumbnail"
                      className="col12input"
                      style={{ marginBottom: "20px" }}
                      placeholder="Category Image"
                      onChange={handleImageChange}
                    />
                    {
                      addNewImage && (
                        <img
                          src={URL.createObjectURL(addNewImage)}
                          alt="Thumbnail"
                          width="30%"
                        />
                      )
                    }

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="submit" className="primary-btn">
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={addToggleModal}
                        className="secondary-btn"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Model */}
          {editOpen && (
            <div className="modal">
              <div className="modal-container">
                <h5>Edit Course Category</h5>
                <form className="coupon-form" onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label>
                      Category Title<span className="required">*</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        name="cate_title"
                        value={editData.cate_title}
                        onChange={handleEditChange}
                        className="col12input"
                        placeholder="Enter Category Title"
                        style={{ marginBottom: "10px" }}
                      />
                    </div>

                    <label>
                      Category Parent ID<span className="required">*</span>
                    </label>
                    <div>
                      <select
                        name="cate_parent_id"
                        onChange={handleEditChange}
                        value={editData.cate_parent_id}
                        className="col12input"
                        form="parentform"
                      >
                        <option value="NULL">None</option>
                        {
                          nullCourseCategory.map((course, index) => (
                            <option value={course.id} key={index}>{course.cate_title}</option>
                          ))
                        }
                      </select>
                    </div>
                    <label>
                      Category Thumbnail<span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      name="cate_thumbnail"
                      onChange={handleEditImageChange}
                      className="col12input"
                      style={{ marginBottom: "20px" }}
                    />
                    {
                      newImage ? (
                        <img src={URL.createObjectURL(newImage)} width="30%" />
                      ) : (
                        <img src={`upload/${editData.cate_thumbnail}`} width="30%" />
                      )
                    }

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="submit" className="primary-btn">
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={editToggleModal}
                        className="secondary-btn"
                      >
                        Close
                      </button>
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
                <h5>Delete Course Category</h5>
                <p>
                  Are you sure you want to delete the course category{" "}?
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={handleDelete} className="primary-btn">
                    Confirm
                  </button>
                  <button onClick={deleteToggleModal} className="secondary-btn">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseCategory;
