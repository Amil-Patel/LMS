import React, { useContext, useEffect, useRef, useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/course/addcourse.css";
import "../../../assets/css/main.css";
import axiosInstance from "../utils/axiosInstance";
import { userRolesContext } from "../layout/RoleContext";
import Loading from "../layout/Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { notifyInfo, notifyWarning } from '../layout/ToastMessage'
import { Editor } from "@tinymce/tinymce-react";
const port = process.env.REACT_APP_URL

const AddCourse = () => {
  const { userId } = useContext(userRolesContext);
  const [tab, setTab] = useState("basic-info");
  const [isTax, setIsTax] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [loading, setLoading] = useState(false);
  //get not null category data
  const [notNullCourseCategory, setNotNullCourseCategory] = useState([]);
  const getNullCourseCategoryData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingNotNullCourseCategory`);
      setNotNullCourseCategory(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [addCourse, setAddCourse] = useState({
    course_title: "",
    short_desc: "",
    long_desc: "",
    course_cate: '',
    course_level: "",
    course_language: "",
    drip_content: false,
    course_status: "",
    upcoming_course_thumbnail: null,
    publish_date: "",
    is_top_course: false,
    featured_course: false,
    course_faqs: [{ question: "", answer: "" }],
    course_requirenment: [''],
    course_topics: [''],
    course_price: "",
    course_discount: "",
    is_tax: false,
    tax_name: "",
    tax_rate: 0,
    is_inclusive: false,
    is_exclusive: false,
    auther: [],
    expiring_time: "",
    no_of_month: "",
    course_overview_link: "",
    course_thumbnail: null,
    meta_tag: [],
    meta_keyword: [],
    meta_desc: "",
    canonical_url: "",
    title_tag: "",
    created_by: userId,
    updated_by: userId
  });


  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingUserMasterDataWithId/${userId}`);
      setUserData(res.data);
      setAddCourse((prev) => ({ ...prev, auther: [...prev.auther, res.data.first_name] }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleTax = () => {
    setIsTax(!isTax);
  }

  const handleLimited = () => {
    setIsLimited(!isLimited);
  }
  const [newImage, setNewImage] = useState(null)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddCourse({ ...addCourse, course_thumbnail: file.name });
      setNewImage(file);
    }
  };



  useEffect(() => {
    getNullCourseCategoryData()
    getUserData();
  }, [])

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleChangeTab = (tabName) => {
    setTab(tabName);
  };

  const handleFaqChange = (index, event) => {
    const values = [...addCourse.course_faqs];
    values[index][event.target.name] = event.target.value;
    setAddCourse((prev) => ({ ...prev, course_faqs: values }));
  };

  const handleLearningChange = (index, event) => {
    const values = [...addCourse.course_topics];
    values[index] = event.target.value;
    setAddCourse((prev) => ({ ...prev, course_topics: values }));
  };

  const handleAddFaq = () => {
    setAddCourse((prev) => ({ ...prev, course_faqs: [...prev.course_faqs, { question: "", answer: "" }] }));
  };
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    setAddCourse((prevData) => ({
      ...prevData,
      long_desc: content,
    }));
  };
  const handleRemoveFaq = (index) => {
    const values = [...addCourse.course_faqs];
    values.splice(index, 1);
    setAddCourse((prev) => ({ ...prev, course_faqs: values }));
  };

  const handleAddLearning = () => {
    setAddCourse((prev) => ({ ...prev, course_topics: [...prev.course_topics, ""] }))
  };

  const handleRemoveLearning = (index) => {
    const values = [...addCourse.course_topics];
    values.splice(index, 1);
    setAddCourse((prev) => ({ ...prev, course_topics: values }));
  };

  const handlePrerequisiteChange = (index, event) => {
    const newPrerequisites = [...addCourse.course_requirenment];
    newPrerequisites[index] = event.target.value;
    setAddCourse({ ...addCourse, course_requirenment: newPrerequisites });
  };

  const handleAddPrerequisite = () => {
    setAddCourse({ ...addCourse, course_requirenment: [...addCourse.course_requirenment, ""] });
  };

  const handleRemovePrerequisite = (index) => {
    const newPrerequisites = addCourse.course_requirenment.filter((_, i) => i !== index);
    setAddCourse({ ...addCourse, course_requirenment: newPrerequisites });
  };

  const handleAddAuther = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newKeywords = e.target.value.split(",").map((kw) => kw.trim());
      setAddCourse((prevState) => ({
        ...prevState,
        auther: [...(prevState.auther || []), ...newKeywords],
      }));
      e.target.value = "";
    }
  };
  const handleRemoveAuther = (indexToRemove) => {
    setAddCourse({
      ...addCourse,
      auther: addCourse.auther.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };
  const handleAddKeywords = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newTags = e.target.value.split(",").map((tag) => tag.trim());
      setAddCourse((prevState) => ({
        ...prevState,
        meta_keyword: [...(prevState.meta_keyword || []), ...newTags],
      }))
      e.target.value = "";
    }
  };
  const handleAddTags = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newTags = e.target.value.split(",").map((tag) => tag.trim());
      setAddCourse((prevState) => ({
        ...prevState,
        meta_tag: [...(prevState.meta_tag || []), ...newTags],
      }))
      e.target.value = "";
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setAddCourse({
      ...addCourse,
      meta_keyword: addCourse.meta_keyword.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };
  const handleRemoveTag = (indexToRemove) => {
    setAddCourse({
      ...addCourse,
      meta_tag: addCourse.meta_tag.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedFields = { ...addCourse };

    if (type === "checkbox") {
      updatedFields[name] = checked;
    } else {
      updatedFields[name] = value;
    }

    if (name === "tax_type") {
      if (value === "inclusive") {
        updatedFields = { ...updatedFields, is_inclusive: 1, is_exclusive: 0 };
      } else if (value === "exclusive") {
        updatedFields = { ...updatedFields, is_inclusive: 0, is_exclusive: 1 };
      }
    } else if (name === "is_life_time" || name === "is_limited") {
      if (type === "checkbox") {
        if (checked) {
          updatedFields = {
            ...updatedFields,
            expiring_time: name === "is_life_time" ? "life_time" : "limited_time",
            [name]: 1
          };
        } else {
          updatedFields = { ...updatedFields, [name]: 0 };
          if (name === "is_limited") updatedFields.expiring_time = "";
        }
      }
    }

    setAddCourse(updatedFields);

  };

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addCourse.course_title === "") {
      notifyWarning("Please enter course title");
      return
    }
    if (addCourse.course_cate === "") {
      notifyWarning("Please select course category");
      return
    }
    if (addCourse.course_price === "") {
      notifyWarning("Please enter course price");
      return
    }
    console.log(addCourse)
    setLoading(true);
    const formData = new FormData();
    formData.append("course_title", addCourse.course_title);
    formData.append('short_desc', addCourse.short_desc);
    formData.append('long_desc', addCourse.long_desc);
    formData.append('course_cate', addCourse.course_cate);
    formData.append('course_level', addCourse.course_level);
    formData.append('course_language', addCourse.course_language);
    formData.append('drip_content', addCourse.drip_content);
    formData.append('course_status', addCourse.course_status);
    formData.append('upcoming_course_thumbnail', addCourse.upcoming_course_thumbnail);
    formData.append('publish_date', addCourse.publish_date);
    formData.append('is_top_course', addCourse.is_top_course);
    formData.append('featured_course', addCourse.featured_course);
    formData.append('course_faqs', JSON.stringify(addCourse.course_faqs));
    formData.append('course_topics', JSON.stringify(addCourse.course_topics));
    formData.append('course_requirenment', JSON.stringify(addCourse.course_requirenment));
    formData.append('course_price', addCourse.course_price);
    formData.append('course_discount', addCourse.course_discount);
    formData.append('is_tax', isTax);
    formData.append('tax_name', addCourse.tax_name);
    formData.append('tax_rate', addCourse.tax_rate);
    formData.append('is_inclusive', addCourse.is_inclusive);
    formData.append('is_exclusive', addCourse.is_exclusive);
    formData.append('auther', addCourse.auther);
    formData.append('expiring_time', addCourse.expiring_time);
    formData.append('no_of_month', addCourse.no_of_month);
    formData.append('course_overview_link', addCourse.course_overview_link);
    formData.append('course_thumbnail', newImage);
    formData.append('meta_tag', JSON.stringify(addCourse.meta_tag));
    formData.append('meta_keyword', JSON.stringify(addCourse.meta_keyword));
    formData.append('meta_desc', addCourse.meta_desc);
    formData.append('canonical_url', addCourse.canonical_url);
    formData.append('title_tag', addCourse.title_tag)
    try {
      const res = await axiosInstance.post(`${port}/addingCourseMaster`, formData);
      setLoading(false);
      navigate('/admin/all-course');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Courses</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-input" type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="hero-inner-logo">
            <img
              src={require("../../../assets/image/pdf-logo.png")}
              alt="PDF Logo"
            />
            <img
              src={require("../../../assets/image/x-logo.png")}
              alt="X Logo"
            />
          </div>
          <a className="primary-btn module-btn" onClick={handleSubmit} style={{ cursor: "pointer" }}>
            <span className="text" >Save</span>
          </a>
        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            <li onClick={() => handleChangeTab("basic-info")}>
              <NavLink className={tab === "basic-info" ? "active-tab" : ""}>BASIC INFO</NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("course")}>
              <NavLink className={tab === "course" ? "active-tab" : ""}>COURSE DESCRIPTIONS</NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("additional")}>
              <NavLink className={tab === "additional" ? "active-tab" : ""}>ADDITIONAL INFO</NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("seo")}>
              <NavLink className={tab === "seo" ? "active-tab" : ""}>SEO</NavLink>
            </li>
          </ul>
        </div>

        <div className="admin_course-form-container">
          {/* Basic Info Tab */}
          {tab == "basic-info" && (
            <form>
              {/* course title / desc */}
              <div className="form-group">
                <label htmlFor="course_title">
                  Course Title<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="course_title"
                  name="course_title"
                  value={addCourse.course_title}
                  onChange={handleChange}
                  placeholder="Enter Course Title"
                  className="col12input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="short_desc">Short Description</label>
                <textarea
                  type="text"
                  id="short_desc"
                  name="short_desc"
                  value={addCourse.short_desc}
                  onChange={handleChange}
                  placeholder="Enter Course Desc"
                  className="col12input"
                />
              </div>

              {/* course category / level / language */}
              <div className="flex-row flex-row80">
                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label htmlFor="course_cate">
                    Course Category<span className="required">*</span>
                  </label>
                  <select id="course_cate" className="col12input" name="course_cate" value={addCourse.course_cate} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {
                      notNullCourseCategory.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.cate_title}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label htmlFor="course_level">Course Level</label>
                  <select id="course_level" className="col12input" name="course_level" value={addCourse.course_level} onChange={handleChange}>
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label htmlFor="course_language">
                    Course Language<span className="required">*</span>
                  </label>
                  <select id="course_language" className="col12input" name="course_language" value={addCourse.course_language} onChange={handleChange}>
                    <option value="">Select Language</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "space-between",
                }}
              >
                {/* course price / discount */}
                <div className="flex-row flex-row40">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="course_price">
                      Course Price<span className="required">*</span>
                    </label>
                    <input id="course_price" type="number" placeholder="0" className="col12input" name="course_price" onChange={handleChange} value={addCourse.course_price} />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label htmlFor="course_discount">Course Discount (in %)</label>
                    <input id="course_discount" type="text" placeholder="0" className="col12input" name="course_discount" onChange={handleChange} value={addCourse.course_discount} />
                  </div>
                </div>

                {/* status / publish date */}
                <div className="flex-row flex-row40">
                  <div className="form-group mb-0" style={{ width: addCourse.course_status === "upcoming" ? "48%" : "96%" }}
                  >
                    <label htmlFor="course_status">Status</label>
                    <select id="course_status" className="col12input" name="course_status" value={addCourse.course_status} onChange={handleChange}>
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="private">Private</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  {
                    addCourse.course_status == "upcoming" && (
                      <div className="form-group mb-0" style={{ width: "48%" }}>
                        <label htmlFor="course_publish_date">Publish Date</label>
                        <input
                          type="date"
                          id="course_publish_date"
                          name="course_publish_date"
                          onChange={handleChange}
                          value={addCourse.course_publish_date}
                          className="col12input"
                        />
                      </div>
                    )
                  }

                </div>
              </div>

              {/* tax / taxt name / rate / type */}
              <div
                className="flex-row flex-row80"
                style={{ width: "85%", gap: "20px" }}
              >
                <div className="chekbox">
                  <input id="is_tax" type="checkbox" name="is_tax" checked={addCourse.is_tax} onClick={handleTax} onChange={handleChange} />
                  <label htmlFor="is_tax">Tax</label>
                </div>
                {
                  isTax && (
                    <>
                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label htmlFor="tax_name">
                          Tax Name<span className="required">*</span>
                        </label>
                        <input id="tax_name" type="text" placeholder="Tax Name" className="col12input" name="tax_name" onChange={handleChange} value={addCourse.tax_name} />
                      </div>

                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label htmlFor="tax_rate">
                          Tax Rate
                          <label htmlFor="tax_rate" className="required">
                            <span className="required">*</span>
                          </label>
                        </label>
                        <input id="tax_rate" type="text" placeholder="Tax Rate" className="col12input" name="tax_rate" onChange={handleChange} value={addCourse.tax_rate} />
                      </div>

                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label htmlFor="tax_type">
                          Type <span className="required">*</span>
                        </label>
                        <select id="tax_type" placeholder="Tax Type" className="col12input" value={addCourse.tax_type} name="tax_type" onChange={handleChange}>
                          <option value="">Select Tax Type</option>
                          <option value="inclusive">Is Inclusive</option>
                          <option value="exclusive">Is Exclusive</option>
                        </select>
                      </div>
                    </>
                  )
                }
                {
                  !isTax && (
                    <>
                      <div className="form-group mb-0" style={{ width: "100%", fontSize: "13px" }}>
                        When You will check the box, you can add tax to the course.
                      </div>
                    </>
                  )
                }

              </div>

              {/* life time / limited time / expire time */}
              <div style={{ display: "flex" }}>
                <div className="flex-row" style={{ width: isLimited ? "43%" : "26%" }}>
                  <div className="chekbox2">
                    <input id="is_life_time" type="checkbox" name="is_life_time" checked={addCourse.is_life_time} onChange={handleChange} />
                    <label htmlFor="is_life_time">Life Time</label>
                  </div>
                  <div className="chekbox2">
                    <input id="is_limited" type="checkbox" name="is_limited" onClick={handleLimited} checked={addCourse.is_limited} onChange={handleChange} />
                    <label htmlFor="is_limited">Limited Time</label>
                  </div>
                  {
                    isLimited && (
                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label htmlFor="no_of_month">
                          Limited Time <span className="required">*</span>
                        </label>
                        <input id="no_of_month" type="text" placeholder="No Of Month" className="col12input" name="no_of_month" onChange={handleChange} value={addCourse.no_of_month} />
                      </div>
                    )
                  }
                </div>

                <div
                  className="flex-row"
                  style={{
                    width: "50%",
                    border: "none",
                    marginLeft: "30px",
                    alignItems: "end",
                    gap: "20px",
                    justifyContent: "normal"
                  }}
                >
                  <div className="form-group mb-0" style={{ width: "50%" }}>
                    <label htmlFor="course_thumbnail">
                      Course Thumbnail <span className="required">*</span>
                    </label>
                    <input id="course_thumbnail" type="text" placeholder="" className="col12input" value={addCourse.course_thumbnail}
                      readOnly />
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
                    name="course_thumbnail"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {
                    newImage ? (
                      <div>
                        <img src={URL.createObjectURL(newImage)} style={{ width: "67px", maxHeight: "67px" }} alt="Selected Thumbnail" />
                      </div>
                    ) : (
                      <div>
                        <img src={require("../../../assets/image/default-thumbnail.png")} style={{ width: "67px", maxHeight: "67px" }} alt="Selected Thumbnail" />
                      </div>
                    )
                  }
                </div>
              </div>

              {/* course overview link */}
              <div style={{ display: "flex" }}>
                <div className="flex-row flex-row40" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "90%" }}>
                    <label htmlFor="course_overview_link">Course OverView Link</label>
                    <input
                      type="text"
                      name="course_overview_link"
                      id="course_overview_link"
                      onChange={handleChange}
                      value={addCourse.course_overview_link}
                      placeholder="Enter Course Overview Link"
                      className="col12input"
                    />
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <div className="chekbox2">
                        <input id="drip_content" type="checkbox" name="drip_content" checked={addCourse.drip_content || false} onChange={handleChange} />
                        <label htmlFor="drip_content">Drip Content</label>
                      </div>
                      <div className="chekbox2">
                        <input id="featured_course" type="checkbox" name="featured_course" checked={addCourse.featured_course || false} onChange={handleChange} />
                        <label htmlFor="featured_course">Featured Course</label>
                      </div>
                      <div className="chekbox2">
                        <input id="is_top_course" type="checkbox" name="is_top_course" checked={addCourse.is_top_course || false} onChange={handleChange} />
                        <label htmlFor="is_top_course">Top Course</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-row flex-row40" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "90%" }}>
                    <label htmlFor="auther">Author</label>
                    <small className="text-muted ms-2">(↵ Press Enter to add author)</small>
                    <input
                      type="text"
                      id="auther"
                      name="auther"
                      placeholder="Enter One Or More Author"
                      className="col12input"
                      onKeyDown={handleAddAuther}
                    />
                    <div className="tag-container">
                      {addCourse.auther.map((keyword, index) => (
                        <div className="tag" key={index}>
                          <span>{keyword}</span>
                          {userData?.first_name == keyword ?
                            ""
                            : (
                              <span
                                onClick={() => handleRemoveAuther(index)}
                                className="tag-close"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </span>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Course Description TAB */}
          {tab == "course" && (
            <div className="description-container">
              <label htmlFor="courseDescription" className="description-label mb-2">
                Long Description
              </label>
              <Editor
                apiKey='1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo'
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                }}
                onEditorChange={(content, editor) => {
                  handleEditorChange(content, editor)
                }
                }
              />
            </div>
          )}

          {/* Additional INFO TAB */}
          {tab == "additional" && (
            <div className="faq-section">
              <div className="section">
                <label htmlFor="question" className="description-label">
                  FAQS
                </label>
                {addCourse.course_faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    {/* FAQ Question with Button on the Right */}
                    <div className="input-button">
                      <input
                        type="text"
                        id="question"
                        name="question"
                        value={faq.question}
                        onChange={(event) => handleFaqChange(index, event)}
                        placeholder="Enter Topics detail what you will learn"
                        className="col12input"
                      />

                      {/* Add/Remove Button */}
                      <button
                        className={`faq-button ${index === addCourse.course_faqs.length - 1 ? "add" : "remove"
                          }`}
                        onClick={
                          index === addCourse.course_faqs.length - 1
                            ? handleAddFaq
                            : () => handleRemoveFaq(index)
                        }
                      >
                        {index === addCourse.course_faqs.length - 1 ? "+" : "-"}
                      </button>
                    </div>

                    {/* FAQ Answer */}
                    <textarea
                      style={{
                        width: "calc(100% - 41px)",
                        marginRight: "41px",
                      }}
                      name="answer"
                      value={faq.answer}
                      onChange={(event) => handleFaqChange(index, event)}
                      placeholder="Your FAQS Answer Description Here"
                      className="textarea-field col12input"
                    />
                  </div>
                ))}
              </div>

              <div className="section">
                <label htmlFor="willLearn" className="description-label">
                  What You Will Learn ?
                </label>
                {
                  addCourse.course_topics.map((point, index) => (
                    <div key={index} className="learning-item">
                      <input
                        id="willLearn"
                        type="text"
                        value={point}
                        onChange={(event) => handleLearningChange(index, event)}
                        placeholder="Enter Topics detail what you will learn"
                        className="col12input input-space"
                      />
                      <button
                        className={`faq-button ${index === addCourse.course_topics.length - 1 ? "add" : "remove"
                          }`}
                        onClick={
                          index === addCourse.course_topics.length - 1
                            ? handleAddLearning
                            : () => handleRemoveLearning(index)
                        }
                      >
                        {index === addCourse.course_topics.length - 1 ? "+" : "-"}
                      </button>
                    </div>
                  ))}
              </div>

              <div className="section">
                <label htmlFor="prerequisites" className="description-label">
                  Prerequisites
                </label>
                {addCourse.course_requirenment.map((point, index) => (
                  <div key={index} className="learning-item">
                    <input
                      type="text"
                      id="prerequisites"
                      name="course_requirenment"
                      value={point}
                      onChange={(event) =>
                        handlePrerequisiteChange(index, event)
                      }
                      placeholder="Enter Topics detail what you will learn"
                      className="col12input input-space"
                    />
                    <button
                      className={`faq-button ${index === addCourse.course_requirenment.length - 1 ? "add" : "remove"
                        }`}
                      onClick={
                        index === addCourse.course_requirenment.length - 1
                          ? handleAddPrerequisite
                          : () => handleRemovePrerequisite(index)
                      }
                    >
                      {index === addCourse.course_requirenment.length - 1 ? "+" : "-"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {tab == "seo" && (
            <div className="meta-form">
              <div className="form-group">
                <label htmlFor="meta_title">Meta Title</label>
                <input
                  type="text"
                  id="meta_title"
                  name="title_tag"
                  onChange={handleChange}
                  value={addCourse.title_tag}
                  className="col12input"
                  placeholder="Enter Topics detail what you will learn"
                />
              </div>

              <div className="form-group">
                <label htmlFor="canonical_url">Canonical URL</label>
                <input
                  type="text"
                  id="canonical_url"
                  name="canonical_url"
                  onChange={handleChange}
                  value={addCourse.canonical_url}
                  className="col12input"
                  placeholder="Enter Topics detail what you will learn"
                />
              </div>

              <div className="form-group">
                <label htmlFor="meta_keywords">Meta Keywords</label>
                <small className="text-muted ms-2">(↵ Press Enter to add Keywords)</small>
                <input
                  type="text"
                  id="meta_keywords"
                  name="meta_keywords"
                  className="col12input"
                  placeholder="Enter Your Keywords here, separated by commas"
                  onKeyDown={handleAddKeywords}
                />
                <div className="tag-container">
                  {addCourse.meta_keyword.map((keyword, index) => (
                    <div className="tag" key={index}>
                      <span>{keyword}</span>
                      <span
                        className="tag-close"
                        onClick={() => handleRemoveKeyword(index)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="meta_tag">Meta Tags</label>
                <small className="text-muted ms-2">(↵ Press Enter to add Tags)</small>
                <input
                  type="text"
                  id="meta_tag"
                  name="meta_tag"
                  className="col12input"
                  placeholder="Enter Your Tags here, separated by commas"
                  onKeyDown={handleAddTags}
                />
                <div className="tag-container">
                  {addCourse.meta_tag.map((tag, index) => (
                    <div className="tag" key={index}>
                      <span>{tag}</span>
                      <span
                        className="tag-close"
                        onClick={() => handleRemoveTag(index)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="meta-description">
                <div className="form-group">
                  <label htmlFor="meta_description">Meta Description</label>
                  <textarea
                    placeholder="Describe Your Meta Description over Here"
                    className="col12input"
                    id="meta_description"
                    onChange={handleChange}
                    name="meta_desc"
                    value={addCourse.meta_desc}
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    </>
  );
};

export default AddCourse;
