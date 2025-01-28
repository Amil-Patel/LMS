import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardBreadcrumb = () => {
  return (
    <>
      <div style={{ backgroundColor: '#F9F9FB' }}>
        <div className='client_section'>
          <nav className="breadcrumb">
            <NavLink to="/" className="breadcrumb-item">Home</NavLink>
            <span className="breadcrumb-divider"><i className="fa-solid fa-angle-right"></i></span>
            <NavLink to="/student/dashboard" className="breadcrumb-item">Dashboard</NavLink>
          </nav>
        </div>
      </div >
    </>
  )
}

export default DashboardBreadcrumb
