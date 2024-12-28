import React, { useEffect, useState } from "react";
import "../../../assets/css/client/view-course.css";
import Navbar from "../layout/Navbar";
import Breadcrumb from "./Breadcrumb";
import Footer from "../layout/Footer";
import { useCart } from "../layout/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const port = process.env.REACT_APP_URL;
const ViewCourse = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const navigate = useNavigate();
  //get lesson data
  const [lessonData, setLessonData] = useState([]);
  const getLessonData = async (id) => {
    setLessonLoading(true)
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithSectionId/${id}`);
      const lessonquizdata = res.data
      // const filterOrderData = lessonquizdata.filter((item) => item.order !== 0);
      const sortedData = lessonquizdata.sort((a, b) => a.order - b.order);
      setLessonData(sortedData);
      setLessonLoading(false)
    } catch (error) {
      console.log(error);
      setLessonLoading(false)
    }
  }
  // Function to toggle visibility of content
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const toggleContent = (index, id) => {
    console.log("object")
    setActiveModuleIndex((prevIndex) => (prevIndex === index ? null : index));
    getLessonData(id);
  };
  const [activeFaqsIndex, setActiveFaqsIndex] = useState(0);
  const toggleFaqsContent = (index) => {
    setActiveFaqsIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  //get course category
  const [courseCategory, setCourseCategory] = useState([]);
  const getCourseCategory = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${port}/gettingCoureseCategoryWithId/${courseData.course_cate}`);
      const data = await response.data;
      setCourseCategory(data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching course category:", error);
      setLoading(false)
    }
  }

  //get course data
  const [courseData, setCourseData] = useState([]);
  const getViewCourseData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${port}/gettingCourseMasterDataWithId/${id}`);
      const data = await response.data;
      setCourseData(data);
      // setup for auther
      let auther = response.data.auther;
      try {
        auther = JSON.parse(auther);
        if (typeof auther === 'string') {
          auther = JSON.parse(auther);
        }
      } catch (e) {
        auther = [];
      }
      response.data.auther = Array.isArray(auther) ? auther : [];
      //WHAT YOU WILL LEARN
      let what_you_will_learn = response.data.course_topics;
      try {
        what_you_will_learn = JSON.parse(what_you_will_learn);
        if (typeof what_you_will_learn === 'string') {
          what_you_will_learn = JSON.parse(what_you_will_learn);
        }
      } catch (e) {
        what_you_will_learn = [];
      }
      response.data.course_topics = Array.isArray(what_you_will_learn) ? what_you_will_learn : [];
      //course requirements
      let course_requirements = response.data.course_requirenment;
      try {
        course_requirements = JSON.parse(course_requirements);
        if (typeof course_requirements === 'string') {
          course_requirements = JSON.parse(course_requirements);
        }
      } catch (e) {
        course_requirements = [];
      }
      response.data.course_requirenment = Array.isArray(course_requirements) ? course_requirements : [];
      //course faqs
      let course_faqs = response.data.course_faqs;
      try {
        course_faqs = JSON.parse(course_faqs);
        if (typeof course_faqs === 'string') {
          course_faqs = JSON.parse(course_faqs);
        }
      } catch (e) {
        course_faqs = [];
      }
      response.data.course_faqs = Array.isArray(course_faqs) ? course_faqs : [];
      setLoading(false)
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false)
    }
  }

  const isInCart = cart.some((item) => item.id === courseData.id);
  //get module data
  const [moduleData, setModuleData] = useState([]);
  const getModuleData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`${port}/gettingCourseSectionData/${id}`);
      const sectionData = response.data;
      const sortedData = sectionData.sort((a, b) => a.order - b.order);
      setModuleData(sortedData);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching module data:", error);
      setLoading(false)
    }
  }

  //buy course
  const handleBuy = (data) => {
    addToCart(data);
    navigate(`/shopping-cart`);
  }
  useEffect(() => {
    getViewCourseData();
  }, []);
  useEffect(() => {
    getCourseCategory();
    getModuleData();
  }, [courseData]);
  return (
    <>
      <Navbar />
      <Breadcrumb />
      {loading ? (
        <div className="client_loading_container">
          <div className="client_loader"></div>
        </div>
      ) : (
        <div className="client_section">
          <div className="main-section p-4 sm:p-8 md:p-12 lg:p-16 gap-4 sm:gap-8 md:gap-12 lg:gap-20 2xl:flex xl:flex lg:flex block">
            <div className="header-content 2xl:w-8/12 xl:w-8/12 lg:w-8/12 w-full">
              <div className="mini-title px-2 py-1 text-xs rounded inline-block mb-4">
                {courseCategory?.cate_title}
              </div>
              <h2 className="font-bold mb-2">
                {courseData?.course_title}
              </h2>
              <p className="course-description">
                {courseData?.short_desc}
              </p>
              <div className="rating-author">
                <span className="courses-reviews">
                  4.5
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <span className="customer-review-number"> (3,902) </span>
                </span>
                {Array.isArray(courseData.auther) && courseData.auther.map((keyword, index) => (
                  <p className="author-name mt-2" key={index}>By {keyword}</p>
                ))}
              </div>
              <div className="course-icon-section">
                <span>
                  <i className="fa-solid fa-copy"></i> 20 Lessons
                </span>
                <span>
                  <i className="fa-solid fa-clock"></i> 12.30 Hours
                </span>
                <span>
                  <i className="fa-solid fa-graduation-cap"></i> 156 Students
                </span>
                <span>
                  <i className="fa-solid fa-signal"></i> {courseData?.course_level}
                </span>
                <span>
                  <i className="fa-solid fa-graduation-cap"></i> {courseData?.course_language}
                </span>
              </div>
              <div className="course-icon-section mt-2">
                <span className="w-max">
                  <i className="fa-solid fa-clock"></i> Last Update: 11/2024
                </span>
              </div>

              {/* Tab Bar */}
              <div className="tabs flex flex-wrap gap-2 justify-start md:justify-start">
                <button
                  className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
                  Overview
                </button>
                <button className={activeTab === "curriculum" ? "active" : ""} onClick={() => setActiveTab("curriculum")}>
                  Curriculum
                </button>
                <button className={activeTab === "faqs" ? "active" : ""} onClick={() => setActiveTab("faqs")} >
                  FAQs
                </button>
                <button
                  className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")} >
                  Reviews
                </button>
              </div>
              {activeTab === "overview" && (
                <>
                  <div className="long-desc">
                    <p>
                      {courseData?.long_desc}
                    </p>
                  </div>
                  <div className="learning-list">
                    <h2 className="font-bold mb-4">What You'll Learn</h2>
                    <ul>
                      {Array.isArray(courseData.course_topics) && courseData.course_topics.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="prerequisites">
                    <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
                    <ul className="list-disc pl-4 md:pl-6 space-y-2">
                      {Array.isArray(courseData.course_requirenment) && courseData.course_requirenment.map((keyword, index) => (
                        <li className="pl-4 md:pl-0" key={index}>
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              {activeTab === "curriculum" && (
                <>
                  {moduleData.length > 0 ? (
                    moduleData.map((module, index) => (
                      <div className="module" key={index}>
                        <div
                          className="module-header"
                          onClick={() => toggleContent(index, module.id)}
                        >
                          <span className="module-title">
                            MODULE-{index + 1} : {module.title}
                          </span>
                          <div className="module-controls">
                            <span className="check-btn">
                              <i
                                className={`fa-solid ${activeModuleIndex === index
                                  ? "fa-angle-up"
                                  : "fa-angle-down"
                                  }`}
                              ></i>
                            </span>
                          </div>
                        </div>
                        {activeModuleIndex === index && (
                          <>
                            <div className="module-content min-h-10">
                              {lessonLoading ? (
                                <div className="lesson_loader" style={{ top: "-2px" }}></div>
                              ) : (
                                lessonData.length > 0 ? (
                                  lessonData.map((lesson, index) => (
                                    <div className="module-lesson flex flex-wrap gap-2 p-3" key={index}>
                                      {/* Lesson Icon and Title */}
                                      <div className="lesson-title flex items-center gap-1 w-full">
                                        {lesson.quiz_id ? (
                                          <span className="quiz-icon"><i className="fa-regular fa-circle-question"></i></span>
                                        ) : (
                                          <span className="lesson-icon">
                                            <i className="fa-regular fa-file-lines"></i>
                                          </span>
                                        )}

                                        {/* <span className="font-medium">
                                      Video: Course Intro
                                    </span> */}
                                        <span className="font-medium">
                                          {
                                            lesson.quiz_id != null ? (
                                              lesson.course_quize_lesson.title
                                            ) : (
                                              lesson.title
                                            )
                                          }
                                        </span>
                                      </div>

                                      {/* Preview Button and Lesson Time */}
                                      <div className="lesson-actions-time flex justify-between items-center w-full sm:w-auto">
                                        <div className="lesson-time text-gray-500">
                                          {lesson.duration && <span>{lesson.duration} Minutes</span>}
                                        </div>
                                        <button className="resource-btn text-sm ml-3">
                                          <i className="fa-solid fa-eye mr-2"></i> Preview
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <h6 className="p-3">No data available 😂</h6> // Display this if lessonData is empty
                                ))}

                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    "No modules found"
                  )}
                </>
              )}
              {activeTab === "faqs" && (
                <>
                  <div className="faqs-header">
                    {Array.isArray(courseData.course_faqs) && courseData.course_faqs.map((keyword, index) => (
                      <div className="module">
                        <div
                          className="module-header"
                          onClick={() => toggleFaqsContent(index)}
                        >
                          <span
                            className={`module-title ${activeFaqsIndex === index
                              ? "text-blue-500"
                              : "text-black-700"
                              }`}
                          >
                            {keyword.question}
                          </span>
                          <div className="module-controls">
                            <button className="check-btn">
                              <i
                                className={`fa-solid ${activeFaqsIndex === index
                                  ? "fa-angle-up"
                                  : "fa-angle-down"
                                  }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        {activeFaqsIndex === index && (
                          <>
                            <p>
                              {keyword.answer}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === "reviews" && (
                <div className="reviews-section">
                  <div className="average-rating">
                    <div>
                      <h2>4.0 </h2>
                    </div>
                    <div>
                      <div className="review-rating">
                        {[...Array(4)].map((_, i) => (
                          <i className="fa-solid fa-star" key={i}></i>
                        ))}
                        <i className="fa-regular fa-star"></i> {/* Half star */}
                      </div>
                      <p>based on 146,951 ratings</p>
                    </div>
                  </div>
                  <div className="review-list">
                    {Array(2)
                      .fill()
                      .map((_, index) => (
                        <div className="review-item" key={index}>
                          <div className="reviewer-info">
                            <img
                              src="https://via.placeholder.com/50"
                              alt="Reviewer"
                            />
                            <div>
                              <h4>David W.</h4>
                              <div className="flex items-center gap-2.5 pt-1">
                                <div className="review-rating">
                                  {[...Array(4)].map((_, i) => (
                                    <i className="fa-solid fa-star" key={i}></i>
                                  ))}
                                  <i className="fa-regular fa-star"></i>{" "}
                                  {/* Half star */}
                                </div>
                                <div className="review-date">
                                  <span>2 weeks ago</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="review-text">
                            I love the way the instructor goes about the course. So easy to follow, even though a little bit
                            challenging as expected.
                          </p>
                        </div>
                      ))}
                  </div>

                  <div className="container mx-auto px-4 mt-5">
                    <nav
                      className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
                      aria-label="Pagination"
                    >
                      <a
                        className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 text-black hover:border-gray-300"
                        href="#"
                        title="Previous Page"
                      >
                        <span className="sr-only">Previous Page</span>
                        <svg
                          className="block w-4 h-4 fill-current"
                          viewBox="0 0 256 512"
                          aria-hidden="true"
                          role="presentation"
                        >
                          <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
                        </svg>
                      </a>
                      <a
                        className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                        href="#"
                        title="Page 1"
                      >
                        1
                      </a>
                      <a
                        className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                        href="#"
                        title="Page 2"
                      >
                        2
                      </a>
                      <a
                        className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black bg-black text-white"
                        href="#"
                        aria-current="page"
                        title="Page 3"
                      >
                        3
                      </a>
                      <a
                        className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                        href="#"
                        title="Next Page"
                      >
                        <span className="sr-only">Next Page</span>
                        <svg
                          className="block w-4 h-4 fill-current"
                          viewBox="0 0 256 512"
                          aria-hidden="true"
                          role="presentation"
                        >
                          <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              )}
            </div>

            <div className="course-image 2xl:w-4/12 xl:w-4/12 lg:w-4/12 w-full">
              <img
                className="w-full mb-6"
                src={`../upload/${courseData.course_thumbnail}`}
                alt="Course Thumbnail"
              />
              <div className="price mb-8">
                <h3>
                  ${courseData.course_price - (courseData.course_price * courseData.course_discount) / 100} <span className="discount line-through">${courseData.course_price}</span>
                  <span className="discount-badge">{courseData.course_discount}% Off</span>
                </h3>
                <div className="cart-buttons">
                  <button className={`btn-add ${isInCart ? 'disabled' : ''}`} onClick={() => addToCart(courseData)}
                    disabled={isInCart}>{isInCart ? 'Added to Cart' : 'Add to Cart'}</button>
                  <button className="btn-buy" onClick={() => handleBuy(courseData)}>Buy Now</button>
                </div>
              </div>
              <div className="course-list">
                <p>This Course includes:</p>
                <ul>
                  <li>
                    <i className="fa-regular fa-circle-play"></i>54.5 hours on-demand
                    video
                  </li>
                  <li>
                    <i className="fa-regular fa-file"></i>3 articles
                  </li>
                  <li>
                    <i className="fa-solid fa-file-arrow-down"></i>249
                    downloadable resources
                  </li>
                  <li>
                    <i className="fa-solid fa-mobile-screen-button"></i>Access on
                    mobile and TV
                  </li>
                  <li>
                    <i className="fa-solid fa-infinity"></i>Full lifetime access
                  </li>
                  <li>
                    <i className="fa-solid fa-trophy"></i>Certificate of
                    completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ViewCourse;
