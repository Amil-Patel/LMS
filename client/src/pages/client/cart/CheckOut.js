import React, { useContext, useState } from "react";
import "../../../assets/css/client/checkout.css"
import Navbar from "../layout/Navbar";
import Breadcrumb from "../course/Breadcrumb";
import Footer from "../layout/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { userRolesContext, RoleContext } from "../../admin/layout/RoleContext";
import Cookies from 'js-cookie';
import axiosInstance from "../utils/axiosInstance";
const port = process.env.REACT_APP_URL
const CheckOut = () => {
    
    const { id, total } = useLocation().state;
    const savedToken = Cookies.get('student-token');
    const [infoData, setInfoData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        bill_address: "",
        bill_gst: "",
        bill_pan: "",
    });
    const { stuUserId } = useContext(userRolesContext);
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfoData((prev) => ({ ...prev, [name]: value }));
    };
    const navigate = useNavigate();
    const buyCourse = async (e) => {
        e.preventDefault();

        if (!savedToken) {
            alert("Please login to buy course");
            return;
        }

        try {
            // Simulating IDs as an array or a single value
            let courseIds = id; // `id` can be a single ID (e.g., 19) or an array (e.g., [19, 21])

            // Ensure courseIds is always an array
            if (!Array.isArray(courseIds)) {
                courseIds = [courseIds]; // Wrap single ID in an array
            }

            if (courseIds.length === 0) {
                alert("No courses selected for enrollment.");
                return;
            }

            // Track enrollment success
            let allEnrollmentsSuccessful = true;

            // Process enrollment for each course
            for (const courseId of courseIds) {
                const enrollData = {
                    student_id: stuUserId,
                    course_id: courseId,
                    enrollment_mode: "online",
                };

                try {
                    const addEnrollment = await axiosInstance.post(`${port}/addingEnrollment`, enrollData);

                    if (addEnrollment.status !== 200) {
                        console.error(`Enrollment failed for Course ID ${courseId}.`);
                        alert(`Enrollment failed for Course ID ${courseId}.`);
                        allEnrollmentsSuccessful = false;
                    }
                } catch (error) {
                    console.error(`Error enrolling Course ID ${courseId}:`, error);
                    alert(`An error occurred while enrolling Course ID ${courseId}.`);
                    allEnrollmentsSuccessful = false;
                }
            }

            // After enrollments, process payment once
            if (allEnrollmentsSuccessful) {
                const paymentData = {
                    student_id: stuUserId,
                    course_id: courseIds, // Pass all course IDs for payment processing
                    amount: total,
                    payment_mode: "online",
                    transaction_id: "",
                    bill_mobile: infoData.phone,
                    bill_name: infoData.name,
                    bill_address: infoData.bill_address,
                    bill_gst: infoData.bill_gst,
                    bill_pan: infoData.bill_pan,
                };

                try {
                    const addPayment = await axiosInstance.post(`${port}/addingPayment`, paymentData);
                    if (addPayment.status === 200) {
                        alert("Course Enrolled and Payment Done Successfully!");
                    } else {
                        alert("Payment failed. Please try again.");
                    }
                } catch (error) {
                    console.error("Payment error:", error);
                    alert("An error occurred during payment. Please try again later.");
                }
            } else {
                alert("Enrollment completed for some courses, but payment was not processed.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("An error occurred. Please try again later.");
        }
    };



    return (
        <>
            <Navbar />
            <Breadcrumb />
            <section className="checkout-section">
                <h2>Checkout</h2>
                <div className="checkout-section-main-div">
                    <div className="form-container">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Full name<span className="required"> *</span></label>
                                <input type="text" id="name" name="name" onChange={handleChange} placeholder="Enter full name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address<span className="required"> *</span></label>
                                <input type="email" id="email" name="email" onChange={handleChange} placeholder="Enter email address" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone number<span className="required"> *</span></label>
                                <input type="tel" id="phone" name="phone" onChange={handleChange} placeholder="Enter phone number" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country<span className="required"> *</span></label>
                                <select id="country" name="country" onChange={handleChange} required>
                                    <option value="">Choose country</option>
                                    <option value="india">India</option>
                                    <option value="usa">United States</option>
                                    <option value="cananda">Canada</option>
                                </select>
                            </div>
                            <div className="form-group-grid">
                                <div className="form-group">
                                    <label htmlFor="enter-city">City</label>
                                    <input type="text" id="enter-city" name="city" onChange={handleChange} placeholder="Enter city" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input type="text" id="state" name="state" onChange={handleChange} placeholder="Enter state" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="zip-code">Zip Code</label>
                                    <input type="text" id="zip-code" name="pincode" onChange={handleChange} placeholder="Enter ZIP code" required />
                                </div>

                            </div>
                            <div className="form-group">
                                <label htmlFor="bill_address">Bill Address</label>
                                <input type="text" id="bill_address" name="bill_address" onChange={handleChange} placeholder="Enter Bill Address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bill_gst">Bill GST Number</label>
                                <input type="text" id="bill_gst" name="bill_gst" onChange={handleChange} placeholder="Enter Bill GST Number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bill_pan">Bill Pan Number</label>
                                <input type="text" id="bill_pan" name="bill_pan" onChange={handleChange} placeholder="Enter Bill Pan Number" />
                            </div>
                            <div className="checkbox-group">
                                <input type="checkbox" id="terms" name="terms" onChange={(e) => setIsChecked(e.target.checked)} required />
                                <label htmlFor="terms">I have read and agree to the Terms and Conditions.</label>
                            </div>
                        </form>
                    </div>

                    <div className="checkout-review-cart-section">
                        <div className="cart-container">
                            <h3>Your cart</h3>
                            {/* <div className="course-cart-content">
                                <img
                                    src={require("../../../assets/image/course-thumbnail.png")}
                                    alt="logo"
                                />
                                <div className="course-cart-details">
                                    <span className="course-cart-name block pb-1 font-normal">DuoComfort Sofa Premium</span>
                                    <span className="course-cart-quantity">1x</span>
                                    <div className="course-cart-price pt-4 font-semibold">$20.00</div>
                                </div>
                            </div> */}
                            <div className="course-payment-section">
                                {/* <div className="discount-code">
                                    <i className="fa-solid fa-ticket"></i>
                                    <input type="text" placeholder="Discount code" />
                                    <button className="course-payment-btn">Apply</button>
                                </div> */}
                                <div className="price-summary">
                                    {/* <div className="price-row">
                                        <span>Subtotal</span>
                                        <span className="subtotal-price">${price}.00</span>
                                    </div>
                                    <div className="price-row">
                                        <span>Discount</span>
                                        <span className="discount-price">${(price * disc) / 100}</span>
                                    </div> */}
                                    <div className="price-row total">
                                        <span>Total</span>
                                        <span>${total}</span>
                                    </div>
                                </div>
                                <div className="pay-now-btn">
                                    <button disabled={!isChecked} onClick={(e) => buyCourse(e)}>Pay Now</button>
                                </div>
                                <div className="secure-checkout">
                                    <span><i className="fa-solid fa-lock"></i>Secure Checkout - SSL Encrypted</span>
                                    <p>Ensuring your financial and personal details are secure
                                        during every transaction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CheckOut;
