import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/admin/layout/Login'
import AdminPageGuard from '../../pages/admin/layout/auth/AdminPageGuard'

const LoginRoute = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/admin"
                    element={
                        <>
                            <AdminPageGuard>
                                <Login />
                            </AdminPageGuard>
                        </>
                    }
                />
            </Routes>
        </>
    )
}

export default LoginRoute
