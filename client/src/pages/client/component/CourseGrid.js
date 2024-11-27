import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from "../layout/CartContext"; // Import Cart Context
import "../../../assets/css/client/allcourse.css";

const CourseGrid = ({ courses, category }) => {
    const { addToCart } = useCart(); // Access the addToCart function from context
    return (
        <>
            <div className="course-grid-main-div">
                {courses.map((course) => {
                    // Truncate course title if too long
                    const truncatedTitle =
                        course.course_title.length > 40
                            ? `${course.course_title.slice(0, 40)} ...`
                            : course.course_title;

                    // Parse authors and get the first one
                    let authors = [];
                    try {
                        authors = JSON.parse(course.auther);
                    } catch (error) {
                        console.error("Error parsing author JSON:", error);
                    }
                    const firstAuthor = authors[0] || "Unknown Author";
                    const displayAuthor =
                        firstAuthor.length > 10
                            ? `${firstAuthor.slice(0, 10)}...`
                            : firstAuthor;

                    // Find the category title for the course
                    const courseCategory =
                        category?.find((cat) => cat.id === course.course_cate)?.cate_title || "Unknown Category";

                    return (
                        <div key={course.id} className="course-content">
                            {/* Course Thumbnail */}
                            <img src={`../upload/${course.course_thumbnail}`} alt={course.course_title} />

                            {/* Course Details */}
                            <div className="course-inner-content">
                                {/* Course Title */}
                                <h3>
                                    <NavLink to={`/view-course`}>{truncatedTitle}</NavLink>
                                </h3>

                                {/* Author and Rating */}
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

                                {/* Category Button */}
                                <button className="security-button">{courseCategory}</button>
                            </div>

                            {/* Course Price and Add-to-Cart Button */}
                            <div className="course-price-and-add-to-cart-btn">
                                <div className="course-price">$ {course.course_price}</div>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => addToCart(course)} // Add course to cart on button click
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CourseGrid;
