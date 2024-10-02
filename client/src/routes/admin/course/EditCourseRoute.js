import React from 'react';
import { Route, Routes } from 'react-router-dom'
import EditCourse from '../../../pages/admin/course/EditCourse';
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotFound from '../../../pages/admin/notfound/NotFound'

const EditCourseRoute = () => {
    const courseMaster = useCheckRolePermission("Course Master");
    const editCourse = courseMaster.length > 0 && courseMaster[0].can_edit === 1 ? 1 : 0;
    return (
        <>
            <Routes>
                <Route path="/edit-course/:id" element={
                    <>
                        {editCourse ? <EditCourse /> : <NotFound />}
                    </>
                } />
            </Routes>
        </>
    )
}

export default EditCourseRoute
