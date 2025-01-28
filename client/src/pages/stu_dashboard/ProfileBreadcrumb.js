import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileBreadcrumb = () => {
  return (
    <>
      <div style={{ backgroundColor: '#F9F9FB' }}>
        <div className='client_section'>
          <nav className="breadcrumb breadcrumb_padding">
            <NavLink to="/" className="breadcrumb-item">Home</NavLink>
            <span className="breadcrumb-divider"><i className="fa-solid fa-angle-right"></i></span>
            <NavLink to="/student/stu-profile" className="breadcrumb-item">Profile</NavLink>
          </nav>
        </div>
      </div >
    </>
  )
}

export default ProfileBreadcrumb
