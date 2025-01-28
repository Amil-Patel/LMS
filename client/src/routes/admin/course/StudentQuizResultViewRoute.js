import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import { userRolesContext } from '../../../pages/admin/layout/RoleContext';
import StudentQuizResultView from '../../../pages/admin/course/StudentQuizResultView';

const StudentQuizResultViewRoute = () => {
    const { userRole } = useContext(userRolesContext);

    const courseMaster = useCheckRolePermission("Course Master");
    const viewCourse = userRole === "superAdmin" || (courseMaster.length > 0 && courseMaster[0].can_view === 1 ? 1 : 0);
    return (
        <Routes>
            <Route path="/admin/student/quiz-result/:id/:studentId" element={
                <AdminAuthGuard>
                    {viewCourse ? <StudentQuizResultView /> : <NotAuthor />}
                </AdminAuthGuard>
            } />
        </Routes>
    )
}

export default StudentQuizResultViewRoute
