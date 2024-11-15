import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ViewCourse from '../../pages/client/course/ViewCourse'
<<<<<<< HEAD
import AllCourse from '../../pages/client/course/AllCourse'
=======
>>>>>>> f114c73c830b01d1401bef769be99b4849cc7af8

const CourseRoute = () => {
  return (
    <Routes>
      <Route path='/view-course' element={<ViewCourse/>}/>
<<<<<<< HEAD
      <Route path='/all-course' element={<AllCourse/>}/>
=======
>>>>>>> f114c73c830b01d1401bef769be99b4849cc7af8
    </Routes>
  )
}

export default CourseRoute
