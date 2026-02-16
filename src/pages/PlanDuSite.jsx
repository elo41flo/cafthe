import React from "react";
import { Link } from "react-router-dom";

const PlanDuSite = () => {
  const sections = [
    {
      title: "Navigation Principale",
      links: [
        { name: "Accueil", path: "/" },
        { name: "Boutique", path: "/boutique" },
        { name: "Sélection du moment", path: "/selection" },
        { name: "Notre univers", path: "/univers" },
        { name: "Aide & Contact", path: "/contact" },
      ],
    },
    {
      title: "Espace Client",
      links: [
        { name: "Mon Panier", path: "/panier" },
        { name: "Se connecter", path: "/login" },
        { name: "Créer un compte", path: "/register" },
        { name: "Mon Compte", path: "/moncompte" },
      ],
    },
    {
      title: "Informations Légales",
      links: [
        { name: "Mentions Légales", path: "/mentions-legales" },
        {
          name: "Politique de Confidentialité",
          path: "/politique-de-confidentialite",
        },
        { name: "Conditions Générales de Vente (CGV)", path: "/cgv" },
      ],
    },
  ];

  return (
    <div style={pageContainer}>
      <Link to="/" style={backLink}>
        ← Retour à l'accueil
      </Link>

      <header style={headerStyle}>
        <h1 style={titleStyle}>Plan du Site</h1>
        <p style={subtitleStyle}>
          Retrouvez toutes les pages de votre boutique Caf’Thé en un clic.
        </p>
      </header>

      <div style={gridContainer}>
        {sections.map((section, index) => (
          <div key={index} style={sectionBox}>
            <h2 style={h2Style}>{section.title}</h2>
            <ul style={listStyle}>
              {section.links.map((link, i) => (
                <li key={i} style={listItemStyle}>
                  <Link to={link.path} style={linkItemStyle}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STYLES ---
const pageContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "80px 20px",
  fontFamily: "'Montserrat', sans-serif",
};
const backLink = {
  color: "#97af6e",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
};
const headerStyle = { textAlign: "center", margin: "40px 0 60px 0" };
const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "42px",
  color: "#333",
  marginBottom: "10px",
};
const subtitleStyle = { color: "#666", fontSize: "18px" };
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
};
const sectionBox = {
  backgroundColor: "#fcfdfa",
  padding: "30px",
  borderRadius: "15px",
  border: "1px solid #f0f0f0",
};
const h2Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "22px",
  color: "#aa8d74",
  marginBottom: "20px",
  borderBottom: "2px solid #97af6e",
  paddingBottom: "10px",
};
const listStyle = { listStyle: "none", padding: 0, margin: 0 };
const listItemStyle = { marginBottom: "12px" };
const linkItemStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "16px",
  transition: "0.3s",
  fontWeight: "500",
};

export default PlanDuSite;
