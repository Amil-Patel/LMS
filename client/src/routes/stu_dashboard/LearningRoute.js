import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Learning from '../../pages/stu_dashboard/Learning';
import PurchaseHistory from '../../pages/stu_dashboard/PurchaseHistory';
import StudentProfile from '../../pages/stu_dashboard/StudentProfile';

const LearningRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/learning" element={<Learning />} />
                <Route path="/purchase" element={<PurchaseHistory />} />
                <Route path="/stu-profile" element={<StudentProfile />} />
            </Routes>
        </>
    )
}

export default LearningRoute
