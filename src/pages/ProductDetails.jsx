// Importations
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/Pages/ProductDetails.css";

const ProductDetails = () => {
  // Je récupère l'ID du produit directement depuis l'URL
  const { id } = useParams();

  // Mes états pour gérer les données, le chargement et les options choisies
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [format, setFormat] = useState(null);
  const [quantite, setQuantite] = useState(1);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const formatsDisponibles = ["Grain", "Moulu", "Capsule"];

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        // Je récupère la liste des produits pour trouver celui qui correspond à l'ID
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();
        if (data && data.produits) {
          const found = data.produits.find(
            (p) => p.numero_produit === parseInt(id),
          );
          setProduit(found);
          // Si c'est du café, je sélectionne "Grain" par défaut
          if (found && found.categorie === "Cafe") setFormat("Grain");
        }
      } catch (error) {
        console.error("Erreur détails produit:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduit();
    // Remonte automatiquement en haut de page lors de l'affichage
    window.scrollTo(0, 0);
  }, [id, apiUrl]);

  // Fonction pour ajouter le produit configuré dans le localStorage
  const handleAddToCart = () => {
    if (!produit) return;
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const isCafe = produit.categorie === "Cafe";

    // On définit 100g pour le thé et 250g pour le café
    const productId = Number(produit.numero_produit);
    const estUnThe =
      (productId >= 201 && productId <= 230) ||
      (produit.nom_produit || "").toLowerCase().includes("the");
    const poidsValeur = estUnThe ? 100 : 250;

    // Je crée un ID unique qui combine l'ID et le format (ex: 101-Grain)
    // Cela permet d'avoir deux fois le même café mais dans des formats différents dans le panier
    const uniqueId = isCafe
      ? `${produit.numero_produit}-${format}`
      : `${produit.numero_produit}`;

    // Calcul du prix unitaire TTC
    const prixUnitaire =
      Number(produit.prix_ttc) || Number(produit.prix_unitaire_HT) * 1.2;

    const existingIndex = panier.findIndex(
      (item) => item.uniqueId === uniqueId,
    );

    if (existingIndex !== -1) {
      // Si le produit exact existe déjà, on augmente simplement la quantité
      panier[existingIndex].quantite += quantite;
    } else {
      // Sinon, on ajoute un nouvel objet "article" au tableau
      panier.push({
        uniqueId,
        id: produit.numero_produit,
        nom: produit.nom_produit,
        image: produit.image,
        format: isCafe ? format : null,
        poids_sachet: poidsValeur,
        prix: prixUnitaire,
        quantite: quantite,
      });
    }

    // Sauvegarde et notification pour mettre à jour les composants Header/Drawer
    localStorage.setItem("panier", JSON.stringify(panier));
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
  };

  // Affichage pendant le chargement des données
  if (loading)
    return <div className="details-loader">Chargement de votre pépite...</div>;

  // Sécurité si le produit n'existe pas en base
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
        <div className="details-image-side">
          <div className="details-image-wrapper">
            <img
              src={`${apiUrl}/images/${produit.image}`}
              alt={produit.nom_produit}
              className="details-image"
            />
            {/* Alerte visuelle pour créer un sentiment d'urgence si le stock est bas */}
            {stock < 5 && stock > 0 && (
              <div className="stock-badge-alert">Dernières unités !</div>
            )}
          </div>
        </div>

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

          {/* Indicateur de stock dynamique */}
          <p
            className={`details-stock-status ${stock > 0 ? "in-stock" : "out-of-stock"}`}
          >
            {stock > 0
              ? `● En stock (${stock} disponibles)`
              : "○ Rupture de stock"}
          </p>

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

          {/* Bouton d'action principal, désactivé si le stock est à zéro */}
          <button
            onClick={handleAddToCart}
            className="btn-add-to-cart-main"
            disabled={stock === 0}
          >
            {stock > 0 ? "AJOUTER AU PANIER" : "BIENTÔT DE RETOUR"}
          </button>

          {/* Section Histoire/RSE pour valoriser le produit */}
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
