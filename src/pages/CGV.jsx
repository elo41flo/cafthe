import React from "react";
import { Link } from "react-router-dom";

const CGV = () => {
  return (
    <div style={pageContainer}>
      <Link to="/" style={backLink}>
        ← Retour à l'accueil
      </Link>

      <header style={headerStyle}>
        <h1 style={titleStyle}>Conditions Générales de Vente</h1>
        <p style={dateStyle}>En vigueur au 16 février 2026</p>
      </header>

      <section style={sectionStyle}>
        <div style={contentBox}>
          <h2 style={h2Style}>1. Objet</h2>
          <p style={textStyle}>
            Les présentes CGV régissent la vente des produits (café, thé,
            accessoires) proposés sur le site <strong>Caf’Thé</strong> entre
            l'éditeur du site et toute personne physique effectuant un achat.
          </p>

          <h2 style={h2Style}>2. Produits et Prix</h2>
          <p style={textStyle}>
            Les produits sont décrits avec la plus grande précision possible.
            Les prix sont indiqués en Euros TTC. Caf'Thé se réserve le droit de
            modifier ses prix à tout moment, mais le produit sera facturé sur la
            base du tarif en vigueur au moment de la validation de la commande.
          </p>

          <h2 style={h2Style}>3. Commande et Paiement</h2>
          <p style={textStyle}>
            La commande est ferme dès la validation du panier et du paiement. Le
            règlement s'effectue par les moyens de paiement sécurisés proposés
            sur le site. Une confirmation de commande est envoyée par e-mail.
          </p>

          <h2 style={h2Style}>4. Livraison</h2>
          <p style={textStyle}>
            Les produits sont livrés à l'adresse indiquée par le client lors de
            sa commande.
            <strong> La livraison est offerte dès 45€ d'achat.</strong> En
            dessous de ce montant, des frais de port forfaitaires de 4,90€
            s'appliquent.
          </p>

          <h2 style={h2Style}>5. Droit de rétractation</h2>
          <p style={textStyle}>
            Conformément à la loi, le client dispose d'un délai de 14 jours pour
            exercer son droit de rétractation. Cependant, ce droit ne s'applique
            pas aux produits périssables (café et thé ouverts ou entamés) pour
            des raisons d'hygiène.
          </p>

          <h2 style={h2Style}>6. Litiges</h2>
          <p style={textStyle}>
            En cas de litige, une solution amiable sera recherchée avant toute
            action judiciaire. Les présentes CGV sont soumises à la loi
            française.
          </p>
        </div>
      </section>
    </div>
  );
};

// --- STYLES (Identiques aux autres pages légales pour la cohérence) ---
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
const headerStyle = { textAlign: "center", margin: "40px 0 60px 0" };
const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "42px",
  color: "#333",
  marginBottom: "10px",
};
const dateStyle = { color: "#888", fontSize: "14px" };
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
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
};
const textStyle = { fontSize: "16px", color: "#333" };
const sectionStyle = { marginBottom: "40px" };

export default CGV;
