import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='client_section'>
                <div className='cus-footer-section'>
                    <div className='cus-footer-up-section'>
                        <img src={require('../../../assets/image/web logo.png')} />
                        <div className="cus-footer-inner-text">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/all-course">Courses</NavLink>
                            <NavLink to="/contact-us">Contact Us</NavLink>
                        </div>
                        <div className='cus-footer-social-icon'>
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-linkedin-in"></i>
                            <i className="fa-brands fa-pinterest-p"></i>
                            <i className="fa-brands fa-instagram"></i>
                        </div>
                    </div>
                    <div className='cus-footer-down-section pt-3'>
                        <p>Comfort Security Services, Copyright 2024 | All Right Reserved.</p>
                        <div className="cus-policy-text">
                            <p><NavLink to="/privacy-policy">Privacy Policy</NavLink></p>
                            <p><NavLink to="/terms-conditions">Terms & Conditions</NavLink></p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer
