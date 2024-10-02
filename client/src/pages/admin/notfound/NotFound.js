import React from 'react'

const NotFound = () => {
    return (
        <>
            <div class="notfound-wrapper">
                <div class="notfound-container" data-text="401">
                    <div class="notfound-title notfound-glitch" data-text="401">
                        401
                    </div>
                    <div class="notfound-description notfound-glitch" data-text="YOU ARE NOT AUTHORIZED">
                        YOU ARE NOT AUTHORIZED
                    </div>
                </div>
            </div>
        </>
    )
}
const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
    },
};
export default NotFound
