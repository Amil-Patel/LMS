import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Enrollements from '../../../pages/admin/enrollements/Enrollements'


const EnrollementsRoute = () => {
  return (
    <>
          <Routes>
                <Route path="/enrollements" element={
                    <>
                        <Enrollements/>
                    </>
                } />
            </Routes>
    </>
  )
}

export default EnrollementsRoute  
