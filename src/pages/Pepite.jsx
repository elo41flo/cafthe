// Importations
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Pages/Pepite.css";

const Pepite = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération de l'URL API depuis les variables d'environnement
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // LOGIQUE DE RÉCUPÉRATION
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

  // Cherche un produit spécifique dans le tableau par son ID
  const findById = (id) => produits.find((p) => p.numero_produit === id);

  if (loading) {
    return (
      <div className="pepite-loading">
        <p>Chargement de la sélection des experts...</p>
      </div>
    );
  }

  return (
    <div className="pepite-page">
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
          titre="Le Coup de Cœur de Julien <br />"
          sousTitre="Julien a sélectionné ce Moka pour sa finesse légendaire et ses notes florales. </ br>"
          produit={findById(101)}
          labelBtn="Découvrir ce café"
        />
        <br />
        <PépiteCard
          titre="La Sélection Thé de Thomas <br />"
          sousTitre="Une immersion printanière dans les jardins de l'Himalaya, un thé d'exception. </ br>"
          produit={findById(201)}
          labelBtn="Découvrir ce thé"
        />
        <br />
        <PépiteCard
          titre="L’Accessoire du Moment <br />"
          sousTitre="L'outil indispensable pour sublimer vos grains et libérer tous leurs arômes. <br />"
          produit={findById(301)}
          labelBtn="Voir l'accessoire"
        />
        <br />
        <PépiteCard
          titre="Le Coffret Découverte <br />"
          sousTitre="Le boost naturel idéal pour vos journées intenses, sélectionné par Mounia. <br />"
          produit={findById(408)}
          labelBtn="Voir le coffret"
        />
      </main>
    </div>
  );
};

const PépiteCard = ({ titre, sousTitre, produit, labelBtn }) => {
  // Si le produit n'a pas pu être récupéré via l'API, on n'affiche rien
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
