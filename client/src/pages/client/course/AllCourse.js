import React, { useState } from "react";
import "../../../assets/css/client/allcourse.css";
import CourseList from "../component/CourseList";
import CourseGrid from "../component/CourseGrid";

const AllCourse = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "The Web Developer BootCamp 2024",
      price: "$499",
      description:
        "Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid",
      lessons: "20 Lessons",
      author: "Aakib Valuda",
      duration: "12.30 Hours",
      students: "156 Students",
      level: "Beginner",
      rating: "4.7",
      reviews: "255",
      image: require("../../../assets/image/course-thumbnail.png"),
    },
    {
      id: 2,
      title: "The Web Developer BootCamp 2024",
      price: "$499",
      description:
        "Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid",
      lessons: "20 Lessons",
      author: "Aakib Valuda",
      duration: "12.30 Hours",
      students: "156 Students",
      level: "Beginner",
      rating: "4.7",
      reviews: "255",
      image: require("../../../assets/image/course-thumbnail.png"),
    },
    {
      id: 3,
      title: "The Web Developer BootCamp 2024",
      price: "$499",
      description:
        "Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid",
      lessons: "20 Lessons",
      author: "Aakib Valuda",
      duration: "12.30 Hours",
      students: "156 Students",
      level: "Beginner",
      rating: "4.7",
      reviews: "255",
      image: require("../../../assets/image/course-thumbnail.png"),
    },
    {
      id: 4,
      title: "The Web Developer BootCamp 2024",
      price: "$499",
      description:
        "Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid",
      lessons: "20 Lessons",
      author: "Aakib Valuda",
      duration: "12.30 Hours",
      students: "156 Students",
      level: "Beginner",
      rating: "4.7",
      reviews: "255",
      image: require("../../../assets/image/course-thumbnail.png"),
    },
    {
      id: 5,
      title: "The Web Developer BootCamp 2024",
      price: "$499",
      description:
        "Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid",
      lessons: "20 Lessons",
      author: "Aakib Valuda",
      duration: "12.30 Hours",
      students: "156 Students",
      level: "Beginner",
      rating: "4.7",
      reviews: "255",
      image: require("../../../assets/image/course-thumbnail.png"),
    },
    {
      id: 6,
      title: "The Web Developer BootCamp 2024",
      price: "$499",
      description:
        "Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid",
      lessons: "20 Lessons",
      author: "Aakib Valuda",
      duration: "12.30 Hours",
      students: "156 Students",
      level: "Beginner",
      rating: "4.7",
      reviews: "255",
      image: require("../../../assets/image/course-thumbnail.png"),
    },
  ]);

  return (
    <>
      <section className="course-hero-container">
        <div class="course-category">
          <h3>Course Category</h3>
          <label>
            <input type="checkbox" /> Commercial (06)
          </label>
          <label>
            <input type="checkbox" /> Office (06)
          </label>
          <label>
            <input type="checkbox" /> Shop (06)
          </label>
          <label>
            <input type="checkbox" /> Educate (06)
          </label>
          <label>
            <input type="checkbox" /> Academy
          </label>
          <label>
            <input type="checkbox" /> Single family home
          </label>
          <label>
            <input type="checkbox" /> Studio
          </label>
          <label>
            <input type="checkbox" /> University
          </label>
        </div>

        <div className="course-section">
          <div className="course-section-header">
            <h1>All Courses</h1>
            <div className="course-header-search-section">
              <div className="course-search-input">
                <input type="text" placeholder="Search" />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="course-list-icon">
                <i
                  class="fa-brands fa-microsoft"
                  style={{ color: isGridView ? "#FF782D" : "initial" }}
                  onClick={() => setIsGridView(true)}
                ></i>
                <i class="fa-solid fa-list" style={{ color: isGridView ? "initial" : "#FF782D" }} onClick={() => setIsGridView(false)}></i>
              </div>
            </div>
          </div>
          {!isGridView && (
            <>
              <CourseList courseData={courses} />
            </>
          )}
          {isGridView && (
            <>
              <CourseGrid courseData={courses} />
            </>
          )}
        </div>
      </section>

    </>
  );
};

export default AllCourse;