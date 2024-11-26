import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../../assets/css/client/allcourse.css";

const CourseList = ({ courses, category }) => {
    console.log(courses)
    console.log(category)
    return (
        <>
            {courses?.map((course) => {
                const truncatedTitle =
                    course.course_title.length > 40
                        ? `${course.course_title.slice(0, 40)} ...`
                        : course.course_title;
                const truncatedDesc =
                    course.short_desc.length > 100
                        ? `${course.short_desc.slice(0, 100)} ...`
                        : course.short_desc;
                // Find the category title for the course
                const courseCategory = category?.find((cat) => cat.id === course.course_cate)?.cate_title || 'Unknown Category';
                return (
                    <div key={course.id} className="course-main-div">
                        <img src={`../upload/${course.course_thumbnail}`} alt={course.title} />

                        <div className="course-details">
                            <div className="course-details-header">
                                <h3>
                                    <NavLink to={`/view-course`}>{truncatedTitle}</NavLink>
                                </h3>
                                <span>$ {course.course_price}</span>
                            </div>
                            <p>{truncatedDesc}</p>
                            <div className="course-icon-section">
                                <span className='capitalize'>
                                    <i className="fa-solid fa-graduation-cap"></i> {course.course_language}
                                </span>
                                <span className='capitalize'>
                                    <i className="fa-solid fa-signal"></i> {course.course_level}
                                </span>
                            </div>
                            <div className="course-rating">
                                4.7 ***** (255)
                            </div>
                            <div className="course-btn">
                                <button className="security-button">{courseCategory}</button>
                                <button className="add-to-cart-btn">Add to cart</button>
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default CourseList
