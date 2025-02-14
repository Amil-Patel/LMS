import React, { useState, useEffect } from "react";
import "../../../assets/css/client/allcourse.css";
import CourseList from "../component/CourseList";
import CourseGrid from "../component/CourseGrid";
import axiosInstance from "../utils/axiosInstance";

const port = process.env.REACT_APP_URL;


const AllCourse = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 850);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  // Get course category
  const [courseCategory, setCourseCategory] = useState();
  const getCourseCategory = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(`${port}/gettingNotNullCourseCategory`);
      setCourseCategory(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  // Get course data
  const [courseData, setCourseData] = useState();
  const getCourseData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(`${port}/gettingActiveCourseMasterData`);
      setCourseData(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value); // Get category ID from checkbox value
    setSelectedCategories((prevCategories) =>
      e.target.checked
        ? [...prevCategories, categoryId]
        : prevCategories.filter((id) => id !== categoryId)
    );
  };

  // Filter courses based on search query and selected categories
  const filteredCourses = courseData?.filter((course) => {
    const matchesSearchQuery =
      course.course_title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      course.short_desc.toLowerCase().includes(searchQuery.toLowerCase().trim());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(course.course_cate);

    return matchesSearchQuery && matchesCategory;
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 850;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setIsFilterOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getCourseData();
    getCourseCategory();
  }, []);
  useEffect(() => {
    document.title = "Comfort Security | Courses"; // Set the page title dynamically
  }, []);
  return (
    <>
      <div className="client_section">
        {loading ? (
          <div className="client_loading_container">
            <div className="client_loader"></div>
          </div>
        ) : (
          <section className="course-hero-container course_main_padding lg:text-truncate">
            <div className="course-category">
              {isMobileView && (
                <button className="filter-button" onClick={toggleFilter}>
                  Filter
                  <i className="fa-solid fa-filter"></i>
                </button>
              )}
              {isMobileView && (
                <div className={`filter-sidebar ${isFilterOpen ? "open" : "closed"}`}>
                  <div className="filter-header">
                    <h3>Course Category</h3>
                    <button className="close-button mb-[15px]" onClick={toggleFilter}>
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                  {courseCategory?.map((item) => (
                    <label key={item.id}>
                      <input
                        type="checkbox"
                        value={item.id}
                        onChange={handleCategoryChange} // Handle category selection
                      />
                      {item.cate_title}
                    </label>
                  ))}
                </div>
              )}

              <div className="desktop-sidebar">
                <h3>Course Category</h3>
                {courseCategory?.map((item) => (
                  <label key={item.id}>
                    <input
                      type="checkbox"
                      value={item.id}
                      onChange={handleCategoryChange}
                    />
                    {item.cate_title}
                  </label>
                ))}
              </div>
            </div>
            <div className="course-section">
              <div className="course-section-header">
                <h1>All Courses</h1>
                <div className="course-header-search-section">
                  <div className="course-search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange} // Update search query
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div className="course-list-icon">
                    <a
                      title="GridView"
                      onClick={() => setIsGridView(true)}
                    >
                      <i
                        className="fa-brands fa-microsoft"
                        style={{ color: isGridView ? "#4880ff" : "initial" }}
                      ></i>
                    </a>
                    <a
                      title="ListView"
                      onClick={() => setIsGridView(false)}
                    >
                      <i
                        className="fa-solid fa-list"
                        style={{ color: isGridView ? "initial" : "#4880ff" }}
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
              {!isGridView && <CourseList courses={filteredCourses} category={courseCategory} />}
              {isGridView && <CourseGrid courses={filteredCourses} category={courseCategory} />}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default AllCourse;
