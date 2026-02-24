import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Pour la navigation dynamique
import "../styles/Pages/Pepite.css";

const Pepite = () => {
  // --- ÉTATS (States) ---
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération de l'URL API depuis les variables d'environnement
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // --- LOGIQUE DE RÉCUPÉRATION ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();

        // On vérifie que la structure reçue correspond bien à ce qu'on attend
        if (data && data.produits) {
          setProduits(data.produits);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des pépites:", error);
      } finally {
        // Qu'il y ait une erreur ou non, on arrête le chargement
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  // --- FONCTION UTILITAIRE ---
  // Cherche un produit spécifique dans le tableau par son ID (numero_produit)
  const findById = (id) => produits.find((p) => p.numero_produit === id);

  // --- AFFICHAGE ÉTAT CHARGEMENT ---
  if (loading) {
    return (
      <div className="pepite-loading">
        <p>Chargement de la sélection des experts...</p>
      </div>
    );
  }

  return (
    <div className="pepite-page">
      {/* Header de la page */}
      <header className="pepite-header">
        <h1 className="pepite-main-title">Les Pépites de Caf’Thé</h1>
        <p className="pepite-main-subtitle">
          Chaque mois, notre équipe déguste et sélectionne pour vous le meilleur
          de nos arrivages.
        </p>
      </header>

      {/* Liste des Pépites mise en avant */}
      <main className="pepite-list">
        <PépiteCard
          titre="Le Coup de Cœur de Julien"
          sousTitre="Julien a sélectionné ce Moka pour sa finesse légendaire et ses notes florales."
          produit={findById(101)}
          labelBtn="Découvrir ce café"
        />

        <PépiteCard
          titre="La Sélection Thé de Thomas"
          sousTitre="Une immersion printanière dans les jardins de l'Himalaya, un thé d'exception."
          produit={findById(201)}
          labelBtn="Découvrir ce thé"
        />

        <PépiteCard
          titre="L’Accessoire du Moment"
          sousTitre="L'outil indispensable pour sublimer vos grains et libérer tous leurs arômes."
          produit={findById(301)}
          labelBtn="Voir l'accessoire"
        />

        <PépiteCard
          titre="Le Coffret Découverte"
          sousTitre="Le boost naturel idéal pour vos journées intenses, sélectionné par Mounia."
          produit={findById(408)}
          labelBtn="Voir le coffret"
        />
      </main>
    </div>
  );
};

/**
 * Sous-composant pour les cartes "Pépites"
 * Utilise la destructuration pour récupérer les props
 */
const PépiteCard = ({ titre, sousTitre, produit, labelBtn }) => {
  // Sécurité : si le produit n'a pas pu être récupéré via l'API, on n'affiche rien
  if (!produit) return null;

  return (
    <article className="pepite-card-container fade-in">
      <div className="pepite-card-header">
        <h2 className="pepite-card-h2">{titre}</h2>
        <p className="pepite-card-desc-intro">{sousTitre}</p>
      </div>

      <div className="pepite-banner">
        <div className="pepite-product-info">
          <h3 className="pepite-product-name">{produit.nom_produit}</h3>

          <p className="pepite-expert-text">
            <strong>L'avis de l'expert :</strong> {produit.description}
          </p>

          {produit.origine && (
            <p className="pepite-expert-text">
              <strong>Origine :</strong> {produit.origine}
            </p>
          )}
        </div>

        {/* Navigation dynamique vers la fiche produit détaillée */}
        <Link to={`/produit/${produit.numero_produit}`} className="pepite-btn">
          {labelBtn}
        </Link>
      </div>
    </article>
  );
};

export default Pepite;
