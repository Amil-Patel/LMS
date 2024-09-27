import React from 'react';
import { Route, Routes } from 'react-router-dom'
import EditCourse from '../../../pages/admin/course/EditCourse';

const EditCourseRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/edit-course/:id" element={
                    <>
                        <EditCourse />
                    </>
                } />
            </Routes>
        </>
    )
}

export default EditCourseRoute
