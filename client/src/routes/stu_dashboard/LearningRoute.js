import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Learning from '../../pages/stu_dashboard/Learning';
import PurchaseHistory from '../../pages/stu_dashboard/PurchaseHistory';
import StudentProfile from '../../pages/stu_dashboard/StudentProfile';
import NotAccess from '../../pages/stu_dashboard/layout/NotAccess';
import CourseVideo from '../../pages/stu_dashboard/CourseVideo';
import Cookies from 'js-cookie';
import Dashboard from '../../pages/stu_dashboard/Dashboard';
import Document from '../../pages/stu_dashboard/Document';
const LearningRoute = () => {
    const savedToken = Cookies.get('student-token');
    return (
        <>
            <Routes>
                {savedToken ? (
                    <>
                        <Route path="/student/dashboard" element={<Dashboard />} />
                        <Route path="/student/learning" element={<Learning />} />
                        <Route path="/student/purchase" element={<PurchaseHistory />} />
                        <Route path="/student/stu-profile" element={<StudentProfile />} />
                        <Route path="/student/coursevideo/:id" element={<CourseVideo />} />
                        <Route path="/student/documents" element={<Document />} />
                    </>
                ) : (
                    <>
                    
                        <Route path="/student/dashboard" element={<NotAccess />} />
                        <Route path="/student/learning" element={<NotAccess />} />
                        <Route path="/student/purchase" element={<NotAccess />} />
                        <Route path="/student/stu-profile" element={<NotAccess />} />
                        <Route path="/student/coursevideo/:id" element={<NotAccess />} />
                        <Route path="/student/documents" element={<NotAccess />} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default LearningRoute
