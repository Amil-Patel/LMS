import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllCourse from '../../../pages/admin/course/AllCourse'
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
const AllCourseRoute = () => {
  const courseMaster = useCheckRolePermission("Course Master");
  const viewCourse = courseMaster.length > 0 && courseMaster[0].can_view === 1 ? 1 : 0;
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
