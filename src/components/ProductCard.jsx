import React from "react";
import { Link } from "react-router-dom";
import "../styles/Components/ProductCard.css"; // Importation des nouveaux styles

const ProductCard = ({ produit, onQuickView }) => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";
  const imageUrl = `${apiUrl}/images/${produit.image}`;
  const stock = Number(produit.stock);

  // --- LOGIQUE DE POIDS ---
  const id = Number(produit.numero_produit);
  const nomBas = (produit.nom_produit || "").toLowerCase();
  let poidsTexte = "";
  let poidsValeur = 1;

  const estUnThe =
    (id >= 201 && id <= 230) ||
    nomBas.includes("the") ||
    nomBas.includes("earl grey");

  if (estUnThe) {
    poidsTexte = "le sachet de 100g";
    poidsValeur = 100;
  } else if (
    nomBas.includes("coffret") ||
    nomBas.includes("tasse") ||
    nomBas.includes("boite") ||
    nomBas.includes("moulin")
  ) {
    poidsTexte = "vendu à l'unité";
    poidsValeur = 1;
  } else {
    poidsTexte = "le sachet de 250g";
    poidsValeur = 250;
  }

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("panier")) || [];

    const itemToAdd = {
      ...produit,
      id: produit.numero_produit,
      nom: produit.nom_produit,
      prix: parseFloat(produit.prix_ttc) || 0,
      image: produit.image, // Juste le nom du fichier
      quantite: 1,
      // ON UTILISE CETTE CLÉ UNIQUE :
      poids_sachet: poidsValeur,
      uniqueId: Date.now() + Math.random(),
    };

    localStorage.setItem("panier", JSON.stringify([...currentCart, itemToAdd]));
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
  };

  return (
    <div className="product-card">
      {stock === 0 && <div className="product-card-badge">RUPTURE</div>}

      <div className="product-image-container">
        <img
          src={imageUrl}
          alt={produit.nom_produit}
          className="product-image"
        />
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title">{produit.nom_produit}</h3>

        {stock > 0 && stock < 5 && (
          <p className="product-stock-alert">⚠️ Plus que {stock} en stock !</p>
        )}

        <p className="product-card-description">
          {produit.description?.substring(0, 80)}...
        </p>

        <div className="product-card-footer">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="product-card-price">{produit.prix_ttc} €</p>
            <span className="product-card-weight">{poidsTexte}</span>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {stock > 0 ? (
              <>
                <button
                  onClick={onQuickView}
                  className="product-icon-btn"
                  title="Aperçu rapide"
                >
                  👁️
                </button>

                <button
                  onClick={handleAddToCart}
                  className="product-icon-btn"
                  title="Ajouter au panier"
                >
                  🛒
                </button>

                <Link
                  to={`/produit/${produit.numero_produit}`}
                  className="product-btn-details"
                >
                  Détails
                </Link>
              </>
            ) : (
              <span className="product-btn-disabled">Indisponible</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
