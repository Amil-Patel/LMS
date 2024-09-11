import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllCourse from '../../../pages/admin/course/AllCourse'

const AllCourseRoute = () => {
  return (
    <Routes>
                <Route path="/all-course" element={
                    <>
                        <AllCourse />
                    </>
                } />
            </Routes>
  )
}

export default AllCourseRoute
