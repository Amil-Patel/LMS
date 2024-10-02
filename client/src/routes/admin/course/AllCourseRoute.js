import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllCourse from '../../../pages/admin/course/AllCourse'
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotFound from '../../../pages/admin/notfound/NotFound'

const AllCourseRoute = () => {
  const courseMaster = useCheckRolePermission("Course Master");
  const viewCourse = courseMaster.length > 0 && courseMaster[0].can_view === 1 ? 1 : 0;
  return (
    <Routes>
      <Route path="/all-course" element={
        <>
          {viewCourse ? <AllCourse /> : <NotFound />}
        </>
      } />
    </Routes>
  )
}

export default AllCourseRoute
