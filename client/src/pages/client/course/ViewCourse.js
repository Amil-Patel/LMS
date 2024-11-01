import React from 'react'
import "../../../assets/css/client/view-course.css"

const ViewCourse = () => {
  return (
    <>
    <div className='main-section'>

      <div className="header-content">
      <div className="badge">Security</div>
      <h2>The Complete 2020 Full Stack Web Developer Course</h2>
      <p>Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid</p>
      <div className="rating-author">
        <span className="rating">4.5 <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> (3,902)</span>
        <p style={{marginTop:"15px"}}>By Aakib Valuda</p> 
      </div>
      <div className="metadata">
        <span><i className="fa-solid fa-file"></i> 20 Lessons</span>
        <span><i className="fa-solid fa-clock"></i> 12.30 Hours</span>
        <span><i className="fa-solid fa-graduation-cap"></i> 156 Students</span>
        <span><i className="fa-solid fa-signal"></i> Beginner</span>
        <span><i className="fa-solid fa-graduation-cap"></i> English</span>
        <span><i className="fa-solid fa-clock"></i> Last Update: 11/2024</span>
      </div>
    </div>

    <div className="course-image">
      <img src={require('../../../assets/image/course-thumbnail.png')} alt="Course Thumbnail" />
      <div className="price">
        <h3>$499 <span className="discount">$899</span> <span className="discount-badge">25% Off</span></h3>
        <button className="btn-add">Add to Cart</button>
        <button className="btn-buy">Buy Now</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default ViewCourse
