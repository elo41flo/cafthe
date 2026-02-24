import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pages/PlanDuSite.css"; // Import du nouveau fichier CSS

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
    <div className="sitemap-container">
      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <header className="sitemap-header">
        <h1 className="sitemap-title">Plan du Site</h1>
        <p className="sitemap-subtitle">
          Retrouvez toutes les pages de votre boutique Caf’Thé en un clic.
        </p>
      </header>

      <div className="sitemap-grid">
        {sections.map((section, index) => (
          <div key={index} className="sitemap-section-box fade-in">
            <h2 className="sitemap-h2">{section.title}</h2>
            <ul className="sitemap-list">
              {section.links.map((link, i) => (
                <li key={i} className="sitemap-list-item">
                  <Link to={link.path} className="sitemap-link">
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

export default PlanDuSite;
