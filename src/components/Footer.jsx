import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "40px 60px",
        backgroundColor: "white",
        borderTop: "1px solid #eee",
        marginTop: "auto",
      }}
    >
      {/* LOGO À GAUCHE */}
      <div style={{ flex: 1 }}>
        <img
          src="/src/assets/logo.webp"
          alt="Caf'Thé Logo"
          style={{ height: "100px", objectFit: "contain" }}
        />
      </div>

      {/* LIENS AU CENTRE / DROITE */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "16px",
        }}
      >
        <Link to="/MentionsLegales" style={linkStyle}>
          Mentions légales
        </Link>
        <Link to="/cgv" style={linkStyle}>
          CGV
        </Link>
        <Link to="/Politiqueconfidentialite" style={linkStyle}>
          Politique de confidentialité
        </Link>
        <Link to="/PlanDuSite" style={linkStyle}>
          Plan du site
        </Link>
      </div>

      {/* COPYRIGHT DISCRET (Optionnel, en dessous ou à part) */}
      {/* <p style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', fontSize: '12px' }}>
                {new Date().getFullYear()} Cafthé - Tous droits réservés
            </p> */}
    </footer>
  );
};

// Style pour les liens soulignés comme sur la maquette
const linkStyle = {
  textDecoration: "underline",
  color: "#000",
  fontWeight: "400",
};

export default Footer;
