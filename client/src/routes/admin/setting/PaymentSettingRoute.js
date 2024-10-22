import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentSetting from '../../../pages/admin/setting/PaymentSetting'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';
import { userRolesContext } from "../../../pages/admin/layout/RoleContext";
import NotAuthor from "../../../pages/admin/notfound/NotAuthor";

const PaymentSettingRoute = () => {
    const { userRole } = useContext(userRolesContext);
    return (
        <>
            <Routes>
                <Route path="/payment-setting" element={
                    <AdminAuthGuard>
                        {userRole === "superAdmin" ? (
                            <PaymentSetting />
                        ) : (
                            <NotAuthor />
                        )}
                    </AdminAuthGuard>
                } />
            </Routes>
        </>
    )
}

export default PaymentSettingRoute
