import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ViewCourse from '../../pages/client/course/ViewCourse'
import AllCourse from '../../pages/client/course';

const CourseRoute = () => {
  return (
    <Routes>
      <Route path='/view-course/:id' element={<ViewCourse />} />
      <Route path='/all-course' element={<AllCourse />} />
    </Routes>
  )
}

export default CourseRoute
