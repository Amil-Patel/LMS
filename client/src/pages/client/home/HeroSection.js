import React from 'react'

const HeroSection = () => {
    return (
        <>
        <div className="cus-hero-container">
            <div className='client_section md:flex block'>
                    <div className="cus-hero-text padding-main">
                        <h1>Jumpstart Your Career As A Security Guard Professional</h1>
                        <p>Join Our Top-Tier Online Training Program Designed To Prepare You For A Successful And Fulfilling Career
                            In The Security Industry.</p>
                        <div className="cus-hero-button-group">
                            <button className="cus-hero-btn1">Get Started Today</button>
                            <button className="cus-hero-btn2">Learn More</button>
                        </div>
                    </div>
                    <div className="cus-hero-image">
                        <img src={require("../../../assets/image/hero_image.jpg")} alt='hero' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection
