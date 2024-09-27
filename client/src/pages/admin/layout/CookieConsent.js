import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

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
    <div className="cookie-consent">
      <p>We use cookies to improve your experience. By using our site, you accept our cookie policy.</p>
      <button onClick={acceptCookies}>Accept Cookies</button>
    </div>
  );
};

export default CookieConsent;
