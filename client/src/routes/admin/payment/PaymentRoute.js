import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Payment from '../../../pages/admin/payment/Payment'
import AdminAuthGuard from '../../../pages/admin/layout/auth/AdminAuthGuard'

const PaymentRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/payment" element={
          <AdminAuthGuard>
            <Payment />
          </AdminAuthGuard>
        } />
      </Routes>
    </>
  )
}

export default PaymentRoute  
