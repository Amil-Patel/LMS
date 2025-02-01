import React, { useContext, useEffect, useState } from "react";
import "../../../assets/css/client/checkout.css"
import Navbar from "../layout/Navbar";
import Breadcrumb from "../course/Breadcrumb";
import Footer from "../layout/Footer";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";
import { userRolesContext } from "../../admin/layout/RoleContext";
import Cookies from 'js-cookie';
import axiosInstance from "../utils/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import stripekey from "../../../utils/key";
const port = process.env.REACT_APP_URL
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPT_KEY
const CheckOut = () => {

    const { setting } = useContext(userRolesContext);
    const { courses, total } = useLocation().state || {};
    console.log(courses)
    const encryptData = (data) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    };
    const [decryptAmount, setDecryptAmount] = useState(null)
    const [decryptCourse, setDecryptCourse] = useState([])
    const decryptData = (encryptedData) => {
        if (!encryptedData) return null; // Check for empty or null data
        console.log(encryptedData)
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            console.log(bytes)
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error("Error decrypting data:", error);
            return null; // Return null if decryption fails
        }
    };
    useEffect(() => {
        // Get and decrypt the data from localStorage
        const storedCourses = localStorage.getItem("checkoutCourseData");
        const storedAmount = localStorage.getItem("checkoutAmountData");
        if (storedCourses) {
            const decryptedCourses = decryptData(storedCourses);
            setDecryptCourse(decryptedCourses)
        }

        if (storedAmount) {
            const decryptedAmount = decryptData(storedAmount);
            setDecryptAmount(decryptedAmount)
        }
    }, []);
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
    // const buyCourse = async (e) => {
    //     e.preventDefault();

    //     if (!savedToken) {
    //         alert("Please login to buy course");
    //         return;
    //     }

    //     try {
    //         let courseIds = courses.map((item) => item.id);
    //         if (!Array.isArray(courseIds)) {
    //             courseIds = [courseIds];
    //         }
    //         if (courseIds.length === 0) {
    //             alert("No courses selected for enrollment.");
    //             return;
    //         }
    //         let allEnrollmentsSuccessful = true;
    //         for (const courseId of courseIds) {
    //             const enrollData = {
    //                 student_id: stuUserId,
    //                 course_id: courseId,
    //                 enrollment_mode: "online",
    //             };
    //             try {
    //                 const addEnrollment = await axiosInstance.post(${port}/addingEnrollment, enrollData);

    //                 if (addEnrollment.status !== 200) {
    //                     console.error(Enrollment failed for Course ID ${courseId}.);
    //                     alert(Enrollment failed for Course ID ${courseId}.);
    //                     allEnrollmentsSuccessful = false;
    //                 }
    //             } catch (error) {
    //                 console.error(Error enrolling Course ID ${courseId}:, error);
    //                 alert(An error occurred while enrolling Course ID ${courseId}.);
    //                 allEnrollmentsSuccessful = false;
    //             }
    //         }

    //         try {
    //             const order_res = await axiosInstance.post(${port}/addingOrderData, {
    //                 user_id: stuUserId,
    //                 quantity: courseIds.length,
    //                 status: "pending",
    //             });

    //             if (order_res.status === 200) {
    //                 var order_id = order_res.data.data.id;
    //                 for (const course of courses) {
    //                     await axiosInstance.post(${port}/addingOrderDetailItem, {
    //                         order_id: order_id, // Link to the created order
    //                         course_id: course.id, // Course ID
    //                         course_title: course.title, // Course Title
    //                         quantity: 1, // Assuming one quantity per course
    //                         course_amount: course.amount, // Course Price
    //                         course_tax: course.course_tax, // Tax Rate
    //                         course_taxamount: course.course_taxamount, // Calculated Tax Amount
    //                         discount: course.discount,
    //                         is_inclusive: course.is_inclusive,
    //                         is_exclusive: course.is_exclusive
    //                     });
    //                 }
    //             } else {
    //                 console.error("Order creation failed.");
    //             }
    //         } catch (error) {
    //             console.error("Order creation error:", error);
    //         }

    //         // After enrollments, process payment once
    //         if (allEnrollmentsSuccessful) {
    //             const paymentData = {
    //                 student_id: stuUserId,
    //                 order_id: order_id,
    //                 amount: total,
    //                 payment_mode: "online",
    //                 note: "",
    //                 transaction_id: "",
    //                 bill_mobile: infoData.phone,
    //                 bill_name: infoData.name,
    //                 bill_address: infoData.bill_address,
    //                 bill_gst: infoData.bill_gst,
    //                 bill_pan: infoData.bill_pan,
    //                 status: "success",
    //             };

    //             try {
    //                 const addPayment = await axiosInstance.post(${port}/addingPayment, paymentData);
    //                 if (addPayment.status === 200) {
    //                     alert("Course Enrolled and Payment Done Successfully!");
    //                 } else {
    //                     alert("Payment failed. Please try again.");
    //                 }
    //             } catch (error) {
    //                 console.error("Payment error:", error);
    //                 alert("An error occurred during payment. Please try again later.");
    //             }
    //         } else {
    //             alert("Enrollment completed for some courses, but payment was not processed.");
    //         }
    //     } catch (err) {
    //         console.error("Error:", err);
    //         alert("An error occurred. Please try again later.");
    //     }
    // };
    const [buttonLoad, setButtonLoad] = useState(false);
    const buyCourse = async (e) => {
        e.preventDefault();
        setButtonLoad(true);
        const storedCourses = localStorage.getItem("checkoutCourseData");
        const storedAmount = localStorage.getItem("checkoutAmountData");
        if (courses && courses.length > 0) { // Check if courses is not undefined or empty

            // Remove existing data
            localStorage.removeItem("checkoutCourseData");
            localStorage.removeItem("checkoutAmountData");
            localStorage.setItem("checkoutCourseData", encryptData(courses));
            localStorage.setItem("checkoutAmountData", encryptData(total));
        } else {
            console.log("No courses provided. Skipping update.");
            setButtonLoad(false);
        }
        if (!storedAmount || !storedCourses) {
            localStorage.setItem("checkoutCourseData", encryptData(courses));
            localStorage.setItem("checkoutAmountData", encryptData(total));
        }

        if (!savedToken) {
            alert("Please login to buy the course.");
            setButtonLoad(false);
            return;
        }

        try {
            const stripe = await loadStripe(stripekey);

            // Collect course IDs and validate
            const courseDetails = (courses && courses.length > 0) ?
                courses.map((course) => ({
                    id: course.id,
                    title: course.title,
                    amount: course.amount,
                    course_taxamount: course.course_taxamount,
                    discount_amount: course.discount_amount,
                    tax: course.course_tax,
                    taxAmount: course.course_taxamount,
                    discount: course.discount,
                    is_inclusive: course.is_inclusive,
                    is_exclusive: course.is_exclusive,
                })) :
                decryptCourse.map((course) => ({
                    id: course.id,
                    title: course.title,
                    amount: course.amount,
                    course_taxamount: course.course_taxamount,
                    discount_amount: course.discount_amount,
                    tax: course.course_tax,
                    taxAmount: course.course_taxamount,
                    discount: course.discount,
                    is_inclusive: course.is_inclusive,
                    is_exclusive: course.is_exclusive,
                }));

            if (courseDetails.length === 0) {
                alert("No courses selected for enrollment.");
                setButtonLoad(false);
                return;
            }

            // Prepare data for the backend
            const requestData = {
                user_id: stuUserId,
                courses: courseDetails,
                total_amount: total,
                billing_info: {
                    phone: infoData.phone,
                    email: infoData.email,
                    name: infoData.name,
                    address: infoData.bill_address,
                    gst: infoData.bill_gst,
                    pan: infoData.bill_pan,
                },
            };

            // Send request to create a Stripe payment session
            const { data: session } = await axiosInstance.post(`${port}/process-courses-payment`, requestData);
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.error("Stripe Checkout failed:", result.error.message);
                setButtonLoad(false);
                alert("An error occurred during payment. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setButtonLoad(false);
            alert("An error occurred. Please try again later.");
        }
    };


    return (
        <>
            <Navbar />
            <Breadcrumb />
            <div className="client_section">
                <section className="checkout-section course_main_padding">
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
                                    <input type="checkbox" id="terms" name="terms" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} required />
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
                                            <span>{setting.position == "left" ? setting.symbol : ""}{total || decryptAmount}
                                                {setting.position == "right" ? setting.symbol : ""}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pay-now-btn">
                                        <button disabled={!isChecked} className={`${buttonLoad ? "loading" : ""}`} onClick={(e) => buyCourse(e)}>Pay Now</button>
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
            </div>
            <Footer />
        </>
    );
};

export default CheckOut;
