import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Enrollements from '../../../pages/admin/enrollements/Enrollements'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard'

const EnrollementsRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/enrollements" element={
          <AdminAuthGuard>
            <Enrollements />
          </AdminAuthGuard>
        } />
      </Routes>
    </>
  )
}

export default EnrollementsRoute  
