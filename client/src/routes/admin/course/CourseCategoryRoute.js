import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CourseCategory from '../../../pages/admin/course/CourseCategory'
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotFound from '../../../pages/admin/notfound/NotFound'

const CourseCategoryRoute = () => {
  const CourseCategoryPer = useCheckRolePermission("Course Category");
  const viewCourseCategory = CourseCategoryPer.length > 0 && CourseCategoryPer[0].can_view === 1 ? 1 : 0;
  return (
    <>
      <Routes>
        <Route path="/course-category" element={
          <>
            {viewCourseCategory ? <CourseCategory /> : <NotFound />}
          </>
        } />
      </Routes>
    </>
  )
}

export default CourseCategoryRoute;
