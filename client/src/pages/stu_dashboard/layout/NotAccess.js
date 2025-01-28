import React from 'react'

const NotAccess = () => {
    return (
        <>
            <div className="notfound-wrapper">
                <div className="notfound-container" data-text="🔒">
                    <div className="notfound-title notfound-glitch" data-text="🔒">
                        🔒
                    </div>
                    <div className="notfound-description notfound-glitch" data-text="YOU ARE NOT AUTHORIZED">
                        YOU ARE NOT AUTHORIZED
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotAccess
