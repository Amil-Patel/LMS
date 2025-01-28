import React from 'react'
import Hoc from '../layout/Hoc'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <Hoc />
            <div className="main">
                <div className="main-top-bar">
                    <div id="user-tag">
                        <h5>Dashboard</h5>
                    </div>
                    <div id="search-inner-hero-section">
                        <input id="search-bar" type="text" placeholder="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
