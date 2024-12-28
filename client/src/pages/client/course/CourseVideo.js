import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../../assets/css/client/coursevideo.css";
import { RiMenuAddLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { userRolesContext } from "../../admin/layout/RoleContext";
const port = process.env.REACT_APP_URL;
// Load PDF worker
const CourseVideo = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams();
  const { stuUserId } = useContext(userRolesContext);
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const toggleContent = (index, id, type) => {
    setLessonLoading(true)
    setActiveModuleIndex((prevIndex) => (prevIndex === index ? null : index));
    if (type !== null) {
      getLessonData(id);
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //get course data
  const [courseData, setCourseData] = useState([]);
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const getCourseData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseMasterDataWithId/${id}`);
      setCourseData(res.data);
      setCourseThumbnail(res.data.course_thumbnail);
      //WHAT YOU WILL LEARN
      let what_you_will_learn = res.data.course_topics;
      try {
        what_you_will_learn = JSON.parse(what_you_will_learn);
        if (typeof what_you_will_learn === 'string') {
          what_you_will_learn = JSON.parse(what_you_will_learn);
        }
      } catch (e) {
        what_you_will_learn = [];
      }
      res.data.course_topics = Array.isArray(what_you_will_learn) ? what_you_will_learn : [];
      //course requirements
      let course_requirements = res.data.course_requirenment;
      try {
        course_requirements = JSON.parse(course_requirements);
        if (typeof course_requirements === 'string') {
          course_requirements = JSON.parse(course_requirements);
        }
      } catch (e) {
        course_requirements = [];
      }
      res.data.course_requirenment = Array.isArray(course_requirements) ? course_requirements : [];
      //course faqs
      let course_faqs = res.data.course_faqs;
      try {
        course_faqs = JSON.parse(course_faqs);
        if (typeof course_faqs === 'string') {
          course_faqs = JSON.parse(course_faqs);
        }
      } catch (e) {
        course_faqs = [];
      }
      res.data.course_faqs = Array.isArray(course_faqs) ? course_faqs : [];
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //get or add ace_progress data
  const [courseProgress, setCourseProgress] = useState([]);
  const getcourseProgressData = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingAcademicProgressDataWithCourseId/${courseData.id}/${stuUserId}`);
      setCourseProgress(res.data[0]);
      console.log(res.data[0])
      if (res.data.length === 0 && stuUserId) {
        addcourseProgressData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addcourseProgressData = async () => {
    const data = {
      student_id: stuUserId,
      course_id: courseData.id,
    }
    try {
      const res = await axiosInstance.post(`${port}/addingAcademicProgressData`, data);
      getcourseProgressData();
    } catch (error) {
      console.log(error);
    }
  };

  //get module data
  const [moduleData, setModuleData] = useState([]);
  const getModuleData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseSectionData/${id}`);
      const sectionData = res.data;
      const sortedData = sectionData.sort((a, b) => a.order - b.order);
      getLessonData(sortedData[0].id);
      setModuleData(sortedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //get lesson data
  const [lessonData, setLessonData] = useState([]);
  const getLessonData = async (id) => {
    setLessonLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithSectionId/${id}`);
      const lessonquizdata = res.data
      const sortedData = lessonquizdata.sort((a, b) => a.order - b.order); //sorted with sort order
      setLessonData(sortedData);
      setLessonLoading(false);
    } catch (error) {
      console.log(error);
      setLessonLoading(false);
    }
  }

  //get lesson and quiz with id for display
  const [editLessonData, setEditLessonData] = useState({
    title: "",
    duration: "",
    course_id: id,
    lesson_type: "",
    url: "",
    attachment: "",
    thumbnail_preview_image_url: null,
    text_content: "",
    is_preview: "",
    status: "",
    is_count_time: "",
    description: "",
  });
  const [editQuizData, setEditQuizData] = useState({
    title: "",
    section_id: "",
    course_id: id,
    quize_duration: "",
    expire_time: "",
    total_marks: "",
    passing__marks: "",
    no_of_q_retakes: "",
    total_showing_questions: "",
    random_questions: "",
    status: "",
    is_count_time: "",
    is_skipable: "",
    instruction: "",
  })
  const editLessonToggleModal = async (id, quizId, num) => {
    if (num === 1) {
      if (id) {
        await getLessonDataForEdit(id);
      }
      if (quizId !== null) {
        await getQuizeDataForEdit(quizId);
      }
    }
  }
  const getLessonDataForEdit = async (id) => {
    setEditQuizData({
      title: "",
      section_id: "",
      course_id: id,
      quize_duration: "",
      expire_time: "",
      total_marks: "",
      passing__marks: "",
      no_of_q_retakes: "",
      total_showing_questions: "",
      random_questions: "",
      status: "",
      is_count_time: "",
      is_skipable: "",
      instruction: "",
    });
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithId/${id}`);
      setEditLessonData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const getQuizeDataForEdit = async (id) => {
    setEditLessonData({
      title: "",
      duration: "",
      course_id: id,
      lesson_type: "",
      url: "",
      attachment: "",
      thumbnail_preview_image_url: null,
      text_content: "",
      is_preview: "",
      status: "",
      is_count_time: "",
      description: "",
    })
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseQuizeDataWithId/${id}`);
      const quizData = res.data;
      setEditQuizData(quizData);
      if (quizData.title) {
        await getQuizQuestionData(quizData.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [quizQuestionData, setQuizQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const getQuizQuestionData = async (id) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseQuizeQuestionData/${id}`);
      const quizeQuestiondata = res.data;
      const sortdata = quizeQuestiondata.sort((a, b) => a.order - b.order);
      console.log(sortdata)
      setQuizQuestionData(sortdata);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAnswerChange = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [quizQuestionData[currentQuestionIndex].id]: option, // Save answer for the current question
    }));
  };
  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    }
  };
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Move to the previous question
    }
  };
  const handleViewedLessonData = async () => {
    try {
      let parsData = [];
      try {
        if (courseProgress.completed_lesson_id === null) {
          parsData = [];
        } else {
          const parsedOuter = JSON.parse(courseProgress.completed_lesson_id);
          parsData = JSON.parse(parsedOuter);
          if (!Array.isArray(parsData)) {
            parsData = [];
          }
        }
      } catch (parseError) {
        console.log("Error parsing completed_lesson_id, initializing as an empty array.");
        parsData = [];
      }
      parsData.push(editLessonData.id);
      const data = {
        completed_lesson_id: JSON.stringify(parsData),
        current_watching_lesson: editLessonData.id,
      };
      const res = await axiosInstance.put(
        `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
        data
      );
      if (res.status === 200) {
        const currentLesson = lessonData.find((item) => item.id === editLessonData.id);
        const currentOrder = currentLesson.order;
        const nextLesson = lessonData.find((item) => item.order === currentOrder + 1);
        if (!nextLesson) {
          console.log("No next lesson found.");
        } else {
          if (nextLesson.id) {
            await getLessonDataForEdit(nextLesson.id);
          }

          if (nextLesson.quiz_id !== null) {
            await getQuizeDataForEdit(nextLesson.quiz_id);
          }
        }
      }
      getcourseProgressData();
    } catch (error) {
      console.error("Error in handleViewedLessonData:", error);
    }
  };
  const handleSubmitQuizAnswer = async () => {
    const userAnswersArray = [];
    const correctAnswersArray = [];

    quizQuestionData.forEach((question) => {
      userAnswersArray.push(answers[question.id] || null);
      correctAnswersArray.push(question.correct_answer);
    });
    const quizAnswerData = {
      quiz_id: editQuizData.id,
      student_id: stuUserId,
      course_id: id,
      user_answers: userAnswersArray,
      correct_answers: correctAnswersArray,
    };

    // new
    let parsData = [];
    try {
      if (courseProgress.completed_lesson_id === null) {
        parsData = [];
      } else {
        const parsedOuter = JSON.parse(courseProgress.completed_lesson_id);
        parsData = JSON.parse(parsedOuter);
        if (!Array.isArray(parsData)) {
          parsData = [];
        }
      }
    } catch (parseError) {
      console.log("Error parsing completed_lesson_id, initializing as an empty array.");
      parsData = [];
    }
    parsData.push(editQuizData.id);
    console.log(parsData)
    const data = {
      completed_lesson_id: JSON.stringify(parsData),
      current_watching_lesson: editQuizData.id,
    };
    // new

    try {
      const acaedres = await axiosInstance.put(
        `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
        data
      );
      const res = await axiosInstance.post(`${port}/addingQuizResultData`, quizAnswerData);
      if (res.status === 200) {
        const currentLesson = lessonData.find((item) => item.quiz_id === editQuizData.id);
        const currentOrder = currentLesson.order;
        const nextLesson = lessonData.find((item) => item.order === currentOrder + 1);
        if (!nextLesson) {
          console.log("No next lesson found.");
        } else {
          if (nextLesson.id) {
            await getLessonDataForEdit(nextLesson.id);
          }

          if (nextLesson.quiz_id !== null) {
            await getQuizeDataForEdit(nextLesson.quiz_id);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
    }
  };

  //get acedemic progress data


  useEffect(() => {
    getCourseData();
    getModuleData();
  }, []);
  useEffect(() => {
    getcourseProgressData()
  }, [courseData]);

  return (
    <>
      {loading ? (
        <div className="client_loading_container">
          <div className="client_loader"></div>
        </div>
      ) : (
        <>
          <div className="video-navbar flex justify-between items-center py-2 bg-[#F5F6FA] px-3">
            <div className="navbar-logo">
              <NavLink to="/">
                <img src={require("../../../assets/image/Logo.png")} alt="logo" />
              </NavLink>
            </div>

            <div className="course-title">
              <span className="text-base font-semibold">
                {courseData?.course_title}
              </span>
            </div>

            {/* 3-Dot Menu for Small Screens */}
            <div className="relative block xl:hidden border-[1px] border-black">
              <button
                className="text-xl p-1 flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <RiMenuAddLine />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-9 bg-white border rounded shadow-md p-3 w-60 z-10">
                  {/* Time Spent */}
                  <div className="mb-1.5 text-base">
                    <span className="font-semibold">Time Spent: </span>
                    <span className="text-gray-800 text-[14px]">05:30:05</span>
                  </div>

                  {/* Progress */}
                  <div className="text-base mb-1.5">
                    <span className="font-semibold">Your Progress: </span>
                    <span className="text-gray-800 text-[14px]">8 of 10 (80%)</span>
                  </div>

                  {/* Rating & Review */}
                  <div className="text-sm font-medium flex text-black mb-0.5 items-center">
                    <span className="text-[15px] font-semibold">Leave Your Review:&nbsp;</span>
                    <div className="flex justify-end text-orange-500 text-[12px]">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Full Content for Larger Screens */}
            <div className="hidden xl:flex items-center space-x-6">
              {/* Time Spent */}
              <div className="text-base">
                <span className="font-semibold">Time Spent: </span>
                <span className="text-gray-800 text-sm">05:30:05</span>
              </div>

              {/* Rating & Review */}
              <div className="text-sm font-medium text-black">
                <div className="flex justify-end text-orange-500 text-sm mb-0.5">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <span className="text-sm font-normal">Leave Your Review</span>
              </div>

              {/* Progress */}
              <div className="text-base">
                <span className="font-semibold">Your Progress: </span>
                <span className="text-gray-800 text-sm">8 of 10 (80%)</span>
              </div>
            </div>

            {/* Back Button */}
            <button className="back-btn">
              <NavLink to="/student/learning">
                <i className="fa-solid fa-angle-left mr-2"></i>
                <span>Back To Main</span>
              </NavLink>
            </button>

          </div>
          <div className="course-video-container">
            {/* Video Section */}
            <div className="video-player">
              <div className="thumbnail-container">
                {editLessonData?.title || editQuizData?.title ? (
                  <div className="edit-content">
                    {editLessonData?.title && (
                      <>
                        <h2 className="font-bold text-xl text-black mb-2">{editLessonData.title}
                          <span className="ml-4 px-3 text-sm py-1 rounded bg-slate-400 uppercase">{editLessonData.lesson_type}</span></h2>
                        {editLessonData.lesson_type === "youtube-video" && (
                          <iframe
                            width="100%"
                            height="500px"
                            src={`https://www.youtube.com/embed/${editLessonData.url.split("v=")[1]}`}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        )}
                        {editLessonData.lesson_type === "text" && (
                          <div className="long-desc mt-4">
                            <p>
                              {editLessonData.text_content || "No Text available"}
                            </p>
                          </div>
                        )}
                        {editLessonData.lesson_type === "pdf" && (
                          <div className="pdf-container">
                            {/* <iframe
                              src={`../../upload/${editLessonData.attachment}`}
                              width="100%"
                              height="500px"
                              title="PDF Viewer"
                              className="border rounded shadow"
                            ></iframe> */}
                            <p>show display</p>
                          </div>
                        )}
                        {editLessonData.lesson_type === "video" && (
                          <div className="pdf-container">
                            <video
                              controls
                              className="video-element"
                              poster={`../../upload/${editLessonData.thumbnail_preview_image_url}`}
                            >
                              <source src={`../../upload/${editLessonData.attachment}`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                        <div className="long-desc mt-4">
                          <p>
                            {editLessonData.description || "No description available"}
                          </p>
                        </div>
                        <p><strong>Duration:</strong> {editLessonData.duration || "N/A"}</p>
                        {/* <button type="button" className="primary-btn module-btn" onClick={handleViewedLessonData}>Next</button> */}
                        {!JSON.parse(courseProgress.completed_lesson_id).includes(editLessonData.id) && (
                          <button
                            type="button"
                            className="primary-btn module-btn"
                            onClick={handleViewedLessonData}
                          >
                            Next
                          </button>
                        )}
                      </>
                    )}
                    {editQuizData?.title && (
                      <>
                        <h2 className="font-bold text-xl text-black mb-2">{editQuizData.title}
                          <span className="ml-4 px-3 text-sm py-1 rounded bg-slate-400 uppercase">QUIZ</span>
                        </h2>
                        <p><strong>Instruction:</strong> {editQuizData.instruction || "No instructions available"}</p>
                        <p><strong>Total Marks:</strong> {editQuizData.total_marks || "N/A"}</p>
                        <p><strong>Passing Marks:</strong> {editQuizData.passing__marks || "N/A"}</p>
                      </>
                    )}
                    {editQuizData?.title && (
                      <div>
                        <h3 className="font-bold text-lg mt-4">{quizQuestionData[currentQuestionIndex]?.title}</h3>

                        {/* Render options if available */}
                        {quizQuestionData[currentQuestionIndex]?.options && (
                          <ul>
                            {JSON.parse(quizQuestionData[currentQuestionIndex].options).map((option, index) => (
                              option &&
                              <li key={index} className="mb-2">
                                <label>
                                  <input
                                    type="radio"
                                    name={`question-${quizQuestionData[currentQuestionIndex].id}`}
                                    value={option}
                                    checked={answers[quizQuestionData[currentQuestionIndex].id] === option}
                                    onChange={() => handleAnswerChange(option)}
                                    className="mr-2"
                                  />
                                  {option}
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Navigation buttons */}
                        <div className="mt-4">
                          {currentQuestionIndex !== 0 ? (
                            <button
                              onClick={prevQuestion}
                              className="px-4 py-2 bg-gray-400 rounded mr-2"
                            >
                              Previous
                            </button>
                          ) : (
                            <button
                              className="px-4 py-2 bg-gray-200 rounded mr-2"
                              disabled
                            >
                              Previous
                            </button>
                          )}
                          {currentQuestionIndex !== quizQuestionData.length - 1 ? (
                            <button
                              onClick={nextQuestion}
                              className="px-4 py-2 bg-blue-500 text-white rounded"
                            // disabled={answers[quizQuestionData[currentQuestionIndex].id] === undefined}
                            >
                              Next
                            </button>
                          ) : (
                            !JSON.parse(courseProgress.completed_lesson_id).includes(editQuizData.id) && (
                              <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleSubmitQuizAnswer}
                              >
                                Submit
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) :
                  courseData.course_overview_link && courseData.course_overview_link.trim() !== "" ? (
                    courseData.course_overview_link.includes("youtube.com") ? (
                      <iframe
                        width="100%"
                        height="500px"
                        src={`https://www.youtube.com/embed/${courseData.course_overview_link.split("v=")[1]}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video
                        controls
                        className="video-element"
                        poster={`../upload/${courseThumbnail}`}
                      >
                        <source src={courseData.course_overview_link} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )) : (
                    <p>Video not available</p>
                  )}
                {/* <div className="play-button-overlay">
                  <span className="play-icon"></span>
                </div> */}
              </div>

              {/* Tab Bar */}
              <div>
                <div className="tabs flex flex-wrap gap-2 justify-start md:justify-start">
                  <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")} >
                    Overview </button>

                  <button className={activeTab === "resource" ? "active" : ""} onClick={() => setActiveTab("resource")} >
                    Resource </button>
                </div>
                {activeTab === "overview" && (
                  <>
                    <div className="long-desc">
                      <p>
                        {courseData?.long_desc}
                      </p>
                    </div>
                    <div className="learning-list">
                      <h2 className="font-bold mb-4 text-2xl text-black"> What you'll learn </h2>
                      <ul className="block sm:hidden">
                        {Array.isArray(courseData.course_topics) && courseData.course_topics.map((keyword, index) => (
                          <li key={index}>{keyword}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="prerequisites">
                      <h2 className="font-bold mb-4 text-2xl text-black"> Prerequisites </h2>
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
                {activeTab === "resource" && (
                  <p>Data not found</p>
                )}
              </div>
            </div>

            {/* Course Info Section */}
            <div className="course-info md:ml-2">
              {moduleData.length > 0 ? (
                moduleData.map((module, index) => (
                  <div className="module" key={index}>
                    <div className="module-header" onClick={() => toggleContent(index, module.id, activeModuleIndex === index ? null : index)}>
                      <span className="module-title">
                        MODULE-{index + 1} : {module.title}
                      </span>
                      <div className="module-controls">
                        <button className="check-btn">
                          <i
                            className={`fa-solid ${activeModuleIndex === index ? "fa-angle-up" : "fa-angle-down"
                              }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                    {activeModuleIndex === index && (
                      <>
                        <div className="module-list">
                          {lessonLoading ? (
                            <div className="lesson_loader"></div>
                          ) : (
                            lessonData.length > 0 ? (
                              lessonData.map((lesson, index) => (
                                <div className="module-content" key={index}>
                                  <div className="module-lesson">
                                    <div className="lesson-title cursor-pointer" onClick={() => editLessonToggleModal(lesson.id, lesson.quiz_id, 1)}>
                                      {lesson.quiz_id ? (
                                        <span className="quiz-icon"><i className="fa-regular fa-circle-question"></i></span>
                                      ) : (
                                        <span className="lesson-icon">
                                          <i className="fa-solid fa-file-lines"></i>
                                        </span>
                                      )}
                                      {
                                        lesson.quiz_id != null ? (
                                          lesson.course_quize_lesson.title
                                        ) : (
                                          lesson.title
                                        )
                                      }
                                    </div>
                                    <div className="lesson-time">
                                      <input type="checkbox" className="checkbox-class" />
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <h6>No data available 😂</h6> // Display this if lessonData is empty
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>No Module data avalible</p>
              )}
            </div>
          </div>
        </>
      )
      }
    </>
  );
};

export default CourseVideo;