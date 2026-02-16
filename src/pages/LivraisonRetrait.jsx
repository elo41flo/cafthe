import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LivraisonRetrait = () => {
  const [modeTransport, setModeTransport] = useState(null);
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        paddingBottom: "100px",
      }}
    >
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={titleStyle}>Livraison & Retrait</h1>
        <p style={subtitleStyle}>
          Comment souhaitez-vous recevoir vos produits ?
        </p>
      </section>

      <section style={containerStyle}>
        <h2 style={h2Style}>Choisissez votre mode de transport</h2>

        {/* OPTION MONDIAL RELAY */}
        <div
          onClick={() => setModeTransport("mondial")}
          style={modeOptionStyle(modeTransport === "mondial")}
        >
          <div style={radioHeaderStyle}>
            <span style={bulletStyle}>
              {modeTransport === "mondial" ? "●" : "○"}
            </span>
            <h3 style={optionTitleStyle}>Mondial Relay — 4,90€</h3>
          </div>
          <p style={optionDescStyle}>
            Livraison sous 3 à 5 jours dans le point relais de votre choix.
          </p>

          {/* BOUTON SPÉCIFIQUE MONDIAL RELAY */}
          {modeTransport === "mondial" && (
            <button
              onClick={() => navigate("/choix-relais")}
              style={btnVertStyle}
            >
              Choisir mon Point Relais
            </button>
          )}
        </div>

        {/* OPTION CLICK & COLLECT */}
        <div
          onClick={() => setModeTransport("click")}
          style={modeOptionStyle(modeTransport === "click")}
        >
          <div style={radioHeaderStyle}>
            <span style={bulletStyle}>
              {modeTransport === "click" ? "●" : "○"}
            </span>
            <h3 style={optionTitleStyle}>Click & Collect — Gratuit</h3>
          </div>
          <p style={optionDescStyle}>
            Retrait à notre atelier : La Fabrique du Numérique du 41, Blois.
          </p>

          {/* BOUTON PAIEMENT DIRECT SI CLICK & COLLECT */}
          {modeTransport === "click" && (
            <button onClick={() => navigate("/paiement")} style={btnVertStyle}>
              Accéder au paiement
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

// --- STYLES (Respectant ta teinte de vert) ---
const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "48px",
  marginBottom: "10px",
};
const subtitleStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "16px",
};
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "0 20px",
};
const h2Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "28px",
  marginBottom: "40px",
};

const modeOptionStyle = (isSelected) => ({
  cursor: "pointer",
  padding: "30px",
  borderRadius: "20px",
  border: isSelected ? "2px solid #97af6e" : "1px solid #eee",
  backgroundColor: isSelected ? "#fcfdfa" : "transparent",
  transition: "0.3s",
  marginBottom: "30px",
});

const radioHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "10px",
};
const bulletStyle = { fontSize: "18px", color: "#97af6e" };
const optionTitleStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "20px",
  margin: 0,
  fontWeight: "bold",
};
const optionDescStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "15px",
  marginLeft: "33px",
  color: "#444",
};

// TON BOUTON VERT OLIVE FIGMA
const btnVertStyle = {
  backgroundColor: "#97af6e",
  color: "#000",
  border: "none",
  borderRadius: "20px",
  padding: "12px 30px",
  marginLeft: "33px",
  marginTop: "20px",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 4px rgba(0,0,0,0.15)",
  transition: "transform 0.2s ease",
  display: "block",
};

export default LivraisonRetrait;
