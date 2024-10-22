import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCourse from '../../../pages/admin/course/AddCourse';
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
import { userRolesContext } from '../../../pages/admin/layout/RoleContext';

const AddCourseRoute = () => {
  const { userRole } = useContext(userRolesContext);

  const courseMaster = useCheckRolePermission("Course Master");
  const addCourse = userRole === "superAdmin" || (courseMaster.length > 0 && courseMaster[0].can_add === 1 ? 1 : 0);
  return (
    <Routes>
      <Route path="/add-course" element={
        <>
          <AdminAuthGuard>
            {addCourse ? <AddCourse /> : <NotAuthor />}
          </AdminAuthGuard>
        </>
      } />
    </Routes>
  )
}

export default AddCourseRoute
