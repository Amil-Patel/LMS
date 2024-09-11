import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CourseCategory from '../../../pages/admin/course/CourseCategory'

const CourseCategoryRoute = () => {
  return (
    <>
          <Routes>
                <Route path="/course-category" element={
                    <>
                        <CourseCategory />
                    </>
                } />
            </Routes>
    </>
  )
}

export default CourseCategoryRoute
