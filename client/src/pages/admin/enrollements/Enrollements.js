import React, { useContext, useEffect, useMemo, useState } from "react";
import "../../../assets/css/enrollement/enrollement.css";
import Hoc from "../layout/Hoc";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../layout/Loading";
import { notifyWarning } from "../layout/ToastMessage"
import useCheckRolePermission from "../layout/CheckRolePermission";
import { userRolesContext } from "../layout/RoleContext";
const port = process.env.REACT_APP_URL

function Enrollements() {
  const [addOpen, setAddOpen] = useState(false);
  const { userRole } = useContext(userRolesContext);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [addEnrollData, setAddEnrollData] = useState({
    students: [],
    courses: [],
  });
  const perm = useCheckRolePermission("Enrollment Information");
  const addEnrollPermission = perm.length > 0 && perm[0].can_add === 1 ? 1 : 0;
  const editEnrollPermission = perm.length > 0 && perm[0].can_edit === 1 ? 1 : 0;
  const deleteEnrollPermission = perm.length > 0 && perm[0].can_delete === 1 ? 1 : 0;
  //get enroll data
  const getEnrollmentData = () => {
    setLoading(true)
    axiosInstance.get(`${port}/gettingEnrollmentData`)
      .then((res) => {
        setStudentData(res.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }

  const addToggleModal = () => {
    setAddOpen(!addOpen);
  };

  //filter enroll data with selected course
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredEnrollStudent, setFilteredEnrollStudent] = useState([]);
  const handleCourseFilter = (e) => {
    const selectedCourseId = e.target.value;

    if (selectedCourseId === "") {
      setFilteredEnrollStudent(studentData);
      setSelectedCourse("");
    } else {
      // Filter students by selected course
      const selectedCourse = courseData.find(
        (course) => course.id === parseInt(selectedCourseId)
      );
      if (selectedCourse) {
        setSelectedCourse(selectedCourse);
        filteredEnrollWithCourse(parseInt(selectedCourseId)); // Pass the course ID
      }
    }
  };

  const filteredEnrollWithCourse = (selectedCourseId) => {
    const filteredStudents = studentData.filter((student) => {
      // Check if the student's course_id matches the selected course_id
      return student.course_id === selectedCourseId;
    });
    setFilteredEnrollStudent(filteredStudents);
  }

  //get student data
  const [allStudentData, setAllStudentData] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]); // New state for filtered data
  const [studentNameInput, setStudentNameInput] = useState("");

  const getAllStudentData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(`${port}/gettingAllStudentData`);
      setAllStudentData(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  const handleStudentNameChange = (e) => {
    const input = e.target.value;
    setStudentNameInput(input);

    if (input.trim() === "") {
      setFilteredStudent([]);
      setAddEnrollData({
        ...addEnrollData,
        students: [], // Only store the last selected student's ID
      });
      return;
    }
    const filtered = allStudentData.filter(
      (student) =>
        student.first_name.toLowerCase().includes(input.toLowerCase()) ||
        student.last_name.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredStudent(filtered);
  };
  const handleStudentSelection = (student) => {
    // Check if the student is already selected
    setAddEnrollData({
      ...addEnrollData,
      students: [student.id], // Only store the last selected student's ID
    });
    setStudentNameInput(`${student.first_name} ${student.last_name}`);
    setFilteredStudent([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addEnrollData.students.length === 0) {
      notifyWarning("Please select a student.");
      return;
    }
    if (addEnrollData.courses.length === 0) {
      notifyWarning("Please select at least one course.");
      return;
    }
    setLoading(true);
    for (const courseId of addEnrollData.courses) {
      const enrollData = {
        student_id: addEnrollData.students[0],
        course_id: courseId.course_id,
        enrollment_mode: "manual",
      };
      try {
        const addEnrollment = await axiosInstance.post(`${port}/addingEnrollment`, enrollData);
        if (addEnrollment.status !== 200) {
          console.error(`Enrollment failed for Course ID ${courseId.course_id}.`);
          alert(`Enrollment failed for Course ID ${courseId.course_id}.`);
          setLoading(false);
        } else {
          setLoading(false);
          setAddOpen(false);
          getEnrollmentData();
          setStudentNameInput('');
          setAddEnrollData({
            courses: [],
            students: [],
          })
        }
      } catch (error) {
        console.error(`Error enrolling Course ID ${courseId}:`, error);
        alert(`An error occurred while enrolling Course ID ${courseId}.`);
        setLoading(false);
      }
    }
  };

  //get course data
  const [courseData, setCourseData] = useState([]);
  const getCourseData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingCourseMasterData`);
      setCourseData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCourseSelection = (e) => {
    const selectedCourseId = e.target.value;
    // Find the course details using the selected ID
    const selectedCourse = courseData.find(
      (course) => course.id === parseInt(selectedCourseId)
    );

    if (
      selectedCourse &&
      !addEnrollData.courses.some(
        (course) => course.course_id === selectedCourseId
      )
    ) {
      setAddEnrollData({
        ...addEnrollData,
        courses: [
          ...addEnrollData.courses,
          { course_id: selectedCourseId, course_title: selectedCourse.course_title },
        ],
      });
    }
  };

  // Handle removing a course
  const handleRemoveKeyword = (indexToRemove) => {
    setAddEnrollData({
      ...addEnrollData,
      courses: addEnrollData.courses.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  //update status
  const updateEnrollStatus = async (id, status) => {
    try {
      const res = await axiosInstance.put(`${port}/updattingEnrollStatus/${id}`, { status });
      if (res.status === 200) {
        getEnrollmentData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //delete data
  const [deleteId, setDeleteId] = useState(null);
  const deleteToggleModal = (index) => {
    setDeleteOpen(!deleteOpen);
    setDeleteId(index);
  };
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`${port}/deletingEnrollment/${deleteId}`);
      getEnrollmentData();
      setDeleteOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEnrollmentData();
    getCourseData();
    getAllStudentData();
  }, []);
  useEffect(() => {
    setFilteredEnrollStudent(studentData);
  }, [studentData])

  const filterData = useMemo(() => {
    return filteredEnrollStudent.filter((student) => {
      return student.user_enrollment.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.user_enrollment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.course_master_enrollment.course_title.toLowerCase().includes(searchQuery.toLowerCase())

    })
  }, [filteredEnrollStudent, searchQuery])

  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Enrollements</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search-input" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div id="header-course-selection">
            <select
              name="course"
              id="course"
              form="currencyform"
              onChange={handleCourseFilter}
              value={selectedCourse ? selectedCourse.id : ""}
            >
              <option value="">
                All Courses
              </option>
              {courseData.map((course, index) => (
                <option key={index} value={course.id}>
                  {course.course_title}
                </option>
              ))}
            </select>
          </div>
          {(userRole === "superAdmin" || addEnrollPermission === 1) && (
            <a onClick={addToggleModal} style={{ cursor: "pointer" }}>
              <button className="primary-btn module-btn">+ Add</button>
            </a>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Student name</th>
              <th>Course Name</th>
              <th>Course Expire</th>
              <th>Enrolled Mode</th>
              {(userRole === "superAdmin" || editEnrollPermission == 1) && (
                <th>Status</th>
              )}
              {(userRole === "superAdmin" || deleteEnrollPermission == 1) && (
                <th>Action</th>
              )}
            </tr>
          </thead>

          <tbody className="email_tbody">
            {filterData.map((enroll, index) => (
              <tr key={enroll.id}>
                <td>{index + 1}</td>
                <td className="profile-img">
                  {enroll.user_enrollment.profile ? (
                    <img src={`../upload/${enroll.user_enrollment.profile}`} alt="User" />
                  ) : (
                    <img src={require('../../../assets/image/default-profile.png')} alt="User" />
                  )}
                </td>
                <td>
                  <h6>{`${enroll.user_enrollment.first_name} ${enroll.user_enrollment.last_name}`}</h6>
                  <p className="lowercase">{enroll.user_enrollment.email}</p>
                </td>
                <td>{enroll.course_master_enrollment.course_title}</td>
                <td>
                  {enroll.course_master_enrollment.expiring_time ?
                    <p>{enroll.course_master_enrollment.expiring_time === "life_time" ? "" : enroll.course_master_enrollment.no_of_month + " month"}</p>
                    :
                    "-"
                  }

                </td>
                <td>{enroll.enrollment_mode}</td>
                {(userRole === "superAdmin" || editEnrollPermission == 1) && (
                  <td>
                    <label htmlFor={`coursestatus-${enroll.id}`} className="switch">
                      <input
                        type="checkbox"
                        name="status"
                        id={`coursestatus-${enroll.id}`}
                        checked={enroll.status === 1}
                        onClick={() => updateEnrollStatus(enroll.id, enroll.status)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                )}
                {(userRole === "superAdmin" || deleteEnrollPermission == 1) && (
                  <td className="del_icon">
                    <span className="delete" onClick={() => deleteToggleModal(enroll.id)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Model */}
      {addOpen && (
        <div className="modal">
          <div className="modal-container">
            <h5>Add Enrollements</h5>
            <form className="coupon-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentname">
                  Student Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="studentname"
                  id="studentname"
                  className={`col12input ${filteredStudent.length > 0 ? "rounded-b-none border-b-0" : ""}`}
                  placeholder="Enter Student Name"
                  value={studentNameInput}
                  onChange={handleStudentNameChange}
                />
                {filteredStudent.length > 0 && (
                  <div className="rounded-lg rounded-t-none border border-gray-200 border-t-0 shadow-lg bg-white overflow-hidden">
                    <ul className="max-h-28 overflow-y-auto">
                      {filteredStudent.map((student, index) => (
                        <li
                          key={index}
                          className={`cursor-pointer p-2 hover:bg-blue-100 ${addEnrollData.students[0] === student.id ? "bg-blue-200" : ""}`}
                          onClick={() => handleStudentSelection(student)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm text-gray-800">
                              {student.first_name} {student.last_name}
                            </span>
                            {addEnrollData.students[0] === student.id && (
                              <span className="text-xs text-blue-700">Selected</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="currency">Select Course</label>
                <select
                  name="currency"
                  id="currency"
                  form="currencyform"
                  className="col12input"
                  onChange={handleCourseSelection}
                  value=""
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courseData.map((course, index) => (
                    <option key={index} value={course.id}>
                      {course.course_title}
                    </option>
                  ))}
                </select>

                <div className="tag-container">
                  {addEnrollData.courses.map((course, index) => (
                    <div className="tag" key={index}>
                      {course.course_title}
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

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="primary-btn">
                  Submit
                </button>
                <button type="button" onClick={addToggleModal} className="secondary-btn">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* delete modal */}
      {deleteOpen && (
        <div className="modal">
          <div className="modal-container">
            <h5>Delete Coupon</h5>
            <p>Are you sure you want to delete this coupon?</p>
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
    </>
  );
}

export default Enrollements;