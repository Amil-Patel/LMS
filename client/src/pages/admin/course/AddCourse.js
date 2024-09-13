import React, { useEffect, useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/course/addcourse.css";
import "../../../assets/css/main.css";
import axios from "axios";
import { Form, NavLink } from "react-router-dom";
const port = process.env.REACT_APP_URL

const AddCourse = () => {
  const [tab, setTab] = useState("basic-info");
  const [isTax, setIsTax] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [imageSrc] = useState("https://via.placeholder.com/150");
  //get not null category data
  const [notNullCourseCategory, setNotNullCourseCategory] = useState([]);
  const getNullCourseCategoryData = async () => {
    try {
      const res = await axios.get(`${port}/gettingNotNullCourseCategory`);
      setNotNullCourseCategory(res.data);
    } catch (error) {
      console.log(error);
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
    tax_rate: "",
    is_inclusive: false,
    is_exclusive: false,
    author: [''],
    expiring_time: "",
    no_of_month: "",
    course_overview_link: "",
    course_thumbnail: null,
    meta_tag: [''],
    meta_keyword: [''],
    meta_desc: "",
    canonical_url: "",
    title_tag: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(name, value, type, checked);

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
        author: [...(prevState.author || []), ...newKeywords],
      }));
      e.target.value = "";
    }
  };
  const handleRemoveAuther = (indexToRemove) => {
    setAddCourse({
      ...addCourse,
      author: addCourse.author.filter(
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

  const handleSubmit = async (e) => {
    console.log(addCourse)
    // e.preventDefault();
    // try {
    //   const res = await axios.post(`${port}/addCourse`, addCourse);
    //   console.log(res.data)
    // } catch (error) {
    //   console.log(error);
    // }
  };


  return (
    <>
      <Hoc />
      <div className="main">
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Courses</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
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
          <a className="primary-btn module-btn" style={{ cursor: "pointer" }}>
            <span className="text" onClick={handleSubmit}>Save</span>
          </a>
        </div>

        <div className="admin-panel-tab-bar">
          <ul className="tab">
            <li onClick={() => handleChangeTab("basic-info")}>
              <NavLink>BASIC INFO</NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("course")}>
              <NavLink>COURSE DESCRIPTIONS</NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("additional")}>
              <NavLink>ADDITIONAL INFO</NavLink>
            </li>
            |
            <li onClick={() => handleChangeTab("seo")}>
              <NavLink>SEO</NavLink>
            </li>
          </ul>
        </div>

        <div className="course-form-container">
          {/* Basic Info Tab */}
          {tab == "basic-info" && (
            <form>
              {/* course title / desc */}
              <div className="form-group">
                <label>
                  Course Title<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="course_title"
                  value={addCourse.course_title}
                  onChange={handleChange}
                  placeholder="Enter Course Title"
                  className="col12input"
                />
              </div>
              <div className="form-group">
                <label>Short Description</label>
                <textarea
                  type="text"
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
                  <label>
                    Course Category<span className="required">*</span>
                  </label>
                  <select className="col12input" name="course_cate" value={addCourse.course_cate} onChange={handleChange}>
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
                  <label>Course Level</label>
                  <select className="col12input" name="course_level" value={addCourse.course_level} onChange={handleChange}>
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label>
                    Course Language<span className="required">*</span>
                  </label>
                  <select className="col12input" name="course_language" value={addCourse.course_language} onChange={handleChange}>
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
                    <label>
                      Course Price<span className="required">*</span>
                    </label>
                    <input type="number" placeholder="0" className="col12input" name="course_price" onChange={handleChange} value={addCourse.course_price} />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Course Discount %</label>
                    <input type="text" placeholder="0" className="col12input" name="course_discount" onChange={handleChange} value={addCourse.course_discount} />
                  </div>
                </div>

                {/* status / publish date */}
                <div className="flex-row flex-row40">
                  <div className="form-group mb-0" style={{ width: addCourse.course_status === "upcoming" ? "48%" : "96%" }}
                  >
                    <label>Status</label>
                    <select className="col12input" name="course_status" value={addCourse.course_status} onChange={handleChange}>
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="private">Private</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  {
                    addCourse.course_status == "upcoming" && (
                      <div className="form-group mb-0" style={{ width: "48%" }}>
                        <label>Publish Date</label>
                        <input
                          type="date"
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
                  <input type="checkbox" name="is_tax" checked={addCourse.is_tax} onClick={handleTax} onChange={handleChange} />
                  <label>Tax</label>
                </div>
                {
                  isTax && (
                    <>
                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label>
                          Tax Name<span className="required">*</span>
                        </label>
                        <input type="text" placeholder="Tax Name" className="col12input" name="tax_name" onChange={handleChange} value={addCourse.tax_name} />
                      </div>

                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label>
                          Tax Rate
                          <label>
                            <span className="required">*</span>
                          </label>
                        </label>
                        <input type="text" placeholder="Tax Rate" className="col12input" name="tax_rate" onChange={handleChange} value={addCourse.tax_rate} />
                      </div>

                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label>
                          Type <span className="required">*</span>
                        </label>
                        <select className="col12input" value={addCourse.tax_type} name="tax_type" onChange={handleChange}>
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
                    <input type="checkbox" name="is_life_time" checked={addCourse.is_life_time} onChange={handleChange} />
                    <label>Life Time</label>
                  </div>
                  <div className="chekbox2">
                    <input type="checkbox" name="is_limited" onClick={handleLimited} checked={addCourse.is_limited} onChange={handleChange} />
                    <label>Limited Time</label>
                  </div>
                  {
                    isLimited && (
                      <div className="form-group mb-0" style={{ width: "32%" }}>
                        <label>
                          Limited Time <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="No Of Month" className="col12input" name="no_of_month" onChange={handleChange} value={addCourse.no_of_month} />
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
                    <label>
                      Course Thumbnail <span className="required">*</span>
                    </label>
                    <input type="text" placeholder="" className="col12input" value={addCourse.course_thumbnail}
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
                        <img src={URL.createObjectURL(newImage)} style={{ width: "70px", height: "auto" }} alt="Selected Thumbnail" />
                      </div>
                    ) : (
                      <div>
                        <img src={imageSrc} style={{ width: "90px", height: "auto" }} alt="Selected Thumbnail" />
                      </div>
                    )
                  }
                </div>
              </div>

              {/* course overview link */}
              <div style={{ display: "flex" }}>
                <div className="flex-row flex-row40" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "90%" }}>
                    <label>Course OverView Link</label>
                    <input
                      type="text"
                      name="course_overview_link"
                      onChange={handleChange}
                      value={addCourse.course_overview_link}
                      placeholder="Enter Course Overview Link"
                      className="col12input"
                    />
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <div className="chekbox2">
                        <input type="checkbox" name="drip_content" checked={addCourse.drip_content || false} onChange={handleChange} />
                        <label>Drip Content</label>
                      </div>
                      <div className="chekbox2">
                        <input type="checkbox" name="featured_course" checked={addCourse.featured_course || false} onChange={handleChange} />
                        <label>Featured Course</label>
                      </div>
                      <div className="chekbox2">
                        <input type="checkbox" name="is_top_course" checked={addCourse.is_top_course || false} onChange={handleChange} />
                        <label>Top Course</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-row flex-row40" style={{ border: "none" }}>
                  <div className="form-group mb-0" style={{ width: "90%" }}>
                    <label>Author</label>
                    <input
                      type="text"
                      name="author"
                      placeholder="Enter One Or More Author"
                      className="col12input"
                      onKeyDown={handleAddAuther}
                    />
                    <div className="tag-container">
                      {addCourse.author.map((keyword, index) => (
                        <div className="tag" key={index}>
                          <span>{keyword}</span>
                          <span
                            className="tag-close"
                            onClick={() => handleRemoveAuther(index)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </span>
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
              <label htmlFor="courseDescription" className="description-label">
                Long Description
              </label>
              <textarea
                className="description-textarea col12input"
                placeholder="Enter Course Title"
                name="long_desc"
                onChange={handleChange}
                value={addCourse.long_desc}
              />
            </div>
          )}

          {/* Additional INFO TAB */}
          {tab == "additional" && (
            <div className="faq-section">
              <div className="section">
                <label htmlFor="courseDescription" className="description-label">
                  FAQS
                </label>
                {addCourse.course_faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    {/* FAQ Question with Button on the Right */}
                    <div className="input-button">
                      <input
                        type="text"
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
                <label htmlFor="courseDescription" className="description-label">
                  What You Will Learn ?
                </label>
                {
                  addCourse.course_topics.map((point, index) => (
                    <div key={index} className="learning-item">
                      <input
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
                <label htmlFor="courseDescription" className="description-label">
                  Prerequisites
                </label>
                {addCourse.course_requirenment.map((point, index) => (
                  <div key={index} className="learning-item">
                    <input
                      type="text"
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
                <label>Meta Title</label>
                <input
                  type="text"
                  name="title_tag"
                  onChange={handleChange}
                  value={addCourse.title_tag}
                  className="col12input"
                  placeholder="Enter Topics detail what you will learn"
                />
              </div>

              <div className="form-group">
                <label>Canonical URL</label>
                <input
                  type="text"
                  name="canonical_url"
                  onChange={handleChange}
                  value={addCourse.canonical_url}
                  className="col12input"
                  placeholder="Enter Topics detail what you will learn"
                />
              </div>

              <div className="form-group">
                <label>Meta Keywords</label>
                <input
                  type="text"
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
                <label>Meta Tags</label>
                <input
                  type="text"
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
                  <label>Meta Description</label>
                  <textarea
                    placeholder="Describe Your Meta Description over Here"
                    className="col12input"
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
