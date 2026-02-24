import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/Pages/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [format, setFormat] = useState(null);
  const [quantite, setQuantite] = useState(1);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const formatsDisponibles = ["Grain", "Moulu", "Capsule"];

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();
        if (data && data.produits) {
          const found = data.produits.find(
            (p) => p.numero_produit === parseInt(id),
          );
          setProduit(found);
          if (found && found.categorie === "Cafe") setFormat("Grain");
        }
      } catch (error) {
        console.error("Erreur détails produit:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduit();
    window.scrollTo(0, 0);
  }, [id, apiUrl]);

  const handleAddToCart = () => {
    if (!produit) return;
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const isCafe = produit.categorie === "Cafe";
    const uniqueId = isCafe
      ? `${produit.numero_produit}-${format}`
      : `${produit.numero_produit}`;
    const prixUnitaire =
      Number(produit.prix_ttc) || Number(produit.prix_unitaire_HT) * 1.2;

    const existingIndex = panier.findIndex(
      (item) => item.uniqueId === uniqueId,
    );

    if (existingIndex !== -1) {
      panier[existingIndex].quantite += quantite;
    } else {
      panier.push({
        uniqueId,
        id: produit.numero_produit,
        nom: produit.nom_produit,
        image: `${apiUrl}/images/${produit.image}`,
        format: isCafe ? format : null,
        prix: prixUnitaire,
        quantite: quantite,
      });
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
  };

  if (loading)
    return <div className="details-loader">Chargement de votre pépite...</div>;
  if (!produit)
    return (
      <div className="details-error">
        Oups ! Ce produit n'est plus disponible.
      </div>
    );

  const stock = Number(produit.stock);
  const prixCalculé = (
    (Number(produit.prix_ttc) || Number(produit.prix_unitaire_HT) * 1.2) *
    quantite
  ).toFixed(2);

  return (
    <div className="details-container">
      <Helmet>
        <title>{produit.nom_produit} | Caf'Thé</title>
        <meta
          name="description"
          content={produit.description?.substring(0, 150)}
        />
      </Helmet>

      <Link to="/boutique" className="details-back-link">
        ← Retour à la boutique
      </Link>

      <div className="details-layout fade-in">
        {/* COLONNE GAUCHE : IMAGE */}
        <div className="details-image-side">
          <div className="details-image-wrapper">
            <img
              src={`${apiUrl}/images/${produit.image}`}
              alt={produit.nom_produit}
              className="details-image"
            />
            {stock < 5 && stock > 0 && (
              <div className="stock-badge-alert">Dernières unités !</div>
            )}
          </div>
        </div>

        {/* COLONNE DROITE : INFOS */}
        <div className="details-info-side">
          {produit.origine && (
            <span className="details-origin-tag">
              Origine : {produit.origine}
            </span>
          )}

          <h1 className="details-title">{produit.nom_produit}</h1>

          <div className="details-price-row">
            <p className="details-price">{prixCalculé} €</p>
            <span className="details-tva">TVA incluse</span>
          </div>

          <p
            className={`details-stock-status ${stock > 0 ? "in-stock" : "out-of-stock"}`}
          >
            {stock > 0
              ? `● En stock (${stock} disponibles)`
              : "○ Rupture de stock"}
          </p>

          {/* SÉLECTEUR DE FORMAT (CAFÉ UNIQUEMENT) */}
          {produit.categorie === "Cafe" && (
            <div className="details-option-section">
              <p className="details-label">CHOISIR LE FORMAT :</p>
              <div className="format-selector-grid">
                {formatsDisponibles.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`format-choice-btn ${format === f ? "active" : ""}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SÉLECTEUR DE QUANTITÉ */}
          <div className="details-option-section">
            <p className="details-label">QUANTITÉ :</p>
            <div className="details-qty-picker">
              <button
                onClick={() => setQuantite(Math.max(1, quantite - 1))}
                className="qty-btn"
              >
                -
              </button>
              <span className="qty-value">{quantite}</span>
              <button
                onClick={() => setQuantite(Math.min(stock, quantite + 1))}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-add-to-cart-main"
            disabled={stock === 0}
          >
            {stock > 0 ? "AJOUTER AU PANIER" : "BIENTÔT DE RETOUR"}
          </button>

          {/* DESCRIPTION RSE / HISTOIRE */}
          <div className="details-description-box">
            <h3 className="description-box-title">L'histoire de ce produit</h3>
            <p className="description-content">{produit.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
