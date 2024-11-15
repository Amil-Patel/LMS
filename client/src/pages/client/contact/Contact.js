import React from 'react';
import '../../../assets/css/client/contact.css'

const Contact = () => {
    return (
        <>
            <section className="contact-us flex gap-5 mb-5" id="main_contact">
                <div className="lg-5 sm-12" id="right_section">
                    <div className="form-sec" id="contact_form">
                        <h4>Contact Us</h4>
                        <p className="text-xs">
                            If you require additional information, please complete the form
                            below and submit it. Our team will be in touch with you promptly.
                        </p>

                        <form className="contact-form" method="post">
                            <div className="form-field">
                                <label
                                    htmlFor="name"
                                    className="form-label"
                                    id="form-lable-contact"
                                >
                                    Your Name: <small>*</small>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    className="form-input-contact"
                                />
                            </div>
                            <div className="form-field">
                                <label
                                    htmlFor="email"
                                    className="form-label"
                                    id="form-lable-contact"
                                >
                                    Your Email: <small>*</small>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    className="form-input-contact"
                                />
                            </div>
                            <div className="form-field">
                                <label
                                    htmlFor="number"
                                    className="form-label"
                                    id="form-lable-contact"
                                >
                                    Mobile No.:
                                </label>
                                <input
                                    type="text"
                                    name="number"
                                    id="number"
                                    placeholder="Enter Your Mobile"
                                    className="form-input-contact"
                                />
                            </div>
                            <div className="form-field">
                                <label
                                    htmlFor="message"
                                    className="form-label"
                                    id="form-lable-contact"
                                >
                                    Message <small>*</small>
                                </label>
                                <textarea
                                    rows="3"
                                    name="message"
                                    id="message"
                                    placeholder="Type Your Message Here..."
                                    className="form-input-contact"
                                ></textarea>
                            </div>
                            <div className="form-action mt-4">
                                <input
                                    className="btn-primary mt-3"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="lg-5 sm-12">
                    <p>cdchbds</p>
                </div>
            </section>
        </>
    )
}

export default Contact
