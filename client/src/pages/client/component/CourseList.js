import React from 'react';
import "../../../assets/css/client/allcourse.css";

const CourseList = ({ courseData }) => {
    return (
        <>
            {courseData.map((course) => (
                <div key={course.id} className="course-main-div">
                    <img src={course.image} alt="logo" />
                    <div className="course-details">
                        <div className="course-details-header">
                            <h3>{course.title}</h3>
                            <span>{course.price}</span>
                        </div>
                        <p>{course.description}</p>
                        <div className="course-icon-section">
                            <span>
                                <i className="fa-solid fa-copy"></i> {course.lessons}
                            </span>
                            <span>
                                <i className="fa-solid fa-clock"></i> {course.duration}
                            </span>
                            <span>
                                <i className="fa-solid fa-graduation-cap"></i> {course.students}
                            </span>
                            <span>
                                <i className="fa-solid fa-signal"></i> {course.level}
                            </span>
                        </div>
                        <div className="course-rating">
                            {course.rating} ***** ({course.reviews})
                        </div>
                        <div className="course-btn">
                            <button className="security-button">Security</button>
                            <button className="add-to-cart-btn">Add to cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CourseList
