import React, { useState } from "react";
import "../../../assets/css/client/allcourse.css";

const AllCourse = () => {
  const [isGridView, setIsGridView] = useState(false)
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
                  style={{ color: "#FF782D" }}
                  onClick={() => setIsGridView(!isGridView)}
                ></i>
                <i class="fa-solid fa-bars-staggered"></i>
              </div>
            </div>
          </div>

          <div className={isGridView ? 'grid grid-cols-3 pt-6 gap-8' : ''}>

            <div className={isGridView ? 'course-main-div-grid' : 'course-main-div'}>
              <img
                src={require("../../../assets/image/course-thumbnail.png")}
                alt="logo"
              />
              <div className="course-details">
                <div className="course-details-header">
                  <h3>The Web Developer BootCamp 2024</h3>
                  {!isGridView && <span>$ 499</span>}
                </div>

                {isGridView && <div className="course-tutor-and-rating">
                  <div className="course-tutor-name">By Aakib Valuda</div>
                  <div className="course-rating-grid">4.5
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    </div>
                </div>}

                {!isGridView && <p>
                  Learn modern HTML5, CSS3 and web design by building a stunning
                  website for your portfolio! Includes flexbox and CSS Grid
                </p>}
                <div className="course-icon-section">
                  <span>
                    <i className="fa-solid fa-copy"></i> 20 Lessons
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
                </div>
                <div className="course-rating">
                  4.7 ***** ( 255 )
                </div>
                <div className="course-btn">
                  <button className="security-button">
                    Security
                  </button>
                  {isGridView && <span>$ 499</span>}
                  <button className="add-to-cart-btn">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            <div className={isGridView ? 'course-main-div-grid' : 'course-main-div'}>
              <img
                src={require("../../../assets/image/course-thumbnail.png")}
                alt="logo"
              />
              <div className="course-details">
                <div className="course-details-header">
                  <h3>The Web Developer BootCamp 2024</h3>
                  {!isGridView && <span>$ 499</span>}

                </div>
                {!isGridView && <p>
                  Learn modern HTML5, CSS3 and web design by building a stunning
                  website for your portfolio! Includes flexbox and CSS Grid
                </p>}
                <div className="course-icon-section">
                  <span>
                    <i className="fa-solid fa-copy"></i> 20 Lessons
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
                </div>
                <div className="course-rating">
                  4.7 ***** ( 255 )
                </div>
                <div className="course-btn">
                  <button className="security-button">
                    Security
                  </button>
                  {isGridView && <span>$ 499</span>}
                  <button className="add-to-cart-btn">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className={isGridView ? 'course-main-div-grid' : 'course-main-div'}>
              <img
                src={require("../../../assets/image/course-thumbnail.png")}
                alt="logo"
              />
              <div className="course-details">
                <div className="course-details-header">
                  <h3>The Web Developer BootCamp 2024</h3>
                  {!isGridView && <span>$ 499</span>}

                </div>
                {!isGridView && <p>
                  Learn modern HTML5, CSS3 and web design by building a stunning
                  website for your portfolio! Includes flexbox and CSS Grid
                </p>}
                <div className="course-icon-section">
                  <span>
                    <i className="fa-solid fa-copy"></i> 20 Lessons
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
                </div>
                <div className="course-rating">
                  4.7 ***** ( 255 )
                </div>
                <div className="course-btn">
                  <button className="security-button">
                    Security
                  </button>
                  {isGridView && <span>$ 499</span>}
                  <button className="add-to-cart-btn">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className={isGridView ? 'course-main-div-grid' : 'course-main-div'}>
              <img
                src={require("../../../assets/image/course-thumbnail.png")}
                alt="logo"
              />
              <div className="course-details">
                <div className="course-details-header">
                  <h3>The Web Developer BootCamp 2024</h3>
                  {!isGridView && <span>$ 499</span>}

                </div>
                {!isGridView && <p>
                  Learn modern HTML5, CSS3 and web design by building a stunning
                  website for your portfolio! Includes flexbox and CSS Grid
                </p>}
                <div className="course-icon-section">
                  <span>
                    <i className="fa-solid fa-copy"></i> 20 Lessons
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
                </div>
                <div className="course-rating">
                  4.7 ***** ( 255 )
                </div>
                <div className="course-btn">
                  <button className="security-button">
                    Security
                  </button>
                  {isGridView && <span>$ 499</span>}
                  <button className="add-to-cart-btn">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default AllCourse;
