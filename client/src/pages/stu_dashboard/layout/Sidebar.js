import React from 'react'

const Sidebar = () => {
    return (
        <>
            <aside className="stu-main-sidebar">
                <div className="sildebar-profile-section">
                    <img src={require("../../../assets/image/course-thumbnail.png")} alt="profile" />
                    <h3 className='pt-3'>Joseph Cena</h3>
                    <p>josephcena@gmail.com</p>
                </div>
                <div className='stu-sidebar-menu py-7'>
                    <ul>
                        <li>
                            <a href="#" className=''><i className="fa-solid fa-gauge-high"></i>Dashboard </a>
                        </li>
                        <li>
                            <a href="#"><i className="fa-solid fa-border-all"></i>Courses </a>
                        </li>
                        <li>
                            <a href="#" className='active'><i className="fa-regular fa-heart"></i>Favorites </a>
                        </li>
                        <li>
                            <a href="#"><i className="fa-regular fa-folder-open"></i>Documents </a>
                        </li>
                        <div className='mt-6 border-t-2 mb-3'></div>
                        <li>
                            <a href="#"><i className="fa-solid fa-power-off"></i>Logout </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
