import React, { useState } from 'react';
import "../../../assets/css/client/shopping-cart.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Breadcrumb from "../../../pages/client/course/Breadcrumb";
import { useCart } from "../layout/CartContext"
import { useNavigate } from 'react-router-dom';


const ShoppingCart = () => {
  const { cart, removeCart } = useCart();
  const sumOfAllCartAmount = cart.reduce((accumulator, item) => accumulator + item.course_price, 0);
  const sumOfAllCartTax = cart.reduce((acc, item) => {
    if (item.is_inclusive == 1) {
      const disc = item.course_price - (item.course_price * item.course_discount / 100)
      const tax = disc * (item.tax_rate / 100)
      console.log(disc)
      console.log(tax)
      acc += tax
    }
    return acc
  }, 0)
  // const sumOfAllCartTax = cart.reduce((accumulator, item) =>{
  //   if (item.is_inclusive == 1) {
  // } accumulator + item.tax_rate, 0);
  const sumOfAllDiscountPrice = cart.reduce((total, item) => {
    const discount_price = (item.course_price * item.course_discount) / 100;
    return total + discount_price;
  }, 0);
  const navigate = useNavigate();
  // Navigate to Checkout with state
  const processToCheckout = (total) => {
    if (cart.length > 0) {
      // const price = sumOfAllCartAmount + sumOfAllCartTax;
      // const disc = sumOfAllCartTax;
      const id = cart.map((course) => course.id);
      // const num = 1;
      navigate(`/checkout/`, {
        state: {
          id,
          total
        },
      });
    } else {
      alert("Your cart is empty. Please add courses to proceed.");
    }
  };
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <section className="checkout-section mb-10">
        <h2>Shopping Cart</h2>
        <div className='shopping-cart-hero-container pt-5'>
          <div className='shopping-cart-course-container'>
            {
              cart.length > 0 ? (
                cart.map((course, index) => {
                  const discount_price = course.course_price - (course.course_price * course.course_discount / 100);
                  return (
                    <div className='horizontal-card flex justify-between py-5 border-b-2 border-border-color' key={index}>
                      <div className='shopping-cart-course-content flex'>
                        <img
                          src={`../upload/${course.course_thumbnail}`}
                          alt="course_thumbnail"
                        />
                        <div className="course-details-header block">
                          <h3>{course.course_title}</h3>
                          <p className='py-2 text-base font-normal lg:pb-0'>By {""}
                            {(() => {
                              try {
                                // Clean up and parse the `auther` field
                                const cleanedAuther = JSON.parse(JSON.parse(course.auther)); // Double parse to handle the nested escaping
                                return Array.isArray(cleanedAuther) ? cleanedAuther[0] : 'Unknown Author';
                              } catch (error) {
                                console.error('Error parsing author:', error);
                                return 'Unknown Author';
                              }
                            })()}
                          </p>
                          <span className="courses-reviews font-semibold"> 4.5 <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <span className="customer-review-number"> (3,902) </span>
                          </span>
                        </div>
                      </div>
                      <div className='shopping-cart-course-price'>
                        <div className='price-with-btn'>
                          <span className='course-price'>$ {parseFloat(discount_price).toFixed(2)}</span>
                          <div className='discount-price py-2 flex items-center'>
                            <span className='mr-2'>{course.course_discount}% Off</span>
                            <span>$ {course.course_price}</span>
                          </div>
                        </div>
                        <button className='remove-btn' onClick={() => removeCart(course)}>Remove</button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p>No courses in cart</p>
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
                  <input id="promo-code" type="text" placeholder=""
                    className="w-full sm:flex-1 py-2 px-4 border border-gray-300  focus:outline-none"
                  />
                  <button type="button" className="promo-code-apply-button py-2 xl:px-9 lg:px-4 px-4 rounded-none bg-blue-500 text-white font-semibold  hover:bg-blue-600">Apply</button>
                </div>
              </div>

              <div className="amount-details py-6">
                <div className="detail-row">
                  <span>Total Amount</span>
                  <span>${parseFloat(sumOfAllCartAmount).toFixed(2)}</span>
                </div>
                <div className="detail-row liner pb-2">
                  <span>Discount</span>
                  <span><s>${parseFloat(sumOfAllDiscountPrice).toFixed(2)}</s></span>
                </div>
                <div className="detail-row pt-2">
                  <span>Sub Total</span>
                  <span>${parseFloat(sumOfAllCartAmount - sumOfAllDiscountPrice).toFixed(2)}</span>
                </div>
                <div className="detail-row liner pb-2">
                  <span>Tax</span>
                  <span>${parseFloat(sumOfAllCartTax).toFixed(2)}</span>
                </div>
                <div className="detail-row liner pb-2 pt-2">
                  <span className='text-base font-semibold'>Payable Amount</span>
                  <span className='text-base font-semibold'>${parseFloat(sumOfAllCartAmount - parseInt(sumOfAllDiscountPrice) + sumOfAllCartTax).toFixed(2)}</span>
                </div>
              </div>
              <button className='process-to-checkout-btn hover:bg-blue-600' onClick={() => processToCheckout(parseFloat(sumOfAllCartAmount - parseInt(sumOfAllDiscountPrice) + sumOfAllCartTax).toFixed(2))}>
                Process To Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ShoppingCart;
