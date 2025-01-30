import React, { useState } from "react";
import "../../../assets/css/delete.css";

const generateCaptcha = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const DeleteModal = ({ onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  const handleShowModal = () => {
    setGeneratedCaptcha(generateCaptcha());
    setShowModal(true);
    setCaptchaValue("");
    setCaptchaError("");
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    if (captchaValue === generatedCaptcha) {
      onDelete();
      handleHideModal();
    } else {
      setCaptchaError("Incorrect CAPTCHA value. Please try again.");
    }
  };

  const handleChange = (e) => {
    setCaptchaValue(e.target.value);
    setCaptchaError("");
  };

  return (
    <>
      <p onClick={handleShowModal}><i class="fa-solid fa-trash"></i>Delete</p>

      {showModal && (
        <div className="delete-popup">
          <div className="delete-popup-content">
            <h5>Enter Captcha</h5>
            <p>
              If you want to delete, enter <b>{generatedCaptcha}</b>
            </p>
            <div>
              <input
                type="text"
                placeholder="Enter Captcha"
                className="col12input"
                value={captchaValue}
                onChange={handleChange}
              />
              {captchaError && <p className="captcha-error"> {captchaError}</p>}
            </div>
            <div className="delete-popup-buttons">
              <button className="primary-btn" onClick={handleDelete}>
                Delete
              </button>
              <button className="secondary-btn" onClick={handleHideModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
