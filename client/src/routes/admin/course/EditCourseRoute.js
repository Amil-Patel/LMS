import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom'
import EditCourse from '../../../pages/admin/course/EditCourse';
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
import { userRolesContext } from '../../../pages/admin/layout/RoleContext';
const EditCourseRoute = () => {

    const { userRole } = useContext(userRolesContext);

    const courseMaster = useCheckRolePermission("Course Master");
    const editCourse = userRole === "superAdmin" || (courseMaster.length > 0 && courseMaster[0].can_edit === 1 ? 1 : 0);
    return (
        <>
            <Routes>
                <Route path="/edit-course/:id" element={
                    <AdminAuthGuard>
                        {editCourse ? <EditCourse /> : <NotAuthor />}
                    </AdminAuthGuard>
                } />
            </Routes>
        </>
    )
}

export default EditCourseRoute
