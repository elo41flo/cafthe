import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={contentBox}>
        <h1 style={errorCodeStyle}>404</h1>
        <div style={iconStyle}>☕️</div>
        <h2 style={titleStyle}>Oups ! Votre café a refroidi...</h2>
        <p style={textStyle}>
          La page que vous recherchez semble avoir disparu dans un nuage de
          vapeur. Pas de panique, le reste de la boutique est encore tout chaud
          !
        </p>
        <button onClick={() => navigate("/")} style={btnBackStyle}>
          RETOURNER À L'ACCUEIL
        </button>
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "'Montserrat', sans-serif",
  padding: "20px",
};

const contentBox = {
  maxWidth: "600px",
};

const errorCodeStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "120px",
  color: "#97af6e",
  margin: "0",
  lineHeight: "1",
};

const iconStyle = {
  fontSize: "50px",
  marginBottom: "20px",
};

const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "32px",
  color: "#333",
  marginBottom: "15px",
};

const textStyle = {
  fontSize: "18px",
  color: "#666",
  marginBottom: "40px",
  lineHeight: "1.6",
};

const btnBackStyle = {
  backgroundColor: "#aa8d74",
  color: "white",
  border: "none",
  borderRadius: "30px",
  padding: "15px 40px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 5px 15px rgba(170,141,116,0.3)",
};

export default NotFound;
