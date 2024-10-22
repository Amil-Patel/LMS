import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AllCourse from '../../../pages/admin/course/AllCourse';
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor';
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
import { userRolesContext } from '../../../pages/admin/layout/RoleContext';
const AllCourseRoute = () => {
  const { userRole } = useContext(userRolesContext);

  const courseMaster = useCheckRolePermission("Course Master");
  const viewCourse = userRole === "superAdmin" || (courseMaster.length > 0 && courseMaster[0].can_view === 1);

  return (
    <Routes>
      <Route path="/all-course" element={
        <AdminAuthGuard>
          {viewCourse ? <AllCourse /> : <NotAuthor />}
        </AdminAuthGuard>
      } />
    </Routes>
  )
}

export default AllCourseRoute
