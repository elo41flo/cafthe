import React, { useState, useEffect } from "react";
import "../styles/Pages/Pepite.css"; // Import du style

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
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const findById = (id) => produits.find((p) => p.numero_produit === id);

  if (loading)
    return (
      <div className="panier-empty-text">Chargement de la sélection...</div>
    );

  return (
    <div className="pepite-page">
      <section className="pepite-header">
        <h1 className="pepite-main-title">Les Pépites de Caf’Thé</h1>
        <p className="pepite-main-subtitle">
          Chaque mois, notre équipe déguste et sélectionne pour <br />
          vous le meilleur de nos arrivages.
        </p>
      </section>

      {/* 101 : Moka d'Ethiopie */}
      <PépiteCard
        titre="Le Coup de Cœur de Julien : Torréfaction"
        sousTitre="Julien a sélectionné ce Moka pour sa finesse légendaire."
        produit={findById(101)}
        labelBtn="Découvrir ce café"
      />

      {/* 201 : Darjeeling FF */}
      <PépiteCard
        titre="La Sélection Thé de Thomas"
        sousTitre="Une immersion printanière dans les jardins de l'Himalaya."
        produit={findById(201)}
        labelBtn="Découvrir ce thé"
      />

      {/* 301 : Moulin Manuel Pro */}
      <PépiteCard
        titre="L’Accessoire Indispensable"
        sousTitre="L'outil qui change tout pour votre rituel matinal."
        produit={findById(301)}
        labelBtn="Découvrir l'accessoire"
      />

      {/* 408 : Energie & Focus */}
      <PépiteCard
        titre="Le Coffret Focus & Productivité"
        sousTitre="Le boost naturel idéal pour vos journées de travail."
        produit={findById(408)}
        labelBtn="Découvrir le coffret"
      />
    </div>
  );
};

const PépiteCard = ({ titre, sousTitre, produit, labelBtn }) => {
  if (!produit) return null;

  return (
    <div className="pepite-card-container fade-in">
      <h2 className="pepite-card-h2">{titre}</h2>
      <p className="pepite-card-desc-intro">{sousTitre}</p>
      <div className="pepite-banner">
        <div style={{ maxWidth: "70%" }}>
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
        <button className="pepite-btn">{labelBtn}</button>
      </div>
    </div>
  );
};

export default Pepite;
