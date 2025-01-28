import React from 'react'
import { NavLink } from 'react-router-dom';
const DocumentBreadcrumb = () => {
    return (
        <div style={{ backgroundColor: '#F9F9FB' }}>
            <div className='client_section'>
                <nav className="breadcrumb breadcrumb_padding">
                    <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                    <span className="breadcrumb-divider"><i className="fa-solid fa-angle-right"></i></span>
                    <NavLink to="/student/documents" className="breadcrumb-item">Documents</NavLink>
                </nav>
            </div>
        </div >
    )
}

export default DocumentBreadcrumb
