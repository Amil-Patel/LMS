import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManageCourse from '../../../pages/admin/course/ManageCourse'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard'
const ManageCourseRoute = () => {
  return (
    <Routes>
      <Route path="/manage-course/:id" element={
        <AdminAuthGuard>
          <ManageCourse />
        </AdminAuthGuard>
      } />
    </Routes>
  )
}

export default ManageCourseRoute
