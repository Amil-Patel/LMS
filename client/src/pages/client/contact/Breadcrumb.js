import React from 'react'
import { NavLink } from 'react-router-dom'

const Breadcrumb = () => {
    return (
        <>
            <nav className="breadcrumb">
                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                <span className="breadcrumb-divider"><i className="fa-solid fa-angle-right"></i></span>
                <NavLink to="/contact-us" className="breadcrumb-item">Contact Us</NavLink>
            </nav>
        </>
    )
}

export default Breadcrumb
