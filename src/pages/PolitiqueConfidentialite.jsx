import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PolitiqueConfidentialite = () => {
  return (
    <div style={pageContainer}>
      {/* SEO */}
      <Helmet>
        <title>Politique de Confidentialité | Caf'Thé</title>
        <meta
          name="description"
          content="Consultez la politique de protection des données personnelles de Caf'Thé."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <Link to="/" style={backLink}>
        ← Retour à l'accueil
      </Link>

      <header style={headerStyle}>
        <h1 style={titleStyle}>Politique de Confidentialité</h1>
        <p style={dateStyle}>Dernière mise à jour : 16 février 2026</p>
      </header>

      <section style={sectionStyle}>
        <p style={introText}>
          Chez <strong>Caf’Thé</strong>, la protection de vos données est une
          priorité. Nous nous engageons à respecter votre vie privée
          conformément au RGPD.
        </p>

        <div style={contentBox}>
          <h2 style={h2Style}>1. Collecte des données</h2>
          <p style={textStyle}>
            Nous collectons les informations que vous nous fournissez lors de la
            création de votre compte (Nom, Prénom, Email) et de la gestion de
            votre profil (Adresse de livraison, Téléphone).
          </p>

          <h2 style={h2Style}>2. Utilisation de vos informations</h2>
          {/* CORRECTION : Utilisation de <div> au lieu de <p> pour contenir une <ul> */}
          <div style={textStyle}>
            Vos données servent uniquement à :
            <ul style={listStyle}>
              <li>Gérer votre compte client.</li>
              <li>Livrer vos commandes à la bonne adresse.</li>
              <li>Vous identifier de manière sécurisée (Token JWT).</li>
            </ul>
          </div>

          <h2 style={h2Style}>3. Sécurité & Stockage</h2>
          {/* CORRECTION : Utilisation de <div> pour éviter les erreurs d'imbrication avec <br /> */}
          <div style={textStyle}>
            <strong>Sécurité :</strong> Votre mot de passe est haché avant
            d'être enregistré. Nous n'y avons jamais accès en clair.
            <br />
            <strong>Local Storage :</strong> Nous utilisons le stockage local de
            votre navigateur pour conserver votre panier pendant votre
            navigation.
          </div>

          <h2 style={h2Style}>4. Vos droits</h2>
          <p style={textStyle}>
            Vous pouvez à tout moment modifier vos données dans l'espace
            <strong> "Mon Compte"</strong> ou demander la suppression de votre
            compte via notre page de contact.
          </p>

          <h2 style={h2Style}>5. Contact</h2>
          <p style={textStyle}>
            Pour toute question, l'équipe de Caf'Thé est à votre disposition à
            Blois ou via le formulaire de contact.
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

const introText = {
  fontSize: "18px",
  textAlign: "center",
  marginBottom: "50px",
  color: "#555",
};

const contentBox = {
  backgroundColor: "#fcfdfa",
  padding: "40px",
  borderRadius: "20px",
  border: "1px solid #f0f0f0",
};

const h2Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "24px",
  color: "#aa8d74",
  marginTop: "30px",
  marginBottom: "15px",
};

const textStyle = {
  fontSize: "16px",
  color: "#333",
  display: "block", // Assure un bon espacement pour les divs
  marginBottom: "15px",
};

const listStyle = {
  marginTop: "10px",
  paddingLeft: "20px",
};

const sectionStyle = {
  marginBottom: "40px",
};

export default PolitiqueConfidentialite;
