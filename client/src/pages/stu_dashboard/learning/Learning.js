import React from 'react'
import Sidebar from '../layout/Sidebar'

const Learning = () => {
    return (
        <>
            <div className='main_stu_dashboard'>
                <Sidebar />
                <div className='content'>
                    <h1>My Learning</h1>
                    <div className='learning-cards'>
                        <div className='card-image'>
                            <img src={require("../../../assets/image/course-thumbnail.png")} alt="learning" />
                        </div>
                        <div className='card-content mb-0'>
                            <div className='flex justify-between'>
                                <h3 className='font-semibold text-black'>The Web Developer BootCamp 2024</h3>
                                <button className='card-view-btn'>View</button>
                            </div>
                            <p className='mb-1 tracking-wide'>By Ahmad Padarwala</p>
                            <div className="metadata">
                                <span>
                                    <i className="fa-solid fa-file"></i> 20 Lessons
                                </span>
                                <span>
                                    <i className="fa-solid fa-file"></i> 20 Lessons
                                </span>
                                <span>
                                    <i className="fa-solid fa-file"></i> 20 Lessons
                                </span>
                                <span>
                                    <i className="fa-solid fa-file"></i> 20 Lessons
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-600">
                                <div className="h-1.5 bg-sky-600" style={{ width: "50%" }}></div>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <p>50% Completed</p>
                                </div>
                                <div>
                                    <div>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                    </div>
                                    <p>Leave YOur Review</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Learning
