import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import ManageCourse from '../../../pages/admin/course/ManageCourse'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import { userRolesContext } from '../../../pages/admin/layout/RoleContext';

const ManageCourseRoute = () => {
  const { userRole } = useContext(userRolesContext);

  const courseMaster = useCheckRolePermission("Course Master");
  const viewCourse = userRole === "superAdmin" || (courseMaster.length > 0 && courseMaster[0].can_view === 1 ? 1 : 0);
  return (
    <Routes>
      <Route path="/manage-course/:id" element={
        <AdminAuthGuard>
          {viewCourse ? <ManageCourse /> : <NotAuthor />}
        </AdminAuthGuard>
      } />
    </Routes>
  )
}

export default ManageCourseRoute
