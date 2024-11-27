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
      <nav className="video-navbar flex flex-col gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
  {/* Logo and Video Title */}
  <div className="flex items-center gap-4 w-full md:w-auto">
    <div className="navbar-logo">
      <NavLink to="/">
        <img src={require("../../../assets/image/Logo.png")} alt="logo" />
      </NavLink>
    </div>

    <span className="text-sm font-semibold">
      Ontario Security Training Masterclass
    </span>
  </div>

  {/* Content for Time Spent, Review, Progress, and Back Button */}
  <div className="flex flex-col gap-2 sm:gap-4 w-full sm:w-auto md:flex-row md:items-center justify-between">
    {/* Time Spent */}
    <div className="text-sm sm:text-base">
      <span className="font-semibold">Time Spent :</span> 05:30:05
    </div>

    {/* Rating & Review */}
    <div className="text-sm font-medium text-black">
      <div className="flex justify-start mb-1 text-orange-500 text-xs sm:text-sm">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>
      <span className="text-sm tracking-wide font-normal sm:text-base">
        Leave Your Review
      </span>
    </div>

    {/* Progress */}
    <div className="text-sm sm:text-base">
      <span>Your Progress : 8 of 10 (80%)</span>
    </div>

    {/* Back Button */}
    <button className="back-btn mt-4 sm:mt-0">
      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
        <i className="fa-solid fa-angle-left mr-2"></i> Back To Main
      </NavLink>
    </button>
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
                  <h2 className="font-bold mb-4 text-2xl text-black">
                    What you'll learn
                  </h2>
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
                  <h2 className="font-bold mb-4 text-2xl text-black">
                    Prerequisites
                  </h2>
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
              <p>Data not found</p>
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
                          <i className="fa-regular fa-folder-open"></i> Resource
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
                          <i className="fa-regular fa-folder-open"></i> Resource
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
                          <i className="fa-regular fa-folder-open"></i> Resource
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
                          <i className="fa-regular fa-folder-open"></i> Resource
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
                          <i className="fa-regular fa-folder-open"></i> Resource
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
                          <i className="fa-regular fa-folder-open"></i> Resource
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
