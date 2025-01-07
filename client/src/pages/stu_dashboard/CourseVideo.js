import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/client/coursevideo.css";
import { RiMenuAddLine } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import axiosInstance from "../client/utils/axiosInstance";
import { userRolesContext } from "../admin/layout/RoleContext";
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
      await setCourseProgress(res.data[0]);
      if (res.data.length === 0 && stuUserId) {
        getModuleData();
        addcourseProgressData();
      }
      if (res.data[0].current_watching_lesson) {
        getLessonWithCompletedId(res.data[0].current_watching_lesson)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getcourseProgressDataRefresh = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingAcademicProgressDataWithCourseId/${courseData.id}/${stuUserId}`);
      setCourseProgress(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //get lesson iwth id
  const getLessonWithCompletedId = async (id) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithId/${id}`);
      setActiveModuleIndex(res.data.section_id)
      getLessonData(res.data.section_id);
      if (res.data.quiz_id === null) {
        await getLessonDataForEdit(res.data.id);
      }
      if (res.data.quiz_id !== null) {
        await getQuizeDataForEdit(res.data.quiz_id);
        getQuizQuestionData(res.data.quiz_id);
        getQuizResultDatWithquizId(res.data.quiz_id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const addcourseProgressData = async () => {
    console.log(id)
    const res = await axiosInstance.get(`${port}/gettingCourseSectionData/${id}`);
    const sectionData = res.data;
    if (sectionData.length === 0) return;
    const sortedData = sectionData.sort((a, b) => a.order - b.order);
    const moduleUId = sortedData && sortedData?.length > 0 ? sortedData[0].id : 0;
    const res2 = await axiosInstance.get(`${port}/gettingCourseLessonDataWithSectionId/${moduleUId}`);
    const lessonquizdata = res2.data
    if (lessonquizdata.length === 0) return;
    const sortedData2 = lessonquizdata.sort((a, b) => a.order - b.order);
    const data = {
      student_id: stuUserId,
      course_id: courseData.id,
      current_watching_lesson: sortedData2[0].id,
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
      setActiveModuleIndex(sortedData[0].id)
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
      const sortedData = lessonquizdata.sort((a, b) => a.order - b.order);
      setLessonData(sortedData);
      if (sortedData.length > 0) {
        if (courseProgress && stuUserId) {
          const data = {
            current_watching_lesson: sortedData[0].id,
          };
          await axiosInstance.put(
            `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
            data
          );
        }
      }
      setLessonLoading(false);
      return sortedData;
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
  console.log(editLessonData)
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
      if (courseProgress.completed_lesson_id &&
        !JSON.parse(courseProgress.completed_lesson_id).includes(editLessonData.id)) {
        await getQuizResultDatWithquizId(quizData.id);
      }
      if (quizData.title) {
        await getQuizQuestionData(quizData.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [quizPassOrFail, setQuizPassOrFail] = useState("");
  const getQuizResultDatWithquizId = async (id) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingQuizResultDatWithquizId/${id}`);
      const quizResultData = res.data[0];
      if (!quizResultData) {
        setAnswers({});
      }
      setQuizPassOrFail(quizResultData.result);
      const parsedAnswers = JSON.parse(quizResultData.user_answers);
      setAnswers(parsedAnswers);
    } catch (error) {
      console.log(error);
    }
  }
  const [quizQuestionData, setQuizQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const getQuizQuestionData = async (id) => {
    setCurrentQuestionIndex(0);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseQuizeQuestionData/${id}`);
      const quizeQuestiondata = res.data;
      const sortdata = quizeQuestiondata.sort((a, b) => a.order - b.order);
      setQuizQuestionData(sortdata);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAnswerChange = (quizId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: selectedAnswer, // Update the answer for the specific quiz ID
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
        if (nextLesson) {
          if (nextLesson.id) {
            const data = {
              current_watching_lesson: nextLesson.id,
            };
            await axiosInstance.put(
              `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
              data
            );
            await getLessonDataForEdit(nextLesson.id);
          }

          if (nextLesson.quiz_id !== null) {
            await getQuizeDataForEdit(nextLesson.quiz_id);
          }
        }
        else if (!nextLesson) {
          const currentModule = moduleData.find((item) => item.id === activeModuleIndex);
          if (currentModule) {
            const nextModule = moduleData.find((item) => item.order === currentModule.order + 1);
            if (!nextModule) {
              console.log("Course is completed");
              getcourseProgressDataRefresh();
              return;
            }
            setActiveModuleIndex(nextModule.id);
            const res = await getLessonData(nextModule.id);
            if (res.length > 0) {
              if (res[0].id) {
                const data = {
                  current_watching_lesson: res[0].id,
                };
                await axiosInstance.put(
                  `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
                  data
                );
                await getLessonDataForEdit(res[0].id);
              }
              if (res[0].quiz_id !== null) {
                await getQuizeDataForEdit(res[0].quiz_id);
              }
            }
          }
        }
      }
      getcourseProgressDataRefresh();
    } catch (error) {
      console.error("Error in handleViewedLessonData:", error);
    }
  };
  const handleSubmitQuizAnswer = async () => {
    const correctAnswersKeyValue = {};
    const userAnswersKeyValue = {};
    quizQuestionData.forEach((question) => {
      userAnswersKeyValue[question.id] = answers[question.id] || null; // User's answer
      correctAnswersKeyValue[question.id] = question.correct_answer;   // Correct answer
    });

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
      parsData = [];
    }
    parsData.push(editQuizData.id);
    // Check for matching answers
    const matchingAnswers = [];

    for (const questionId in correctAnswersKeyValue) {
      if (correctAnswersKeyValue.hasOwnProperty(questionId)) {
        const correctAnswer = JSON.parse(correctAnswersKeyValue[questionId]); // Assuming the correct answer is a stringified array
        const userAnswer = userAnswersKeyValue[questionId];

        // Check if the user's answer matches the correct answer
        if (Array.isArray(correctAnswer)) {
          if (correctAnswer.includes(userAnswer)) {
            matchingAnswers.push({ questionId, userAnswer, correctAnswer });
          }
        } else {
          if (correctAnswer === userAnswer) {
            matchingAnswers.push({ questionId, userAnswer, correctAnswer });
          }
        }
      }
    }

    const perQuizMark = (editQuizData.total_marks / quizQuestionData.length);
    const passingMarks = editQuizData.passing__marks;
    const obtainedMarks = (matchingAnswers.length * perQuizMark)
    const passOrFail = obtainedMarks >= passingMarks ? "pass" : "fail";

    const quizAnswerData = {
      quiz_id: editQuizData.id,
      student_id: stuUserId,
      course_id: id,
      user_answers: answers,
      correct_answers: correctAnswersKeyValue,
      result: passOrFail
    };
    const data = {
      completed_lesson_id: JSON.stringify(parsData),
      current_watching_lesson: editQuizData.id,
    };
    try {
      await axiosInstance.put(
        `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
        data
      );
      const res = await axiosInstance.post(`${port}/addingQuizResultData`, quizAnswerData);
      if (res.status === 200) {
        getQuizResultDatWithquizId(editQuizData.id);
        const currentLesson = lessonData.find((item) => item.quiz_id === editQuizData.id);
        const currentOrder = currentLesson.order;
        const nextLesson = lessonData.find((item) => item.order === currentOrder + 1);
        if (nextLesson) {
          if (nextLesson.id) {
            const data = {
              current_watching_lesson: nextLesson.id,
            };
            await axiosInstance.put(
              `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
              data
            );
            await getLessonDataForEdit(nextLesson.id);
          }
          if (nextLesson.quiz_id !== null) {
            await getQuizeDataForEdit(nextLesson.quiz_id);
          }
        }
        else if (!nextLesson) {
          const currentModule = moduleData.find((item) => item.id === activeModuleIndex);
          if (currentModule) {
            const nextModule = moduleData.find((item) => item.order === currentModule.order + 1);
            if (!nextModule) {
              getcourseProgressDataRefresh();
              console.log("Course Is Completed");
              return;
            }
            setActiveModuleIndex(nextModule.id);
            const res = await getLessonData(nextModule.id);
            if (res.length > 0) {
              if (res[0].id) {
                const data = {
                  current_watching_lesson: res[0].id,
                };
                await axiosInstance.put(
                  `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
                  data
                );
                await getLessonDataForEdit(res[0].id);
              }
              if (res[0].quiz_id !== null) {
                await getQuizeDataForEdit(res[0].quiz_id);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
    }
    getcourseProgressDataRefresh();
  };

  useEffect(() => {
    getCourseData();
    getModuleData();
  }, []);

  useEffect(() => {
    getcourseProgressData()
  }, [courseData]);
  const getYouTubeEmbedUrl = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };
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
                <img src={require("../../assets/image/Logo.png")} alt="logo" />
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
              <div className={editLessonData.lesson_type == "text" || editLessonData.lesson_type == "pdf" ? "thumbnail-container" : "thumbnail-other-type-container"}>
                {editLessonData?.title || editQuizData?.title ? (
                  <div className="edit-content">
                    {editLessonData?.title && (
                      <>
                        <div className="md:flex block justify-between items-center mb-2">
                          <div className="flex">
                            <h2 className="font-bold flex text-xl text-black">{editLessonData.title}
                            </h2>
                            <span className="ml-2 font-semibold px-2 py-0.5 h-fit text-[12px] rounded bg-[#DDDDDD] uppercase">{editLessonData.lesson_type}</span>
                          </div>
                          <p className="course_module_duration"><strong>Duration:</strong> {editLessonData.duration || "N/A"} Minutes</p>
                        </div>

                        {editLessonData.lesson_type === "youtube-video" && (
                          <iframe
                            width="100%"
                            height="500px"
                            src={getYouTubeEmbedUrl(editLessonData.url)}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        )}
                        {editLessonData.lesson_type === "text" && (
                          <div className="long-desc mt-4">
                            <p className="max-h-[300px] scrollbar overflow-y-scroll ">
                              {editLessonData.text_content || "No Text available"}
                            </p>
                          </div>
                        )}
                        {editLessonData.lesson_type === "pdf" && (
                          <div className="pdf-container">
                            <iframe
                              src={`../../upload/${editLessonData.attachment}`}
                              width="100%"
                              height="500px"
                              title="PDF Viewer"
                              className="border rounded shadow"
                            ></iframe>
                          </div>
                        )}
                        {editLessonData.lesson_type === "video" && (
                          <div className="pdf-container">
                            <video
                              controls
                              className="video-element max-h-[420px]"
                              poster={`../../upload/${editLessonData.thumbnail_preview_image_url}`}
                            >
                              <source src={`../../upload/${editLessonData.attachment}`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                        <div className="long-desc mt-4">
                          <p id="description_bottom">
                            {editLessonData.description || "No description available"}
                          </p>
                        </div>
                        {!(
                          courseProgress.completed_lesson_id &&
                          JSON.parse(courseProgress.completed_lesson_id).includes(editLessonData.id)
                        ) && (
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
                    <div className="max-w-[650px] mx-auto">
                      {editQuizData?.title && (
                        <>
                          {/* Simplified Header Section */}
                          <header className="mb-6">
                            <div className="flex justify-between items-center">
                              <div className="flex">
                                <h2 className="font-bold flex text-xl text-black">{editQuizData.title}
                                </h2>
                                <span className="ml-2 font-semibold px-2 py-0.5 h-fit text-[12px] rounded bg-[#DDDDDD] uppercase">Quiz</span>
                              </div>


                              <p className="text-sm text-gray-600 mt-2 md:mt-0">
                                <strong>Instruction:</strong> {editQuizData.instruction || "No instructions available"}
                              </p>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <p>
                                <strong>Total Marks:</strong> {editQuizData.total_marks || "N/A"}
                              </p>
                              <p>
                                <strong>Passing Marks:</strong> {editQuizData.passing__marks || "N/A"}
                              </p>
                              <p>
                                <strong>Total Questions:</strong> {quizQuestionData.length || "N/A"}
                              </p>
                            </div>
                          </header>

                          {/* Question Section */}
                          <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                              <span className="mr-2 font-extrabold">{currentQuestionIndex + 1}.)</span>
                              {quizQuestionData[currentQuestionIndex]?.title}
                              {courseProgress.completed_lesson_id && JSON.parse(courseProgress.completed_lesson_id).includes(editQuizData.id) && (
                                <span className="ml-2 font-extrabold">({quizPassOrFail ? quizPassOrFail : ""})</span>
                              )}
                            </h2>
                            {quizQuestionData[currentQuestionIndex]?.options && (
                              <ul className="space-y-3">
                                {JSON.parse(quizQuestionData[currentQuestionIndex].options).map((option, index) => (
                                  option &&
                                  <li key={index}>
                                    {courseProgress.completed_lesson_id && JSON.parse(courseProgress.completed_lesson_id).includes(editQuizData.id) ? (
                                      <label
                                        className={`block px-4 py-3 rounded-lg ${answers[quizQuestionData[currentQuestionIndex].id] ===
                                          index
                                          ? "bg-blue-500 text-white shadow-md"
                                          : "bg-gray-100"
                                          }`}
                                      >
                                        <span className="mr-2 font-semibold">{index + 1}.</span>
                                        <input
                                          type="radio"
                                          name={`question-${quizQuestionData[currentQuestionIndex].id}`}
                                          value={option}
                                          checked={
                                            answers[quizQuestionData[currentQuestionIndex].id] ===
                                            index
                                          }
                                          className="hidden"
                                        />
                                        {option}
                                      </label>
                                    ) : (
                                      <label
                                        className={`block px-4 py-3 rounded-lg cursor-pointer transition hover:bg-gray-200 ${answers[quizQuestionData[currentQuestionIndex].id] ===
                                          index
                                          ? "bg-blue-500 text-white shadow-md"
                                          : "bg-gray-100"
                                          }`}
                                      >
                                        <span className="mr-2 font-semibold">{index + 1}.</span>
                                        <input
                                          type="radio"
                                          name={`question-${quizQuestionData[currentQuestionIndex].id}`}
                                          value={option}
                                          checked={
                                            answers[quizQuestionData[currentQuestionIndex].id] ===
                                            index
                                          }
                                          onChange={() =>
                                            handleAnswerChange(
                                              quizQuestionData[currentQuestionIndex].id,
                                              index
                                            )
                                          }
                                          className="hidden"
                                        />
                                        {option}
                                      </label>
                                    )}
                                  </li>
                                )
                                )}
                              </ul>
                            )}
                          </section>

                          {/* Navigation Section */}
                          <footer className="mt-6 flex items-center justify-between space-x-4">
                            {/* Previous Button */}
                            <button
                              onClick={prevQuestion}
                              className={`flex-1 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${currentQuestionIndex === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-400 text-white hover:bg-gray-500 hover:shadow-md"
                                }`}
                              disabled={currentQuestionIndex === 0}
                            >
                              <i class="fa-solid fa-circle-chevron-left"></i> Previous
                            </button>

                            {/* Next Button */}
                            {currentQuestionIndex !== quizQuestionData.length - 1 ? (
                              <button
                                onClick={nextQuestion}
                                className="flex-1 px-5 py-3 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md transition-all duration-200"
                              >
                                Next <i class="fa-solid fa-circle-chevron-right"></i>
                              </button>
                            ) : (
                              <button
                                className="flex-1 px-5 py-3 rounded-lg text-sm font-medium bg-blue-400 text-white cursor-not-allowed transition-all duration-200"
                                disabled
                              >
                                Next <i class="fa-solid fa-circle-chevron-right"></i>
                              </button>
                            )}

                            {/* Submit Button */}
                            {courseProgress.completed_lesson_id && JSON.parse(courseProgress.completed_lesson_id).includes(editQuizData.id) ? (
                              ""
                            ) : (
                              <button
                                onClick={handleSubmitQuizAnswer}
                                className="flex-1 px-5 py-3 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 hover:shadow-md transition-all duration-200"
                              >
                                Submit
                              </button>
                            )}
                          </footer>
                        </>
                      )}
                    </div>
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
              </div>

              {/* Tab Bar */}
              <div>
                <div className="tabs flex flex-wrap gap-2 justify-start md:justify-start">
                  <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")} >
                    Overview </button>
                  <button className={`md:hidden block ${activeTab === "content" ? "active" : ""} `} onClick={() => setActiveTab("content")} >
                    Course Content </button>
                  <button className={activeTab === "resource" ? "active" : ""} onClick={() => setActiveTab("resource")} >
                    Resource </button>
                </div>
                {activeTab === "content" && (
                  <>
                    <div className="md:hidden block course-info md:ml-2">
                      {moduleData.length > 0 ? (
                        moduleData.map((module, moduleIndex) => {
                          return (
                            <div className="module" key={moduleIndex}>
                              <div
                                className={`module-header ${activeModuleIndex === module.id ? "active" : ""}`}
                                onClick={() =>
                                  toggleContent(
                                    module.id,
                                    module.id,
                                    activeModuleIndex === module.id ? null : module.id
                                  )
                                }
                              >
                                <span className="module-title">
                                  MODULE-{moduleIndex + 1} : {module.title}
                                </span>
                                <div className="module-controls">
                                  <button className="check-btn">
                                    <i
                                      className={`fa-solid ${activeModuleIndex === module.id ? "fa-angle-up" : "fa-angle-down"
                                        }`}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                              {activeModuleIndex === module.id && (
                                <>
                                  <div className="module-list">
                                    {lessonLoading ? (
                                      <div className="lesson_loader"></div>
                                    ) : lessonData.length > 0 ? (
                                      lessonData.map((lesson, lessonIndex) => {
                                        if (courseProgress) {
                                          var isCompleted =
                                            courseProgress &&
                                            courseProgress.completed_lesson_id &&
                                            JSON.parse(courseProgress.completed_lesson_id)?.includes(lesson.id) ||
                                            JSON.parse(courseProgress.completed_lesson_id)?.includes(lesson.quiz_id);
                                        }
                                        const canAccess =
                                          (courseProgress &&
                                            courseProgress.completed_lesson_id &&
                                            JSON.parse(courseProgress.completed_lesson_id).includes(lesson.id)) ||
                                          (courseProgress &&
                                            courseProgress.completed_lesson_id &&
                                            JSON.parse(courseProgress.completed_lesson_id).includes(lesson.quiz_id)) ||
                                          (courseProgress &&
                                            courseProgress.current_watching_lesson === lesson.id);

                                        return (
                                          <div
                                            className={`module-content ${!canAccess ? "cursor-not-allowed" : ""
                                              }`}
                                            key={lessonIndex}
                                          >
                                            <div className="module-lesson">
                                              <div
                                                className={`lesson-title ${!canAccess
                                                  ? "cursor-not-allowed"
                                                  : "cursor-pointer"
                                                  }`}
                                                onClick={() =>
                                                  canAccess &&
                                                  editLessonToggleModal(lesson.id, lesson.quiz_id, 1)
                                                }
                                              >
                                                {lesson.quiz_id ? (
                                                  <span className="quiz-icon">
                                                    <i className="fa-regular fa-circle-question"></i>
                                                  </span>
                                                ) : lesson.lesson_type == "video" ? (
                                                  <span className="lesson-icon">
                                                    <i className="fa-solid fa-circle-play"></i>
                                                  </span>
                                                ) : lesson.lesson_type == "youtube-video" ? (
                                                  <span className="lesson-icon">
                                                    <i className="fa-brands fa-youtube"></i>
                                                  </span>
                                                ) : lesson.lesson_type == "pdf" ? (
                                                  <span className="lesson-icon">
                                                    <i class="fa-solid fa-file-pdf"></i>
                                                  </span>
                                                ) : (
                                                  <span className="lesson-icon">
                                                    <i className="fa-solid fa-file-lines"></i>
                                                  </span>
                                                )}
                                                {lesson.quiz_id != null
                                                  ? lesson.course_quize_lesson.title
                                                  : lesson.title}
                                              </div>
                                              <span className="mr-2">
                                                {!canAccess && <MdLockOutline />}
                                              </span>
                                              <div className="lesson-time">
                                                <input
                                                  type="checkbox"
                                                  className={`checkbox-class ${!canAccess
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                                    }`}
                                                  checked={isCompleted}
                                                  readOnly
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <h6>No data available 😂</h6>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p>No Module data available</p>
                      )}
                    </div>
                  </>
                )}
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

            <div className="md:block hidden course-info md:ml-2">
              {moduleData.length > 0 ? (
                moduleData.map((module, moduleIndex) => {
                  return (
                    <div className="module" key={moduleIndex}>
                      <div
                        className={`module-header ${activeModuleIndex === module.id ? "active" : ""}`}
                        onClick={() =>
                          toggleContent(
                            module.id,
                            module.id,
                            activeModuleIndex === module.id ? null : module.id
                          )
                        }
                      >
                        <span className="module-title">
                          MODULE-{moduleIndex + 1} : {module.title}
                        </span>
                        <div className="module-controls">
                          <button className="check-btn">
                            <i
                              className={`fa-solid ${activeModuleIndex === module.id ? "fa-angle-up" : "fa-angle-down"
                                }`}
                            ></i>
                          </button>
                        </div>
                      </div>
                      {activeModuleIndex === module.id && (
                        <>
                          <div className="module-list">
                            {lessonLoading ? (
                              <div className="lesson_loader"></div>
                            ) : lessonData.length > 0 ? (
                              lessonData.map((lesson, lessonIndex) => {
                                if (courseProgress) {
                                  var isCompleted =
                                    courseProgress &&
                                    courseProgress.completed_lesson_id &&
                                    JSON.parse(courseProgress.completed_lesson_id)?.includes(lesson.id) ||
                                    JSON.parse(courseProgress.completed_lesson_id)?.includes(lesson.quiz_id);
                                }
                                const canAccess =
                                  (courseProgress &&
                                    courseProgress.completed_lesson_id &&
                                    JSON.parse(courseProgress.completed_lesson_id).includes(lesson.id)) ||
                                  (courseProgress &&
                                    courseProgress.completed_lesson_id &&
                                    JSON.parse(courseProgress.completed_lesson_id).includes(lesson.quiz_id)) ||
                                  (courseProgress &&
                                    courseProgress.current_watching_lesson === lesson.id);

                                return (
                                  <div
                                    className={`module-content ${!canAccess ? "cursor-not-allowed" : ""
                                      }`}
                                    key={lessonIndex}
                                  >
                                    <div className="module-lesson">
                                      <div
                                        className={`lesson-title ${!canAccess
                                          ? "cursor-not-allowed"
                                          : "cursor-pointer"
                                          }`}
                                        onClick={() =>
                                          canAccess &&
                                          editLessonToggleModal(lesson.id, lesson.quiz_id, 1)
                                        }
                                      >
                                        {lesson.quiz_id ? (
                                          <span className="quiz-icon">
                                            <i className="fa-regular fa-circle-question"></i>
                                          </span>
                                        ) : lesson.lesson_type == "video" ? (
                                          <span className="lesson-icon">
                                            <i className="fa-solid fa-circle-play"></i>
                                          </span>
                                        ) : lesson.lesson_type == "youtube-video" ? (
                                          <span className="lesson-icon">
                                            <i className="fa-brands fa-youtube"></i>
                                          </span>
                                        ) : lesson.lesson_type == "pdf" ? (
                                          <span className="lesson-icon">
                                            <i class="fa-solid fa-file-pdf"></i>
                                          </span>
                                        ) : (
                                          <span className="lesson-icon">
                                            <i className="fa-solid fa-file-lines"></i>
                                          </span>
                                        )}
                                        {lesson.quiz_id != null
                                          ? lesson.course_quize_lesson.title
                                          : lesson.title}
                                      </div>
                                      <span className="mr-2">
                                        {!canAccess && <MdLockOutline />}
                                      </span>
                                      <div className="lesson-time">
                                        <input
                                          type="checkbox"
                                          className={`checkbox-class ${!canAccess
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer"
                                            }`}
                                          checked={isCompleted}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <h6>No data available 😂</h6>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No Module data available</p>
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