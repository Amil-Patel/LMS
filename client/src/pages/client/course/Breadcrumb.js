import React from 'react'
import { NavLink } from 'react-router-dom'

const Breadcrumb = () => {
    return (
        <>
            <nav className="breadcrumb">
                <NavLink to="/" className="breadcrumb-item">Homepage</NavLink>
                <span className="breadcrumb-divider">›</span>
                <NavLink to="/course" className="breadcrumb-item">Course</NavLink>
            </nav>
        </>
    )
}

export default Breadcrumb
