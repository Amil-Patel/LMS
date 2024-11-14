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
                            <i className="fa-solid fa-gauge"></i>
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-gauge"></i>
                            <a href="#">Dashboard</a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
