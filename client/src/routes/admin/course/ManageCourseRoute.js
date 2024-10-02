import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManageCourse from '../../../pages/admin/course/ManageCourse'

const ManageCourseRoute = () => {
  return (
    <Routes>
      <Route path="/manage-course/:id" element={
        <>
          <ManageCourse />
        </>
      } />
    </Routes>
  )
}

export default ManageCourseRoute
