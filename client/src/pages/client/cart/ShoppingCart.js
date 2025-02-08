import React, { useContext, useEffect, useState } from 'react';
import "../../../assets/css/client/shopping-cart.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Breadcrumb from "../../../pages/client/course/Breadcrumb";
import { useCart } from "../layout/CartContext"
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from "../utils/axiosInstance";
import { userRolesContext } from '../../admin/layout/RoleContext';
import { notifyWarning, notifySuccess, notifyError } from "../../admin/layout/ToastMessage";
const port = process.env.REACT_APP_URL


const ShoppingCart = () => {
  const { cart, setCart, removeCart } = useCart();
  const { stuUserId, setting } = useContext(userRolesContext);
  const [eligibleCourses, setEligibleCourses] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState({});
  const [totalCouponDiscount, setTotalCouponDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const savedToken = Cookies.get('student-token');
  const applyCouponDiscount = async () => {
    if (!couponCode) {
      notifyError("Enter a Valid Promo Code.");
      return;
    }

    try {
      const response = await axiosInstance.post(`${port}/validateCoupon`, { couponCode });

      if (response.data.success) {
        const { courseIds, discount, is_percentage, is_amount } = response.data;
        const parsedCourseIds = JSON.parse(courseIds);

        let courseDiscounts = {}; // Store discounts per course

        cart.forEach((course) => {
          const uniqueCourseId = savedToken ? course.course_id : course.id;
          if (parsedCourseIds.includes(uniqueCourseId)) {
            const basePrice = course.course_price - (course.course_price * course.course_discount / 100);
            let finalDiscount = 0;

            if (is_percentage) {
              finalDiscount = basePrice * (discount / 100);
            } else if (is_amount) {
              finalDiscount = Math.min(discount, basePrice);
            }

            courseDiscounts[uniqueCourseId] = finalDiscount;
          }
        });

        const totalCouponDiscount = Object.values(courseDiscounts).reduce((acc, val) => acc + val, 0);
        setCouponDiscount(courseDiscounts); // Store per-course discount as an object
        setTotalCouponDiscount(totalCouponDiscount);
        setEligibleCourses(parsedCourseIds);
        setIsCouponApplied(true);

        notifySuccess("Coupon applied successfully.");
      } else {
        notifyError("Invalid coupon code.");
      }
    } catch (error) {
      notifyError("Error applying coupon. Try again.");
    }
  };

  const sumOfAllCartAmount = cart.reduce((accumulator, item) => accumulator + parseFloat(item.course_price), 0);
  const sumOfAllCartTax = cart.reduce((acc, item) => {
    if (item.is_inclusive == 1) {
      const disc = parseFloat(item.course_price) - (parseFloat(item.course_price) * item.course_discount / 100)
      const tax = disc * (item.tax_rate / 100)
      acc += tax
    }
    return acc
  }, 0)
  const sumOfAllDiscountPrice = cart.reduce((total, item) => {
    const discount_price = (parseFloat(item.course_price) * item.course_discount) / 100;
    return total + discount_price;
  }, 0);
  const navigate = useNavigate();
  // Navigate to Checkout with state
  const processToCheckout = (total) => {
    if (cart.length > 0) {
      const courseDetails = cart.map((course) => {
        const isCouponApplicable = eligibleCourses.includes(course.course_id);
        const courseSpecificDiscount = isCouponApplicable ? (couponDiscount[course.course_id] || 0) : 0;

        const discountedPrice = course.course_price - (course.course_price * course.course_discount / 100) - courseSpecificDiscount;
        return {
          id: course.course_id,
          title: course.course_title,
          amount: course.course_price,
          course_tax: course.tax_rate,
          course_taxamount: discountedPrice,
          coupon_discount_price: courseSpecificDiscount,
          discount: course.course_discount,
          is_inclusive: course.is_inclusive,
          is_exclusive: course.is_exclusive
        };
      });
      navigate(`/checkout`, {
        state: {
          courses: courseDetails,
          total
        },
      });
    } else {
      notifyWarning("Your cart is empty. Please add courses to proceed.");
    }
  };

  //review
  const [averageRatings, setAverageRatings] = useState({});
  const [totalRatings, setTotalRatings] = useState({});
  const getReviewData = async (id) => {
    axiosInstance
      .get(`${port}/gettingReviewWithCourseId/${id}`)
      .then((response) => {
        const total = response.data.length;
        const sum = response.data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating = total > 0 ? sum / total : 0;

        setAverageRatings((prev) => ({ ...prev, [id]: avgRating }));
        setTotalRatings((prev) => ({ ...prev, [id]: total }));
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  useEffect(() => {
    if (cart.length > 0) {
      cart.forEach((course) => {
        getReviewData(course.course_id);
      });
    }
  }, [cart]);



  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className='client_section'>
        <section className="checkout-section course_main_padding">
          <h2>Shopping Cart</h2>
          <div className='shopping-cart-hero-container pt-5'>
            <div className='shopping-cart-course-container'>
              {
                cart.length > 0 ? (
                  cart.map((course, index) => {
                    const truncatedTitle =
                      course.course_title.length > 55
                        ? `${course.course_title.slice(0, 55)} ...`
                        : course.course_title;
                    const discount_price = course.course_price - (course.course_price * course.course_discount / 100);
                    return (
                      <div className='horizontal-card flex justify-between py-5 border-b-2 border-border-color' key={index}>
                        <div className='shopping-cart-course-content flex'>
                          {course.course_thumbnail === null ? (
                            <img
                              src={require("../../../assets/image/default-thumbnail.png")}
                              alt="course_thumbnail"
                            />
                          ) : (
                            <img src={`../upload/${course.course_thumbnail}`}
                              alt="course_thumbnail"
                            />
                          )}
                          <div className="course-details-header block">
                            <h3>{truncatedTitle}</h3>
                            <p style={{ fontSize: "14px" }} className='py-2 lg:pb-0'>
                              By {""}
                              {(() => {

                                let authors = course.auther;

                                if (typeof authors === "string") {
                                  try {
                                    authors = JSON.parse(authors);
                                  } catch (error) {
                                    console.error("Error parsing course.auther:", error);
                                    return;
                                  }
                                }

                                if (Array.isArray(authors) && authors.length > 0) {
                                  return authors.join(", ");
                                } else {
                                  return;
                                }
                              })()}
                            </p>
                            <span className="courses-reviews font-semibold">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  className={
                                    i < (averageRatings[course.course_id] || 0)
                                      ? "fa-solid fa-star"
                                      : "fa-regular fa-star"
                                  }
                                  key={i}
                                ></i>
                              ))}
                              <span className="customer-review-number ms-1">({totalRatings[course.course_id] || 0})</span>
                            </span>
                          </div>
                        </div>
                        <div className='shopping-cart-course-price'>
                          <div className='price-with-btn'>
                            <span className='course-price'>{setting.position == "left" ? setting.symbol : ""}
                              {parseFloat(discount_price).toFixed(2)}{setting.position == "right" ? setting.symbol : ""}</span>
                            <div className='discount-price py-2 flex items-center'>
                              {course.course_discount ? (
                                <>
                                  <span className='mr-2'>{course.course_discount}% Off</span>
                                  <span>{setting.position == "left" ? setting.symbol : ""}{parseFloat(course.course_price).toFixed(2)}
                                    {setting.position == "right" ? setting.symbol : ""}
                                  </span>
                                </>
                              ) : ("")}
                            </div>
                          </div>
                          <button className='remove-btn' onClick={() => (removeCart(course), setCouponDiscount(0))}>Remove</button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <>
                    <span>No courses in cart</span>
                    <NavLink className="ms-5 text-blue-700 underline" to="/all-course">Go To Courses</NavLink>
                  </>
                )
              }
            </div>

            <div className='shopping-cart-course-order-summary'>
              <div className='order-summary flex justify-between items-center pb-3 border-b-2 border-border-color'>
                <h4 className='summary-title'>Order Summery:</h4>
                <span>{cart.length > 0 ? cart.length : 0} Item</span>
              </div>
              <div className="promocode-apply-section">
                <label htmlFor="promocode-title">Enter Promo Code</label>
                <div className="flex flex-col sm:flex-row items-center sm:gap-2">
                  <div className="flex w-full mt-1">
                    <input
                      id="promo-code"
                      type="text"
                      placeholder=""
                      className="w-full sm:flex-1 py-2 px-4 border border-gray-300 focus:outline-none"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="promo-code-apply-button py-2 xl:px-9 lg:px-4 px-4 rounded-none bg-blue-500 text-white font-semibold hover:bg-blue-600"
                      onClick={applyCouponDiscount}
                    >
                      Apply
                    </button>

                  </div>
                </div>

                <div className="amount-details py-6">
                  <div className="detail-row">
                    <span>Total Amount</span>
                    <span>{setting.position == "left" ? setting.symbol : ""}{parseFloat(sumOfAllCartAmount).toFixed(2)}
                      {setting.position == "right" ? setting.symbol : ""}
                    </span>
                  </div>
                  <div className="detail-row liner pb-2">
                    <span>Discount</span>
                    <span><s>{setting.position == "left" ? setting.symbol : ""}{parseFloat(sumOfAllDiscountPrice + totalCouponDiscount).toFixed(2)}
                      {setting.position == "right" ? setting.symbol : ""}</s></span>
                  </div>
                  <div className="detail-row pt-2">
                    <span>Sub Total</span>
                    <span>{setting.position == "left" ? setting.symbol : ""}
                      {parseFloat(sumOfAllCartAmount - sumOfAllDiscountPrice - totalCouponDiscount.toFixed(2)).toFixed(2)}
                      {setting.position == "right" ? setting.symbol : ""}
                    </span>
                  </div>
                  <div className="detail-row liner pb-2">
                    <span>Tax</span>
                    <span>
                      {setting.position == "left" ? setting.symbol : ""}{parseFloat(sumOfAllCartTax).toFixed(2)}
                      {setting.position == "right" ? setting.symbol : ""}
                    </span>
                  </div>
                  <div className="detail-row liner pb-2 pt-2">
                    <span className='text-base font-semibold'>Payable Amount</span>
                    <span className='text-base font-semibold'>{setting.position == "left" ? setting.symbol : ""}
                      {parseFloat(sumOfAllCartAmount - parseFloat(sumOfAllDiscountPrice + totalCouponDiscount) + sumOfAllCartTax).toFixed(2)}
                      {setting.position == "right" ? setting.symbol : ""}</span>
                  </div>
                </div>
                <button className='process-to-checkout-btn hover:bg-blue-600' onClick={() => processToCheckout(parseFloat(sumOfAllCartAmount - parseFloat(sumOfAllDiscountPrice + totalCouponDiscount) + sumOfAllCartTax).toFixed(2))}>
                  Process To Checkout
                </button>
              </div>
            </div>
          </div>
        </section >
      </div >
      <Footer />
    </>
  );
}

export default ShoppingCart;
