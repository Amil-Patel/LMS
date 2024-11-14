import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inquiry from '../../../pages/admin/inquiry/Inquiry'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard'

const InquiryRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/inquiry" element={
          <AdminAuthGuard>
            <Inquiry />
          </AdminAuthGuard>
        } />
      </Routes>
    </>
  )
}

export default InquiryRoute  
