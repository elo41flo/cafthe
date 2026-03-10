import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pages/Legals.css";

const CGV = () => {
  return (
    <div className="legals-container">
      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <header className="legals-header">
        <h1 className="legals-title">Conditions Générales de Vente</h1>
        <p className="legals-date">En vigueur au 16 février 2026</p>
      </header>

      <section className="legals-section fade-in">
        <div className="legals-content-box">
          <h2 className="legals-h2">1. Objet</h2>
          <p className="legals-text">
            Les présentes CGV régissent la vente des produits (café, thé,
            accessoires) proposés sur le site <strong>Caf’Thé</strong> entre
            l'éditeur du site et toute personne physique effectuant un achat.
          </p>

          <h2 className="legals-h2">2. Produits et Prix</h2>
          <p className="legals-text">
            Les produits sont décrits avec la plus grande précision possible.
            Les prix sont indiqués en Euros TTC. Caf'Thé se réserve le droit de
            modifier ses prix à tout moment, mais le produit sera facturé sur la
            base du tarif en vigueur au moment de la validation de la commande.
          </p>

          <h2 className="legals-h2">3. Commande et Paiement</h2>
          <p className="legals-text">
            La commande est ferme dès la validation du panier et du paiement. Le
            règlement s'effectue par les moyens de paiement sécurisés proposés
            sur le site. Une confirmation de commande est envoyée par e-mail.
          </p>

          <h2 className="legals-h2">4. Livraison</h2>
          <p className="legals-text">
            Les produits sont livrés à l'adresse indiquée par le client lors de
            sa commande.
            <strong> La livraison est offerte dès 45€ d'achat.</strong> En
            dessous de ce montant, des frais de port forfaitaires de 4,90€
            s'appliquent.
          </p>

          <h2 className="legals-h2">5. Droit de rétractation</h2>
          <p className="legals-text">
            Conformément à la loi, le client dispose d'un délai de 14 jours pour
            exercer son droit de rétractation. Cependant, ce droit ne s'applique
            pas aux produits périssables (café et thé ouverts ou entamés) pour
            des raisons d'hygiène.
          </p>

          <h2 className="legals-h2">6. Litiges</h2>
          <p className="legals-text">
            En cas de litige, une solution amiable sera recherchée avant toute
            action judiciaire. Les présentes CGV sont soumises à la loi
            française.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CGV;
