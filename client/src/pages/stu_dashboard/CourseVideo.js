import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/css/client/coursevideo.css";
import { RiMenuAddLine } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import axiosInstance from "../client/utils/axiosInstance";
import { userRolesContext } from "../admin/layout/RoleContext";
import { notifySuccess, notifyWarning } from "../admin/layout/ToastMessage";
const port = process.env.REACT_APP_URL;
// Load PDF worker
const CourseVideo = () => {
  const { id } = useParams();
  const { stuUserId } = useContext(userRolesContext);
  const [loading, setLoading] = useState(true);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeModuleIndex2, setActiveModuleIndex2] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const toggleContent = (index, id, type) => {
    setLessonLoading(true)
    setActiveModuleIndex2((prevIndex) => (prevIndex === index ? null : index));
    if (type !== null) {
      getLessonData2(activeModuleIndex);
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
  const [timeStamp, setTimeStamp] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const getcourseProgressData = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingAcademicProgressDataWithCourseId/${id}/${stuUserId}`);
      const progressData = await res.data[0];
      if (!progressData) {
        getModuleData();
        addcourseProgressData();
        return;
      }
      let completedLessonIds = progressData.completed_lesson_id === null ? [] : JSON.parse(progressData.completed_lesson_id);
      if (typeof completedLessonIds === "string") {
        completedLessonIds = completedLessonIds.replace(/[^\d,]/g, "").split(",").map(Number);
      }

      if (!Array.isArray(completedLessonIds)) {
        console.error("completedLessonIds is not an array after parsing", completedLessonIds);
      }

      const currentWatchingLessonId = progressData?.current_watching_lesson;
      const sectionRes = await axiosInstance.get(`${port}/gettingCourseSectionData/${id}`);
      const sectionData = sectionRes.data;
      if (sectionData.length === 0) return;

      let allLessons = [];

      for (let section of sectionData) {
        const lessonRes = await axiosInstance.get(`${port}/gettingCourseLessonDataWithSectionId/${section.id}`);
        allLessons = [...allLessons, ...lessonRes.data.map(lesson => lesson.id)];
      }
      const missingLessons = allLessons.filter(lessonId => !completedLessonIds.includes(lessonId));
      const data = {
        student_id: stuUserId,
        course_id: id,
        module_id: activeModuleIndex
      }
      const res2 = await axiosInstance.post(`${port}/gettingModuleTimeData`, data);
      const filteredModuleData = moduleData.filter((item) => item.id === activeModuleIndex);
      if (filteredModuleData.length > 0 && res2.data.data[0]?.spent_time >= filteredModuleData[0].time) {
        getLessonDataForEdit(missingLessons[0]);
      } else {
        getLessonDataForEdit(progressData?.current_watching_lesson);
      }
      if (missingLessons.length > 0 && filteredModuleData.length > 0 && res2.data.data[0]?.spent_time >= filteredModuleData[0].time) {
        let firstUncompletedLesson = missingLessons[0];
        const data = {
          student_id: stuUserId,
          course_id: id,
          current_watching_lesson: firstUncompletedLesson
        }
        const res = await axiosInstance.put(`${port}/updattingAcademicProgressDataForViewed/${progressData.id}/${stuUserId}`, data);
        await getLessonDataForEdit(firstUncompletedLesson);
      }
      getcourseProgressDataRefresh();
      setCourseProgress(progressData);
      setTimeStamp(progressData?.watching_duration);

      if (currentWatchingLessonId) {
        getLessonWithCompletedId(currentWatchingLessonId, 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate()
  const handleBack = async () => {
    await saveTimeToDatabase()
    navigate('/student/learning')
  }

  const updateModuleTime = async (activeModuleIndex, stuUserId, id) => {
    const data = {
      student_id: stuUserId,
      course_id: id,
      module_id: activeModuleIndex
    }
    try {
      await axiosInstance.put(`${port}/updatingmoduletimestampdata`, data);
    }
    catch (error) {
      console.log(error)
    }
  }
  const [currentModuleTime, setCurrentModuleTime] = useState(0);
  const getModuleTimeData = async (mId) => {
    const data = {
      student_id: stuUserId,
      course_id: id,
      module_id: mId
    }
    try {
      const res = await axiosInstance.post(`${port}/gettingModuleTimeData`, data);
      await setCurrentModuleTime(res.data.data[0].spent_time);
    }
    catch (error) {
      console.log(error)
    }
  }
  const [filteredModuleData, setFilteredModuleData] = useState([]);
  useEffect(() => {
    // Increment elapsedTime every second
    const intervalOneSecond = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    // Save to database every 10 seconds
    const intervalSaveTime = setInterval(() => {
      saveTimeToDatabase();
      updateModuleTime(activeModuleIndex, stuUserId, id);
      setFilteredModuleData(moduleData.filter((module) => module.id === activeModuleIndex));
    }, 10000);

    // Cleanup when component unmounts
    return () => {
      clearInterval(intervalOneSecond);
      clearInterval(intervalSaveTime);
    };
  }, [courseProgress]);


  const saveTimeToDatabase = async () => {
    setElapsedTime((prevElapsedTime) => {
      setTimeStamp((prevTimeStamp) => {
        const totalTime = prevTimeStamp + prevElapsedTime;
        const payload = { watchingDuration: totalTime };
        axiosInstance.put(`${port}/updateWatchingDuration/${courseProgress?.id}`, payload)
          .then(() => {
          })
          .catch((error) => {
            console.error("Error saving time to database:", error);
          });

        return totalTime; // Ensure `timeStamp` updates correctly
      });

      return 0; // Reset `elapsedTime`
    });
  };

  // Ensure timeStamp is a number before calculations
  const validTimeStamp = timeStamp || 0;
  const validElapsedTime = elapsedTime || 0;
  const totalTimeInMinutes = Math.floor((validTimeStamp + validElapsedTime) / 60);
  const remainingSeconds = (validTimeStamp + validElapsedTime) % 60;
  const getcourseProgressDataRefresh = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingAcademicProgressDataWithCourseId/${id}/${stuUserId}`);
      setCourseProgress(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //get lesson iwth id
  const getLessonWithCompletedId = async (lessonid, num) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithId/${lessonid}`);
      setActiveModuleIndex(res.data.section_id)
      setActiveModuleIndex2(res.data.section_id)
      getLessonData(res.data.section_id);
      if (res.data.quiz_id == null && num !== 1) {
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
  //get course lesson data with course id
  const [lessonDataWithCourseId, setLessonDataWithCourseId] = useState([]);
  const getCourseLessonDataWithCourseId = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithCourseId/${id}`);
      setLessonDataWithCourseId(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addcourseProgressData = async () => {
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
      course_id: id,
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
      setActiveModuleIndex2(sortedData[0].id)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //get lesson data
  const [lessonData, setLessonData] = useState([]);
  const [lessonData2, setLessonData2] = useState([]);
  const getLessonData2 = async (id) => {
    setLessonLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithSectionId/${id}`);
      const lessonquizdata = res.data
      setLessonData2(lessonquizdata);
      const sortedData = lessonquizdata && lessonquizdata.sort((a, b) => a.order - b.order);
      // if (sortedData.length > 0) {
      //   if (courseProgress && stuUserId) {
      //     const data = {
      //       current_watching_lesson: sortedData[0]?.id,
      //     };
      //     await axiosInstance.put(
      //       `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
      //       data
      //     );
      //   }
      // }
      setLessonLoading(false);
      return sortedData;
    } catch (error) {
      console.log(error);
      setLessonLoading(false);
    }
  }
  const getLessonData = async (id) => {
    setLessonLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithSectionId/${id}`);
      const lessonquizdata = res.data
      setLessonData(lessonquizdata);
      const sortedData = lessonquizdata && lessonquizdata.sort((a, b) => a.order - b.order);
      // if (sortedData.length > 0) {
      //   if (courseProgress && stuUserId) {
      //     const data = {
      //       current_watching_lesson: sortedData[0]?.id,
      //     };
      //     await axiosInstance.put(
      //       `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
      //       data
      //     );
      //   }
      // }
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
  const [compareLessonId, setCompareLessonId] = useState(null);
  const editLessonToggleModal = async (id, quizId, num) => {
    setCompareLessonId(id);
    if (num === 1) {
      if (id) {
        await getLessonDataForEdit(id);
      }
      if (quizId !== null) {
        await getQuizeDataForEdit(quizId);
      }
    }
  }

  const getLessonDataForEdit = async (id, num) => {
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
      let text_content = res.data.text_content;
      try {
        text_content = JSON.parse(text_content);
      } catch (e) {
        text_content = text_content.replace(/^"(.*)"$/, '$1');
      }
      setEditLessonData({ ...res.data, text_content });
    } catch (error) {
      console.log(error);
    }
  };

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
      if (courseProgress.completed_lesson_id && compareLessonId &&
        JSON.parse(courseProgress.completed_lesson_id).includes(compareLessonId)) {
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
  const [quizeResultId, setQuizeResultId] = useState("");
  const getQuizResultDatWithquizId = async (id) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingQuizResultDatWithquizId/${id}/${stuUserId}`);
      const quizResultData = res.data[0];
      setQuizeResultId(res.data[0]);
      if (!quizResultData) {
        setAnswers({});
      }
      setQuizPassOrFail(quizResultData?.result);
      const parsedAnswers = JSON.parse(quizResultData?.user_answers);
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

      setCompareLessonId(editLessonData.quiz_id);

      const course_progress = (
        (parsData.length / lessonDataWithCourseId.length) * 100
      ).toFixed(0);

      const res2 = await axiosInstance.get(
        `${port}/gettingAcademicProgressDataWithCourseId/${id}/${stuUserId}`
      );
      const progressData = await res2.data[0];

      let completedLessonIds =
        progressData.completed_lesson_id === null
          ? []
          : JSON.parse(progressData.completed_lesson_id);

      if (typeof completedLessonIds === "string") {
        completedLessonIds = completedLessonIds
          .replace(/[^\d,]/g, "")
          .split(",")
          .map(Number);
      }

      const isLessonAlreadyCompleted = completedLessonIds.includes(editLessonData.id);

      if (!isLessonAlreadyCompleted) {
        parsData.push(editLessonData.id);
      }

      const data = {
        completed_lesson_id: JSON.stringify(parsData),
        course_progress: course_progress,
        current_watching_lesson: editLessonData.id,
      };

      const res = await axiosInstance.put(
        `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
        data
      );

      if (res.status === 200) {
        const currentLesson =
          lessonData[0].section_id === activeModuleIndex
            ? lessonData.find((item) => item.id === editLessonData.id)
            : lessonData2.find((item) => item.id === editLessonData.id);

        const currentOrder = currentLesson?.order;
        const nextLesson =
          lessonData[0].section_id === activeModuleIndex
            ? lessonData
              .filter((item) => item.order > currentOrder)
              .sort((a, b) => a.order - b.order)[0]
            : lessonData2
              .filter((item) => item.order > currentOrder)
              .sort((a, b) => a.order - b.order)[0];

        if (nextLesson) {
          if (nextLesson.id) {
            const data = { current_watching_lesson: nextLesson.id };
            await axiosInstance.put(
              `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
              data
            );
            setActiveModuleIndex2(nextLesson.section_id);
            getLessonData(nextLesson.section_id);
            await getLessonDataForEdit(nextLesson.id);
          }

          if (nextLesson.quiz_id !== null) {
            await getQuizeDataForEdit(nextLesson.quiz_id);
          }
        } else {
          const currentModule = moduleData.find(
            (item) => item.id === activeModuleIndex
          );
          const data = {
            student_id: stuUserId,
            course_id: id,
            module_id: activeModuleIndex
          }
          const res = await axiosInstance.post(`${port}/gettingModuleTimeData`, data);
          if (res.data.data[0]?.spent_time >= currentModule.time || currentModuleTime.length < 0) {
            if (currentModule) {
              // Find the next module dynamically
              const nextModule = moduleData
                .filter((item) => item.order > currentModule.order) // Get modules with a higher order
                .sort((a, b) => a.order - b.order)[0];

              if (!nextModule) {
                notifySuccess("Course Completed");
                getcourseProgressDataRefresh();
                return;
              }

              setActiveModuleIndex(nextModule.id);
              setActiveModuleIndex2(nextModule.id);
              const res = await getLessonData(nextModule.id);
              if (res.length > 0) {
                if (res[0].id) {
                  const data = { current_watching_lesson: res[0].id };
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
          } else {
            notifyWarning("Please complete the current module time first");
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
    var parsData = [];
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
    //i want to find lessson id from lessonData with the help of editQuizData id
    // const lessonQuizId = lessonData.find((item) => item.quiz_id === editQuizData.id);
    const lessonQuizId =
      lessonData[0].section_id == activeModuleIndex ? lessonData.find((item) => item.quiz_id === editQuizData.id) : lessonData2.find((item) => item.quiz_id === editQuizData.id);

    const course_progress = ((parsData.length / lessonDataWithCourseId.length) * 100).toFixed(0)
    const datas = {
      course_progress: course_progress,
    };
    const res = await axiosInstance.put(
      `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
      datas
    );
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
    if (passOrFail === "fail") {
      notifyWarning("You have failed the quiz");
      return;
    }
    const quizAnswerData = {
      quiz_id: editQuizData.id,
      student_id: stuUserId,
      course_id: id,
      user_answers: answers,
      correct_answers: correctAnswersKeyValue,
      result: passOrFail
    };
    const res2 = await axiosInstance.get(
      `${port}/gettingAcademicProgressDataWithCourseId/${id}/${stuUserId}`
    );
    const progressData = await res2.data[0];

    let completedLessonIds =
      progressData.completed_lesson_id === null
        ? []
        : JSON.parse(progressData.completed_lesson_id);

    if (typeof completedLessonIds === "string") {
      completedLessonIds = completedLessonIds
        .replace(/[^\d,]/g, "")
        .split(",")
        .map(Number);
    }

    const isLessonAlreadyCompleted = completedLessonIds.includes(editLessonData.id);
    if (!isLessonAlreadyCompleted) {
      parsData.push(lessonQuizId.id);
    }
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
        const currentLesson =
          lessonData[0].section_id == activeModuleIndex ? lessonData.find((item) => item.id === editLessonData.id) : lessonData2.find((item) => item.id === editLessonData.id);
        const currentOrder = currentLesson?.order;
        const nextLesson = lessonData[0].section_id == activeModuleIndex ?
          lessonData
            .filter((item) => item.order > currentOrder)
            .sort((a, b) => a.order - b.order)[0] :
          lessonData2
            .filter((item) => item.order > currentOrder)
            .sort((a, b) => a.order - b.order)[0];
        if (nextLesson) {
          if (nextLesson.id) {
            const data = {
              current_watching_lesson: nextLesson.id,
            };
            await axiosInstance.put(
              `${port}/updattingAcademicProgressDataForViewed/${courseProgress.id}/${stuUserId}`,
              data
            );
            setActiveModuleIndex2(nextLesson.section_id);
            getLessonData(nextLesson.section_id);
            await getLessonDataForEdit(nextLesson.id);
            setQuizPassOrFail("")
          }
          if (nextLesson.quiz_id !== null) {
            await getQuizeDataForEdit(nextLesson.quiz_id);
          }
        }
        else if (!nextLesson) {
          const currentModule = moduleData.find(
            (item) => item.id === activeModuleIndex
          );
          const data = {
            student_id: stuUserId,
            course_id: id,
            module_id: activeModuleIndex
          }
          const res = await axiosInstance.post(`${port}/gettingModuleTimeData`, data);
          if (res.data.data[0].spent_time >= currentModule.time) {
            if (currentModule) {
              // Find the next module dynamically
              const nextModule = moduleData
                .filter((item) => item.order > currentModule.order) // Get modules with a higher order
                .sort((a, b) => a.order - b.order)[0];

              if (!nextModule) {
                notifySuccess("Course Completed");
                getcourseProgressDataRefresh();
                return;
              }

              setActiveModuleIndex(nextModule.id);
              setActiveModuleIndex2(nextModule.id);
              const res = await getLessonData(nextModule.id);
              if (res.length > 0) {
                if (res[0].id) {
                  const data = { current_watching_lesson: res[0].id };
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
          } else {
            notifyWarning("Please complete the current module time first");
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
    getCourseLessonDataWithCourseId();
  }, []);
  useEffect(() => {
    getReviewWithStudentId();
  }, [stuUserId])

  useEffect(() => {
    getcourseProgressData()
  }, [courseData]);
  const getYouTubeEmbedUrl = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };
  //getting review with course id
  const [reviewWithStudentId, setReviewWithStudentId] = useState([]);
  const getReviewWithStudentId = async () => {
    if (!stuUserId) return;
    try {
      const response = await axiosInstance.get(`${port}/gettingReviewWithStudentId/${stuUserId}`);
      setReviewWithStudentId(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  //adding review
  const [addReview, setAddReview] = useState({
    student_id: stuUserId,
    course_id: id,
    rating: "",
    review: "",
  });
  const handleReviewChange = (e) => {
    const { name, value } = e.target;

    setAddReview((prevReview) => ({
      ...prevReview,
      [name]: name === "rating" ? parseInt(value || 0, 10) : value,
      student_id: stuUserId,
    }));
  };
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const reviewData = { ...addReview, student_id: stuUserId };
    if (reviewData.rating === 0) {
      notifyWarning("Please Enter Rating");
      return;
    }
    if (reviewData.review === '') {
      notifyWarning("Please Enter Review");
      return
    }
    try {
      if (reviewWithStudentId && Object.keys(reviewWithStudentId).length > 0) {
        const res = await axiosInstance.put(`${port}/updatingReview/${reviewWithStudentId.id}`, reviewData);
        notifySuccess("Review Updated Successfully");
        getReviewWithStudentId();
      } else {
        const res = await axiosInstance.post(`${port}/addingReview`, reviewData);
        notifySuccess("Review Added Successfully");
        getReviewWithStudentId();
      }
      setIsReviewOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  //review get with student id
  useEffect(() => {
    if (reviewWithStudentId) {
      setAddReview({
        student_id: stuUserId,
        course_id: id,
        rating: reviewWithStudentId.rating || 0,
        review: reviewWithStudentId.review || "",
      });
    }
  }, [reviewWithStudentId, stuUserId, id]);
  useEffect(() => {
    document.title = "Comfort Security | Course Video"; // Set the page title dynamically
  }, []);
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
                <img src={require("../../assets/image/web logo.png")} alt="logo" />
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
                <div className="absolute right-0 top-9 bg-white border rounded shadow-md p-3 w-[270px] z-10">
                  {/* Time Spent */}
                  <div className="mb-1.5 text-base">
                    <span className="font-semibold">Time Spent: </span>
                    <span className="text-gray-800 text-[14px]">{totalTimeInMinutes}:{remainingSeconds}</span>
                  </div>

                  {/* Progress */}
                  <div className="text-base mb-1.5">
                    <span className="font-semibold">Your Progress: </span>
                    <span className="text-gray-800 text-[14px]">
                      {(() => {
                        let completedLessonIds = courseProgress?.completed_lesson_id;

                        try {
                          if (!completedLessonIds) {
                            completedLessonIds = [];
                          } else if (typeof completedLessonIds === "string") {
                            completedLessonIds = completedLessonIds.replace(/^"|"$/g, ""); // Remove extra surrounding quotes
                            completedLessonIds = JSON.parse(completedLessonIds); // Parse it as JSON array
                          }
                        } catch (error) {
                          console.error("Failed to parse completed_lesson_id into an array:", error.message);
                        }
                        return `${completedLessonIds.length} of ${lessonDataWithCourseId.length} (${((completedLessonIds.length / lessonDataWithCourseId.length) * 100).toFixed(0)}%)`;

                      })()}
                    </span>
                  </div>

                  {/* Rating & Review */}
                  <div className="flex items-center justify-between ">
                    <button className="text-base font-semibold" onClick={() => setIsReviewOpen(true)}>Leave Your Review</button>
                  </div>
                </div>
              )}
            </div>

            {/* Full Content for Larger Screens */}
            <div className="hidden xl:flex items-center space-x-6">
              {/* Time Spent */}
              <div className="text-base">
                <span className="font-semibold">Time Spent: </span>
                <span className="text-gray-800 text-sm">
                  {totalTimeInMinutes}:{remainingSeconds}
                </span>
              </div>

              {/* Rating & Review */}
              <div className="flex items-center justify-between">
                <button className="text-base font-semibold" onClick={() => setIsReviewOpen(true)}>Leave Your Reviews</button>
              </div>
              {/* Progress */}
              <div className="text-base">
                <span className="font-semibold">Your Progress: </span>
                <span className="text-gray-800 text-sm">
                  {(() => {
                    let completedLessonIds = courseProgress?.completed_lesson_id;

                    try {
                      if (!completedLessonIds) {
                        completedLessonIds = [];
                      } else if (typeof completedLessonIds === "string") {
                        completedLessonIds = completedLessonIds.replace(/^"|"$/g, ""); // Remove extra surrounding quotes
                        completedLessonIds = JSON.parse(completedLessonIds); // Parse it as JSON array
                      }
                    } catch (error) {
                      console.error("Failed to parse completed_lesson_id into an array:", error.message);
                    }
                    return `${completedLessonIds.length} of ${lessonDataWithCourseId.length} (${((completedLessonIds.length / lessonDataWithCourseId.length) * 100).toFixed(0)}%)`;

                  })()}
                </span>
              </div>
            </div>

            {/* Back Button */}
            <button className="back-btn" onClick={handleBack}>
              <div >
                <i className="fa-solid fa-angle-left mr-2"></i>
                <span>Back To Main</span>
              </div>
            </button>

          </div>
          <div className="course-video-container ">
            {/* Video Section */}
            <div className="video-player p-2 ">
              <div className={editLessonData?.lesson_type == "text" || editLessonData?.lesson_type == "pdf" ? "thumbnail-container" : "thumbnail-other-type-container"}>
                {editLessonData?.title || editQuizData?.title ? (
                  <div className="edit-content border-2">
                    {editLessonData?.title && (
                      <>
                        <div className=" stu_dashboard_coursevideo_view-header md:flex block justify-between items-center border-b p-2 " style={{ backgroundColor: "#F5F6FA" }}>
                          <div className="flex">
                            <h2 className="font-bold flex text-xl text-black">{editLessonData.title}
                            </h2>
                            <span className="ml-2 font-semibold px-2 py-0.5 h-fit text-[12px] rounded bg-[#DDDDDD] uppercase">{editLessonData.lesson_type}</span>
                          </div>
                          <div className="flex items-center">
                            <p className="course_module_duration me-2"><strong>Duration:</strong> {editLessonData.duration || "0"} Minutes</p>
                            {!(
                              (courseProgress.completed_lesson_id &&
                                JSON.parse(courseProgress.completed_lesson_id).includes(editLessonData.id)) &&
                              currentModuleTime >= filteredModuleData[0]?.time || currentModuleTime.length < 0
                            ) && (
                                <button
                                  type="button"
                                  className="primary-btn module-btn"
                                  onClick={handleViewedLessonData}
                                >
                                  Next
                                </button>
                              )}
                          </div>
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
                          <div className="long-desc p-3" >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: editLessonData?.text_content,
                              }}
                            ></p>
                          </div>
                        )}
                        {editLessonData.lesson_type === "pdf" && (
                          <div className="pdf-container">
                            <iframe
                              src={`../../upload/${editLessonData.attachment}`}
                              width="100%"
                              height="500px"
                              title="PDF Viewer"
                              className="border shadow"
                            ></iframe>
                          </div>
                        )}
                        {editLessonData.lesson_type === "video" && (
                          <>
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
                            <div className="long-desc p-3" >
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: editLessonData?.text_content,
                                }}
                              ></p>
                            </div>
                          </>
                        )}
                        <div className="long-desc mt-4">
                          <p id="description_bottom" className="p-3">
                            {editLessonData.description || "No description available"}
                          </p>
                        </div>

                      </>
                    )}
                    <div>
                      {editQuizData?.title && (
                        <>
                          {/* Simplified Header Section */}
                          <header className="mb-6" style={{ backgroundColor: "#F5F6FA" }}>
                            <div className="stu_dashboard_coursevideo_view-header md:flex block justify-between items-center p-2 " >
                              <div className="flex">
                                <h2 className="font-bold flex text-xl text-black">{editQuizData.title}
                                </h2>
                                <span className="ml-2 font-semibold px-2 py-0.5 h-fit text-[12px] rounded bg-[#DDDDDD] uppercase">Quiz</span>
                              </div>


                              <p className="text-sm text-gray-600 mt-2 md:mt-0">
                                <strong>Instruction:</strong> {editQuizData.instruction || "No instructions available"}
                              </p>
                            </div>
                            <div className="flex justify-between mx-auto border-y p-2 text-sm text-gray-600">
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
                          <section className="max-w-[650px] p-3 mx-auto">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                              <span className="mr-2 font-extrabold">{currentQuestionIndex + 1}.)</span>
                              {quizQuestionData[currentQuestionIndex]?.title}
                              {quizeResultId && quizeResultId.quiz_id == editLessonData.quiz_id && (
                                <span className="ml-2 font-extrabold">({quizPassOrFail ? quizPassOrFail : ""})</span>
                              )}
                            </h2>
                            {quizQuestionData[currentQuestionIndex]?.options && (
                              <ul className="space-y-3">
                                {JSON.parse(quizQuestionData[currentQuestionIndex].options).map((option, index) => (
                                  option &&
                                  <li key={index}>
                                    {quizeResultId && quizeResultId.quiz_id === editLessonData.quiz_id && quizPassOrFail == "pass" ? (
                                      // If user already attempted the quiz, show selected option but disable changes
                                      <label
                                        className={`block px-4 py-3 rounded-lg ${answers[quizQuestionData[currentQuestionIndex].id] === index
                                          ? "bg-blue-500 text-white shadow-md"
                                          : "bg-gray-100"
                                          }`}
                                      >
                                        <span className="mr-2 font-semibold">{index + 1}.</span>
                                        <input
                                          type="radio"
                                          name={`question-${quizQuestionData[currentQuestionIndex].id}`}
                                          value={option}
                                          checked={answers[quizQuestionData[currentQuestionIndex].id] === index}
                                          disabled
                                          className="hidden"
                                        />
                                        {option}
                                      </label>
                                    ) : (
                                      // If the user hasn't attempted or is retaking, allow selection
                                      <label
                                        className={`block px-4 py-3 rounded-lg cursor-pointer transition ${answers[quizQuestionData[currentQuestionIndex].id] === index
                                          ? "bg-blue-500 text-white shadow-md"
                                          : "bg-gray-100 hover:bg-blue-200"
                                          }`}
                                      >
                                        <span className="mr-2 font-semibold">{index + 1}.</span>
                                        <input
                                          type="radio"
                                          name={`question-${quizQuestionData[currentQuestionIndex].id}`}
                                          value={option}
                                          checked={answers[quizQuestionData[currentQuestionIndex].id] === index}
                                          onChange={() => handleAnswerChange(quizQuestionData[currentQuestionIndex].id, index)}
                                          className="hidden"
                                        />
                                        {option}
                                      </label>
                                    )}
                                  </li>
                                ))}
                              </ul>

                            )}
                          </section>

                          {/* Navigation Section */}
                          <footer className="md:px-20 sm:px-1 py-3 mt-8 border-t flex items-center justify-between  " style={{ backgroundColor: '#F5F6FA' }}>
                            {/* Previous Button */}
                            <button
                              onClick={prevQuestion}
                              className={`min-w-[115px] sm:min-w-[130px] px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${currentQuestionIndex === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-400 text-white hover:bg-gray-500 hover:shadow-md"
                                }`}
                              disabled={currentQuestionIndex === 0}
                            >
                              <i className="fa-solid fa-circle-chevron-left"></i> Previous
                            </button>

                            {/* Next Button */}
                            {currentQuestionIndex !== quizQuestionData.length - 1 ? (
                              <button
                                onClick={nextQuestion}
                                className=" min-w-[130px] px-5 py-3 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md transition-all duration-200"
                              >
                                Next <i className="fa-solid fa-circle-chevron-right"></i>
                              </button>
                            ) : (
                              <button
                                className="px-5 py-3 rounded-lg text-sm font-medium bg-blue-400 text-white cursor-not-allowed transition-all duration-200"
                                disabled
                              >
                                Next <i className="fa-solid fa-circle-chevron-right"></i>
                              </button>
                            )}

                            {/* Submit Button */}
                            {
                              (() => {
                                let completedLessonIds = courseProgress?.completed_lesson_id;

                                try {
                                  if (!completedLessonIds) {
                                    completedLessonIds = [];
                                  } else if (typeof completedLessonIds === "string") {
                                    completedLessonIds = completedLessonIds.replace(/^"|"$/g, ""); // Remove extra surrounding quotes
                                    completedLessonIds = JSON.parse(completedLessonIds); // Parse it as JSON array
                                  }
                                } catch (error) {
                                  console.error("Failed to parse completed_lesson_id into an array:", error.message);
                                }

                                // Check if user has already passed the quiz
                                if (completedLessonIds && completedLessonIds.includes(compareLessonId) && quizPassOrFail === "pass") {
                                  return <p className="text-green-600 font-bold">You have already passed this quiz!</p>;
                                } else {
                                  return (
                                    <button
                                      onClick={handleSubmitQuizAnswer}
                                      className="min-w-[130px] px-5 py-3 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 hover:shadow-md transition-all duration-200"
                                    >
                                      Submit
                                    </button>
                                  );
                                }
                              })()
                            }

                            {/* {
                              lessonDataWithCourseId &&
                                lessonDataWithCourseId.some((item) => item.quiz_id === editQuizData.id) ? (
                                ""
                              ) : (
                                <button
                                  onClick={handleSubmitQuizAnswer}
                                  className="flex-1 px-5 py-3 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 hover:shadow-md transition-all duration-200"
                                >
                                  Submit
                                </button>
                              )} */}
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
                <div className="md:hidden block course-info md:ml-2 my-2.5 ">
                  {moduleData.length > 0 ? (
                    moduleData.map((module, moduleIndex) => {
                      const totalSeconds = module.time;
                      const totalMinutes = totalSeconds / 60;
                      const minutes = totalMinutes % 60;
                      const formattedTime = `${parseFloat(minutes.toFixed(2))} minutes`;
                      return (
                        <div className="module" key={moduleIndex}>
                          <div
                            className={`module-header ${activeModuleIndex2 === module.id ? "active" : ""}`}
                            onClick={() =>
                              toggleContent(
                                module.id,
                                module.id,
                                activeModuleIndex2 === module.id ? null : module.id
                              )
                            }
                          >
                            <span className="module-title">
                              MODULE-{moduleIndex + 1} : {module.title}
                            </span>
                            <div className="flex gap-2 item-center">

                              {totalSeconds && totalSeconds !== 0 ? (
                                <span className="module-duration">{formattedTime}</span>
                              ) : null}
                              <div className="module-controls">
                                <button className="check-btn">
                                  <i
                                    className={`fa-solid ${activeModuleIndex2 === module.id ? "fa-angle-up" : "fa-angle-down"
                                      }`}
                                  ></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          {activeModuleIndex2 === module.id && (
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
                                        JSON.parse(courseProgress.completed_lesson_id)?.includes(lesson.id)
                                    }
                                    const canAccess =
                                      (courseProgress &&
                                        courseProgress.completed_lesson_id &&
                                        JSON.parse(courseProgress.completed_lesson_id).includes(lesson.id)) ||
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
                                                <i className="fa-solid fa-file-pdf"></i>
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
                                              onChange={() => !isCompleted && handleViewedLessonData()}
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
            </div>
            {/* Rating & Review Dropdown */}
            {isReviewOpen && (
              <div className="leave_your_review_model">
                <div className="leave_your_review_model_container">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-[22px] font-bold text-black">
                      Write Your Review
                    </h2>
                    <button onClick={() => setIsReviewOpen(false)}><i className="fa-solid fa-xmark text-lg"></i></button>
                  </div>
                  <form onSubmit={handleSubmitReview}>
                    {/* Star Rating */}

                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`cursor-pointer text-base ${index < addReview.rating
                            ? "fa-solid fa-star text-orange-500"
                            : "fa-regular fa-star text-gray-300"
                            }`}
                          onClick={() =>
                            setAddReview((prevReview) => ({
                              ...prevReview,
                              rating: index + 1, // Update rating based on star clicked
                            }))
                          }
                        ></i>
                      ))}
                    </div>
                    {/* Review Text */}
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-4 h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      name="review"
                      placeholder="Share your experience about this course..."
                      value={addReview.review}
                      onChange={handleReviewChange}
                    ></textarea>
                    <button
                      type="submit"
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="md:block hidden course-info md:ml-2">
              {moduleData.length > 0 ? (
                moduleData.map((module, moduleIndex) => {
                  const totalSeconds = module.time;
                  const totalMinutes = totalSeconds / 60;
                  const minutes = totalMinutes % 60;
                  const formattedTime = `${parseFloat(minutes.toFixed(2))} minutes`;
                  return (
                    <div className="module" key={moduleIndex}>
                      <div
                        className={`module-header ${activeModuleIndex2 === module.id ? "active" : ""}`}
                        onClick={() =>
                          toggleContent(
                            module.id,
                            module.id,
                            activeModuleIndex2 === module.id ? null : module.id
                          )
                        }
                      >
                        <span className="module-title">
                          MODULE-{moduleIndex + 1} : {module.title}
                        </span>
                        <div className="flex gap-2 item-center">
                          {totalSeconds && totalSeconds !== 0 ? (
                            <span className="module-duration">{formattedTime}</span>
                          ) : null}
                          <div className="module-controls">
                            <button className="check-btn">
                              <i
                                className={`fa-solid ${activeModuleIndex2 === module.id ? "fa-angle-up" : "fa-angle-down"
                                  }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      {activeModuleIndex2 === module.id && (
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
                                    JSON.parse(courseProgress.completed_lesson_id)?.includes(lesson.id)
                                }
                                const canAccess =
                                  (courseProgress &&
                                    courseProgress.completed_lesson_id &&
                                    JSON.parse(courseProgress.completed_lesson_id).includes(lesson.id)) ||
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
                                            <i className="fa-solid fa-file-pdf"></i>
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
                                          onChange={() => !isCompleted && handleViewedLessonData()}
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