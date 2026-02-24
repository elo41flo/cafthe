import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/Pages/Legals.css"; // On réutilise le style commun

const PolitiqueConfidentialite = () => {
  return (
    <div className="legals-container">
      {/* SEO */}
      <Helmet>
        <title>Politique de Confidentialité | Caf'Thé</title>
        <meta
          name="description"
          content="Consultez la politique de protection des données personnelles de Caf'Thé."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <header className="legals-header">
        <h1 className="legals-title">Politique de Confidentialité</h1>
        <p className="legals-date">Dernière mise à jour : 16 février 2026</p>
      </header>

      <section className="legals-section fade-in">
        <p className="legals-intro-text">
          Chez <strong>Caf’Thé</strong>, la protection de vos données est une
          priorité. Nous nous engageons à respecter votre vie privée
          conformément au RGPD.
        </p>

        <div className="legals-content-box">
          <h2 className="legals-h2">1. Collecte des données</h2>
          <p className="legals-text">
            Nous collectons les informations que vous nous fournissez lors de la
            création de votre compte (Nom, Prénom, Email) et de la gestion de
            votre profil (Adresse de livraison, Téléphone).
          </p>

          <h2 className="legals-h2">2. Utilisation de vos informations</h2>
          <div className="legals-text">
            Vos données servent uniquement à :
            <ul className="legals-list">
              <li>Gérer votre compte client.</li>
              <li>Livrer vos commandes à la bonne adresse.</li>
              <li>Vous identifier de manière sécurisée (Token JWT).</li>
            </ul>
          </div>

          <h2 className="legals-h2">3. Sécurité & Stockage</h2>
          <div className="legals-text">
            <strong>Sécurité :</strong> Votre mot de passe est haché avant
            d'être enregistré. Nous n'y avons jamais accès en clair.
            <br />
            <br />
            <strong>Local Storage :</strong> Nous utilisons le stockage local de
            votre navigateur pour conserver votre panier pendant votre
            navigation.
          </div>

          <h2 className="legals-h2">4. Vos droits</h2>
          <p className="legals-text">
            Vous pouvez à tout moment modifier vos données dans l'espace
            <strong> "Mon Compte"</strong> ou demander la suppression de votre
            compte via notre page de contact.
          </p>

          <h2 className="legals-h2">5. Contact</h2>
          <p className="legals-text">
            Pour toute question, l'équipe de Caf'Thé est à votre disposition à
            Blois ou via le formulaire de contact.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PolitiqueConfidentialite;
