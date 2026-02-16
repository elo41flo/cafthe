import React from "react";
import { Link } from "react-router-dom";

const MentionsLegales = () => {
  return (
    <div style={pageContainer}>
      <Link to="/" style={backLink}>
        ← Retour à l'accueil
      </Link>

      <header style={headerStyle}>
        <h1 style={titleStyle}>Mentions Légales</h1>
        <p style={dateStyle}>En vigueur au 16 février 2026</p>
      </header>

      <section style={sectionStyle}>
        <div style={contentBox}>
          <h2 style={h2Style}>1. Édition du site</h2>
          <p style={textStyle}>
            Le présent site, accessible à l’adresse{" "}
            <strong>www.caf-the-blois.fr</strong>, est édité par :<br />
            <br />
            <strong>Elo</strong>, résidant à Blois (41000).
            <br />
            Étudiant(e) en formation Développeur Web à la Fabrique du Numérique
            du 41.
          </p>

          <h2 style={h2Style}>2. Hébergement</h2>
          <p style={textStyle}>
            Le site est hébergé par :<br />
            <br />
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            <br />
            Site web : https://vercel.com
          </p>

          <h2 style={h2Style}>3. Propriété intellectuelle</h2>
          <p style={textStyle}>
            L'ensemble de ce site (logo, textes, images, design) relève de la
            législation française et internationale sur le droit d'auteur et la
            propriété intellectuelle.
            <br />
            <br />
            Toute reproduction ou représentation, intégrale ou partielle, du
            site ou de l'un des éléments qui le composent, est interdite sans
            autorisation préalable.
          </p>

          <h2 style={h2Style}>4. Protection des données (RGPD)</h2>
          <p style={textStyle}>
            Pour toute information concernant la collecte, le traitement et la
            protection de vos données personnelles, veuillez consulter notre
            <Link to="/politique-de-confidentialite" style={linkInline}>
              {" "}
              Politique de Confidentialité
            </Link>
            .
          </p>

          <h2 style={h2Style}>5. Contact</h2>
          <p style={textStyle}>
            Pour toute question ou demande d’information concernant le site,
            vous pouvez nous contacter via la page
            <Link to="/contact" style={linkInline}>
              {" "}
              Aide & Contact
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

// --- STYLES ---
const pageContainer = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "80px 20px",
  fontFamily: "'Montserrat', sans-serif",
  lineHeight: "1.6",
};

const backLink = {
  color: "#97af6e",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
};

const headerStyle = {
  textAlign: "center",
  margin: "40px 0 60px 0",
};

const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "42px",
  color: "#333",
  marginBottom: "10px",
};

const dateStyle = {
  color: "#888",
  fontSize: "14px",
};

const contentBox = {
  backgroundColor: "#fcfdfa",
  padding: "40px",
  borderRadius: "20px",
  border: "1px solid #f0f0f0",
  boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
};

const h2Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "24px",
  color: "#aa8d74",
  marginTop: "30px",
  marginBottom: "15px",
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
};

const textStyle = {
  fontSize: "16px",
  color: "#333",
};

const linkInline = {
  color: "#97af6e",
  fontWeight: "bold",
  textDecoration: "none",
};

const sectionStyle = {
  marginBottom: "40px",
};

export default MentionsLegales;
