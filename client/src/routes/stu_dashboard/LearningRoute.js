import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Learning from '../../pages/stu_dashboard/learning/Learning';

const LearningRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/learning" element={<Learning />} />
            </Routes>
        </>
    )
}

export default LearningRoute
