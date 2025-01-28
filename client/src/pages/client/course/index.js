import React from 'react'
import Breadcrumb from './Breadcrumb'
import Navbar from '../layout/Navbar'
import AllCourse from './AllCourse'
import Footer from '../layout/Footer'

const index = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb />
            <AllCourse />
            <Footer />
        </>
    )
}

export default index
