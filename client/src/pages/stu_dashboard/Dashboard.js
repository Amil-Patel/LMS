import React from 'react'
import Navbar from '../client/layout/Navbar'
import Sidebar from './layout/Sidebar'

const Dashboard = () => {
    return (
        <>
            <Navbar />
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
