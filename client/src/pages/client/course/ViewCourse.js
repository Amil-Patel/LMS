import React, { useContext, useEffect, useState } from "react";
import "../../../assets/css/client/view-course.css";
import Navbar from "../layout/Navbar";
import Breadcrumb from "./Breadcrumb";
import Footer from "../layout/Footer";
import { useCart } from "../layout/CartContext";
import { userRolesContext } from "../../admin/layout/RoleContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const port = process.env.REACT_APP_URL;

const ViewCourse = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { id } = useParams();
  const { setting } = useContext(userRolesContext);
  const { cart, addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const navigate = useNavigate();
  //get lesson data
  const [lessonData, setLessonData] = useState([]);
  const getLessonData = async (id) => {
    setLessonLoading(true)
    try {
      const res = await axiosInstance.get(${port}/gettingCourseLessonDataWithSectionId/${id});
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

  //get lesson with courseId
  const [allLessonData, setAllLessonData] = useState([]);
  const getAllLessonData = async () => {
    try {
      const res = await axiosInstance.get(${port}/gettingCourseLessonDataWithCourseId/${id});
      const lessonquizdata = res.data
      // const filterOrderData = lessonquizdata.filter((item) => item.order !== 0);
      const sortedData = lessonquizdata.sort((a, b) => a.order - b.order);
      setAllLessonData(sortedData);
      const totalDuration = sortedData
        .filter((item) => item.is_count_time === 1)
        .reduce((sum, item) => sum + item.duration, 0);
      const totalHours = (totalDuration / 60).toFixed(2); // Convert to hours and round to 1 decimal place
      setTotalTime(totalHours);
    } catch (error) {
      console.log(error);
    }
  }

  //get total enroll student
  const [totalEnroll, setTotalEnroll] = useState(0);
  const getTotalEnroll = async () => {
    try {
      const response = await axiosInstance.get(${port}/gettingEnrollWithCourseId/${id});
      const data = await response.data;
      setTotalEnroll(data.length);
    } catch (error) {
      console.error("Error fetching total enroll:", error);
    }
  }
  // Function to toggle visibility of content
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const toggleContent = (index, id) => {
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
      const response = await axiosInstance.get(${port}/gettingCoureseCategoryWithId/${courseData.course_cate});
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
      const response = await axiosInstance.get(${port}/gettingCourseMasterDataWithId/${id});
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
      const response = await axiosInstance.get(${port}/gettingCourseSectionData/${id});
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
    navigate(/shopping-cart);
  }
  useEffect(() => {
    getViewCourseData();
    getAllLessonData();
    getTotalEnroll();
    getReviewData();
  }, []);
  useEffect(() => {
    getCourseCategory();
    getModuleData();
  }, [courseData]);


  //review
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const getReviewData = async () => {
    axiosInstance
      .get(${port}/gettingReviewWithCourseId/${id})
      .then((response) => {
        setReviews(response.data);
        const total = response.data.length;
        const sum = response.data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating = total > 0 ? sum / total : 0;

        setAverageRating(avgRating); // Store avgRating as a number
        setTotalRatings(total);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };
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
          <div className="main-section p-4 sm:p-8 md:p-12 lg:p-16 lg:gap-16 2xl:flex xl:flex lg:flex block">
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
                <p className="author-name mt-2">
                  By {courseData?.auther?.map((author, index) => ${author}).join(', ')}
                </p>
              </div>
              <div className="course-icon-section">
                <span>
                  <i className="fa-solid fa-copy"></i> {allLessonData?.length} Lessons
                </span>
                <span>
                  <i className="fa-solid fa-clock"></i> {totalTime ? totalTime : 0} Hours
                </span>
                <span>
                  <i className="fa-solid fa-signal"></i> {courseData?.course_level}
                </span>
                <span>
                  <i className="fa-solid fa-graduation-cap"></i> {courseData?.course_language}
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
                    <p dangerouslySetInnerHTML={{
                      __html: courseData?.long_desc,
                    }}>
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
                    moduleData.map((module, index) => {
                      const lessonTime = (module.course_section_lesson || []).reduce((lessonTotal, item) => {
                        if (item.is_count_time === 1) {
                          return lessonTotal + (item.duration || 0);
                        }
                        return lessonTotal;
                      }, 0);

                      const quizeTime = (module.course_section_quize || []).reduce((quizeTotal, item) => {
                        if (item.is_count_time === 1) {
                          return quizeTotal + (item.quize_duration || 0);
                        }
                        return quizeTotal;
                      }, 0);
                      const totalSeconds = module.time;
                      const hours = Math.floor(totalSeconds / 3600);
                      const minutes = Math.floor((totalSeconds % 3600) / 60);
                      const seconds = totalSeconds % 60;
                      const formattedTime = ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')};
                      return (
                        <div className="module" key={index}>
                          <div
                            className="module-header"
                            onClick={() => toggleContent(index, module.id)}
                          >
                            <span className="module-title">
                              MODULE-{index + 1} : {module.title}
                            </span>
                            <div className="module-controls">
                              {totalSeconds && totalSeconds !== 0 ? (
                                <span className="module-duration">{formattedTime}</span>
                              ) : null}
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
                                            {
                                              lesson.quiz_id != null ? (
                                                <span>{lesson.course_quize_lesson.quize_duration} Minutes</span>
                                              ) : (
                                                <span>{lesson.duration} Minutes</span>
                                              )
                                            }
                                          </div>
                                          {/* <button className="resource-btn text-sm ml-3">
                                            <i className="fa-solid fa-eye mr-2"></i> Preview
                                          </button> */}
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
                      )
                    })
                  ) : (
                    "No modules found"
                  )}
                </>
              )}
              {activeTab === "faqs" && (
                <>
                  {
                    courseData.course_faqs.length > 0 ? (
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
                    ) : (
                      <h6>No data available</h6>
                    )
                  }
                </>
              )}
              {activeTab === "reviews" && (
                <div className="reviews-section">
                  <div className="average-rating">
                    <div>{<h2>{averageRating.toFixed(1)}</h2>}</div>
                    <div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            className={
                              i < averageRating
                                ? "fa-solid fa-star"
                                : "fa-regular fa-star"
                            }
                            key={i}
                          ></i>
                        ))}
                      </div>
                      <p>based on {totalRatings} ratings</p>
                    </div>
                  </div>

                  <div className="review-list">
                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div className="review-item" key={index}>
                          <div className="reviewer-info">
                            {review?.student?.profile ? (
                              <img
                                src={../upload/${review.student.profile}}
                                alt="Profile"
                              />
                            ) : (
                              <img
                                src={require("../../../assets/image/default-profile.png")}
                                alt="Profile"
                              />
                            )}
                            <div>
                              <h4>
                                {review.student.first_name}{" "}
                                {review.student.last_name}
                              </h4>
                              <div className="flex items-center gap-2.5 pt-1">
                                <div className="review-rating">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      className={
                                        i < review.rating
                                          ? "fa-solid fa-star"
                                          : "fa-regular fa-star"
                                      }
                                      key={i}
                                    ></i>
                                  ))}
                                </div>
                                {/* <div className="review-date">
                                  <span>{review.createdAt}</span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                          <p className="review-text">{review.review}</p>
                        </div>
                      ))
                    ) : (
                      <p>No reviews available.</p>
                    )}
                  </div>



                </div>
              )}
            </div>

            <div className="course-image 2xl:w-4/12 xl:w-4/12 lg:w-4/12 w-full">
              {courseData.course_thumbnail === null ? (
                <img
                  className="view-course-thumbnail w-full mb-6"
                  src={require("../../../assets/image/default-thumbnail.png")}
                  alt="course_thumbnail"
                />
              ) : (
                <img
                  className="view-course-thumbnail w-full mb-6"
                  src={../upload/${courseData.course_thumbnail}}
                  alt="Course Thumbnail"
                />
              )}
              <div className="price mb-8">
                <h3>
                  {setting.position == "left" ? setting.symbol : ""}
                  {courseData.course_price - (courseData.course_price * courseData.course_discount) / 100}
                  {setting.position == "right" ? setting.symbol : ""}
                  {courseData.course_discount ? (
                    <>
                      <span className="discount line-through">{setting.position == "left" ? setting.symbol : ""}
                        {courseData.course_price}{setting.position == "right" ? setting.symbol : ""}</span>
                      <span className="discount-badge">{courseData.course_discount}% Off</span>
                    </>
                  ) : ("")}
                </h3>
                <div className="cart-buttons">
                  <button className={btn-add ${isInCart ? 'disabled' : ''}} onClick={() => addToCart(courseData)}
                    disabled={isInCart}>{isInCart ? 'Added to Cart' : 'Add to Cart'}</button>
                  <button className="btn-buy" onClick={() => handleBuy(courseData)}>Buy Now</button>
                </div>
              </div>
              {/* <div className="course-list">
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
              </div> */}
            </div>
          </div>
        </div >
      )}
      <Footer />
    </>
  );
};

export default ViewCourse;
