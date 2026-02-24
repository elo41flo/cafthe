import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pages/Legals.css"; // On réutilise le même fichier de style

const MentionsLegales = () => {
  return (
    <div className="legals-container">
      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <header className="legals-header">
        <h1 className="legals-title">Mentions Légales</h1>
        <p className="legals-date">En vigueur au 16 février 2026</p>
      </header>

      <section className="legals-section fade-in">
        <div className="legals-content-box">
          <h2 className="legals-h2">1. Édition du site</h2>
          <p className="legals-text">
            Le présent site, accessible à l’adresse{" "}
            <strong>www.caf-the-blois.fr</strong>, est édité par :<br />
            <br />
            <strong>Elo</strong>, résidant à Blois (41000).
            <br />
            Étudiant(e) en formation Développeur Web à la Fabrique du Numérique
            du 41.
          </p>

          <h2 className="legals-h2">2. Hébergement</h2>
          <p className="legals-text">
            Le site est hébergé par :<br />
            <br />
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            <br />
            Site web : https://vercel.com
          </p>

          <h2 className="legals-h2">3. Propriété intellectuelle</h2>
          <p className="legals-text">
            L'ensemble de ce site (logo, textes, images, design) relève de la
            législation française et internationale sur le droit d'auteur et la
            propriété intellectuelle.
            <br />
            <br />
            Toute reproduction ou représentation, intégrale ou partielle, du
            site ou de l'un des éléments qui le composent, est interdite sans
            autorisation préalable.
          </p>

          <h2 className="legals-h2">4. Protection des données (RGPD)</h2>
          <p className="legals-text">
            Pour toute information concernant la collecte, le traitement et la
            protection de vos données personnelles, veuillez consulter notre
            <Link
              to="/politique-de-confidentialite"
              className="legals-link-inline"
            >
              {" "}
              Politique de Confidentialité
            </Link>
            .
          </p>

          <h2 className="legals-h2">5. Contact</h2>
          <p className="legals-text">
            Pour toute question ou demande d’information concernant le site,
            vous pouvez nous contacter via la page
            <Link to="/contact" className="legals-link-inline">
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

export default MentionsLegales;
