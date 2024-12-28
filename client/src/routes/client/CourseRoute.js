import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ViewCourse from '../../pages/client/course/ViewCourse'
import AllCourse from '../../pages/client/course';
import CourseVideo from '../../pages/client/course/CourseVideo';

const CourseRoute = () => {
  return (
    <Routes>
      <Route path='/view-course/:id' element={<ViewCourse />} />
      <Route path='/all-course' element={<AllCourse />} />
      <Route path="/coursevideo/:id" element={<CourseVideo />} />
    </Routes>
  )
}

export default CourseRoute
