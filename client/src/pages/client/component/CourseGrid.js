import React from 'react';
import "../../../assets/css/client/allcourse.css";

const CourseGrid = ({ courseData }) => {
    return (
        <>
            <div className="course-grid-main-div">
                {courseData.map((course) => (
                    <div key={course.id} className="course-content">
                        <img src={course.image} alt={course.title} />
                        <div className="course-inner-content">
                            <h3>{course.title}</h3>
                            <div className="author-and-rating">
                                <span className="author-name">By {course.author}</span>
                                <span className="courses-reviews">
                                    {course.rating}{""}
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <span className="customer-review-number">
                                        ({course.reviews})
                                    </span>
                                </span>
                            </div>
                            <button className="security-button">Security</button>
                        </div>
                        <div className="course-price-and-add-to-cart-btn">
                            <div className="course-price">{course.price}</div>
                            <button className="add-to-cart-btn">Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CourseGrid
