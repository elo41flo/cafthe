// IMPORTATIONS
import React, { useEffect, useState } from "react"; // Import des outils de base de React (Hooks)
import { Link } from "react-router-dom"; // Import du composant Link pour naviguer sans recharger la page
import "../styles/Pages/Home.css"; // Import du fichier de style de cette page

const Home = () => {
  // ÉTAT (STATE)
  // Déclaration d'une variable d'état pour savoir si l'utilisateur est connecté
  // Par défaut, on considère qu'il ne l'est pas (false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 3. LOGIQUE AU CHARGEMENT (SIDE EFFECT)
  useEffect(() => {
    // Cette fonction s'exécute une seule fois quand la page s'affiche
    const user = localStorage.getItem("user"); // On regarde dans le stockage du navigateur s'il y a un utilisateur
    if (user) setIsLoggedIn(true); // Si oui, on passe l'état à "true"
  }, []); // Le tableau vide [] signifie : "ne s'exécute qu'au premier affichage"

  return (
    <div className="home-container">
      {/* 4. SECTION HERO (En-tête visuel) */}
      <section className="hero-section">
        {/* Un overlay est une couche (souvent sombre) par-dessus l'image pour rendre le texte lisible */}
        <div className="hero-overlay fade-in">
          <h1 className="hero-h1">L'Art de l'éveil, la douceur de l'instant</h1>
          <p className="hero-p">
            Découvrez une sélection unique de cafés de terroirs et de thés
            d’exception, livrés chez vous.
          </p>
          {/* Link remplace la balise <a> pour une navigation fluide (SPA) */}
          <Link to="/boutique" className="btn-home-main">
            Découvrir notre boutique
          </Link>
        </div>
      </section>

      {/* 5. SECTION ENGAGEMENTS (Réassurance client) */}
      <section className="engagement-section">
        {/* Chaque item représente une valeur forte de la marque avec un emoji en guise d'icône */}
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

      {/* 6. SECTION BOX (Produit phare) */}
      <section className="box-section">
        <div className="box-content">
          {/* Côté texte : Argumentaire de vente */}
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

          {/* Côté image : Visuel du produit */}
          <div className="box-image-wrapper">
            <img
              src="/src/assets/image_accueil.webp" // Chemin vers ton image (format webp optimisé pour le web)
              alt="Box Caf'Thé" // Texte alternatif pour l'accessibilité (lecteurs d'écran)
              className="box-img"
            />
          </div>
        </div>
      </section>

      {/* 7. SECTION PÉPITES (Recommandations/Favoris) */}
      <section className="pepites-section">
        <h2 className="pepites-main-title">Les Pépites de Caf’Thé</h2>
        <div className="pepite-container">
          {/* Ici, on utilise .map() pour boucler sur un tableau d'objets. 
          Cela évite de répéter le même code HTML pour chaque produit.
          */}
          {[
            {
              id: 201,
              nom: "Himalaya Népal",
              desc: "Un café d'altitude exceptionnel aux notes florales.",
              auteur: "Le Coup de Cœur de Julien",
            },
            {
              id: 301,
              nom: "Thé Noir d'Assam",
              desc: "Un thé puissant et malté, idéal pour le petit-déjeuner.",
              auteur: "La Découverte de Thomas",
            },
          ].map((pepite) => (
            // La "key" est obligatoire dans un .map() pour que React puisse identifier chaque élément
            <div className="pepite-item" key={pepite.id}>
              <h3 className="pepite-subtitle">{pepite.auteur}</h3>
              <div className="pepite-card fade-in">
                <div className="pepite-info">
                  <h4 className="pepite-name">{pepite.nom}</h4>
                  <p className="pepite-text">"{pepite.desc}"</p>
                </div>
                <Link to="/boutique" className="btn-pepite">
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

export default Home; // On exporte le composant pour l'utiliser dans App.js
