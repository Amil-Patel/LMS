import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

const CookieConsent = ({ onConsent }) => {
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (consent) {
      setIsConsentGiven(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 }); // 1-year expiry
    setIsConsentGiven(true);
    onConsent(true);
  };

  if (isConsentGiven) return null; // Hide if consent is already given

  return (
    <div className="cookiewrapper show">
      <header>
        <i className="bx bx-cookie"></i>
        <h4>We Value Your Privacy</h4>
      </header>

      <div className="data">
        <p>We use cookies to enhance your experience, provide personalized content, and analyze site traffic. By using our website, you agree to our use of cookies. For more details, read our
          <NavLink to="/cookie-policy" target="_blank"> Cookie Policy.</NavLink></p>
      </div>

      <div className="buttons">
        {/* <button className="button" id="declineBtn">Decline</button> */}
        <button className="button" onClick={acceptCookies} id="acceptBtn">Accept & Continue</button>
      </div>
    </div>
  );
};

export default CookieConsent;
