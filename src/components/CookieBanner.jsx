import React, { useState, useEffect } from "react";
import "../styles/Components/CookieBanner.css";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On vérifie si le choix a déjà été fait
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status) => {
    localStorage.setItem("cookieConsent", status);
    setIsVisible(false);

    if (status === "accepted") {
      // Ici, tu peux lancer tes scripts (PayPal, Analytics, etc.)
      console.log("Cookies acceptés");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          🍪 <strong>Caf'Thé</strong> utilise des cookies pour améliorer votre
          expérience et sécuriser vos paiements.
        </p>
        <div className="cookie-buttons">
          <button
            onClick={() => handleConsent("declined")}
            className="btn-cookie-deny"
          >
            Refuser
          </button>
          <button
            onClick={() => handleConsent("accepted")}
            className="btn-cookie-accept"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
