import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/client/home'
import CookiePolicy from '../../pages/admin/layout/CookiePolicy'

const HomeRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<CookiePolicy />} />
        </Routes>
    )
}

export default HomeRoute
