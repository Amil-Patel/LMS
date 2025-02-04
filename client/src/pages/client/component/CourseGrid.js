import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useCart } from "../../../pages/client/layout/CartContext";
import { userRolesContext } from "../../admin/layout/RoleContext";
import "../../../assets/css/client/allcourse.css";

const CourseGrid = ({ courses, category }) => {
    const { cart, addToCart } = useCart();
    const { setting } = useContext(userRolesContext);


    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/view-course/${id}`)
    }

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
            <div className="course-grid-main-div">
                {courses?.map((course) => {
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
                    const firstAuthor = authors ? authors[0] || "Unknown Author" : "Unknown Author";

                    // Find the category title for the course
                    const courseCategory = category?.find((cat) => cat.id === course.course_cate)?.cate_title || 'Unknown Category';
                    const truncateCate = courseCategory.length > 15 ? `${courseCategory.slice(0, 15)} ...` : courseCategory
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
                        <div key={course.id} className="course-content cursor-pointer" onClick={() => handleClick(course.id)}>
                            {/* Course Thumbnail */}
                            <div className="allcourses-course-image" >
                                {course.course_thumbnail === null ?
                                    <img src={require('../../../assets/image/default-thumbnail.png')} alt="course_image" />
                                    :
                                    <img src={`../upload/${course.course_thumbnail}`} alt={course.title} />
                                }
                            </div>
                            {/* Course Details */}
                            <div className="course-inner-content">
                                {/* Course Title */}
                                <h3>
                                    <NavLink to={`/view-course/${course.id}`}>{truncatedTitle}</NavLink>
                                </h3>

                                {/* Author and Rating */}
                                <div className="author-and-rating">
                                    <span className="author-name">By {firstAuthor}</span>
                                </div>
                                <button className="security-button">{truncateCate}</button>
                            </div>

                            {/* Course Price and Add-to-Cart Button */}
                            <div className="course-price-and-add-to-cart-btn">
                                <div className="course-price">{setting.position == "left" ? setting.symbol : ""}
                                    {course.course_price}{setting.position == "right" ? setting.symbol : ""}</div>
                                <button
                                    className={`add-to-cart-btn ${isInCart ? 'disabled' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents navigation when clicking the button
                                        addToCart(course);
                                    }}
                                    disabled={isInCart}
                                >
                                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
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
