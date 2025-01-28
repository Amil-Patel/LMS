import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GeneralSetting from '../../../pages/admin/setting/GeneralSetting';
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';

const PaymentSettingRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/admin/general-setting" element={
                    <AdminAuthGuard>
                        <GeneralSetting />
                    </AdminAuthGuard>
                } />
            </Routes>
        </>
    )
}

export default PaymentSettingRoute
