import React from 'react'
import Navbar from '../client/layout/Navbar'
import Sidebar from './layout/Sidebar'
import DashboardBreadcrumb from './DashboardBreadcrumb'

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <DashboardBreadcrumb />
            <div className='client_section'>
                <div className='main_stu_dashboard'>
                    <Sidebar />
                    <div className='content'>
                        <h1>Dashboard</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
