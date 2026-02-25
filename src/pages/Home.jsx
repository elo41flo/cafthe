// Importation
import React, { useEffect, useState } from "react"; // Import des outils de base de React (Hooks)
import { Link } from "react-router-dom"; // Import du composant Link pour naviguer sans recharger la page
import "../styles/Pages/Home.css"; // Import du fichier de style de cette page
import imageAccueil from "/public/image_accueil.webp";

const Home = () => {
  // Etat
  // On déclare une variable d'état pour savoir si l'utilisateur est connecté
  // Par défaut on considère qu'il ne l'est pas
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Logique au chargement
  useEffect(() => {
    // La fonction s'exécute une seule fois quand la page s'affiche
    const user = localStorage.getItem("user"); // On regarde dans le stockage du navigateur s'il y a un utilisateur
    if (user) setIsLoggedIn(true); // Si oui, on passe l'état à "true"
  }, []); // Le tableau vide [] signifie : "ne s'exécute qu'au premier affichage"

  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero-section">
        {/* Ajout d'un overlay pour rendre le texte lisible */}
        <div className="hero-overlay fade-in">
          <h1 className="hero-h1">L'Art de l'éveil, la douceur de l'instant</h1>
          <p className="hero-p">
            Découvrez une sélection unique de cafés de terroirs et de thés
            d’exception, livrés chez vous.
          </p>
          <Link to="/boutique" className="btn-home-main">
            Découvrir notre boutique
          </Link>
        </div>
      </section>

      {/* Engagement */}
      <section className="engagement-section">
        {/* Chaque emoji représente une valeur */}
        <div className="engagement-item">
          <span className="engagement-icon">🌱</span>
          <p>Agriculture Durable</p>
        </div>
        <div className="engagement-item">
          <span className="engagement-icon">♻️</span>
          <p>Emballages Recyclables</p>
        </div>
        <div className="engagement-item">
          <span className="engagement-icon">🚀</span>
          <p>Livraison 48h</p>
        </div>
      </section>

      {/* Section abonnement box */}
      <section className="box-section">
        <div className="box-content">
          {/* Argumentaire de vente */}
          <div className="box-text-side">
            <h2 className="box-title">La Box Caf'Thé</h2>
            <p className="box-desc">
              Chaque mois, un nouveau rituel dans votre boîte aux lettres.
            </p>
            <ul className="box-list">
              <li>
                ✨ <strong>Sur-mesure</strong>
              </li>
              <li>
                🎁 <strong>Surprise</strong>
              </li>
              <li>
                📦 <strong>Liberté</strong>
              </li>
            </ul>
            <Link to="/abonnement" className="btn-home-box">
              Créer ma box
            </Link>
          </div>

          {/* Visuel du produit */}
          <div className="box-image-wrapper">
            <img
              src={imageAccueil} // Utilisation de la variable importée
              alt="Box Caf'Thé"
              className="box-img"
            />
          </div>
        </div>
      </section>

      {/* Pépites */}
      <section className="pepites-section">
        <h2 className="pepites-main-title">Les Pépites de Caf’Thé</h2>
        <div className="pepite-container">
          {/* Ici, on utilise .map() pour boucler sur un tableau d'objets. 
          Ca évite de répéter le même code HTML pour chaque produit.
          */}
          {[
            {
              id: 101,
              nom: "Moka d'Ethiopie",
              desc: "Notes florales de jasmin et de bergamote.",
              auteur: "Le Coup de Cœur de Julien",
            },
            {
              id: 201,
              nom: "Darjeeling FF",
              desc: "Le champagne des thes, leger et tres floral.",
              auteur: "Le Coup de Cœur de Julien",
            },
            {
              id: 301,
              nom: "Moulin Manuel Pro",
              desc: "Meules en ceramique pour une mouture precise.",
              auteur: "La Découverte de Thomas",
            },
            {
              id: 401,
              nom: "L'Eveil du Monde",
              desc: "4 sachets de 100g de cafes d'origine. Decouverte des terroirs.",
              auteur: "La Découverte de Mounia",
            },
          ].map((pepite) => (
            <div className="pepite-item" key={pepite.id}>
              <h3 className="pepite-subtitle">{pepite.auteur}</h3>
              <div className="pepite-card fade-in">
                <div className="pepite-info">
                  <h4 className="pepite-name">{pepite.nom}</h4>
                  <p className="pepite-text">"{pepite.desc}"</p>
                </div>
                {/* Lien vers la fiche produit détaillé des produits */}
                <Link to={`/produit/${pepite.id}`} className="btn-pepite">
                  Découvrir
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
