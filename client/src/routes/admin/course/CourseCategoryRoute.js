import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CourseCategory from '../../../pages/admin/course/CourseCategory'
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
const CourseCategoryRoute = () => {
  const CourseCategoryPer = useCheckRolePermission("Course Category");
  const viewCourseCategory = CourseCategoryPer.length > 0 && CourseCategoryPer[0].can_view === 1 ? 1 : 0;
  return (
    <>
      <Routes>
        <Route path="/course-category" element={
          <AdminAuthGuard>
            {viewCourseCategory ? <CourseCategory /> : <NotAuthor />}
          </AdminAuthGuard>
        } />
      </Routes>
    </>
  )
}

export default CourseCategoryRoute;
