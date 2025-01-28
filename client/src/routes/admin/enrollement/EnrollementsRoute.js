import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Enrollements from '../../../pages/admin/enrollements/Enrollements'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard'
import { userRolesContext } from '../../../pages/admin/layout/RoleContext'
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission'

const EnrollementsRoute = () => {
  const { userRole } = useContext(userRolesContext);
  const enrollInfo = useCheckRolePermission("Enrollment Information");
  const viewEnrollPermission = userRole === "superAdmin" || (enrollInfo.length > 0 && enrollInfo[0].can_view === 1 ? 1 : 0);
  return (
    <>
      <Routes>
        <Route path="/admin/enrollements" element={
          <AdminAuthGuard>
            {viewEnrollPermission ? <Enrollements /> : <NotAuthor />}
          </AdminAuthGuard>
        } />
      </Routes>
    </>
  )
}

export default EnrollementsRoute  
