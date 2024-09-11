import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RolesList from '../../../pages/admin/roles-list/RolesList'


const RoleslistRoute = () => {
  return (
    <>
          <Routes>
                <Route path="/roles-list" element={
                    <>
                    <RolesList/>
                    </>
                } />
            </Routes>
    </>
  )
}

export default RoleslistRoute  
