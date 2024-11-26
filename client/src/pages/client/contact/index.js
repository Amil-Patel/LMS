import React from 'react'
import Navbar from '../layout/Navbar'
import Contact from './Contact'
import Breadcrumb from './Breadcrumb'
import Footer from '../layout/Footer'

const index = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb />
            <Contact />
            <Footer />
        </>
    )
}

export default index
