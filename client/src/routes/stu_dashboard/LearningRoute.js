import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Learning from '../../pages/stu_dashboard/Learning';
import PurchaseHistory from '../../pages/stu_dashboard/PurchaseHistory';
import StudentProfile from '../../pages/stu_dashboard/StudentProfile';
import CourseVideo from '../../pages/stu_dashboard/CourseVideo';
import Home from "../../pages/client/home";
import Cookies from 'js-cookie';
import Document from '../../pages/stu_dashboard/Document';
const LearningRoute = () => {
    const savedToken = Cookies.get('student-token');
    return (
        <>
            <Routes>
                {savedToken ? (
                    <>
                        <Route path="/student/learning" element={<Learning />} />
                        <Route path="/student/purchase" element={<PurchaseHistory />} />
                        <Route path="/student/stu-profile" element={<StudentProfile />} />
                        <Route path="/student/coursevideo/:id" element={<CourseVideo />} />
                        <Route path="/student/documents" element={<Document />} />
                    </>
                ) : (
                    <>
                    
                        <Route path="/student/learning" element={<Home />} />
                        <Route path="/student/purchase" element={<Home />} />
                        <Route path="/student/stu-profile" element={<Home />} />
                        <Route path="/student/coursevideo/:id" element={<Home />} />
                        <Route path="/student/documents" element={<Home />} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default LearningRoute
