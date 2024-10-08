import React from 'react'
import Hoc from '../layout/Hoc'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <Hoc />
            <div className="main">
                <div className='dashboard-card-main'>
                    <div className='dashboard-card'>
                        <h5><NavLink to="/enrollements">Number Of Courses<i className="fa-solid fa-border-all"></i></NavLink></h5>
                        <h6>5</h6>
                    </div>
                    <div className='dashboard-card'>
                        <h5><NavLink to="/enrollements">Number Of Lessons<i className="fa-solid fa-person-chalkboard"></i></NavLink></h5>
                        <h6>5</h6>
                    </div>
                    <div className='dashboard-card'>
                        <h5><NavLink to="/enrollements">Number Of Users<i className="fa-solid fa-user"></i></NavLink></h5>
                        <h6>5</h6>
                    </div>
                    <div className='dashboard-card'>
                        <h5><NavLink to="/enrollements">Number Of Enrollements<i className="fa-solid fa-user"></i></NavLink></h5>
                        <h6>5</h6>
                    </div>
                    <div className='dashboard-card'>
                        <h5><NavLink to="/enrollements">Number Of Inquiry<i className="fa-solid fa-circle-question"></i></NavLink></h5>
                        <h6>5</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
