import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ViewCourse from '../../pages/client/course/ViewCourse'

const CourseRoute = () => {
  return (
    <Routes>
      <Route path='/view-course' element={<ViewCourse/>}/>
    </Routes>
  )
}

export default CourseRoute
