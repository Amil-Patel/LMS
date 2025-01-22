import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useCart } from "../../../pages/client/layout/CartContext";
import "../../../assets/css/client/allcourse.css";

const CourseList = ({ courses, category }) => {
    const { cart, addToCart } = useCart();

    const savedToken = Cookies.get('student-token');
    return (
        <>
            {courses?.length === 0 && (
                <div className="flex flex-col justify-center items-center h-60">
                    <p className="text-2xl font-medium text-gray-700">
                        No courses found
                    </p>
                </div>
            )}
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
                const truncateCate = courseCategory.length > 15 ? `${courseCategory.slice(0, 15)} ...` : courseCategory;
                if (cart) {
                    var isInCart = cart?.some((item) => {
                        if (savedToken) {
                            return item.course_id === course.id
                        } else {
                            return item.id === course.id
                        }
                    })
                }

                return (
                    <div key={course.id} className="course-main-div">
                        <div className="allcourses-course-image" >
                            <img src={`../upload/${course.course_thumbnail}`} alt={course.title} />
                        </div>
                        <div className="course-details">
                            <div className="course-details-header">
                                <h3>
                                    <NavLink to={`/view-course/${course.id}`}>{truncatedTitle}</NavLink>
                                </h3>
                                <span>$ {course.course_price}</span>
                            </div>
                            <p>{truncatedDesc}</p>
                            <div className="course-icon-section">
                                {course.course_language && (
                                    <span className="capitalize">
                                        <i className="fa-solid fa-graduation-cap"></i> {course.course_language}
                                    </span>
                                )}
                                {course.course_level && (
                                    <span className="capitalize">
                                        <i className="fa-solid fa-signal"></i> {course.course_level}
                                    </span>
                                )}
                            </div>
                            {/* <div className="course-rating">4.7 ***** (255)</div> */}
                            <div className="course-btn">
                                <button className="security-button">{truncateCate}</button>
                                <button
                                    className={`add-to-cart-btn ${isInCart ? 'disabled' : ''}`}
                                    onClick={() => addToCart(course)}
                                    disabled={isInCart}
                                >
                                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default CourseList;
