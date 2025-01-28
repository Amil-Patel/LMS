import React, { useState, useEffect, useContext } from 'react'
import Sidebar from './layout/Sidebar'
import Navbar from '../client/layout/Navbar'
import { userRolesContext } from '../admin/layout/RoleContext';
import '../../assets/css/client/learning.css'
import axiosInstance from '../client/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import LearningBreadcrumb from './LearningBreadcrumb';
const port = process.env.REACT_APP_URL;

const Learning = () => {
    const { stuUserId } = useContext(userRolesContext);
    const navigate = useNavigate();
    const [totalTime, setTotalTime] = useState(0);
    const [enrollCourse, setEnrollCourse] = useState([]);
    const getEnrollCourse = async () => {
        if (!stuUserId) return;
        try {
            const response = await axiosInstance.get(`${port}/gettingEnrollWithStuId/${stuUserId}`);
            const data = await response.data;
            setEnrollCourse(data);
            const allLessons = data
                .map((course) => course.allLessonData)
                .flat()
                .filter((item) => item?.is_count_time === 1);
            const totalDuration = allLessons.reduce((sum, item) => sum + (item?.duration || 0), 0);
            const totalHours = (totalDuration / 60).toFixed(2);
            setTotalTime(totalHours);
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
            <LearningBreadcrumb />
            <div className='client_section'>
                <div className='main_stu_dashboard'>
                    <Sidebar />
                    <div className='content'>
                        <h1>My Learning</h1>

                        {enrollCourse?.map((item, index) => {
                            return (
                                <div className="course-main-div" key={index}>
                                    {item.course_master_enrollment.course_thumbnail === null ? (
                                        <img
                                            src={require("../../assets/image/default-thumbnail.png")}
                                            alt="course_thumbnail"
                                        />
                                    ) : (
                                        <img src={`../upload/${item.course_master_enrollment.course_thumbnail}`} alt="learning" />
                                    )}
                                    <div className="course-details flex justify-between flex-col">
                                        <div>
                                            <div className="course-details-header pb-1">
                                                <h3>{item.course_master_enrollment.course_title}</h3>
                                                <button className="py-0.5 font-medium h-fit px-6 border border-solid 
                                text-blue-600 text-base border-blue-600 
                                hover:bg-blue-500 hover:text-white" onClick={() => { navigate(`/student/coursevideo/${item.course_id}`) }}>View</button>
                                            </div>
                                            {item.course_master_enrollment.auther && (
                                                <span className="author-name text-sm">By {JSON.parse(item.course_master_enrollment.auther).join(', ')}</span>
                                            )}
                                            <div className="course-icon-section pt-3 pb-5"><span><i className="fa-solid fa-copy"></i> {item.totalLesson} Lessons</span>
                                                <span><i className="fa-solid fa-clock"></i> {totalTime ? totalTime : 0} Hours</span>
                                                <span><i className="fa-solid fa-graduation-cap"></i> {item.totalEnroll} Students</span>
                                                <span><i className="fa-solid fa-signal"></i>{item.course_master_enrollment.course_level}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-full bg-gray-200 h-1.5 rounded-sm">
                                                <div className="bg-blue-600 h-1.5 rounded-sm" style={{ width: `${item.progressPercentage ? item.progressPercentage : 0}%` }}></div>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span className="text-sm font-normal  text-black">{item.progressPercentage ? item.progressPercentage : 0}% Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Learning
