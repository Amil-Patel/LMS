import React, { useState, useEffect, useContext } from 'react'
import Sidebar from './layout/Sidebar'
import Navbar from '../client/layout/Navbar'
import Footer from '../client/layout/Footer'
import { userRolesContext } from '../admin/layout/RoleContext';
import '../../assets/css/client/learning.css'
import axiosInstance from '../client/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
const port = process.env.REACT_APP_URL;

const Learning = () => {
    const { stuUserId } = useContext(userRolesContext);
    const navigate = useNavigate();
    const [enrollCourse, setEnrollCourse] = useState([]);
    const getEnrollCourse = async () => {
        if (!stuUserId) return;
        try {
            const response = await axiosInstance.get(`${port}/gettingEnrollWithStuId/${stuUserId}`);
            const data = await response.data;
            setEnrollCourse(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEnrollCourse();
    }, [stuUserId])
    return (
        <>
            <Navbar />
            <div className='client_section'>
                <div className='main_stu_dashboard'>
                    <Sidebar />
                    <div className='content'>
                        <h1>My Learning</h1>

                        {enrollCourse?.map((item, index) => {
                            return (
                                <div className="course-main-div" key={index}>
                                    <img src={`../upload/${item.course_master_enrollment.course_thumbnail}`} alt="learning" />
                                    <div className="course-details">
                                        <div className="course-details-header pb-1">
                                            <h3>{item.course_master_enrollment.course_title}</h3>
                                            <button className="py-0.5 font-medium h-fit px-6 border border-solid 
                                text-blue-600 text-base border-blue-600 
                                hover:bg-blue-500 hover:text-white" onClick={() => { navigate(`/student/coursevideo/${item.course_id}`) }}>View</button>
                                        </div>
                                        <span className="author-name text-sm">By Ahamd</span>
                                        <div className="course-icon-section pt-3 pb-5"><span><i className="fa-solid fa-copy"></i> 20 Lessons</span>
                                            <span><i className="fa-solid fa-clock"></i> 12.30 Hours</span>
                                            <span><i className="fa-solid fa-graduation-cap"></i> 156 Students</span>
                                            <span><i className="fa-solid fa-signal"></i>{item.course_master_enrollment.course_level}</span></div>
                                        <div className="w-full bg-gray-200 h-2">
                                            <div className="bg-blue-600 h-2" style={{ width: "80%" }}></div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-sm font-normal  text-black">80% Complete</span>
                                            <div className="text-sm font-medium text-black">
                                                <div className='flex justify-end mb-1 text-orange-500 text-xs'>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-regular fa-star'></i>
                                                </div>
                                                <span className='text-sm font-normal'>
                                                    Leave Your Review
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Learning
