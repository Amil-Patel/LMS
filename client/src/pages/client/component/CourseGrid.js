import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../../assets/css/client/allcourse.css";

const CourseGrid = ({ courses, category }) => {
    return (
        <>
            {courses.length === 0 && (
                <div className="flex flex-col justify-center items-center h-60">
                    <p className="text-2xl font-medium text-gray-700">
                        No courses found
                    </p>
                </div>
            )}
            <div className="course-grid-main-div">
                {courses.map((course) => {
                    const truncatedTitle =
                        course.course_title.length > 40
                            ? `${course.course_title.slice(0, 40)} ...`
                            : course.course_title;

                    // Parse authors and get the first one
                    const authors = JSON.parse(course.auther);
                    const firstAuthor = authors[0];
                    const displayAuthor = firstAuthor.length > 10
                        ? `${firstAuthor.slice(0, 10)}...`
                        : firstAuthor;
                    // Find the category title for the course
                    const courseCategory = category?.find((cat) => cat.id === course.course_cate)?.cate_title || 'Unknown Category';
                    const truncateCate = courseCategory.length > 15 ? `${courseCategory.slice(0, 15)} ...` : courseCategory
                    return (
                        <div key={course.id} className="course-content">
                            <img src={`../upload/${course.course_thumbnail}`} alt={course.title} />
                            <div className="course-inner-content">
                                <h3>
                                    <NavLink to={`/view-course`}>{truncatedTitle}</NavLink>
                                </h3>
                                <div className="author-and-rating">
                                    <span className="author-name">By {displayAuthor}</span>
                                    <span className="courses-reviews">
                                        4.5
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <span className="customer-review-number">
                                            (166)
                                        </span>
                                    </span>
                                </div>
                                <button className="security-button">{truncateCate}</button>
                            </div>
                            <div className="course-price-and-add-to-cart-btn">
                                <div className="course-price">$ {course.course_price}</div>
                                <button className="add-to-cart-btn">Add to cart</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CourseGrid
