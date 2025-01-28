import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/admin/layout/Login'
import AdminPageGuard from '../../pages/admin/layout/auth/AdminPageGuard';
import CookiePolicy from '../../pages/admin/layout/CookiePolicy';

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
                <Route
                    path="/cookie-policy"
                    element={
                        <>
                            <CookiePolicy />
                        </>
                    }
                />
               
            </Routes>
        </>
    )
}

export default LoginRoute
