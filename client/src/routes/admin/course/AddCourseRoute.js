import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCourse from '../../../pages/admin/course/AddCourse';
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';

const AddCourseRoute = () => {
  const courseMaster = useCheckRolePermission("Course Master");
  const addCourse = courseMaster.length > 0 && courseMaster[0].can_add === 1 ? 1 : 0;
  return (
    <Routes>
      <Route path="/add-course" element={
        <>
          <AdminAuthGuard>
            {addCourse ? <AddCourse /> : <NotAuthor />}
          </AdminAuthGuard>
        </>
      } />
    </Routes>
  )
}

export default AddCourseRoute
