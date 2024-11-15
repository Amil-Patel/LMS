import React from 'react'

const Contact = () => {
    return (
        <div className='client_section'>
            <div className="cus-course-growth-section">
                <div className="cus-course-growth-header">
                    <h4>How To Get Started</h4>
                    <p>Follow These Simple Steps To Enroll In Our Courses And Begin Your Journey<br />To Professional Growth.</p>
                </div>
                <div className="cus-course-growth-section-text">
                    <div className="cus-inner-text">
                        <button className="cus-btn1">STEP 1</button>
                        <p>Browse Our Course Catalog And Choose The Program That Fits Your Needs.</p>
                    </div>

                    <div className="cus-inner-text">
                        <button className="cus-btn1">STEP 2</button>
                        <p>Complete The Online Registration Form And Provide Necessary Details.</p>
                    </div>

                    <div className="cus-inner-text">
                        <button className="cus-btn1">STEP 3</button>
                        <p>Receive Immediate Access To Course Materials And Start Learning At Your Own Pace.</p>
                    </div>
                </div>
            </div>

            {/* <!-------------contact-section--------------> */}

            <div className="cus-contact-section">
                <div className="cus-contact-inner-section">
                    <div className="cus-information-section">
                        <h5>Contact Us For More Information</h5>
                        <p>Have Questions Or Need Assistance? Our Team Is Here To Help You With Any Inquiries.</p>
                    </div>
                    <div className="cus-live-chat-section">
                        <h5>Live Chat</h5>
                        <p>Have Questions Or Need Assistance?<br />We Have Live Chat Option Here To Chat (Opening Hour - 08:00 To
                            20:00)</p>
                        <div className="cus-live-chat-btn">
                            <button><i className="fa-solid fa-comments"></i> Live Chat</button>
                        </div>
                    </div>
                </div>

                <div className="cus-contact-form">
                    <h6>Get In Touch With Us</h6>
                    <input type="text" className="cus-full-name" placeholder="Full Name:" />
                    <input type="text" className="cus-Email" placeholder="Email Address:" />
                    <input type="text" className="cus-phone-no" placeholder="Phone No:" />
                    <input type="text" className="cus-select-program" placeholder="Select Program" />
                    <textarea name="message" className="cus-message-box" placeholder="Message..."></textarea>
                    <div className="cus-submit-btn">
                        <button>Submit Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
