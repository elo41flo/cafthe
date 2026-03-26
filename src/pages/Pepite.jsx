import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Pages/Pepite.css";

// --- CONFIGURATION DES CONTENUS ---
const PEPITES_CONFIG = [
  {
    id: 101,
    label: "Découvrir ce café",
    titre: (
      <>
        Le Coup de Cœur <br /> de Julien
      </>
    ),
    sousTitre:
      "Julien a sélectionné ce Moka pour sa finesse légendaire et ses notes florales.",
  },
  {
    id: 201,
    label: "Découvrir ce thé",
    titre: (
      <>
        La Sélection Thé <br /> de Thomas
      </>
    ),
    sousTitre:
      "Une immersion printanière dans les jardins de l'Himalaya, un thé d'exception.",
  },
  {
    id: 301,
    label: "Voir l'accessoire",
    titre: (
      <>
        L’Accessoire <br /> du Moment
      </>
    ),
    sousTitre:
      "L'outil indispensable pour sublimer vos grains et libérer tous leurs arômes.",
  },
  {
    id: 408,
    label: "Voir le coffret",
    titre: (
      <>
        Le Coffret <br /> Découverte
      </>
    ),
    sousTitre:
      "Le boost naturel idéal pour vos journées intenses, sélectionné par Mounia.",
  },
];

const Pepite = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();
        if (data && data.produits) {
          setProduits(data.produits);
        }
      } catch (error) {
        console.error("Erreur API :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

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

      <main className="pepite-list">
        {PEPITES_CONFIG.map((config) => (
          <PépiteCard
            key={config.id}
            titre={config.titre}
            sousTitre={config.sousTitre}
            produit={findById(config.id)}
            labelBtn={config.label}
          />
        ))}
      </main>
    </div>
  );
};

const PépiteCard = ({ titre, sousTitre, produit, labelBtn }) => {
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
        <Link to={`/produit/${produit.numero_produit}`} className="pepite-btn">
          {labelBtn}
        </Link>
      </div>
    </article>
  );
};

export default Pepite;
