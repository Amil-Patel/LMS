import React, { useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/course/addcourse.css";
import "../../../assets/css/main.css";
import { Form, NavLink } from "react-router-dom";

const AddCourse = () => {
  const [tab, setTab] = useState("basic-info");
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [learningPoints, setLearningPoints] = useState([""]);
  const [prerequisites, setPrerequisites] = useState([""]);
  const [keywords, setKeywords] = useState(["Keyword-1 India"]);
  const [tags, setTags] = useState(["Tag-1 India"]);
  const [authors, setAuthors] = useState(["Author One"]);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleChangeTab = (tabName) => {
    setTab(tabName);
  };

  const handleFaqChange = (index, event) => {
    const values = [...faqs];
    values[index][event.target.name] = event.target.value;
    setFaqs(values);
  };

  const handleLearningChange = (index, event) => {
    const values = [...learningPoints];
    values[index] = event.target.value;
    setLearningPoints(values);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    const values = [...faqs];
    values.splice(index, 1);
    setFaqs(values);
  };

  const handleAddLearning = () => {
    setLearningPoints([...learningPoints, ""]);
  };

  const handleRemoveLearning = (index) => {
    const values = [...learningPoints];
    values.splice(index, 1);
    setLearningPoints(values);
  };

  const handlePrerequisiteChange = (index, event) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites[index] = event.target.value;
    setPrerequisites(newPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, ""]);
  };

  const handleRemovePrerequisite = (index) => {
    const newPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(newPrerequisites);
  };

  const handleAddKeywords = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newKeywords = e.target.value.split(",").map((kw) => kw.trim());
      setKeywords([...keywords, ...newKeywords]);
      e.target.value = "";
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const handleAddTags = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newTags = e.target.value.split(",").map((tag) => tag.trim());
      setTags([...tags, ...newTags]);
      e.target.value = "";
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
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
          <a className="save-button" style={{ cursor: "pointer" }}>
            <span className="text">Save</span>
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
                  placeholder="Enter Course Title"
                  className="col12input"
                />
              </div>
              <div className="form-group">
                <label>Short Description</label>
                <textarea
                  type="text"
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
                  <select className="col12input">
                    <option value="">Select Category</option>
                  </select>
                </div>

                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label>Course Level</label>
                  <select className="col12input">
                    <option value="">Select Level</option>
                  </select>
                </div>

                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label>
                    Course Language<span className="required">*</span>
                  </label>
                  <select className="col12input">
                    <option value="">English</option>
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
                    <input type="text" placeholder="0" className="col12input" />
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Course Discount %</label>
                    <input type="text" placeholder="0" className="col12input" />
                  </div>
                </div>

                {/* status / publish date */}
                <div className="flex-row flex-row40">
                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Status</label>
                    <select className="col12input">
                      <option value="upcoming">Upcoming</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  <div className="form-group mb-0" style={{ width: "48%" }}>
                    <label>Course Level</label>
                    <input
                      type="date"
                      placeholder="Enter Course Title"
                      className="col12input"
                    />
                  </div>
                </div>
              </div>

              {/* tax / taxt name / rate / type */}
              <div
                className="flex-row flex-row80"
                style={{ width: "85%", gap: "20px" }}
              >
                <div className="chekbox">
                  <input type="checkbox" />
                  <label>Tax</label>
                </div>
                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label>
                    Tax Name<span className="required">*</span>
                  </label>
                  <input type="text" placeholder="GST" className="col12input" />
                </div>

                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label>
                    Tax Rate
                    <label>
                      <span className="required">*</span>
                    </label>
                  </label>
                  <input type="text" placeholder="5%" className="col12input" />
                </div>

                <div className="form-group mb-0" style={{ width: "32%" }}>
                  <label>
                    Type <span className="required">*</span>
                  </label>
                  <select className="col12input">
                    <option value="">Type</option>
                  </select>
                </div>
              </div>

              {/* life time / limited time / expire time */}
              <div style={{ display: "flex" }}>
                <div className="flex-row" style={{ width: "43%" }}>
                  <div className="chekbox2">
                    <input type="checkbox" />
                    <label>Life Time</label>
                  </div>
                  <div className="chekbox2">
                    <input type="checkbox" />
                    <label>Limited Time</label>
                  </div>
                  <div className="form-group mb-0" style={{ width: "32%" }}>
                    <label>
                      Expire Time <span className="required">*</span>
                    </label>
                    <input type="text" placeholder="2" className="col12input" />
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
                  }}
                >
                  <div className="form-group mb-0" style={{ width: "50%" }}>
                    <label>
                      Course Thumbnail <span className="required">*</span>
                    </label>
                    <input type="text" placeholder="" className="col12input" />
                  </div>

                  <button className="primary-btn module-btn">Browser</button>

                  <div>
                    <img
                      src="https://via.placeholder.com/150"
                      style={{ width: "45%" }}
                    />
                  </div>
                </div>
              </div>

              {/* course overview link */}
              <div style={{ display: "flex" }}>
                <div className="flex-row flex-row40" style={{border:"none"}}>
                  <div className="form-group mb-0" style={{ width: "90%" }}>
                    <label>Course OverView Link</label>
                    <input
                      type="text"
                      placeholder="Enter Course Title"
                      className="col12input"
                    />
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <div className="chekbox2">
                        <input type="checkbox" />
                        <label>Drip Content</label>
                      </div>
                      <div className="chekbox2">
                        <input type="checkbox" />
                        <label>Featured Course</label>
                      </div>
                      <div className="chekbox2">
                        <input type="checkbox" />
                        <label>Top Course</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-row flex-row40" style={{border:"none"}}>
                  <div className="form-group mb-0" style={{ width: "90%" }}>
                    <label>Author</label>
                    <input
                      type="text"
                      placeholder="Enter Author"
                      className="col12input"
                      onKeyDown={handleAddKeywords}
                    />
                    <div className="tag-container">
                      {authors.map((keyword, index) => (
                        <div className="tag" key={index}>
                          {authors}
                          <span
                            className="tag-close"
                            onClick={() => handleRemoveKeyword(index)}
                          >
                            X
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
              />
            </div>
          )}

          {/* Additional INFO TAB */}
          {tab == "additional" && (
            <div className="faq-section">
              <div className="section">
                <h5>FAQS</h5>
                {faqs.map((faq, index) => (
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
                        className={`faq-button ${
                          index === faqs.length - 1 ? "add" : "remove"
                        }`}
                        onClick={
                          index === faqs.length - 1
                            ? handleAddFaq
                            : () => handleRemoveFaq(index)
                        }
                      >
                        {index === faqs.length - 1 ? "+" : "-"}
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
                <h5>What You Will Learn ?</h5>
                {learningPoints.map((point, index) => (
                  <div key={index} className="learning-item">
                    <input
                      type="text"
                      value={point}
                      onChange={(event) => handleLearningChange(index, event)}
                      placeholder="Enter Topics detail what you will learn"
                      className="col12input input-space"
                    />
                    <button
                      className={`faq-button ${
                        index === learningPoints.length - 1 ? "add" : "remove"
                      }`}
                      onClick={
                        index === learningPoints.length - 1
                          ? handleAddLearning
                          : () => handleRemoveLearning(index)
                      }
                    >
                      {index === learningPoints.length - 1 ? "+" : "-"}
                    </button>
                  </div>
                ))}
              </div>

              <div className="section">
                <h5>Prerequisites</h5>
                {prerequisites.map((point, index) => (
                  <div key={index} className="learning-item">
                    <input
                      type="text"
                      value={point}
                      onChange={(event) =>
                        handlePrerequisiteChange(index, event)
                      }
                      placeholder="Enter Topics detail what you will learn"
                      className="col12input input-space"
                    />
                    <button
                      className={`faq-button ${
                        index === prerequisites.length - 1 ? "add" : "remove"
                      }`}
                      onClick={
                        index === prerequisites.length - 1
                          ? handleAddPrerequisite
                          : () => handleRemovePrerequisite(index)
                      }
                    >
                      {index === prerequisites.length - 1 ? "+" : "-"}
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
                  className="col12input"
                  placeholder="Enter Topics detail what you will learn"
                />
              </div>

              <div className="form-group">
                <label>Canonical URL</label>
                <input
                  type="text"
                  className="col12input"
                  placeholder="Enter Topics detail what you will learn"
                />
              </div>

              <div className="form-group">
                <label>Meta Keywords</label>
                <input
                  type="text"
                  className="col12input"
                  placeholder="Enter Your Keywords here, separated by commas"
                  onKeyDown={handleAddKeywords}
                />
                <div className="tag-container">
                  {keywords.map((keyword, index) => (
                    <div className="tag" key={index}>
                      {keyword}
                      <span
                        className="tag-close"
                        onClick={() => handleRemoveKeyword(index)}
                      >
                        X
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Meta Tags</label>
                <input
                  type="text"
                  className="col12input"
                  placeholder="Enter Your Tags here, separated by commas"
                  onKeyDown={handleAddTags}
                />
                <div className="tag-container">
                  {tags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag}
                      <span
                        className="tag-close"
                        onClick={() => handleRemoveTag(index)}
                      >
                        X
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
      </div>
    </>
  );
};

export default AddCourse;
