import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../../../assets/css/client/coursevideo.css";
import courseThumbnail from "../../../assets/image/course-thumbnail.png";

const CourseVideo = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const toggleContent = (index) => {
    setActiveModuleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* Video page navbar  */}
      <nav className="navbar-section video-navbar p-2">
        <div
          className={`navbar-logo-section ${isMenuOpen ? "notdisplay" : ""}`}
        >
          <div className="navbar-logo">
            <NavLink to="/">
              <img src={require("../../../assets/image/Logo.png")} alt="logo" />
            </NavLink>
          </div>
        </div>

        <div className={`navbar-pages ${isMenuOpen ? "active" : ""}`}>
          <span className="text-sm font-semibold">
            Ontario Security Training Masterclass
          </span>
        </div>

        <div>
          <span className="text-sm">
            <span className="font-semibold">Time Spent :</span> 05:30:05
          </span>
        </div>

        <div></div>

        <div>
          <span className="text-sm">Your Progress : 8 of 10 (80%)</span>
        </div>

        <div
          className={`navbar-login-section "" : "notdisplay"}`}
        >
          <button
            className="login_btn"
            style={{
              borderRadius: "0",
              color: "black",
              borderColor: "black",
              fontSize: "14px",
            }}
          >
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <i class="fa-solid fa-angle-left mr-2"></i> Back To Main
            </NavLink>
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? (
            <i class="fa-solid fa-xmark"></i>
          ) : (
            <i class="fa-solid fa-bars"></i>
          )}
        </div>
      </nav>

      <div className="course-video-container">
        {/* Video Section */}
        <div className="video-player">
          <div className="thumbnail-container">
            <video controls className="video-element" poster={courseThumbnail}>
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4" // Online video path
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="play-button-overlay">
              <span className="play-icon"></span>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="ml-2 mr-2">
            <div className="tabs flex flex-wrap gap-2 justify-start md:justify-start">
              <button
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={activeTab === "resource" ? "active" : ""}
                onClick={() => setActiveTab("resource")}
              >
                Resource
              </button>
            </div>
            {activeTab === "overview" && (
              <>
                <div className="long-desc">
                  <p>
                    The minimum length of in-class time for the basic security
                    guard training program is no less than 40 hours with
                    Emergency Level First Aid Certification included or no less
                    than 33.5 hours with Emergency Level First Aid Certification
                    not included. The following table suggests the duration for
                    each training section and includes both in-class and outside
                    class hours. Outside class hours refer to pre-reading only;
                    all other training methods must take place in-class. These
                    hours are estimates and may need to be adjusted based on
                    student learning abilities/trainer preference. The trainer
                    must determine the optimal number of hours for each section
                    of his/her program design, but the total must be no less
                    than 40 or 33.5 hours with Emergency Level First Aid
                    Certification not included.
                  </p>
                </div>
                <div className="learning-list">
                  <h2 className="font-bold mb-4 text-2xl text-black">What you'll learn</h2>
                  <ul className="block sm:hidden">
                    <li>updated for 2020</li>
                    <li>Build 16 web development projects...</li>
                    <li>
                      After the course you will be able to build ANY website you
                      want.
                    </li>
                    <li>
                      Build fully-fledged websites and web apps for your startup
                      or business.
                    </li>
                    <li>Work as a freelance web developer.</li>
                    <li>Master frontend development with React</li>
                    <li>Master backend development with Node</li>
                    <li>Learn professional developer best practices.</li>
                  </ul>
                </div>
                <div className="prerequisites">
                  <h2 className="font-bold mb-4 text-2xl text-black">Prerequisites</h2>
                  <ul className="list-disc pl-4 md:pl-6 space-y-2">
                    <li className="pl-4 md:pl-0">
                      No coding or design experience necessary
                    </li>
                    <li className="pl-4 md:pl-0">
                      Any computer works — Windows, macOS, or Linux
                    </li>
                    <li className="pl-4 md:pl-0">
                      You don’t need to buy any software — we will use the best
                      free code editor in the world
                    </li>
                  </ul>
                </div>
              </>
            )}
            {activeTab === "resource" && (
              <div className="reviews-section">
                <div className="average-rating">
                  <div>
                    <h2>4.0 </h2>
                  </div>
                  <div>
                    <div className="review-rating">
                      {[...Array(4)].map((_, i) => (
                        <i className="fa-solid fa-star" key={i}></i>
                      ))}
                      <i className="fa-regular fa-star"></i> {/* Half star */}
                    </div>
                    <p>based on 146,951 ratings</p>
                  </div>
                </div>
                <div className="review-list">
                  {Array(2)
                    .fill()
                    .map((_, index) => (
                      <div className="review-item" key={index}>
                        <div className="reviewer-info">
                          <img
                            src="https://via.placeholder.com/50"
                            alt="Reviewer"
                          />
                          <div>
                            <h4>David W.</h4>
                            <div className="flex items-center gap-2.5">
                              <div className="review-rating">
                                {[...Array(4)].map((_, i) => (
                                  <i className="fa-solid fa-star" key={i}></i>
                                ))}
                                <i className="fa-regular fa-star"></i>{" "}
                                {/* Half star */}
                              </div>
                              <div className="review-date">
                                <span>2 weeks ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="review-text">
                          I love the way the instructor goes about the course.
                          So easy to follow, even though a little bit
                          challenging as expected.
                        </p>
                      </div>
                    ))}
                </div>

                <div className="container mx-auto px-4 mt-5">
                  <nav
                    className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
                    aria-label="Pagination"
                  >
                    <a
                      className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 text-black hover:border-gray-300"
                      href="#"
                      title="Previous Page"
                    >
                      <span className="sr-only">Previous Page</span>
                      <svg
                        className="block w-4 h-4 fill-current"
                        viewBox="0 0 256 512"
                        aria-hidden="true"
                        role="presentation"
                      >
                        <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
                      </svg>
                    </a>
                    <a
                      className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                      href="#"
                      title="Page 1"
                    >
                      1
                    </a>
                    <a
                      className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                      href="#"
                      title="Page 2"
                    >
                      2
                    </a>
                    <a
                      className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black bg-black text-white"
                      href="#"
                      aria-current="page"
                      title="Page 3"
                    >
                      3
                    </a>
                    <a
                      className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                      href="#"
                      title="Next Page"
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        className="block w-4 h-4 fill-current"
                        viewBox="0 0 256 512"
                        aria-hidden="true"
                        role="presentation"
                      >
                        <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Info Section */}
        <div className="course-info md:ml-2">
          <div className="module">
            <div className="module-header">
              <span className="module-title">
                MODULE-1 : Introduction to Security Guard
              </span>
              <div className="module-controls">
                <button className="check-btn" onClick={() => toggleContent(0)}>
                  <i
                    className={`fa-solid ${
                      activeModuleIndex === 0 ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            {activeModuleIndex === 0 && (
              <>
                <div className="module-list">
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                        <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-actions">
                        <button className="resource-btn">
                          <i class="fa-regular fa-folder-open"></i> Resource
                        </button>
                      </div>

                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                        <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-actions">
                        <button className="resource-btn">
                          <i class="fa-regular fa-folder-open"></i> Resource
                        </button>
                      </div>

                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                        <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="module">
            <div className="module-header">
              <span className="module-title">
                MODULE-2 : Introduction to Security Guard
              </span>
              <div className="module-controls">
                <button className="check-btn" onClick={() => toggleContent(1)}>
                  <i
                    className={`fa-solid ${
                      activeModuleIndex === 1 ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            {activeModuleIndex === 1 && (
              <>
                <div className="module-list">
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                        <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-actions">
                        <button className="resource-btn">
                          <i class="fa-regular fa-folder-open"></i> Resource
                        </button>
                      </div>

                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                        <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-actions">
                        <button className="resource-btn">
                          <i class="fa-regular fa-folder-open"></i> Resource
                        </button>
                      </div>

                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                        <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="module">
            <div className="module-header">
              <span className="module-title">
                MODULE-3 : Introduction to Security Guard
              </span>
              <div className="module-controls">
                <button className="check-btn" onClick={() => toggleContent(2)}>
                  <i
                    className={`fa-solid ${
                      activeModuleIndex === 2 ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            {activeModuleIndex === 2 && (
              <>
                <div className="module-list">
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                          <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-actions">
                        <button className="resource-btn">
                          <i class="fa-regular fa-folder-open"></i> Resource
                        </button>
                      </div>

                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                          <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-actions">
                        <button className="resource-btn">
                          <i class="fa-regular fa-folder-open"></i> Resource
                        </button>
                      </div>

                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                  <div className="module-content">
                    <div className="module-lesson">
                      <div className="lesson-title">
                        <span className="lesson-icon">
                          <i className="fa-solid fa-file"></i>
                        </span>
                        Course Intro
                      </div>
                      <div className="lesson-time">
                        <input type="checkbox" className="checkbox-class" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseVideo;
