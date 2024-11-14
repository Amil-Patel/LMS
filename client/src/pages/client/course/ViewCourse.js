import React, { useState } from "react";
import "../../../assets/css/client/view-course.css";
import Navbar from "../layout/Navbar";
import Breadcrumb from "./Breadcrumb";

const ViewCourse = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const toggleContent = (index) => {
    setActiveModuleIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const [activeFaqsIndex, setActiveFaqsIndex] = useState(0);
  const toggleFaqsContent = (index) => {
    setActiveFaqsIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className="main-section 2xl:flex xl:flex lg:flex block">
        <div className="header-content 2xl:w-8/12 xl:w-8/12 lg:w-8/12 w-full">
          <div className="badge">Security</div>
          <h2>The Complete 2020 Full Stack Web Developer Course</h2>
          <p>
            Learn modern HTML5, CSS3 and web design by building a stunning website
            for your portfolio! Includes flexbox and CSS Grid
          </p>
          <div className="rating-author">
            <span className="rating">
              4.5 <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i> (3,902)
            </span>
            <p style={{ marginTop: "15px" }}>By Aakib Valuda</p>
          </div>
          <div className="metadata">
            <span>
              <i className="fa-solid fa-file"></i> 20 Lessons
            </span>
            <span>
              <i className="fa-solid fa-clock"></i> 12.30 Hours
            </span>
            <span>
              <i className="fa-solid fa-graduation-cap"></i> 156 Students
            </span>
            <span>
              <i className="fa-solid fa-signal"></i> Beginner
            </span>
            <span>
              <i className="fa-solid fa-graduation-cap"></i> English
            </span>
          </div>
          <div className="metadata mt-4">
            <span>
              <i className="fa-solid fa-clock"></i> Last Update: 11/2024
            </span>
          </div>

          {/* Tab Bar */}
          <div className="tabs">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={activeTab === "curriculum" ? "active" : ""}
              onClick={() => setActiveTab("curriculum")}
            >
              Curriculum
            </button>
            <button
              className={activeTab === "faqs" ? "active" : ""}
              onClick={() => setActiveTab("faqs")}
            >
              FAQs
            </button>
            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
          {activeTab === "overview" && (
            <>
              <div className="long-desc">
                <p>
                  The minimum length of in-class time for the basic security guard
                  training program is no less than 40 hours with Emergency Level
                  First Aid Certification included or no less than 33.5 hours with
                  Emergency Level First Aid Certification not included. The
                  following table suggests the duration for each training section
                  and includes both in-class and outside class hours. Outside
                  class hours refer to pre-reading only; all other training
                  methods must take place in-class. These hours are estimates and
                  may need to be adjusted based on student learning
                  abilities/trainer preference. The trainer must determine the
                  optimal number of hours for each section of his/her program
                  design, but the total must be no less than 40 or 33.5 hours with
                  Emergency Level First Aid Certification not included.
                </p>
              </div>
              <div className="learning-list">
                <h2>What you'll learn</h2>
                <ul>
                  <li>updated for 2020</li>
                  <li>Build 16 web development projects...</li>
                  <li>
                    After the course you will be able to build ANY website you
                    want.
                  </li>
                  <li>
                    Build fully-fledged websites and web apps for your startup or
                    business.
                  </li>
                  <li>Work as a freelance web developer.</li>
                  <li>Master frontend development with React</li>
                  <li>Master backend development with Node</li>
                  <li>Learn professional developer best practices.</li>
                </ul>
              </div>
              <div className="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                  <li>No coding or design experience necessary</li>
                  <li>Any computer works — Windows, macOS or Linux</li>
                  <li>
                    You don’t need to buy any software — we will use the best free
                    code editor in the world
                  </li>
                </ul>
              </div>
            </>
          )}
          {activeTab === "curriculum" && (
            <>
              <div className="module">
                <div className="module-header">
                  <span className="module-title">
                    MODULE-1 : Introduction to Security Guard
                  </span>
                  <div className="module-controls">
                    <button
                      className="check-btn"
                      onClick={() => toggleContent(0)}
                    >
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                  </div>
                </div>
                {activeModuleIndex === 0 && (
                  <>
                    <div className="module-content">
                      <div className="module-lesson">
                        <div className="lesson-title">
                          <span className="lesson-icon">
                            <i class="fa-regular fa-circle-play"></i>
                          </span>
                          Video: Course Intro
                        </div>
                        <div className="lesson-actions">
                          <button className="resource-btn">
                            <i className="fa-solid fa-eye"></i> Preview
                          </button>
                        </div>

                        <div className="lesson-time">
                          <span>13 Min</span>
                        </div>
                      </div>
                    </div>
                    <div className="module-content">
                      <div className="module-lesson">
                        <div className="lesson-title">
                          <span className="lesson-icon">
                            <i class="fa-regular fa-circle-play"></i>
                          </span>
                          Video: Course Intro
                        </div>
                        <div className="lesson-actions">
                          <button className="resource-btn">
                            <i className="fa-solid fa-eye"></i> Preview
                          </button>
                        </div>

                        <div className="lesson-time">
                          <span>8 Min</span>
                        </div>
                      </div>
                    </div>
                    <div className="module-content">
                      <div className="module-lesson">
                        <div className="lesson-title">
                          <span className="lesson-icon">
                            <i class="fa-regular fa-circle-play"></i>
                          </span>
                          Video: Course Intro
                        </div>
                        <div className="lesson-time">
                          <span>20 Min</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="module">
                <div className="module-header">
                  <span className="module-title">
                    MODULE-1 : Introduction to Security Guard
                  </span>
                  <div className="module-controls">
                    <button
                      className="check-btn"
                      onClick={() => toggleContent(1)}
                    >
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                  </div>
                </div>
                {activeModuleIndex === 1 && (
                  <>
                    <div className="module-content">
                      <div className="module-lesson">
                        <div className="lesson-title">
                          <span className="lesson-icon">
                            <i class="fa-regular fa-circle-play"></i>
                          </span>
                          Video: Course Intro
                        </div>
                        <div className="lesson-actions">
                          <button className="resource-btn">
                            <i className="fa-solid fa-eye"></i> Preview
                          </button>
                        </div>

                        <div className="lesson-time">
                          <span>13 Min</span>
                        </div>
                      </div>
                    </div>
                    <div className="module-content">
                      <div className="module-lesson">
                        <div className="lesson-title">
                          <span className="lesson-icon">
                            <i class="fa-regular fa-circle-play"></i>
                          </span>
                          Video: Course Intro
                        </div>
                        <div className="lesson-actions">
                          <button className="resource-btn">
                            <i className="fa-solid fa-eye"></i> Preview
                          </button>
                        </div>

                        <div className="lesson-time">
                          <span>8 Min</span>
                        </div>
                      </div>
                    </div>
                    <div className="module-content">
                      <div className="module-lesson">
                        <div className="lesson-title">
                          <span className="lesson-icon">
                            <i class="fa-regular fa-circle-play"></i>
                          </span>
                          Video: Course Intro
                        </div>
                        <div className="lesson-time">
                          <span>20 Min</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {activeTab === "faqs" && (
            <>
              <div className="faqs-header">
                <div className="module">
                  <div className="module-header">
                    <span className="module-title">
                      What Does Royalty Free Mean?
                    </span>
                    <div className="module-controls">
                      <button
                        className="check-btn"
                        onClick={() => toggleFaqsContent(0)}
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                  {activeFaqsIndex === 0 && (
                    <>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras facilisis faucibus odio arcu duis dui, adipiscing
                        facilisis. Urna, donec turpis egestas volutpat. Quisque
                        nec non amet quis. Varius tellus justo odio parturient
                        mauris curabitur lorem in.
                      </p>
                    </>
                  )}
                </div>
                <div className="module">
                  <div className="module-header">
                    <span className="module-title">
                      What Does Royalty Free Mean?
                    </span>
                    <div className="module-controls">
                      <button
                        className="check-btn"
                        onClick={() => toggleFaqsContent(1)}
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                  {activeFaqsIndex === 1 && (
                    <>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras facilisis faucibus odio arcu duis dui, adipiscing
                        facilisis. Urna, donec turpis egestas volutpat. Quisque
                        nec non amet quis. Varius tellus justo odio parturient
                        mauris curabitur lorem in.
                      </p>
                    </>
                  )}
                </div>
                <div className="module">
                  <div className="module-header">
                    <span className="module-title">
                      What Does Royalty Free Mean?
                    </span>
                    <div className="module-controls">
                      <button
                        className="check-btn"
                        onClick={() => toggleFaqsContent(2)}
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                  {activeFaqsIndex === 2 && (
                    <>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras facilisis faucibus odio arcu duis dui, adipiscing
                        facilisis. Urna, donec turpis egestas volutpat. Quisque
                        nec non amet quis. Varius tellus justo odio parturient
                        mauris curabitur lorem in.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === "reviews" && (
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
                        I love the way the instructor goes about the course. So
                        easy to follow, even though a little bit challenging as
                        expected.
                      </p>
                    </div>
                  ))}
              </div>

              <div class="container mx-auto px-4 mt-5">
                <nav
                  class="flex flex-row flex-nowrap justify-between md:justify-center items-center"
                  aria-label="Pagination"
                >
                  <a
                    class="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 text-black hover:border-gray-300"
                    href="#"
                    title="Previous Page"
                  >
                    <span class="sr-only">Previous Page</span>
                    <svg
                      class="block w-4 h-4 fill-current"
                      viewBox="0 0 256 512"
                      aria-hidden="true"
                      role="presentation"
                    >
                      <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
                    </svg>
                  </a>
                  <a
                    class="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                    href="#"
                    title="Page 1"
                  >
                    1
                  </a>
                  <a
                    class="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                    href="#"
                    title="Page 2"
                  >
                    2
                  </a>
                  <a
                    class="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black bg-black text-white"
                    href="#"
                    aria-current="page"
                    title="Page 3"
                  >
                    3
                  </a>
                  <a
                    class="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                    href="#"
                    title="Next Page"
                  >
                    <span class="sr-only">Next Page</span>
                    <svg
                      class="block w-4 h-4 fill-current"
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

        <div className="course-image 2xl:w-4/12 xl:w-4/12 lg:w-4/12 w-full">
          <img
            src={require("../../../assets/image/course-thumbnail.png")}
            alt="Course Thumbnail"
          />
          <div className="price">
            <h3>
              $499 <span className="discount">$899</span>
              <span className="discount-badge">25% Off</span>
            </h3>
            <div className="cart-buttons">
              <button className="btn-add">Add to Cart</button>
              <button className="btn-buy">Buy Now</button>
            </div>
          </div>
          <div className="course-list">
            <p>This Course includes:</p>
            <ul>
              <li>
                <i className="fa-brands fa-youtube"></i> 54.5 hours on-demand
                video
              </li>
              <li>
                <i className="fa-regular fa-file"></i> 3 articles
              </li>
              <li>
                <i className="fa-solid fa-file-arrow-down"></i> 249 downloadable
                resources
              </li>
              <li>
                <i className="fa-solid fa-mobile"></i> Access on mobile and TV
              </li>
              <li>
                <i className="fa-solid fa-infinity"></i> Full lifetime access
              </li>
              <li>
                <i className="fa-solid fa-trophy"></i> Certificate of completion
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
