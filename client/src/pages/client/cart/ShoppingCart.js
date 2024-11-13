import React, { useState } from 'react';
import "../../../assets/css/client/shopping-cart.css";

const courses = [
  {
    id: 1,
    title: "The Web Developer BootCamp 2024",
    author: "Aakib Valuda",
    rating: 4.5,
    reviews: 3902,
    price: 499,
    originalPrice: 899,
    discount: "25% Off",
    image: require("../../../assets/image/course-thumbnail.png"),
  },
  {
    id: 2,
    title: "The Web Developer BootCamp 2024",
    author: "Aakib Valuda",
    rating: 4.5,
    reviews: 3902,
    price: 499,
    originalPrice: 899,
    discount: "25% Off",
    image: require("../../../assets/image/course-thumbnail.png"),
  },
  {
    id: 3,
    title: "The Web Developer BootCamp 2024",
    author: "Aakib Valuda",
    rating: 4.5,
    reviews: 3902,
    price: 499,
    originalPrice: 899,
    discount: "25% Off",
    image: require("../../../assets/image/course-thumbnail.png"),
  }
];

const ShoppingCart = () => {
  const [promoCode, setPromoCode] = useState("");

  const totalAmount = courses.reduce((acc, course) => acc + course.price, 0);
  const originalAmount = courses.reduce((acc, course) => acc + course.originalPrice, 0);
  const discountAmount = originalAmount - totalAmount;

  const handleApplyPromo = () => {
    // Logic for applying promo code can go here
    console.log("Promo code applied:", promoCode);
  };

  return (
    <div className="main-section 2xl:flex xl:flex lg:flex block">
      <div className="header-content 2xl:w-8/12 xl:w-8/12 lg:w-8/12 w-full">

        {courses.map((course) => (
          <div key={course.id} className="cart flex gap-0.5">
            <div className="cart-img">
              <img src={course.image} alt="Course Thumbnail" />
            </div>
            <div className="content">
              <h2>{course.title}</h2>
              <div className="rating-author">
                <p>By {course.author}</p>
                <span className="rating">
                  {course.rating} 
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i> ({course.reviews})
                </span>
              </div>
            </div>
            <div className="price-info">
              <span>${course.price}</span>
              <h3>
                <span className="discount-badge text-xs">{course.discount}</span>
                <span className="discount text-xs">${course.originalPrice}</span>
              </h3>
              <div>
                <button className="btn-remove">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary 2xl:w-4/12 xl:w-4/12 lg:w-4/12 w-full">
        <h3>Order Summary: <span>{courses.length} Items</span></h3>

        <div className="promo-code">
          <label>Enter Promo Code</label>
          <div className="promo-input">
            <input 
              type="text" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)} 
              placeholder="Promo Code" 
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>
        </div>
        <div className="price-breakdown">
          <div className="price-row">
            <span>Total Amount</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Discount</span>
            <span className="discount">${originalAmount.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Sub Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Tax</span>
            <span>${(totalAmount * 0.1).toFixed(2)}</span> {/* Example 10% tax */}
          </div>
          <div className="price-row payable">
            <span>Payable Amount</span>
            <span>${(totalAmount + totalAmount * 0.1).toFixed(2)}</span>
          </div>
        </div>

        <button className="btn-checkout">Process To Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
