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
          <div className='shopping-cart-course-container w-3/5'>
            <div className='flex justify-between py-5 border-b-2 border-border-color'>
              <div className='shopping-cart-course-content flex'>
                <img
                  src={require("../../../assets/image/course-thumbnail.png")}
                  alt="logo"
                />
                <div className="course-details-header block">
                  <h3>The Web Developer BootCamp 2024</h3>
                  <p className='py-2 text-base font-normal'>By Aakib Valuda</p>
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
                <div>
                  <span className='course-price'>$ 499</span>
                  <div className='discount-price py-2 flex items-center'>
                    <span className='mr-2'>25% Off</span>
                    <span>$ 499</span>
                  </div>
                </div>
                <button className='remove-btn'>Remove</button>
              </div>
            </div>
            <div className='flex justify-between py-5 border-b-2 border-border-color'>
              <div className='shopping-cart-course-content flex'>
                <img
                  src={require("../../../assets/image/course-thumbnail.png")}
                  alt="logo"
                />
                <div className="course-details-header block">
                  <h3>The Web Developer BootCamp 2024</h3>
                  <p className='py-2 text-base font-normal'>By Aakib Valuda</p>
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
                <div>
                  <span className='course-price'>$ 499</span>
                  <div className='discount-price py-2 flex items-center'>
                    <span className='mr-2'>25% Off</span>
                    <span>$ 499</span>
                  </div>
                </div>
                <button className='remove-btn'>Remove</button>
              </div>
            </div>
            <div className='flex justify-between py-5 border-b-2 border-border-color'>
              <div className='shopping-cart-course-content flex'>
                <img
                  src={require("../../../assets/image/course-thumbnail.png")}
                  alt="logo"
                />
                <div className="course-details-header block">
                  <h3>The Web Developer BootCamp 2024</h3>
                  <p className='py-2 text-base font-normal'>By Aakib Valuda</p>
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
                <div>
                  <span className='course-price'>$ 499</span>
                  <div className='discount-price py-2 flex items-center'>
                    <span className='mr-2'>25% Off</span>
                    <span>$ 499</span>
                  </div>
                </div>
                <button className='remove-btn'>Remove</button>
              </div>
            </div>
          </div>

          <div className='shopping-cart-course-order-summary w-2/6'>
            <div className='order-summary flex justify-between items-center pb-3 border-b-2 border-border-color'>
              <h4 className='summary-title'>Order Summery:</h4>
              <span>2 Item</span>
            </div>
            <div className="promocode-apply-section">
              <label htmlFor="promocode-title">Enter Promo Code</label>
              <div className="promocode-input flex justify-between mt-2">
                <input type="text" id="promocode" placeholder="Enter Promo Code" />
                <button className="apply-btn">Apply</button>
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
              <button className='process-to-checkout-btn'>
                Process To Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default ShoppingCart;
