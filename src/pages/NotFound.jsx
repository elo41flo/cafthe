import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/NotFound.css"; // Import du style

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page-container">
      <div className="error-content-box fade-in">
        <h1 className="error-code">404</h1>
        <div className="error-icon">☕️</div>
        <h2 className="error-title">Oups ! Votre café a refroidi...</h2>
        <p className="error-text">
          La page que vous recherchez semble avoir disparu dans un nuage de
          vapeur. Pas de panique, le reste de la boutique est encore tout chaud
          !
        </p>
        <button onClick={() => navigate("/")} className="btn-error-home">
          RETOURNER À L'ACCUEIL
        </button>
      </div>
    </div>
  );
};

export default NotFound;
