import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='client_section'>
            <div className="cus-footer-section">
                <img src={require('../../../assets/image/Logo.png')} />
                <div className="cus-footer-inner-text">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/all-course">Courses</NavLink>
                    <NavLink to="/contact-us">Contact Us</NavLink>
                </div>
                <div className="cus-footer-icon">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-linkedin-in"></i>
                    <i className="fa-brands fa-pinterest-p"></i>
                    <i className="fa-brands fa-instagram"></i>
                </div>

            </div>

            <div className="cus-footer-border-bottom-text">
                <div className="cus-footer-copyright-text">
                    <p>Comfort Security Services, Copyright 2024 | All Right Reserved.</p>
                </div>
                <div className="cus-policy-text">
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                    <NavLink to="/terms-conditions">Terms & Conditions</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Footer
