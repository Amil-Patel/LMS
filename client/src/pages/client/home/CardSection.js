import React from 'react'

const CardSection = () => {
    return (
        <>
            <div className='client_section'>
                <div className="cus-courses-section">
                    <div className="cus-mid-content1">
                        <div className="cus-content">
                            <img src={require('../../../assets/image/icon1.png')} alt="icon1" />
                            <h2>
                                <span id="cus-underline1">ONLIN</span>E COURSE
                            </h2>
                            <h3>MASTER ALL ESSENTIAL SKILLS</h3>
                            <p>Covering All From Basic Procedures To Advanced Emergency Response Tactics.</p>
                        </div>
                    </div>

                    <div className="cus-mid-content2">
                        <div className="cus-content">
                            <img src={require('../../../assets/image/icon2.png')} alt="icon2" />
                            <h2>
                                <span id="cus-underline1">CONV</span>ENIENT ACCESS
                            </h2>
                            <h3>STUDY ANYTIME, ANYWHERE</h3>
                            <p>Flexibility Of Accessing Course Materials And Completing Assignments At Your Own Pace.</p>
                        </div>
                    </div>

                    <div className="cus-mid-content3">
                        <div className="cus-content">
                            <img src={require('../../../assets/image/icon3.png')} alt="icon3" />
                            <h2>
                                <span id="cus-underline1">PERS</span>ONALIZED SUPPORT
                            </h2>
                            <h3>RECEIVE TAILORED ASSISTANCE</h3>
                            <p>Benefit From Personalized Support Ensuring You Get The Help You Need To Succeed.</p>
                        </div>
                    </div>

                </div>

                {/* course-overview-section */}

                <div className="cus-course-overview-section">
                    <div className="cus-mid-overview-image">
                        <img src={require('../../../assets/image/mid-section-image.png')} alt="mid-section-image" />
                    </div>
                    <div className="cus-course-overview-Text">
                        <div className="cus-inner-header-section">
                            <p>COURSE OVERVIEW</p>
                            <h3>
                                Comprehensive Security Training Programs
                            </h3>
                            <p>Enroll Now And Start Your Journey Towards A Successful Career In Security!</p>

                            <ul>
                                <li><b>Comprehensive Training: </b> Gain Essential Skills In Security
                                    Procedures, Emergency Response, And Legal Regulations To Excel As A Security Guard In Ontario.
                                </li>
                                <li><b>Flexible Learning Options: </b> Choose Between In-Person Classes Or Online Learning To Fit
                                    Your
                                    Schedule And Preferences.
                                </li>
                                <li><b><i>Expert Instructors : </i></b> Learn From Seasoned Professionals With
                                    Extensive Experience In The Security Industry, Ensuring You Receive Top-Quality Education.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSection
