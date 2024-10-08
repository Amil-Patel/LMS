import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="notfound-wrapper">
                <div className="notfound-container" data-text="🔙">
                    <div className="notfound-title notfound-glitch" data-text="🔙">
                        🔙
                    </div>
                    <div className="notfound-description notfound-glitch" data-text="Oops! Page Not Found">
                    Oops! Page Not Found
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound
