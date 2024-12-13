import React from 'react'
import Sidebar from './layout/Sidebar'
import Navbar from '../client/layout/Navbar'
import Footer from '../client/layout/Footer'
import Breadcrumb from '../client/course/Breadcrumb'
import '../../assets/css/client/learning.css'

const Learning = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb />
            <div className='main_stu_dashboard'>
                <Sidebar />
                <div className='content'>
                    <h1>My Learning</h1>
                    <div className="course-main-div">
                        <img src={require("../../assets/image/course-thumbnail.png")} alt="learning" />
                        <div className="course-details">
                            <div className="course-details-header pb-1">
                                <h3>The Web Developer BootCamp 2024</h3>
                                <button className="py-0.5 font-medium h-fit px-6 border border-solid 
                                text-blue-600 text-base border-blue-600 
                                hover:bg-blue-500 hover:text-white">View </button>

                            </div>
                            <span className="author-name text-sm">By Aakib Valuda</span>
                            <div className="course-icon-section pt-3 pb-5"><span><i className="fa-solid fa-copy"></i> 20 Lessons</span>
                                <span><i className="fa-solid fa-clock"></i> 12.30 Hours</span>
                                <span><i className="fa-solid fa-graduation-cap"></i> 156 Students</span>
                                <span><i className="fa-solid fa-signal"></i> Beginner</span></div>
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
                    <div className="course-main-div">
                        <img src={require("../../assets/image/course-thumbnail.png")} alt="learning" />
                        <div className="course-details">
                            <div className="course-details-header pb-1">
                                <h3>The Web Developer BootCamp 2024</h3>
                                <button className="py-0.5 font-medium h-fit px-6 border border-solid 
                                text-blue-600 text-base border-blue-600 
                                hover:bg-blue-500 hover:text-white">View </button>

                            </div>
                            <span className="author-name text-sm">By Aakib Valuda</span>
                            <div className="course-icon-section pt-3 pb-5"><span><i className="fa-solid fa-copy"></i> 20 Lessons</span>
                                <span><i className="fa-solid fa-clock"></i> 12.30 Hours</span>
                                <span><i className="fa-solid fa-graduation-cap"></i> 156 Students</span>
                                <span><i className="fa-solid fa-signal"></i> Beginner</span></div>
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
                    <div className="course-main-div">
                        <img src={require("../../assets/image/course-thumbnail.png")} alt="learning" />
                        <div className="course-details">
                            <div className="course-details-header pb-1">
                                <h3>The Web Developer BootCamp 2024</h3>
                                <button className="py-0.5 font-medium h-fit px-6 border border-solid 
                                text-blue-600 text-base border-blue-600 
                                hover:bg-blue-500 hover:text-white">View </button>

                            </div>
                            <span className="author-name text-sm">By Aakib Valuda</span>
                            <div className="course-icon-section pt-3 pb-5"><span><i className="fa-solid fa-copy"></i> 20 Lessons</span>
                                <span><i className="fa-solid fa-clock"></i> 12.30 Hours</span>
                                <span><i className="fa-solid fa-graduation-cap"></i> 156 Students</span>
                                <span><i className="fa-solid fa-signal"></i> Beginner</span></div>
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
                    <div className="course-main-div">
                        <img src={require("../../assets/image/course-thumbnail.png")} alt="learning" />
                        <div className="course-details">
                            <div className="course-details-header pb-1">
                                <h3>The Web Developer BootCamp 2024</h3>
                                <button className="py-0.5 font-medium h-fit px-6 border border-solid 
                                text-blue-600 text-base border-blue-600 
                                hover:bg-blue-500 hover:text-white">View </button>

                            </div>
                            <span className="author-name text-sm">By Aakib Valuda</span>
                            <div className="course-icon-section pt-3 pb-5"><span><i className="fa-solid fa-copy"></i> 20 Lessons</span>
                                <span><i className="fa-solid fa-clock"></i> 12.30 Hours</span>
                                <span><i className="fa-solid fa-graduation-cap"></i> 156 Students</span>
                                <span><i className="fa-solid fa-signal"></i> Beginner</span></div>
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
                    <div className="course-main-div">
                        <img src={require("../../assets/image/course-thumbnail.png")} alt="learning" />
                        <div className="course-details">
                            <div className="course-details-header pb-1">
                                <h3>The Web Developer BootCamp 2024</h3>
                                <button className="py-0.5 font-medium h-fit px-6 border border-solid 
                                text-blue-600 text-base border-blue-600 
                                hover:bg-blue-500 hover:text-white">View </button>

                            </div>
                            <span className="author-name text-sm">By Aakib Valuda</span>
                            <div className="course-icon-section pt-3 pb-5"><span><i className="fa-solid fa-copy"></i> 20 Lessons</span>
                                <span><i className="fa-solid fa-clock"></i> 12.30 Hours</span>
                                <span><i className="fa-solid fa-graduation-cap"></i> 156 Students</span>
                                <span><i className="fa-solid fa-signal"></i> Beginner</span></div>
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Learning
