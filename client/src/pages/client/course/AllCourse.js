import React, { useState, useEffect } from "react";
import "../../../assets/css/client/allcourse.css";
import CourseList from "../component/CourseList";
import CourseGrid from "../component/CourseGrid";
import Footer from "../layout/Footer";

const AllCourse = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 850);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 850;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setIsFilterOpen(false); // Reset filter on larger screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <section className="course-hero-container lg:text-truncate">
        <div className="course-category">
          {isMobileView && (
            <button className="filter-button" onClick={toggleFilter}>
              Filter
              <i class="fa-solid fa-filter"></i>

            </button>
          )}
          {isMobileView && (
            <div className={`filter-sidebar ${isFilterOpen ? "open" : "closed"}`}>
              <div className="filter-header">
                <h3>Course Category</h3>
                <button className="close-button" onClick={toggleFilter}>
                  <i className="fa fa-times"></i>
                </button>
              </div>
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
          )}

          {/*mnew  */}
          <div className="desktop-sidebar">
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
          {/*mnew  */}
        </div>
        <div className="course-section">
          <div className="course-section-header">
            <h1>All Courses</h1>
            <div className="course-header-search-section">
              <div className="course-search-input">
                <input type="text" placeholder="Search" />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="course-list-icon">
                <a title="GridView">
                  <i className="fa-brands fa-microsoft" style={{ color: isGridView ? "#4880ff" : "initial" }}
                    onClick={() => setIsGridView(true)}></i>
                </a>
                <a title="ListView">
                  <i className="fa-solid fa-list" style={{ color: isGridView ? "initial" : "#4880ff" }}
                    onClick={() => setIsGridView(false)}></i>
                </a>
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
      <Footer />
    </>
  );
};

export default AllCourse;