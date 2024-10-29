import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentSetting from '../../../pages/admin/setting/PaymentSetting'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard';

const PaymentSettingRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/payment-setting" element={
                    <AdminAuthGuard>
                        <PaymentSetting />
                    </AdminAuthGuard>
                } />
            </Routes>
        </>
    )
}

export default PaymentSettingRoute
