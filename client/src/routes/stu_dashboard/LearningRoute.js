import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Learning from '../../pages/stu_dashboard/Learning';
import PurchaseHistory from '../../pages/stu_dashboard/PurchaseHistory';
import StudentProfile from '../../pages/stu_dashboard/StudentProfile';
import NotAccess from '../../pages/stu_dashboard/layout/NotAccess';
import Cookies from 'js-cookie';
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
                    </>
                ) : (
                    <>
                        <Route path="/student/learning" element={<NotAccess />} />
                        <Route path="/student/purchase" element={<NotAccess />} />
                        <Route path="/student/stu-profile" element={<NotAccess />} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default LearningRoute
