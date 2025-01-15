import React, { useContext, useEffect, useState } from "react";
import Hoc from "../layout/Hoc";
import "../../../assets/css/course/course.css";
import "../../../assets/css/main.css";
import "../../../assets/css/sidebar.css";
import { userRolesContext } from "../layout/RoleContext";
import { notifySuccess, notifyWarning } from "../layout/ToastMessage";
import { NavLink, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import moment from "moment-timezone";
import SortTable from "../layout/SortTable";
const port = process.env.REACT_APP_URL

const ManageCourse = () => {
  const { id } = useParams();
  const { userId, setting } = useContext(userRolesContext);
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
  const [openQuizIndex, setOpenQuizIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(false);
  const [sortedData, setSortedData] = useState([]); // acedemic student name
  const [openQuizResult, setopenQuizResult] = useState(false); // state for open quiz result modal
  const [quizDocumentOpen, setQuizDocumentOpen] = useState(false); // state for open quiz document modal
  // Function to change the currently active tab
  const handleChangeTab = (tabName) => {
    setTab(tabName);
  };
  // Function to toggle visibility of content
  const [moduleId, setModuleId] = useState(null)
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const toggleContent = (index, id) => {
    setModuleId(id)
    setActiveModuleIndex((prevIndex) => (prevIndex === index ? null : index));
    getLessonData(id);
  };

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
  const [quizQuestionId, setQuizQuestionId] = useState(null)
  const questionToggleModal = (id) => {
    setQuestionOpen(!questionOpen);
    getQuizQuestionData(id);
    setQuizQuestionId(id);
  };

  // resource model open-close function
  const [resourceOpen, setResourceOpen] = useState(false);
  const [resouceData, setResouceData] = useState([]);
  const getResouceAllData = async (moduleId, lessonId) => {
    try {
      const res = await axiosInstance.get(`/gettingCourseResourceData/${moduleId}/${lessonId}`);
      setResouceData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  const [resourceModuleId, setResourceModuleId] = useState(null)
  const [resourceLessonId, setResourceLessonId] = useState(null)
  const resourceToggleModal = async (moduleId, lessonId) => {
    if (moduleId && lessonId) {
      await getResouceAllData(moduleId, lessonId);
      setResourceModuleId(moduleId);
      setResourceLessonId(lessonId);
      setAddResource((prevState) => ({
        ...prevState,
        module_id: moduleId,
        lesson_id: lessonId
      }));
    }
    setResourceOpen(!resourceOpen);
  };
  //add resource data code
  const [addResource, setAddResource] = useState({
    module_id: resourceModuleId,
    lesson_id: resourceLessonId,
    title: "",
    link: "",
    status: 1,
    created_by: userId,
    updated_by: userId
  });
  const [isEditResource, setIsEditResource] = useState(false);
  const [editResource, setEditResource] = useState({
    title: "",
    link: "",
    updated_by: userId
  });
  const handleAddResourceChange = (e) => {
    const { name, value } = e.target;
    setAddResource((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleAddResourceSubmit = async (e) => {
    e.preventDefault();
    if (addResource.title.trim() === '') {
      notifyWarning("Please enter resource title.");
      return
    }
    if (addResource.link.trim() === '') {
      notifyWarning("Please enter resource link.");
      return
    }

    try {
      const res = await axiosInstance.post('/addingCourseResource', addResource);
      if (res.status === 200) {
        setAddResource({
          module_id: resourceModuleId,
          lesson_id: resourceLessonId,
          title: "",
          link: "",
          status: 1,
          created_by: userId,
          updated_by: userId
        });
        getResouceAllData(resourceModuleId, resourceLessonId);
      }
      notifySuccess("Resource added successfully");
    } catch (err) {
      console.log(err);
    }
  };
  //get with id resource data code
  const handleEditResourceChange = (e) => {
    const { name, value } = e.target;
    setEditResource((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleGetResourceDataForEdit = async (id) => {
    setIsEditResource(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseResourceDataWithId/${id}`);
      const resourceData = res.data.data;
      setEditResource(resourceData);
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditResourceSubmit = async (e) => {
    if (editResource.title.trim() === '') {
      notifyWarning("Please enter resource title.");
      return
    }
    if (editResource.link.trim() === '') {
      notifyWarning("Please enter resource link.");
      return
    }
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/updatingCourseResource/${editResource.id}`, editResource);
      if (res.status === 200) {
        setIsEditResource(false);
        getResouceAllData(resourceModuleId, resourceLessonId);
        notifySuccess("Resource updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }
  //delete data section code start
  const [deleteResourceOpen, setDeleteResourceOpen] = useState(false);
  const [deleteResourceId, setDeleteResourceId] = useState(null);
  const handleDeleteResourceOpen = async (id) => {
    if (id) {
      await setDeleteResourceId(id);
    }
    setDeleteResourceOpen(!deleteResourceOpen);
  }
  const handleResourceDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/deletingCourseResource/${deleteResourceId}`);
      if (res.status === 200) {
        setDeleteResourceId(null);
        setDeleteResourceOpen(false);
        getResouceAllData(resourceModuleId, resourceLessonId);
        notifySuccess("Resource deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }
  //resource status change code start
  const handleResourceStatusChange = async (id, status) => {
    try {
      const res = await axiosInstance.put(`/updatingCourseResourceStatus/${id}`, { status: status });
      if (res.status === 200) {
        getResouceAllData(resourceModuleId, resourceLessonId);
      }
      notifySuccess("Resource status updated successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // Function to toggle visibility of add question modal
  const addQuestionToggleModal = () => {
    setAddQuestionOpen(!addquestionOpen);
  };

  // Function to toggle visibility of edit question modal
  const [editQuestionId, setEditQuestionId] = useState(null)
  const editQuestionToggleModal = (id) => {
    setEditQuestionOpen(!editquestionOpen);
    getEditQuestionData(id);
    setEditQuestionId(id);
  };

  // Function to toggle visibility of quiz result module
  const openQuizResultmodule = () => {
    setopenQuizResult(!openQuizResult); // Correctly toggling openQuizResult state
  };

  // Function to toggle visibility of quiz document modal
  const quizDocumentToggleModal = (stuId) => {
    getProgressQuizData(stuId);
    setQuizDocumentOpen(!quizDocumentOpen); // Fixed the state variable name
  };

  //module section start
  //get module data
  const getModuleData = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseSectionData/${id}`);
      const sectionData = res.data;
      const sortedData = sectionData.sort((a, b) => a.order - b.order);
      setModuleData(sortedData);
    } catch (error) {
      console.log(error);
    }
  }

  //add module 
  const [addModule, setAddModule] = useState({
    title: "",
    course_id: id,
    status: 1,
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
    if (addModule.title.trim() === '') {
      notifyWarning("Please enter module title.");
      return
    }
    try {
      const res = await axiosInstance.post(`${port}/addingCourseSection`, addModule);
      getModuleData();
      setModuleOpen(false);
      setAddModule({
        title: "",
        course_id: id,
        status: '',
      });
      notifySuccess("Module added successfully");
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
      const res = await axiosInstance.get(`${port}/gettingCourseSectionDataWithId/${id}`);
      setEditModule(res.data);
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
    if (editModule.title.trim() === '') {
      notifyWarning("Please enter module title.");
      return
    }
    try {
      const res = await axiosInstance.put(`${port}/updatingCourseSection/${editId}`, editModule);
      getModuleData();
      setEditModuleOpen(false);
      notifySuccess("Module updated successfully");
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
      const res = await axiosInstance.delete(`${port}/deletingCourseSection/${deleteId}`);
      getModuleData();
      setDeleteOpen(false);
      notifySuccess("Module deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }
  //lesson section
  //get lesson data
  const [lessonData, setLessonData] = useState([]);
  const getLessonData = async (id) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithSectionId/${id}`);
      const lessonquizdata = res.data
      // const filterOrderData = lessonquizdata.filter((item) => item.order !== 0);
      const sortedData = lessonquizdata.sort((a, b) => a.order - b.order);
      setLessonData(sortedData);
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
    console.log(addLesson);
    // Validation checks for required fields
    if (!addLesson.lesson_type) {
      notifyWarning("Select The Lesson Type.");
      return
    }
    if (!addLesson.title.trim()) {
      notifyWarning("Title is required.");
      return;
    }
    if (addLesson.lesson_type === 'pdf') {
      if (!addLesson.url.trim()) {
        notifyWarning("URL is required.");
        return;
      }
      if (!addLesson.attachment) {
        notifyWarning("Attachment is required.");
        return;
      }
    }
    if (addLesson.lesson_type === 'youtube-video') {
      if (!addLesson.url.trim()) {
        notifyWarning("URL is required.");
        return;
      }
      if (!addLesson.thumbnail_preview_image_url) {
        notifyWarning("Thumbnail is required.");
        return;
      }
    }
    if (addLesson.lesson_type === 'video') {
      if (!addLesson.attachment.trim()) {
        notifyWarning("Attachment is required.");
        return;
      }
      if (!addLesson.thumbnail_preview_image_url) {
        notifyWarning("Thumbnail is required.");
        return;
      }
    }
    if (!addLesson.description.trim()) {
      notifyWarning("Description is required.");
      return;
    }
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
      const res = await axiosInstance.post(`${port}/addingCourseLesson/${sectionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notifySuccess("Lesson added successfully");
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
      const res = await axiosInstance.get(`${port}/gettingCourseLessonDataWithId/${id}`);
      setEditLessonData(res.data);
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
    if (!editLessonData.title.trim()) {
      notifyWarning("Title is required.");
      return;
    }
    if (!editLessonData.course_id) {
      notifyWarning("Course ID is required.");
      return;
    }
    if (!editLessonData.lesson_type.trim()) {
      notifyWarning("Lesson type is required.");
      return;
    }
    // if (!editLessonData.url.trim() && !editLessonData.attachment) {
    //   notifyWarning("Either URL or attachment is required.");
    //   return;
    // }
    if (!editLessonData.description.trim()) {
      notifyWarning("Description is required.");
      return;
    }
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
      const res = await axiosInstance.put(`${port}/updatingCourseLesson/${editLessonId}`, formData);
      notifySuccess("Lesson updated successfully");
      getLessonData(moduleId);
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
    if (!addQuiz.title.trim()) {
      notifyWarning("Title is required.");
      return;
    }
    if (!addQuiz.passing__marks) {
      notifyWarning("Passing marks is required.");
      return;
    }
    if (!addQuiz.total_marks.trim()) {
      notifyWarning("Total marks is required.");
      return;
    }
    if (!addQuiz.quize_duration.trim()) {
      notifyWarning("Duration is required.");
      return;
    }
    if (!addQuiz.instruction.trim()) {
      notifyWarning("Summery is required.");
      return;
    }
    if (!addQuiz.total_showing_questions) {
      notifyWarning("Total showing questions is required.");
      return;
    }
    try {
      const res = await axiosInstance.post(`${port}/addingCourseQuize/${sectionId}`, addQuiz);
      getLessonData(sectionId);
      notifySuccess("Quiz added successfully");
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
      const res = await axiosInstance.get(`${port}/gettingCourseQuizeDataWithId/${id}`);
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
    if (!editQuizData.title.trim()) {
      notifyWarning("Title is required.");
      return;
    }
    if (!editQuizData.passing__marks) {
      notifyWarning("Passing marks is required.");
      return;
    }
    if (!editQuizData.instruction.trim()) {
      notifyWarning("Summery is required.");
      return;
    }
    try {
      const res = await axiosInstance.put(`${port}/updatingCourseQuize/${nullQuizeId}`, editQuizData);
      notifySuccess("Quiz updated successfully");
      getLessonData(moduleId);
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
      const res = await axiosInstance.delete(`${port}/deletingCourseLesson/${deleteLessonId}`);
      notifySuccess("Lesson deleted successfully");
      getLessonData(moduleId);
      setDeleteQuizeOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteQuize = async () => {
    try {
      const res = await axiosInstance.delete(`${port}/deletingCourseQuize/${deleteQuizId}`);
      notifySuccess("Quiz deleted successfully");
      getLessonData(moduleId);
      setDeleteQuizeOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  //change status
  const handleStatusChange = async (id, quizId, status) => {
    try {
      if (quizId != null) {
        const res = await axiosInstance.put(`${port}/updatingCourseQuizeStatus/${quizId}`, { status: status });
        notifySuccess("Quize Status updated successfully");
        getLessonData(moduleId);
      } else {
        const res = await axiosInstance.put(`${port}/updatingCourseLessonStatus/${id}`, { status: status });
        notifySuccess("Lesson Status updated successfully");
        getLessonData(moduleId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //quiz quistion module start
  //get quiz quistion
  const [quizQuestionData, setQuizQuestionData] = useState([]);
  const getQuizQuestionData = async (id) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseQuizeQuestionData/${id}`);
      const quizeQuestiondata = res.data;
      const sortdata = quizeQuestiondata.sort((a, b) => a.order - b.order);
      setQuizQuestionData(sortdata);
    } catch (error) {
      console.log(error);
    }
  }
  //add quiz quistion
  const [addQuizeQuestion, setAddQuizeQuestion] = useState({
    title: "",
    options: ["", "", "", "", "", ""],
    correct_answer: [],
    section_id: moduleId,
    course_id: id,
  });


  // Handle title change
  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setAddQuizeQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAddQuizeQuestion((prevState) => ({
      ...prevState,
      section_id: moduleId,
    }));
  };

  // Handle options change for fixed inputs
  const handleOptionChange = (index, e) => {
    const newOptions = [...addQuizeQuestion.options];
    newOptions[index] = e.target.value;
    setAddQuizeQuestion((prevState) => ({
      ...prevState,
      options: newOptions,
    }));
  };

  // Handle correct answer checkbox change
  const handleCorrectAnswerChange = (index) => {
    let newCorrectAnswers = [...addQuizeQuestion.correct_answer];
    if (newCorrectAnswers.includes(index)) {
      newCorrectAnswers = newCorrectAnswers.filter((i) => i !== index);
    } else {
      newCorrectAnswers.push(index);
    }

    setAddQuizeQuestion((prevState) => ({
      ...prevState,
      correct_answer: newCorrectAnswers,
    }));
  };

  const addQuizQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`${port}/addingCourseQuizeQuestion/${quizQuestionId}`, addQuizeQuestion);
      setAddQuestionOpen(false);
      notifySuccess("Question added successfully");
      getQuizQuestionData(quizQuestionId);
    } catch (error) {
      console.log(error);
    }
  }
  //edit question data
  const [editQuestionData, setEditQuestionData] = useState({
    title: "",
    options: ["", "", "", "", "", ""],
    correct_answer: [],
    section_id: moduleId,
    course_id: id,
  });

  const getEditQuestionData = async (id) => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseQuizeQuestionDataWithId/${id}`);
      const questionData = res.data;
      setEditQuestionData({
        ...questionData,
        options: questionData.options ? JSON.parse(questionData.options) : ["", "", "", "", "", ""],
        correct_answer: questionData.correct_answer ? JSON.parse(questionData.correct_answer) : []
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditQuestionChange = (e) => {
    setEditQuestionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle options change for fixed inputs
  const handleEditOptionChange = (index, e) => {
    const newOptions = [...editQuestionData.options];
    newOptions[index] = e.target.value;
    setEditQuestionData((prevState) => ({
      ...prevState,
      options: newOptions,
    }));
  };

  // Handle correct answer checkbox change
  const handleEditCorrectAnswerChange = (index) => {
    let newCorrectAnswers = [...editQuestionData.correct_answer];
    if (newCorrectAnswers.includes(index)) {
      newCorrectAnswers = newCorrectAnswers.filter((i) => i !== index);
    } else {
      newCorrectAnswers.push(index);
    }

    setEditQuestionData((prevState) => ({
      ...prevState,
      correct_answer: newCorrectAnswers,
    }));
  };

  const editQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`${port}/updatingCourseQuizeQuestion/${quizQuestionId}/${editQuestionId}`, editQuestionData);
      setEditQuestionOpen(false);
      notifySuccess("Question updated successfully");
      getQuizQuestionData(quizQuestionId);
    } catch (error) {
      console.log(error);
    }
  }

  //handle quiz question delete
  const [deleteQuestionOpen, setDeleteQuestionOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const handleDeleteQuestionOpen = async (id) => {
    setDeleteQuestionOpen(!deleteQuestionOpen);
    if (id) {
      await setDeleteQuestionId(id)
    }
  }
  const handleDeleteQuestion = async () => {
    try {
      const res = await axiosInstance.delete(`${port}/deletingCourseQuizeQuestion/${deleteQuestionId}`);
      getQuizQuestionData(quizQuestionId);
      notifySuccess("Question deleted successfully");
      setDeleteQuestionOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  //sorting section module data
  const [sortSectionOpen, setSortSectionOpen] = useState(false);
  const handleOpenSortSection = () => {
    setSortSectionOpen(!sortSectionOpen);
    getModuleData();
  }
  //sorting lesson and quiz data
  const [sortLessonOpen, setSortLessonOpen] = useState(false);
  const [sortLessonId, setSortLessonId] = useState(null);
  const handleOpenSortLesson = async (id) => {
    setSortLessonOpen(!sortLessonOpen);
    setSortLessonId(id);
    getLessonData(id);
  }
  //sortin quiz data
  const [sortQuizQuestionOpen, setSortQuizQuestionOpen] = useState(false);
  const handleOpenSortQuizQuestion = () => {
    setSortQuizQuestionOpen(!sortQuizQuestionOpen);
    getQuizQuestionData(quizQuestionId);
  }


  useEffect(() => {
    getModuleData();
  }, []);
  useEffect(() => {
    if (moduleData.length > 0) {
      setModuleId(moduleData[0].id);
      getLessonData(moduleData[0].id);
    }
  }, [moduleData]);

  const handleTimeLimit = () => {
    setTimeLimit(!timeLimit)
  }

  const handleMaxAttempts = () => {
    setMaxAttempts(!maxAttempts)
  }


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
  // start
  const [progressData, setProgressData] = useState([]);
  const getProgressData = async () => {
    try {
      const res = await axiosInstance.get(`${port}/getAcademicProgressDataForManageCourse/${id}`);
      const progressData = res.data;
      await setProgressData(progressData);
    } catch (error) {
      console.log(error);
    }
  }
  const secondsToHMS = (seconds) => {
    const h = Math.floor(seconds / 3600); // Get hours
    const m = Math.floor((seconds % 3600) / 60); // Get remaining minutes
    const s = seconds % 60; // Get remaining seconds
    return [h, m, s]
      .map((unit) => String(unit).padStart(2, '0')) // Ensure two-digit format
      .join(':');
  };

  const [progressQuiz, setProgressQuiz] = useState([]);
  const getProgressQuizData = async (stuId) => {
    try {
      const res = await axiosInstance.get(`${port}/getAcademicProgressDataForManageCourseQuizDisplay/${id}/${stuId}`);
      const progressData = res.data;
      await setProgressQuiz(progressData);
      setopenQuizResult(!openQuizResult);
      console.log(progressData)
    } catch (error) {
      console.log(error);
    }
  }
  // end
  // useEffect hook to set sorted data when the component mounts or when `setSortedData` changes
  useEffect(() => {
    setSortedData(initialData);
  }, [setSortedData]);

  useEffect(() => {
    getProgressData()
  }, [])
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
              <button className="primary-btn module-btn" onClick={handleOpenSortSection}>Sort</button>
            </div>
          )}
        </div>

        <div className="course-form-container">
          {/* Module TAB */}
          {tab == "course" && (
            moduleData.length > 0 ? (
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
                const totalMinutes = lessonTime + quizeTime;
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;
                const formattedTime = `${hours} hours and ${minutes} minutes`;
                return (
                  <div div className="module" key={index}>
                    <div className="module-header" onClick={() => toggleContent(index, module.id)}>
                      <span className="module-title">
                        MODULE-{index + 1} : {module.title}
                      </span>
                      <span className="module-duration">{formattedTime}</span>
                      <span className="module-status green-dot"></span>
                      <div className="module-controls">
                        <button className="arrow-btn" onClick={() => handleOpenSortLesson(module.id)}>
                          <i className="fa-solid fa-sort"></i>{" "}
                        </button>
                        <button className="edit-btn" onClick={() => editModuleToggleModal(module.id)}>
                          <i className="fa fa-pencil"></i>
                        </button>
                        <button className="delete-btn" onClick={() => deleteToggleModal(module.id)}>
                          <i className="fa fa-trash"></i>
                        </button>
                        <button className="check-btn">
                          {/* <i className="fa-solid fa-angle-down"></i> */}
                          <i
                            className={`fa-solid ${activeModuleIndex === index
                              ? "fa-angle-up"
                              : "fa-angle-down"
                              }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                    {activeModuleIndex === index && (
                      <div className="module-content">
                        {lessonData.length > 0 ? (
                          lessonData.map((lesson, index) => (
                            <div className="module-lesson" key={index}>
                              <div className="lesson-title">
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
                                {
                                  lesson.quiz_id != null ? (
                                    <span>{lesson.course_quize_lesson.quize_duration} Minutes</span>
                                  ) : (
                                    <span>{lesson.duration} Minutes</span>
                                  )
                                }
                              </div>
                              <div className="lesson-actions">
                                {lesson.quiz_id && (
                                  <button
                                    className="add-questions-btn"
                                    onClick={() => questionToggleModal(lesson.quiz_id)}
                                  >
                                    + Add Questions
                                  </button>
                                )}
                                <button className="resource-btn" onClick={() => resourceToggleModal(module.id, lesson.id)}>
                                  <i className="fa-solid fa-folder-open"></i>Resource
                                </button>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={lesson.quiz_id != null ? lesson.course_quize_lesson.status : lesson.status}
                                    onClick={() => handleStatusChange(lesson.id, lesson.quiz_id, lesson.quiz_id != null ? lesson.course_quize_lesson.status : lesson.status)}
                                  />
                                  <span className="slider"></span>
                                </label>
                                <span className="edit-btn" onClick={() => editLessonToggleModal(lesson.id, lesson.quiz_id, 1)}>
                                  <i className="fa fa-pencil"></i>
                                </span>
                                <button className="delete-btn" onClick={() => handleDeleteQuizeOpen(lesson.id, lesson.quiz_id, 1)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <h6>No data available 😂</h6> // Display this if lessonData is empty
                        )}
                        <div className="module-actions">
                          <button onClick={() => lessonToggleModal(module.id)}>+ Lesson</button>
                          <button onClick={() => quizToggleModal(module.id)}>+ Add Quiz</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <p>No Module data avalible</p>
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
                {progressData && progressData.length !== 0 ? (
                  progressData.map((i, index) => {
                    console.log(i)
                    const time = moment.unix(i.enroll[0].createdAt).tz(setting.timezone).format("DD-MM-YYYY");
                    const completeDate = moment.unix(i.academicData[0]?.completed_date).tz(setting.timezone).format("DD-MM-YYYY");
                    // Step 1: Parse the completed_lesson_id string into an array
                    console.log(i.academicData)
                    let completedLessons;
                    if (i.academicData[0]?.completed_lesson_id === null) {
                      completedLessons = JSON.parse(i?.academicData[0]?.completed_lesson_id);
                      console.log(completedLessons)
                      if (typeof completedLessons === 'string') {
                        completedLessons = JSON.parse(completedLessons);
                      }
                    }
                    const lessonIds = i.lessonData.map(lesson => lesson.id);
                    let commonLessonIds;
                    if (completedLessons) {
                      commonLessonIds = completedLessons.filter(id => lessonIds.includes(id));
                    }
                    // Step 3: Calculate the progress as a percentage
                    let progressPercentage;
                    let progressFormatted;
                    if (commonLessonIds) {
                      progressPercentage = (commonLessonIds.length / i.lessonData.length) * 100;
                      progressFormatted = Math.round(progressPercentage);
                    }
                    return (
                      <tr key={index}>
                        <td className="id">{index + 1}</td>
                        <td>
                          <h6>{i.userMaster[0].first_name} {i.userMaster[0].last_name}</h6>
                        </td>
                        <td>{time}</td>
                        <td>{completeDate}</td>
                        <td>{secondsToHMS(i.academicData[0]?.watching_duration || 0)}</td>
                        <td>{progressFormatted ? progressFormatted : 0}%</td>
                        <td>{commonLessonIds ? commonLessonIds.length : 0} out of {i.lessonData.length}</td>
                        <td>{completeDate}</td>
                        <td style={{ textAlign: "center" }}>
                          {i.Quiz_Passed}
                          <span className="view" onClick={() => { getProgressQuizData(i.userMaster[0].id) }} >
                            <i className="fa-regular fa-eye"></i>
                          </span>
                        </td>
                        <td>
                          <button
                            className="resource-btn module-btn"
                            onClick={openQuizResultmodule}
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
                  })
                ) : (
                  ""
                )}

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
                      <input type="checkbox" onClick={handleTimeLimit} checked={timeLimit} />
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
                      <input type="checkbox" onClick={handleMaxAttempts} checked={maxAttempts} />
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
                    <button className="primary-btn module-btn" onClick={handleOpenSortQuizQuestion}>Sorting</button>
                    <button
                      className="primary-btn module-btn"
                      onClick={addQuestionToggleModal}
                    >
                      Add New
                    </button>
                    <span onClick={questionToggleModal}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                </div>

                <div>
                  {quizQuestionData.map((quiz, index) => {
                    const options = quiz.options ? JSON.parse(quiz.options) : [];
                    const correctAnswerIndices = quiz.correct_answer ? JSON.parse(quiz.correct_answer) : [];

                    return (
                      <div className="container" key={index}>
                        <div className="module-header quiz-module">
                          <span className="module-title">{quiz.title}</span>
                          <div className="module-controls">
                            <button
                              className="edit-btn"
                              onClick={() => editQuestionToggleModal(quiz.id)}
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button className="delete-btn" onClick={() => handleDeleteQuestionOpen(quiz.id)}>
                              <i className="fa fa-trash"></i>
                            </button>
                            <button
                              className="check-btn"
                              onClick={() => toggleQuizModule(index)}
                            >
                              <i
                                className={`fa-solid ${openQuizIndex === index ? "fa-angle-up" : "fa-angle-down"
                                  }`}
                              ></i>
                            </button>
                          </div>
                        </div>

                        {openQuizIndex === index && (
                          <div className="module-content">
                            {options.map((option, answerIndex) => (
                              <div
                                className="module-lesson quiz-list"
                                key={answerIndex}
                              >
                                <div>
                                  <strong className="quiz-letter">
                                    {String.fromCharCode(65 + answerIndex)}
                                  </strong>
                                  <label style={{ paddingLeft: "10px" }}>
                                    {option}
                                  </label>
                                </div>
                                <input
                                  type="checkbox"
                                  readOnly
                                  checked={correctAnswerIndices.includes(answerIndex)}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                <form onSubmit={addQuizQuestionSubmit}>
                  <div className="form-group">
                    <label>Question:</label>
                    <input
                      type="text"
                      placeholder="Enter Question"
                      className="col12input"
                      name="title"
                      value={addQuizeQuestion.title}
                      onChange={handleTitleChange}
                    />
                  </div>

                  {/* Fixed six inputs for options */}
                  {["A", "B", "C", "D", "E", "F"].map((label, index) => (
                    <div className="quiz-answer" key={index}>
                      <label>{label}</label>
                      <input
                        type="text"
                        placeholder="Enter Option"
                        className="col8input"
                        style={{ margin: "0px 10px", width: "90%" }}
                        value={addQuizeQuestion.options[index]}
                        onChange={(e) => handleOptionChange(index, e)}
                      />
                      <input
                        type="checkbox"
                        className="quiz-checkbox"
                        checked={addQuizeQuestion.correct_answer.includes(index)}
                        onChange={() => handleCorrectAnswerChange(index)}
                      />
                    </div>
                  ))}

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button
                      type="button"
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
                <form onSubmit={editQuestionSubmit}>
                  <div className="form-group">
                    <label>Question:</label>
                    <input
                      type="text"
                      placeholder="Enter Question"
                      className="col12input"
                      name="title"
                      value={editQuestionData.title}
                      onChange={handleEditQuestionChange}
                    />
                  </div>

                  {Array.isArray(editQuestionData.options) && editQuestionData.options.map((option, index) => (
                    <div className="quiz-answer" key={index}>
                      <label>{String.fromCharCode(65 + index)}</label>
                      <input
                        type="text"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        className="col8input"
                        style={{ margin: "0px 10px", width: "90%" }}
                        value={option}
                        onChange={(e) => handleEditOptionChange(index, e)}
                      />
                      <input
                        type="checkbox"
                        className="quiz-checkbox"
                        checked={editQuestionData.correct_answer.includes(index)}
                        onChange={() => handleEditCorrectAnswerChange(index)}
                      />
                    </div>
                  ))}

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="primary-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={editQuestionToggleModal}
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
        {deleteQuestionOpen && (
          <div className="modal">
            <div className="modal-container">
              <h5>Delete</h5>
              <p>Are you sure you want to delete this module?</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button className="primary-btn" onClick={handleDeleteQuestion}>
                  Delete
                </button>
                <button onClick={handleDeleteQuestionOpen} className="secondary-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* sorting section module open */}
        {
          sortSectionOpen && (
            <SortTable
              data={moduleData}
              sortTableOpen={sortSectionOpen}
              handleOpenSortTable={handleOpenSortSection}
              tableName="course_sections"
              updateRoute="updatingCourseSectionOrder"
              Id={id}
              orderKey="order"
              titleKey="title"
            />
          )
        }
        {/* sorting lesson and quiz module open */}
        {
          sortLessonOpen && (
            <SortTable
              data={lessonData}
              sortTableOpen={sortLessonOpen}
              handleOpenSortTable={handleOpenSortLesson}
              tableName="course_lessons"
              updateRoute="updatingCourseLessonOrder"
              Id={sortLessonId}
              orderKey="order"
              titleKey="title"
            />
          )
        }
        {/* sorting quiz question module open */}
        {
          sortQuizQuestionOpen && (
            <SortTable
              data={quizQuestionData}
              sortTableOpen={sortQuizQuestionOpen}
              handleOpenSortTable={handleOpenSortQuizQuestion}
              tableName="course_quize_questions"
              updateRoute="updatingCourseQuizeQuestionOrder"
              Id={moduleId}
              orderKey="order"
              titleKey="title"
            />
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
                    <span> {progressQuiz.userMaster?.first_name} {progressQuiz.userMaster?.last_name}</span>
                  </div>
                  <div>
                    <strong>Enrollment Id :</strong>
                    <span> 12453</span>
                  </div>
                  <div>
                    <strong>Course Name :</strong>
                    <span> {progressQuiz.courseMaster?.course_title}</span>
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
                    {progressQuiz.quizeData.map((item, index) => {
                      console.log(item)
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <h6>{item?.title}</h6>
                          </td>
                          <td>{item?.total_marks}</td>
                          <td>{item?.passing__marks}</td>
                          <td>0</td>
                          <td>-</td>
                          <td>{item.attempts}</td>
                          <td>{item.result}</td>
                          <td>
                            <span className="view">
                              <i className="fa-regular fa-eye"></i>
                            </span>
                          </td>
                        </tr>
                      )
                    })}
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
                          <label className="switch">
                            <input type="checkbox" readOnly />
                            <span className="slider"></span>
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
        {/* resource model */}
        {
          resourceOpen && (
            <div className="modal">
              <div className="add-lesson-container" style={{ width: "65%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "2px solid #dfdfe1",
                    marginBottom: "10px",
                  }}
                >
                  <h5 style={{ paddingBottom: "5px" }}>Resource</h5>
                  <div
                    onClick={resourceToggleModal}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                {isEditResource ? (
                  <form>
                    <div
                      className="form-group"
                      style={{ display: "flex", alignItems: "center", gap: "15px" }}
                    >
                      <div style={{ width: "50%" }} className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          placeholder="Enter Title"
                          className="col12input"
                          name="title"
                          value={editResource.title}
                          onChange={handleEditResourceChange}
                        />
                      </div>
                      <div style={{ width: "50%" }} className="form-group">
                        <label htmlFor="link">Link:</label>
                        <input
                          type="text"
                          placeholder="Enter Link"
                          className="col12input"
                          name="link"
                          value={editResource.link}
                          onChange={handleEditResourceChange}
                        />
                      </div>
                    </div>
                    <button type="button" onClick={handleEditResourceSubmit} className="primary-btn module-btn">
                      Update
                    </button>
                    <button type="button" onClick={(e) => setIsEditResource(false)} style={{ marginLeft: "10px" }} className="secondary-btn module-btn">
                      Cancel
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleAddResourceSubmit}>
                    <div
                      className="form-group"
                      style={{ display: "flex", alignItems: "center", gap: "15px" }}
                    >
                      <div style={{ width: "50%" }} className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          placeholder="Enter Title"
                          className="col12input"
                          name="title"
                          value={addResource.title}
                          onChange={handleAddResourceChange}
                        />
                      </div>
                      <div style={{ width: "50%" }} className="form-group">
                        <label htmlFor="link">Link:</label>
                        <input
                          type="text"
                          placeholder="Enter Link"
                          className="col12input"
                          name="link"
                          value={addResource.link}
                          onChange={handleAddResourceChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="primary-btn module-btn">
                      Save
                    </button>
                  </form>
                )}
                <table style={{ margin: "10px 0" }}>
                  <thead className="academic-table">
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Link</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resouceData.length > 0 ? (
                      resouceData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>{item.link}</td>
                          <td>
                            <label className="switch">
                              <input type="checkbox" checked={item.status}
                                onClick={() => handleResourceStatusChange(item.id, item.status)} />
                              <span className="slider"></span>
                            </label>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <div className="action-btn">
                              <span
                                className="edit"
                                onClick={() => handleGetResourceDataForEdit(item.id)}
                              >
                                <i className="fa fa-pencil"></i>
                              </span>
                              <span
                                className="delete"
                                onClick={() => handleDeleteResourceOpen(item.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )
                      : (
                        "No Resouce Data Found"
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      </div >
      {/* delete course resource model */}
      {deleteResourceOpen && (
        <div className="modal">
          <div className="modal-container">
            <h5>Delete</h5>
            <p>Are you sure you want to delete this Resource?</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="primary-btn" onClick={handleResourceDelete}>
                Delete
              </button>
              <button onClick={handleDeleteResourceOpen} className="secondary-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageCourse;
