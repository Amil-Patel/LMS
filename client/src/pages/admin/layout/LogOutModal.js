import React from 'react';

const LogOutModal = ({ showModal, handleClose, handleConfirmLogout }) => {
    if (!showModal) {
        return null; // Don't render anything if showModal is false
    }

    return (
        <div className="delete-popup">
            <div className="delete-popup-content">
                <h4>Confirm Logout</h4>
                <p>Are you sure you want to log out?</p>
                <div className="delete-popup-buttons">
                    <button className="primary-btn" onClick={handleConfirmLogout}>
                        Yes, Logout
                    </button>
                    <button className="secondary-btn" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogOutModal;
