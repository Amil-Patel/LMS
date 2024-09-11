import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Payment from '../../../pages/admin/payment/Payment'


const PaymentRoute = () => {
  return (
    <>
          <Routes>
                <Route path="/payment" element={
                    <>
                        <Payment/>
                    </>
                } />
            </Routes>
    </>
  )
}

export default PaymentRoute  
