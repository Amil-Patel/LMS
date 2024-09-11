import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentSetting from '../../../pages/admin/setting/PaymentSetting'

const PaymentSettingRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/payment-setting" element={
                    <>
                        <PaymentSetting/>
                    </>
                } />
            </Routes>
        </>
    )
}

export default PaymentSettingRoute
