import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar'
import HeroSection from './HeroSection'
import '../../../assets/css/client/home.css'
import CardSection from './CardSection'
import EnrollSection from './EnrollSection'
import Contact from './Contact'
import Footer from '../layout/Footer'

const Index = () => {
    useEffect(() => {
        document.title = "Comfort Security | Home"; // Set the page title dynamically
    }, []);
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

export default Index
