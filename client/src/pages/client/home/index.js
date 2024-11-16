import React from 'react'
import Navbar from '../layout/Navbar'
import HeroSection from './HeroSection'
import '../../../assets/css/client/home.css'
import CardSection from './CardSection'
import EnrollSection from './EnrollSection'
import Contact from './Contact'
import Footer from '../layout/Footer'

const index = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <CardSection />
            <EnrollSection />
            <Contact />
            <Footer />
        </>
    )
}

export default index
