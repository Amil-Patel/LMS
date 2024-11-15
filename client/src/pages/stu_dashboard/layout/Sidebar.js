import React from 'react'

const Sidebar = () => {
    return (
        <>
            <aside className="stu-main-sidebar">
                <div className="profile-section">
                    <img src={require("../../../assets/image/profile-logo.png")} alt="profile" />
                    <h3>Joseph Cena</h3>
                    <p>josephcena@gmail.com</p>
                </div>
                <div className='stu-sidebar-menu'>
                    <ul>
                        <li className='active'>
                            <i className="fa-solid fa-gauge"></i>
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                        <i class="fa-solid fa-graduation-cap"></i>
                            <a href="#">My Courses</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-book"></i>
                            <a href="#">Assignments</a>
                        </li>
                        <li>
                        <i class="fa-solid fa-file"></i>
                            <a href="#">Grades & Results</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-clock"></i>
                            <a href="#">Schedule/Timetable</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-message"></i>
                            <a href="#">Messages/Inbox</a>
                        </li>
                        <li>
                           <i class="fa-solid fa-bullhorn"></i>
                            <a href="#">Announcements</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-award"></i>
                            <a href="#">Certificate</a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
