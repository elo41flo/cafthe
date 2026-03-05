import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pages/PlanDuSite.css";

const PlanDuSite = () => {
  return (
    <div className="sitemap-container">
      <h1 className="sitemap-main-title">Plan du site</h1>
      <p className="sitemap-intro">
        Retrouvez ici l'ensemble des rubriques de la boutique Caf’Thé.
      </p>

      <div className="sitemap-grid">
        {/* SECTION 1 : LA BOUTIQUE */}
        <section className="sitemap-section">
          <h2 className="sitemap-h2">Notre Boutique</h2>
          <ul className="sitemap-list">
            <li>
              <Link to="/boutique">Tous nos produits</Link>
            </li>
            <li>
              <Link to="/boutique?categorie=café">Cafés de Terroirs</Link>
            </li>
            <li>
              <Link to="/boutique?categorie=thé">Thés d'Exception</Link>
            </li>
            <li>
              <Link to="/pepite">La Pépite du moment</Link>
            </li>
          </ul>
        </section>

        {/* SECTION 2 : VOTRE ESPACE */}
        <section className="sitemap-section">
          <h2 className="sitemap-h2">Votre Espace</h2>
          <ul className="sitemap-list">
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/register">Création de compte</Link>
            </li>
            <li>
              <Link to="/panier">Mon Panier</Link>
            </li>
            <li>
              <Link to="/mon-compte">Mes Commandes</Link>
            </li>
          </ul>
        </section>

        {/* SECTION 3 : L'UNIVERS CAF'THÉ */}
        <section className="sitemap-section">
          <h2 className="sitemap-h2">L'Univers Caf'Thé</h2>
          <ul className="sitemap-list">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/">Pepite</Link>
            </li>
            <li>
              <Link to="/univers">Notre Univers</Link>
            </li>
            <li>
              <Link to="/aide-contact">Mon compte</Link>
            </li>
            <li>
              <Link to="/aide-contact">Aide & Contact</Link>
            </li>
          </ul>
        </section>

        {/* SECTION 4 : INFORMATIONS LÉGALES */}
        <section className="sitemap-section">
          <h2 className="sitemap-h2">Informations Légales</h2>
          <ul className="sitemap-list">
            <li>
              <Link to="/mentions-legales">Mentions Légales</Link>
            </li>
            <li>
              <Link to="/cgv">Conditions Générales de Vente</Link>
            </li>
            <li>
              <Link to="/politique-de-confidentialite">
                Politique de Confidentialité
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PlanDuSite;
