import React from 'react';
import "../../../assets/css/client/shopping-cart.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Breadcrumb from "../../../pages/client/course/Breadcrumb";


const ShoppingCart = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <section className="checkout-section mb-10">
        <h2>Shopping Cart</h2>
        <div className='shopping-cart-hero-container pt-5'>
          <div className='shopping-cart-course-container'>
            <div className='horizontal-card flex justify-between py-5 border-b-2 border-border-color'>
              <div className='shopping-cart-course-content flex'>
                <img
                  src={require("../../../assets/image/course-thumbnail.png")}
                  alt="logo"
                />
                <div className="course-details-header block">
                  <h3>The Web Developer BootCamp 2024</h3>
                  <p className='py-2 text-base font-normal lg:pb-0'>By Aakib Valuda</p>
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
                  <span className='course-price'>$ 499</span>
                  <div className='discount-price py-2 flex items-center'>
                    <span className='mr-2'>25% Off</span>
                    <span>$ 499</span>
                  </div>
                </div>
                <button className='remove-btn'>Remove</button>
              </div>
            </div>
            <div className='horizontal-card flex justify-between py-5 border-b-2 border-border-color'>
              <div className='shopping-cart-course-content flex'>
                <img
                  src={require("../../../assets/image/course-thumbnail.png")}
                  alt="logo"
                />
                <div className="course-details-header block">
                  <h3>The Web Developer BootCamp 2024</h3>
                  <p className='py-2 text-base font-normal lg:pb-0'>By Aakib Valuda</p>
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
                  <span className='course-price'>$ 499</span>
                  <div className='discount-price py-2 flex items-center'>
                    <span className='mr-2'>25% Off</span>
                    <span>$ 499</span>
                  </div>
                </div>
                <button className='remove-btn'>Remove</button>
              </div>
            </div>
            <div className='horizontal-card flex justify-between py-5 border-b-2 border-border-color'>
              <div className='shopping-cart-course-content flex'>
                <img
                  src={require("../../../assets/image/course-thumbnail.png")}
                  alt="logo"
                />
                <div className="course-details-header block">
                  <h3>The Web Developer BootCamp 2024</h3>
                  <p className='py-2 text-base font-normal lg:pb-0'>By Aakib Valuda</p>
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
                  <span className='course-price'>$ 499</span>
                  <div className='discount-price py-2 flex items-center'>
                    <span className='mr-2'>25% Off</span>
                    <span>$499</span>
                  </div>
                </div>
                <button className='remove-btn'>Remove</button>
              </div>
            </div>
            <div className='horizontal-card flex justify-between py-5 border-b-2 border-border-color'>
              <div className='shopping-cart-course-content flex'>
                <img
                  src={require("../../../assets/image/course-thumbnail.png")}
                  alt="logo"
                />
                <div className="course-details-header block">
                  <h3>The Web Developer BootCamp 2024</h3>
                  <p className='py-2 text-base font-normal lg:pb-0'>By Aakib Valuda</p>
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
                  <span className='course-price'>$ 499</span>
                  <div className='discount-price py-2 flex items-center'>
                    <span className='mr-2'>25% Off</span>
                    <span>$499</span>
                  </div>
                </div>
                <button className='remove-btn'>Remove</button>
              </div>
            </div>
          </div>

          <div className='shopping-cart-course-order-summary'>
            <div className='order-summary flex justify-between items-center pb-3 border-b-2 border-border-color'>
              <h4 className='summary-title'>Order Summery:</h4>
              <span>2 Item</span>
            </div>
            <div className="promocode-apply-section">
              <label htmlFor="promocode-title">Enter Promo Code</label>
              <div className="flex flex-col sm:flex-row items-center sm:gap-2">
                <div className="flex w-full mt-1">
                  <input id="promo-code"type="text" placeholder=""
                    className="w-full sm:flex-1 py-2 px-4 border border-gray-300  focus:outline-none"
                  />
                  <button type="button" className="promo-code-apply-button py-2 xl:px-9 lg:px-4 px-4 rounded-none bg-blue-500 text-white font-semibold  hover:bg-blue-600">Apply</button>
                </div>
              </div>

              <div className="amount-details py-6">
                <div className="detail-row">
                  <span>Total Amount</span>
                  <span>$499</span>
                </div>
                <div className="detail-row liner pb-2">
                  <span>Discount</span>
                  <span><s>$499</s></span>
                </div>
                <div className="detail-row pt-2">
                  <span>Sub Total</span>
                  <span>$499</span>
                </div>
                <div className="detail-row liner pb-2">
                  <span>Tax</span>
                  <span>$499</span>
                </div>
                <div className="detail-row liner pb-2 pt-2">
                  <span className='text-base font-semibold'>Payable Amount</span>
                  <span className='text-base font-semibold'>$499</span>
                </div>
              </div>
              <button className='process-to-checkout-btn hover:bg-blue-600'>
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
