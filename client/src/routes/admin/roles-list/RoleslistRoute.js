import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import RolesList from '../../../pages/admin/roles-list/RolesList'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard'
import { userRolesContext } from "../../../pages/admin/layout/RoleContext";
import NotAuthor from "../../../pages/admin/notfound/NotAuthor";

const RoleslistRoute = () => {
  const { userRole } = useContext(userRolesContext);

  return (
    <>
      <Routes>
        <Route path="/admin/roles-list" element={
          <AdminAuthGuard>
            {userRole === "superAdmin" ? (
              <RolesList />
            ) : (
              <NotAuthor />
            )}
          </AdminAuthGuard>
        } />
      </Routes>
    </>
  )
}

export default RoleslistRoute  
