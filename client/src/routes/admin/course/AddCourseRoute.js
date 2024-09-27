import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCourse from '../../../pages/admin/course/AddCourse'


const AddCourseRoute = () => {
  return (
    <Routes>
      <Route path="/add-course" element={
        <>
          <AddCourse />
        </>
      } />
    </Routes>
  )
}

export default AddCourseRoute
