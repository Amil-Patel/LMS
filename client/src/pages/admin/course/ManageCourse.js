import React, { useContext, useEffect, useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/course/course.css";
import "../../../assets/css/main.css";
import "../../../assets/css/sidebar.css";
import { userRolesContext } from "../layout/RoleContext";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
const port = process.env.REACT_APP_URL

const ManageCourse = () => {
  const { id } = useParams();
  const { userRole, userId } = useContext(userRolesContext);
  const [moduleData, setModuleData] = useState([]);//state for getting module data
  const [tab, setTab] = useState("course"); // state for tab
  const [lessonOpen, setLessonOpen] = useState(false); // state for open lesson modal
  const [moduleOpen, setModuleOpen] = useState(false); // state for open module modal
  const [editModuleOpen, setEditModuleOpen] = useState(false); // state for open module modal
  const [quizOpen, setQuizOpen] = useState(false); // state for open quiz modal
  const [questionOpen, setQuestionOpen] = useState(false); // state for open question modal
  const [addquestionOpen, setAddQuestionOpen] = useState(false); // state for open add question modal
  const [editquestionOpen, setEditQuestionOpen] = useState(false); // state for open edit question modal
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isContentVisible, setIsContentVisible] = useState([]); // state for module dropdown icon
  const [showQuiz, setShowQuiz] = useState(true);
  const [selectedLessonType, setSelectedLessonType] = useState("text");
  const [openQuizIndex, setOpenQuizIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(false);
  const [sortedData, setSortedData] = useState([]); // acedemic student name
  const [openQuizResult, setopenQuizResult] = useState(false); // state for open quiz result modal
  const [quizDocumentOpen, setQuizDocumentOpen] = useState(false); // state for open quiz document modal

  // Function to toggle dropdown visibility based on index
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  // Function to change the currently active tab
  const handleChangeTab = (tabName) => {
    setTab(tabName);
  };
  // Function to toggle visibility of content
  const toggleContent = (index, id) => {
    setIsContentVisible((prevVisibleModules) =>
      prevVisibleModules.map((isVisible, i) =>
        i === index ? !isVisible : isVisible
      )
    );
    getLessonData(id);
  };
  useEffect(() => {
    if (moduleData.length > 0) {
      setIsContentVisible(Array(moduleData.length).fill(false));
    }
  }, [moduleData]); // This will run whenever moduleData changes

  // Function to toggle visibility of module modal
  const moduleToggleModal = () => {
    setModuleOpen(!moduleOpen);
  };

  // Function to toggle visibility of edit module modal
  const editModuleToggleModal = async (id) => {
    if (id) {
      await getModuleDataForEdit(id);
    }
    setEditModuleOpen(!editModuleOpen);
  };

  // Function to toggle visibility of lesson modal
  const [sectionId, setSectionId] = useState(null)
  const lessonToggleModal = async (id) => {
    setLessonOpen(!lessonOpen);
    setSectionId(id);
  };

  // Function to toggle visibility of quiz modal
  const quizToggleModal = (id) => {
    setQuizOpen(!quizOpen);
    setSectionId(id);
  };

  // Function to toggle visibility of question modal
  const questionToggleModal = () => {
    setQuestionOpen(!questionOpen);
  };

  // Function to toggle visibility of add question modal
  const addQuestionToggleModal = () => {
    setAddQuestionOpen(!addquestionOpen);
  };

  // Function to toggle visibility of edit question modal
  const editQuestionToggleModal = () => {
    setEditQuestionOpen(!editquestionOpen);
  };

  // Function to toggle visibility of quiz result module
  const openQuizResultmodule = () => {
    setopenQuizResult(!openQuizResult); // Correctly toggling openQuizResult state
  };

  // Function to toggle visibility of quiz document modal
  const quizDocumentToggleModal = () => {
    setQuizDocumentOpen(!quizDocumentOpen); // Fixed the state variable name
  };
  //module section start
  //get module data

  const getModuleData = async () => {
    try {
      const res = await axios.get(`${port}/gettingCourseSectionData/${id}`);
      setModuleData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  //add module 
  const [addModule, setAddModule] = useState({
    title: "",
    course_id: id,
    status: '',
  });
  const hadnleAddMouleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddModule({
      ...addModule,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  };
  const handleAddModuleSubmit = async (e) => {
    e.preventDefault();
    console.log(addModule)
    try {
      const res = await axios.post(`${port}/addingCourseSection`, addModule);
      getModuleData();
      setModuleOpen(false);
      setAddModule({
        title: "",
        course_id: id,
        status: '',
      });
    } catch (error) {
      console.log(error);
    }
  }
  //edit module
  const [editModule, setEditModule] = useState({
    title: "",
    course_id: id,
    status: '',
  })
  const [editId, setEditId] = useState(null)
  const getModuleDataForEdit = async (id) => {
    setEditId(id)
    try {
      const res = await axios.get(`${port}/gettingCourseSectionDataWithId/${id}`);
      setEditModule(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  const hadnleEditMouleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditModule({
      ...editModule,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  };
  const handleEditModuleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${port}/updatingCourseSection/${editId}`, editModule);
      getModuleData();
      setEditModuleOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  //delete module
  const [deleteId, setDeleteId] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const deleteToggleModal = (id) => {
    setDeleteId(id)
    setDeleteOpen(!deleteOpen);
  }
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${port}/deletingCourseSection/${deleteId}`);
      getModuleData();
      setDeleteOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  //lesson section
  //get lesson data
  const [lessonData, setLessonData] = useState([]);
  const getLessonData = async (id) => {
    try {
      const res = await axios.get(`${port}/gettingCourseLessonDataWithSectionId/${id}`);
      setLessonData(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  //add lesson section
  const [addLesson, setAddLesson] = useState({
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
    order: 0,
  })

  const handleAddLessonChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddLesson({
      ...addLesson,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  }

  const handleAddLessonFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) {
      return;
    }
    const file = files[0];

    const allowedTypes = {
      video: ['video/mp4', 'video/mkv', 'video/avi'],
      pdf: ['application/pdf'],
      thumbnail_preview_image_url: ['image/jpeg', 'image/png', 'image/jpg'],
    };

    if (name === 'attachment') {
      if (addLesson.lesson_type === 'video' && !allowedTypes.video.includes(file.type)) {
        alert("Invalid file type for video lesson. Please upload a valid video.");
        return;
      } else if (addLesson.lesson_type === 'pdf' && !allowedTypes.pdf.includes(file.type)) {
        alert("Invalid file type for PDF attachment. Please upload a valid PDF.");
        return;
      }
    } else if (name === 'thumbnail_preview_image_url') {
      if (!allowedTypes.thumbnail_preview_image_url.includes(file.type)) {
        alert("Invalid file type for thumbnail_preview_image_url. Please upload a valid image.");
        return;
      }
    }

    setAddLesson({
      ...addLesson,
      [name]: file,
    });
  };

  const handleAddLessonSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", addLesson.title);
    formData.append("duration", addLesson.duration);
    formData.append("course_id", addLesson.course_id);
    formData.append("lesson_type", addLesson.lesson_type);
    formData.append("url", addLesson.url);
    formData.append("text_content", addLesson.text_content);
    formData.append("is_preview", addLesson.is_preview);
    formData.append("status", addLesson.status);
    formData.append("is_count_time", addLesson.is_count_time);
    formData.append("description", addLesson.description);
    formData.append("order", addLesson.order);

    if (addLesson.attachment) {
      formData.append("attachment", addLesson.attachment);
    }
    if (addLesson.thumbnail_preview_image_url) {
      formData.append("thumbnail_preview_image_url", addLesson.thumbnail_preview_image_url);
    }
    try {
      const res = await axios.post(`${port}/addingCourseLesson/${sectionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getLessonData(sectionId);
      setLessonOpen(false);

      // Reset the form state after submission
      setAddLesson({
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
        order: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //edit lesson data
  const [editLessonId, setEditLessonId] = useState(null);
  const [nullQuizeId, setNullQuizeId] = useState(null);
  const [editLessonOpen, setEditLessonOpen] = useState(false);
  const editLessonToggleModal = async (id, quizId, num) => {
    if (num === 1) {
      if (id) {
        await getLessonDataForEdit(id);
        await setEditLessonId(id);
      }
      if (quizId !== null) {
        await getQuizeDataForEdit(quizId);
      }
    }
    setNullQuizeId(quizId)
    setEditLessonOpen(!editLessonOpen);
  }
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
  const getLessonDataForEdit = async (id) => {
    try {
      const res = await axios.get(`${port}/gettingCourseLessonDataWithId/${id}`);
      setEditLessonData(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditLessonChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditLessonData({
      ...editLessonData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    })
  }
  const handleEditLessonFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    setEditLessonData({
      ...editLessonData,
      [name]: file
    });
  }

  const handleEditLessonSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editLessonData.title);
    formData.append("duration", editLessonData.duration);
    formData.append("course_id", editLessonData.course_id);
    formData.append("lesson_type", editLessonData.lesson_type);
    formData.append("url", editLessonData.url);
    formData.append("text_content", editLessonData.text_content);
    formData.append("is_preview", editLessonData.is_preview);
    formData.append("status", editLessonData.status);
    formData.append("is_count_time", editLessonData.is_count_time);
    formData.append("description", editLessonData.description);
    formData.append("order", editLessonData.order);
    if (editLessonData.attachment) {
      formData.append("attachment", editLessonData.attachment);
    }
    if (editLessonData.thumbnail_preview_image_url) {
      formData.append("thumbnail_preview_image_url", editLessonData.thumbnail_preview_image_url);
    }
    try {
      const res = await axios.put(`${port}/updatingCourseLesson/${editLessonId}`, formData);
      getLessonData(sectionId);
      setEditLessonOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  //quize module 
  //add quize module
  const [addQuiz, setAddQuiz] = useState({
    title: "",
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

  const handleAddQuizChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddQuiz({
      ...addQuiz,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  }

  const handleAddQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${port}/addingCourseQuize/${sectionId}`, addQuiz);
      getLessonData(sectionId);
      setQuizOpen(false);
      setMaxAttempts(false);
      setTimeLimit(false);
      setAddQuiz({
        title: "",
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
    } catch (error) {
      console.log(error);
    }
  }
  //edit quize data

  const [editQuizData, setEditQuizData] = useState({
    title: "",
    section_id: sectionId,
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

  const getQuizeDataForEdit = async (id) => {
    try {
      const res = await axios.get(`${port}/gettingCourseQuizeDataWithId/${id}`);
      const quizData = res.data;
      setEditQuizData(quizData);

      if (quizData) {
        if (quizData.no_of_q_retakes != null) {
          setMaxAttempts(true);
        }
        if (quizData.expire_time != null) {
          setTimeLimit(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditQuizChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditQuizData({
      ...editQuizData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  }

  const handleEditQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${port}/updatingCourseQuize/${nullQuizeId}`, editQuizData);
      getLessonData(sectionId);
      setEditLessonOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  //delete quize
  const [deleteQuizeOpen, setDeleteQuizeOpen] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState(null);
  const [deleteLessonId, setDeleteLessonId] = useState(null);
  const handleDeleteQuizeOpen = (id, quizId) => {
    setDeleteQuizId(quizId);
    setDeleteLessonId(id);
    setDeleteQuizeOpen(!deleteQuizeOpen);
  }

  const handleDeleteLesson = async () => {
    try {
      const res = await axios.delete(`${port}/deletingCourseLesson/${deleteLessonId}`);
      getLessonData(sectionId);
      setDeleteQuizeOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteQuize = async () => {
    try {
      const res = await axios.delete(`${port}/deletingCourseQuize/${deleteQuizId}`);
      getLessonData(sectionId);
      setDeleteQuizeOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getModuleData();
  }, [])

  const handleTimeLimit = () => {
    setTimeLimit(!timeLimit)
  }
  const handleMaxAttempts = () => {
    setMaxAttempts(!maxAttempts)
  }

  // Example data for the quiz modal
  const quizeData = [
    {
      question: "1. Your First Question Will Appear Here ?",
      answers: [
        { letter: "A", text: "Introduction to Security Guard" },
        { letter: "B", text: "Introduction to Security Guard" },
        { letter: "C", text: "Introduction to Security Guard" },
        { letter: "D", text: "Introduction to Security Guard" },
      ],
    },
    {
      question: "2. Your Second Question Will Appear Here ?",
      answers: [
        { letter: "A", text: "Lesson A" },
        { letter: "B", text: "Lesson B" },
        { letter: "C", text: "Lesson C" },
        { letter: "D", text: "Lesson D" },
      ],
    },
    {
      question: "3. Your Third Question Will Appear Here ?",
      answers: [
        { letter: "A", text: "Module A" },
        { letter: "B", text: "Module B" },
        { letter: "C", text: "Module C" },
        { letter: "D", text: "Module D" },
      ],
    },
  ];

  // Function to toggle which quiz module is open based on index
  const toggleQuizModule = (index) => {
    setOpenQuizIndex(index === openQuizIndex ? null : index);
  };

  // Array of initial data for student progress
  const initialData = [
    {
      Student_name: "Hlimon Sorey",
      Enroll_Date: "27-12-2024",
      Completed_Date: "27-12-2024",
      Time_Spent: "37:09:32",
      Progress: "80%",
      Completed_Lesson: "50 out of 60",
      Last_Seen: "27-12-2024",
      Quiz_Passed: "2/9 ",
    },
  ];

  // useEffect hook to set sorted data when the component mounts or when `setSortedData` changes
  useEffect(() => {
    setSortedData(initialData);
  }, [setSortedData]);

  // Quiz Result Table Data
  const data = [
    {
      id: 1,
      title: "Quiz 1",
      totalMarks: 100,
      passMarks: 33,
      obtainMarks: 80,
      attempts: 1,
      result: "Pass",
    },
    {
      id: 2,
      title: "Quiz 2",
      totalMarks: 100,
      passMarks: 33,
      obtainMarks: 60,
      attempts: 2,
      result: "Pass",
    },
    {
      id: 3,
      title: "Quiz 3",
      totalMarks: 100,
      passMarks: 33,
      obtainMarks: 20,
      attempts: 1,
      result: "Fail",
    },
  ];

  // Quiz Document Table Data
  const document_data = [
    {
      id: 1,
      doc_category: "General",
      doc_title: "Title",
      date_upload: "27-04-2024",
      description: "Description",
    },
    {
      id: 2,
      doc_category: "Course : Course Name",
      doc_title: "Title",
      date_upload: "27-04-2024",
      description: "Description",
    },
  ];

  return (
    <>
      <Hoc />
      <div class="main">
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
        </div>

        <div className="admin-panel-tab-bar">
          <div>
            <ul className="tab">
              <li onClick={() => handleChangeTab("course")}>
                <NavLink className={tab === "course" ? "active-tab" : ""}>COURSE</NavLink>
              </li>
              |
              <li onClick={() => handleChangeTab("academic-progress")}>
                <NavLink className={tab === "academic-progress" ? "active-tab" : ""}>ACADEMIC PROGRESS</NavLink>
              </li>
            </ul>
          </div>
          {tab == "course" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <button
                className="primary-btn module-btn"
                onClick={moduleToggleModal}
              >
                + Add Module
              </button>
              <button className="primary-btn module-btn">Sort</button>
            </div>
          )}
        </div>

        <div className="course-form-container">
          {/* Module TAB */}
          {tab == "course" && (
            moduleData.length > 0 ? (
              moduleData.map((module, index) => (
                <div div className="module">
                  <div className="module-header">
                    <span className="module-title">
                      MODULE-{index + 1} : {module.title}
                    </span>
                    <span className="module-duration">15 Hours</span>
                    <span className="module-status green-dot"></span>
                    <div className="module-controls">
                      <button className="arrow-btn">
                        <i class="fa-solid fa-sort"></i>{" "}
                      </button>
                      <button className="edit-btn" onClick={() => editModuleToggleModal(module.id)}>
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button className="delete-btn" onClick={() => deleteToggleModal(module.id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                      <button className="check-btn" onClick={() => toggleContent(index, module.id)}>
                        <i class="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                  {isContentVisible[index] && (
                    <div className="module-content">
                      {lessonData.map((lesson, index) => (
                        <div className="module-lesson" key={index}>
                          <div className="lesson-title">
                            {lesson.quiz_id ? (
                              <span className="quiz-icon">?</span>
                            ) : (
                              <span className="lesson-icon">
                                <i class="fa-solid fa-file-word"></i>
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
                            {lesson.duration && <span>{lesson.duration} Minutes</span>}
                          </div>
                          <div className="lesson-actions">
                            {lesson.quiz_id && (
                              <button
                                className="add-questions-btn"
                                onClick={questionToggleModal}
                              >
                                + Add Questions
                              </button>
                            )}
                            <button className="resource-btn">
                              <i class="fa-solid fa-folder-open"></i>Resource
                            </button>
                            <label class="switch">
                              <input
                                type="checkbox"
                                checked={lesson.status === 1}
                              // onChange={() => handleStatusChange(index)}
                              />
                              <span class="slider"></span>
                            </label>
                            <span className="edit-btn" onClick={() => editLessonToggleModal(lesson.id, lesson.quiz_id, 1)}>
                              <i className="fa fa-pencil"></i>
                            </span>
                            <button className="delete-btn" onClick={() => handleDeleteQuizeOpen(lesson.id, lesson.quiz_id, 1)}>
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="module-actions">
                        <button onClick={() => lessonToggleModal(module.id)}>+ Lesson</button>
                        <button onClick={() => quizToggleModal(module.id)}>+ Add Quiz</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No data avalible</p>
            )
          )}

          {/* Academic TAB */}
          {tab === "academic-progress" && (
            <table>
              <thead className="academic-table">
                <tr>
                  <th>ID</th>
                  <th>Student name</th>
                  <th>Enroll Date</th>
                  <th>Completed Date</th>
                  <th>Time Spent</th>
                  <th>Progress</th>
                  <th>Completed Lesson</th>
                  <th>Last Seen</th>
                  <th>Quiz Passed</th>
                  <th>Inquiry Status</th>
                </tr>
              </thead>

              <tbody>
                {sortedData.map((i, index) => {
                  return (
                    <tr key={index}>
                      <td className="id">{index + 1}</td>
                      <td>
                        <h6>{i.Student_name}</h6>
                      </td>
                      <td>{i.Enroll_Date}</td>
                      <td>{i.Completed_Date}</td>
                      <td>{i.Time_Spent}</td>
                      <td>{i.Progress}</td>
                      <td>{i.Completed_Lesson}</td>
                      <td>{i.Last_Seen}</td>
                      <td style={{ textAlign: "center" }}>
                        {i.Quiz_Passed}
                        <span className="view" onClick={openQuizResultmodule}>
                          <i className="fa-regular fa-eye"></i>
                        </span>
                      </td>
                      <td>
                        <button
                          className="resource-btn module-btn"
                          onClick={quizDocumentToggleModal}
                        >
                          <i
                            className="fa-regular fa-file"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Document
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div >

        {/* Module Modal */}
        {
          moduleOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                <h5 style={{ marginBottom: "20px" }}>Module</h5>
                <form onSubmit={handleAddModuleSubmit}>
                  <div className="form-group">
                    <label>Module Title</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col12input"
                      name="title"
                      onChange={hadnleAddMouleChange}
                      value={addModule.title}
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: "flex" }}>
                      <div>
                        <label>
                          <input type="checkbox" name="status" onChange={hadnleAddMouleChange} checked={addModule.status} defaultChecked /> Active
                        </label>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={moduleToggleModal}
                      className="secondary-btn"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {/* edit modules model open */}
        {
          editModuleOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                <h5 style={{ marginBottom: "20px" }}>Edit Module</h5>
                <form onSubmit={handleEditModuleSubmit}>
                  <div className="form-group">
                    <label>Module Title</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col12input"
                      name="title"
                      onChange={hadnleEditMouleChange}
                      value={editModule.title}
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: "flex" }}>
                      <div>
                        <label>
                          <input type="checkbox" name="status" onChange={hadnleEditMouleChange} checked={editModule.status} /> Active
                        </label>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={editModuleToggleModal}
                      className="secondary-btn"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {/* Delete Confirmation Modal */}
        {deleteOpen && (
          <div className="modal">
            <div className="modal-container">
              <h5>Delete Coupon</h5>
              <p>Are you sure you want to delete this module?</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button className="primary-btn" onClick={handleDelete}>
                  Delete
                </button>
                <button onClick={deleteToggleModal} className="secondary-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {deleteQuizeOpen && (
          <div className="modal">
            <div className="modal-container">
              <h5>Delete</h5>
              <p>Are you sure you want to delete this module?</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button className="primary-btn" onClick={deleteQuizId != null ? handleDeleteQuize : handleDeleteLesson}>
                  Delete
                </button>
                <button onClick={handleDeleteQuizeOpen} className="secondary-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lesson Modal */}
        {
          lessonOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                <h5 style={{ marginBottom: "10px" }}>Add Lesson</h5>
                <form onSubmit={handleAddLessonSubmit}>
                  <div className="form-group">
                    <label>Lesson Type</label>
                    <select
                      className="col12input"
                      onChange={handleAddLessonChange}
                      name="lesson_type"
                    >
                      <option value="">Select Lesson Type</option>
                      <option value="text">Text</option>
                      <option value="pdf">PDF</option>
                      <option value="youtube-video">YouTube video</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Lesson Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Lesson Title"
                      name="title"
                      onChange={handleAddLessonChange}
                      value={addLesson.title}
                      className="col12input"
                    />
                  </div>
                  {(addLesson.lesson_type === "pdf" ||
                    addLesson.lesson_type === "video") && (
                      <div className="form-group">
                        <label>Attachment</label>
                        <input type="file" className="col12input" name="attachment" onChange={handleAddLessonFileChange} />
                      </div>
                    )}

                  <div style={{ display: "flex", gap: "10px" }}>
                    {addLesson.lesson_type === "youtube-video" && (
                      <div className="form-group">
                        <label>Video URL</label>
                        <input
                          type="text"
                          placeholder="Video URL"
                          className="col12input"
                          name="url"
                          onChange={handleAddLessonChange}
                          value={addLesson.url}
                        />
                      </div>
                    )}
                    {addLesson.lesson_type === "pdf" && (
                      <div className="form-group">
                        <label>Document Path URL</label>
                        <input
                          type="text"
                          placeholder="File Path URL"
                          name="url"
                          onChange={handleAddLessonChange}
                          value={addLesson.url}
                          className="col12input"
                        />
                      </div>
                    )}
                  </div>
                  {(addLesson.lesson_type === "youtube-video" ||
                    addLesson.lesson_type === "video") && (
                      <div className="form-group">
                        <label>Thumbnail Preview Image</label>
                        <input type="file" className="col12input" name="thumbnail_preview_image_url" onChange={handleAddLessonFileChange} />
                      </div>
                    )}

                  <div style={{ display: "flex" }}>
                    <div
                      className="flex-row"
                      style={{
                        alignItems: "end",
                        padding: "0px",
                        border: "none",
                      }}
                    >
                      <div className="form-group mb-0" style={{ width: "50%" }}>
                        <label>Duration</label>
                        <input
                          type="text"
                          placeholder="Lesson Type"
                          className="col12input"
                          name="duration"
                          onChange={handleAddLessonChange}
                          value={addLesson.duration}
                        />
                      </div>
                      <div className="chekbox2">
                        <input type="checkbox" name="is_count_time" onChange={handleAddLessonChange} checked={!!addLesson.is_count_time} defaultChecked />
                        <label>do yo want to count time?</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Text</label>
                    <textarea
                      placeholder="Text Description rich text Box"
                      className="col12input"
                      name="text_content"
                      onChange={handleAddLessonChange}
                      value={addLesson.text_content}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Summery</label>
                    <input
                      type="text"
                      placeholder="Summery"
                      name="description"
                      onChange={handleAddLessonChange}
                      value={addLesson.description}
                      className="col12input"
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div>
                        <label>
                          <input type="checkbox" name="is_preview" onChange={handleAddLessonChange} checked={!!addLesson.is_preview} defaultChecked /> is Free Lesson
                        </label>
                      </div>
                      <div>
                        <label>
                          <input type="checkbox" name="status" onChange={handleAddLessonChange} checked={!!addLesson.status} defaultChecked /> Active
                        </label>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button onClick={lessonToggleModal} className="secondary-btn">
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {/* lesson modal for edit  */}
        {
          editLessonOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                {
                  nullQuizeId != null ? (
                    <>
                      <h5 style={{ marginBottom: "20px" }}>Add New Quiz</h5>
                      <form onSubmit={handleEditQuizSubmit}>
                        <div className="form-group">
                          <label>Quiz Title</label>
                          <input
                            type="text"
                            placeholder="Quiz Title"
                            className="col12input"
                            name="title"
                            onChange={handleEditQuizChange}
                            value={editQuizData.title}
                          />
                        </div>

                        <div className="flex-row" style={{ display: "block" }}>
                          <div
                            className="flex-row"
                            style={{
                              alignItems: "end",
                              gap: "10px",
                              border: "none",
                              padding: "0",
                            }}
                          >
                            <div className="form-group mb-0">
                              <label>Pasing Marks</label>
                              <input
                                type="number"
                                placeholder="Passing Marks"
                                className="col12input"
                                name="passing__marks"
                                onChange={handleEditQuizChange}
                                value={editQuizData.passing__marks}
                              />
                            </div>

                            <div className="form-group mb-0">
                              <label>Total Marks</label>
                              <input
                                type="text"
                                placeholder="Total Marks"
                                className="col12input"
                                name="total_marks"
                                onChange={handleEditQuizChange}
                                value={editQuizData.total_marks}
                              />
                            </div>
                          </div>

                          <div
                            className="flex-row"
                            style={{
                              gap: "10px",
                              border: "none",
                              padding: "0",
                              marginBottom: "0",
                            }}
                          >
                            <div className="form-group mb-0" style={{ width: "50%" }}>
                              <label>Duration</label>
                              <input
                                type="text"
                                placeholder="in Minutes"
                                className="col12input"
                                name="quize_duration"
                                onChange={handleEditQuizChange}
                                value={editQuizData.quize_duration}
                              />
                            </div>

                            <div
                              className="chekbox2"
                              style={{ alignContent: "end", marginRight: "30px" }}
                            >
                              <input type="checkbox" name="is_count_time" onChange={handleEditQuizChange} checked={!!editQuizData.is_count_time} />
                              <label>do you want to count time ?</label>
                            </div>
                          </div>
                        </div>

                        <div className="flex-row">
                          <div className="chekbox2">
                            <input type="checkbox" onClick={handleTimeLimit} checked={timeLimit} />
                            <label>Time Limit ?</label>
                          </div>
                          {
                            timeLimit && (
                              <div className="form-group mb-0" style={{ width: "50%" }}>
                                <label>Expire Time</label>
                                <input type="text" placeholder="Time Limit" className="col12input" name="expire_time" onChange={handleEditQuizChange} value={editQuizData.expire_time || ""} />
                              </div>
                            )
                          }

                        </div>

                        <div className="flex-row" style={{ marginBottom: "0px" }}>
                          <div className="chekbox2">
                            <input type="checkbox" onClick={handleMaxAttempts} checked={maxAttempts} />
                            <label>Max Attampts</label>
                          </div>
                          {
                            maxAttempts && (
                              <div className="form-group mb-0" style={{ width: "50%" }}>
                                <label>Enter No Of Attempts</label>
                                <input type="text" placeholder="NO of Attempts" className="col12input" name="no_of_q_retakes" onChange={handleEditQuizChange} value={editQuizData.no_of_q_retakes || ""} />
                              </div>
                            )
                          }

                        </div>

                        <div className="flex-row" style={{ border: "none" }}>
                          <div className="form-group mb-0" style={{ width: "100%" }}>
                            <label>Summery</label>
                            <input
                              type="text"
                              placeholder="Enter Summery"
                              className="col12input"
                              name="instruction"
                              onChange={handleEditQuizChange}
                              value={editQuizData.instruction}
                            />
                            <label>Total Showing Question</label>
                            <input
                              type="text"
                              placeholder="Enter Total Showing Question"
                              className="col12input"
                              name="total_showing_questions"
                              onChange={handleEditQuizChange}
                              value={editQuizData.total_showing_questions}
                            />
                            <div style={{ display: "flex", marginTop: "10px" }}>
                              <div className="chekbox2">
                                <input type="checkbox" name="is_skipable" onChange={handleEditQuizChange} checked={!!editQuizData.is_skipable} />
                                <label>Student Can Skip This Quiz ?</label>
                              </div>
                              <div className="chekbox2">
                                <input type="checkbox" name="random_questions" onChange={handleEditQuizChange} checked={!!editQuizData.random_questions} />
                                <label>Random Questions</label>
                              </div>
                              <div className="chekbox2">
                                <input type="checkbox" name="status" onChange={handleEditQuizChange} checked={!!editQuizData.status} />
                                <label>Active</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button type="submit" className="primary-btn">
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={editLessonToggleModal}
                            className="secondary-btn"
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <h5 style={{ marginBottom: "10px" }}>Edit Lesson</h5>
                      <form onSubmit={handleEditLessonSubmit}>
                        <div className="form-group">
                          <label>Lesson Type</label>
                          <select
                            className="col12input"
                            onChange={handleEditLessonChange}
                            name="lesson_type"
                            value={editLessonData.lesson_type}
                          >
                            <option value="">Select Lesson Type</option>
                            <option value="text">Text</option>
                            <option value="pdf">PDF</option>
                            <option value="youtube-video">YouTube video</option>
                            <option value="video">Video</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>
                            Lesson Title <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Lesson Title"
                            name="title"
                            onChange={handleEditLessonChange}
                            value={editLessonData.title}
                            className="col12input"
                          />
                        </div>
                        {(editLessonData.lesson_type === "pdf" ||
                          editLessonData.lesson_type === "video") && (
                            <div className="form-group">
                              <label>Attachment</label>
                              <input type="file" className="col12input" name="attachment" onChange={handleEditLessonFileChange} />
                            </div>
                          )}

                        <div style={{ display: "flex", gap: "10px" }}>
                          {editLessonData.lesson_type === "youtube-video" && (
                            <div className="form-group">
                              <label>Video URL</label>
                              <input
                                type="text"
                                placeholder="Video URL"
                                className="col12input"
                                name="url"
                                onChange={handleEditLessonChange}
                                value={editLessonData.url}
                              />
                            </div>
                          )}
                          {editLessonData.lesson_type === "pdf" && (
                            <div className="form-group">
                              <label>Document Path URL</label>
                              <input
                                type="text"
                                placeholder="File Path URL"
                                name="url"
                                onChange={handleEditLessonChange}
                                value={editLessonData.url}
                                className="col12input"
                              />
                            </div>
                          )}
                        </div>
                        {(editLessonData.lesson_type === "youtube-video" ||
                          editLessonData.lesson_type === "video") && (
                            <div className="form-group">
                              <label>Thumbnail Preview Image</label>
                              <input type="file" className="col12input" name="thumbnail_preview_image_url" onChange={handleEditLessonFileChange} />
                            </div>
                          )}

                        <div style={{ display: "flex" }}>
                          <div
                            className="flex-row"
                            style={{
                              alignItems: "end",
                              padding: "0px",
                              border: "none",
                            }}
                          >
                            <div className="form-group mb-0" style={{ width: "50%" }}>
                              <label>Duration</label>
                              <input
                                type="text"
                                placeholder="Lesson Type"
                                className="col12input"
                                name="duration"
                                onChange={handleEditLessonChange}
                                value={editLessonData.duration}
                              />
                            </div>
                            <div className="chekbox2">
                              <input type="checkbox" name="is_count_time" onChange={handleEditLessonChange} checked={!!editLessonData.is_count_time} />
                              <label>do yo want to count time?</label>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Text</label>
                          <textarea
                            placeholder="Text Description rich text Box"
                            className="col12input"
                            name="text_content"
                            onChange={handleEditLessonChange}
                            value={editLessonData.text_content}
                          ></textarea>
                        </div>

                        <div className="form-group">
                          <label>Summery</label>
                          <input
                            type="text"
                            placeholder="Summery"
                            name="description"
                            onChange={handleEditLessonChange}
                            value={editLessonData.description}
                            className="col12input"
                          />
                        </div>

                        <div className="form-group">
                          <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                              <label>
                                <input type="checkbox" name="is_preview" onChange={handleEditLessonChange} checked={!!editLessonData.is_preview} /> is Free Lesson
                              </label>
                            </div>
                            <div>
                              <label>
                                <input type="checkbox" name="status" onChange={handleEditLessonChange} checked={!!editLessonData.status} /> Active
                              </label>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button type="submit" className="primary-btn">
                            Save
                          </button>
                          <button onClick={editLessonToggleModal} className="secondary-btn">
                            Close
                          </button>
                        </div>
                      </form>
                    </>
                  )
                }

              </div>
            </div>
          )
        }

        {/* Quiz Modal */}
        {
          quizOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                <h5 style={{ marginBottom: "20px" }}>Add New Quiz</h5>
                <form onSubmit={handleAddQuizSubmit}>
                  <div className="form-group">
                    <label>Quiz Title</label>
                    <input
                      type="text"
                      placeholder="Quiz Title"
                      className="col12input"
                      name="title"
                      onChange={handleAddQuizChange}
                      value={addQuiz.title}
                    />
                  </div>

                  <div className="flex-row" style={{ display: "block" }}>
                    <div
                      className="flex-row"
                      style={{
                        alignItems: "end",
                        gap: "10px",
                        border: "none",
                        padding: "0",
                      }}
                    >
                      <div className="form-group mb-0">
                        <label>Pasing Marks</label>
                        <input
                          type="number"
                          placeholder="Passing Marks"
                          className="col12input"
                          name="passing__marks"
                          onChange={handleAddQuizChange}
                          value={addQuiz.passing__marks}
                        />
                      </div>

                      <div className="form-group mb-0">
                        <label>Total Marks</label>
                        <input
                          type="text"
                          placeholder="Total Marks"
                          className="col12input"
                          name="total_marks"
                          onChange={handleAddQuizChange}
                          value={addQuiz.total_marks}
                        />
                      </div>
                    </div>

                    <div
                      className="flex-row"
                      style={{
                        gap: "10px",
                        border: "none",
                        padding: "0",
                        marginBottom: "0",
                      }}
                    >
                      <div className="form-group mb-0" style={{ width: "50%" }}>
                        <label>Duration</label>
                        <input
                          type="text"
                          placeholder="in Minutes"
                          className="col12input"
                          name="quize_duration"
                          onChange={handleAddQuizChange}
                          value={addQuiz.quize_duration}
                        />
                      </div>

                      <div
                        className="chekbox2"
                        style={{ alignContent: "end", marginRight: "30px" }}
                      >
                        <input type="checkbox" name="is_count_time" onChange={handleAddQuizChange} checked={!!addQuiz.is_count_time} />
                        <label>do you want to count time ?</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex-row">
                    <div className="chekbox2">
                      <input type="checkbox" onClick={handleTimeLimit} />
                      <label>Time Limit ?</label>
                    </div>
                    {
                      timeLimit && (
                        <div className="form-group mb-0" style={{ width: "50%" }}>
                          <label>Expire Time</label>
                          <input type="text" placeholder="Time Limit" className="col12input" name="expire_time" onChange={handleAddQuizChange} value={addQuiz.expire_time} />
                        </div>
                      )
                    }

                  </div>

                  <div className="flex-row" style={{ marginBottom: "0px" }}>
                    <div className="chekbox2">
                      <input type="checkbox" onClick={handleMaxAttempts} />
                      <label>Max Attampts</label>
                    </div>
                    {
                      maxAttempts && (
                        <div className="form-group mb-0" style={{ width: "50%" }}>
                          <label>Enter No Of Attempts</label>
                          <input type="text" placeholder="NO of Attempts" className="col12input" name="no_of_q_retakes" onChange={handleAddQuizChange} value={addQuiz.no_of_q_retakes} />
                        </div>
                      )
                    }

                  </div>

                  <div className="flex-row" style={{ border: "none" }}>
                    <div className="form-group mb-0" style={{ width: "100%" }}>
                      <label>Summery</label>
                      <input
                        type="text"
                        placeholder="Enter Summery"
                        className="col12input"
                        name="instruction"
                        onChange={handleAddQuizChange}
                        value={addQuiz.instruction}
                      />
                      <label>Total Showing Question</label>
                      <input
                        type="text"
                        placeholder="Enter Total Showing Question"
                        className="col12input"
                        name="total_showing_questions"
                        onChange={handleAddQuizChange}
                        value={addQuiz.total_showing_questions}
                      />
                      <div style={{ display: "flex", marginTop: "10px" }}>
                        <div className="chekbox2">
                          <input type="checkbox" name="is_skipable" onChange={handleAddQuizChange} checked={!!addQuiz.is_skipable} />
                          <label>Student Can Skip This Quiz ?</label>
                        </div>
                        <div className="chekbox2">
                          <input type="checkbox" name="random_questions" onChange={handleAddQuizChange} checked={!!addQuiz.random_questions} />
                          <label>Random Questions</label>
                        </div>
                        <div className="chekbox2">
                          <input type="checkbox" name="status" onChange={handleAddQuizChange} checked={!!addQuiz.status} />
                          <label>Active</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={quizToggleModal}
                      className="secondary-btn"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {/* Question Modal */}
        {
          questionOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                <div className="quiz-top-header">
                  <div className="quiz-header">
                    <p>
                      <strong>Quiz-1 :</strong> Quiz Title Appear Here
                    </p>
                  </div>

                  <div className="two-btn">
                    <button className="primary-btn module-btn">Sorting</button>
                    <button
                      className="primary-btn module-btn"
                      onClick={addQuestionToggleModal}
                    >
                      Add New
                    </button>
                    <span onClick={questionToggleModal}>
                      <i class="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                </div>

                <div>
                  {quizeData.map((quiz, index) => (
                    <div className="container" key={index}>
                      <div className="module-header quiz-module">
                        <span className="module-title">{quiz.question}</span>
                        <div className="module-controls">
                          <button
                            className="edit-btn"
                            onClick={editQuestionToggleModal}
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button className="delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                          <button
                            className="check-btn"
                            onClick={() => toggleQuizModule(index)}
                          >
                            <i
                              className={`fa-solid ${openQuizIndex === index
                                ? "fa-angle-up"
                                : "fa-angle-down"
                                }`}
                            ></i>
                          </button>
                        </div>
                      </div>

                      {openQuizIndex === index && (
                        <div className="module-content">
                          {quiz.answers.map((answer, answerIndex) => (
                            <div
                              className="module-lesson quiz-list"
                              key={answerIndex}
                            >
                              <div>
                                <strong className="quiz-letter">
                                  {answer.letter}
                                </strong>
                                <label style={{ paddingLeft: "10px" }}>
                                  {answer.text}
                                </label>
                              </div>
                              <input type="checkbox" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        {/* Add Quiz Question Modal */}
        {
          addquestionOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                <h5 style={{ marginBottom: "20px" }}>Add Quiz Question</h5>
                <form>
                  <div className="form-group">
                    <label>Question:</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col12input"
                    />
                  </div>

                  <div className="quiz-answer">
                    <label>A</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>B</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>C</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>D</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>E</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>F</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button
                      type=""
                      onClick={addQuestionToggleModal}
                      className="secondary-btn"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {/* Edit Quiz Question Modal */}
        {
          editquestionOpen && (
            <div className="modal">
              <div className="add-lesson-container">
                <h5 style={{ marginBottom: "20px" }}>Edit Quiz Question</h5>
                <form>
                  <div className="form-group">
                    <label>Question:</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col12input"
                    />
                  </div>

                  <div className="quiz-answer">
                    <label>A</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>B</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>C</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>D</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>E</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div className="quiz-answer">
                    <label>F</label>
                    <input
                      type="text"
                      placeholder="Lesson Type"
                      className="col8input"
                      style={{ margin: "0px 10px", width: "90%" }}
                    />
                    <input type="checkbox" className="quiz-checkbox" />
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button
                      type=""
                      onClick={addQuestionToggleModal}
                      className="secondary-btn"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {/* Quiz Result Modal  */}
        {
          openQuizResult && (
            <div className="modal">
              <div className="add-lesson-container" style={{ width: "70%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "2px solid #dfdfe1",
                    marginBottom: "10px",
                  }}
                >
                  <h5 style={{ paddingBottom: "5px" }}>Quiz Result</h5>
                  <div
                    onClick={openQuizResultmodule}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>

                <div className="student-details">
                  <div>
                    <strong>Student :</strong>
                    <span> Student Name With link</span>
                  </div>
                  <div>
                    <strong>Enrollment Id :</strong>
                    <span> 12453</span>
                  </div>
                  <div>
                    <strong>Course Name :</strong>
                    <span> Course Name Name With link</span>
                  </div>
                </div>

                <table style={{ margin: "10px 0" }}>
                  <thead className="academic-table">
                    <tr>
                      <th>ID</th>
                      <th>Quiz Title</th>
                      <th>Total Marks</th>
                      <th>Pass Marks</th>
                      <th>Obtain Marks</th>
                      <th>Max Attempts</th>
                      <th>Attempts</th>
                      <th>Result </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          <h6>{item.title}</h6>
                        </td>
                        <td>{item.totalMarks}</td>
                        <td>{item.passMarks}</td>
                        <td>{item.obtainMarks}</td>
                        <td>-</td>
                        <td>{item.attempts}</td>
                        <td>{item.result}</td>
                        <td>
                          <span className="view">
                            <i className="fa-regular fa-eye"></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }

        {/* Quiz Document Modal  */}
        {
          quizDocumentOpen && (
            <div className="modal">
              <div className="add-lesson-container" style={{ width: "70%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "2px solid #dfdfe1",
                    marginBottom: "10px",
                  }}
                >
                  <h5 style={{ paddingBottom: "5px" }}>Documents</h5>
                  <div
                    onClick={quizDocumentToggleModal}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>

                <div className="student-details">
                  <div>
                    <strong>Student :</strong>
                    <span> Student Name With link</span>
                  </div>
                  <div>
                    <strong>Enrollment Id :</strong>
                    <span> 12453</span>
                  </div>
                  <div>
                    <strong>Course Name :</strong>
                    <span> Course Name Name With link</span>
                  </div>
                </div>

                <table style={{ margin: "10px 0" }}>
                  <thead className="academic-table">
                    <tr>
                      <th>ID</th>
                      <th>Doc Catagory</th>
                      <th>Document Title</th>
                      <th>Date Upload</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {document_data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          <h6>{item.doc_category}</h6>
                        </td>
                        <td>{item.doc_title}</td>
                        <td>{item.date_upload}</td>
                        <td>{item.description}</td>
                        <td>
                          <label class="switch">
                            <input type="checkbox" />
                            <span class="slider"></span>
                          </label>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span className="view">
                            <i className="fa-regular fa-eye"></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      </div >
    </>
  );
};

export default ManageCourse;
