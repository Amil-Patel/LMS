import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Inquiry from '../../../pages/admin/inquiry/Inquiry'


const InquiryRoute = () => {
  return (
    <>
          <Routes>
                <Route path="/inquiry" element={
                    <>
                        <Inquiry/>
                    </>
                } />
            </Routes>
    </>
  )
}

export default InquiryRoute  
