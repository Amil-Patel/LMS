import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RolesList from '../../../pages/admin/roles-list/RolesList'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard'

const RoleslistRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/roles-list" element={
          <AdminAuthGuard>
            <RolesList />
          </AdminAuthGuard>
        } />
      </Routes>
    </>
  )
}

export default RoleslistRoute  
