import React from "react";
import "../../../assets/css/client/checkout.css"

const CheckOut = () => {
    return (
        <>
            <section className="checkout-section">
                <h2>Checkout</h2>
                <div className="checkout-section-inner-main-div">

                    <div className="form-container">
                        <form>
                            <div className="form-group">
                                <label htmlFor="full-name">Full name <span className="required">*</span></label>
                                <input type="text" id="full-name" placeholder="Enter full name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address <span className="required">*</span></label>
                                <input type="email" id="email" placeholder="Enter email address" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone number <span className="required">*</span></label>
                                <input type="tel" id="phone" placeholder="Enter phone number" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country <span className="required">*</span></label>
                                <select id="country" required>
                                    <option value="">Choose country</option>
                                    <option value="In">India</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input type="text" placeholder="Enter city" style={{ flex: '1' }} required />
                                    <input type="text" placeholder="Enter state" style={{ flex: '1' }} required />
                                    <input type="text" placeholder="Enter ZIP code" style={{ flex: '1' }} required />
                                </div>
                            </div>
                            <div className="checkbox-group">
                                <input type="checkbox" id="terms" required />
                                <label htmlFor="terms">I have read and agree to the Terms and Conditions.</label>
                            </div>
                        </form>
                    </div>

                    <div className="checkout-review-cart-section"> </div>
                </div>
            </section>
        </>
    );
};

export default CheckOut;
