import React from "react";
import "../styles/Components/ProductQuickView.css"; // Import des styles

const ProductQuickView = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const imageUrl = `${apiUrl}/images/${product.image}`;

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quickview-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="quickview-content">
          <div className="quickview-image-container">
            <img
              src={imageUrl}
              alt={product.nom_produit}
              className="quickview-img"
            />
          </div>

          <div className="quickview-details">
            <h2 className="quickview-title">{product.nom_produit}</h2>
            <p className="quickview-price">{product.prix_ttc} €</p>
            <p className="quickview-desc">{product.description}</p>

            <button
              className="btn-quickview-add"
              onClick={() => {
                // On prépare l'objet exactement comme le Panier l'attend
                const formattedProduct = {
                  ...product,
                  nom: product.nom_produit, // Important : transformation de la clé
                  prix: product.prix_ttc, // Important : transformation de la clé
                  quantite: 1, // On s'assure qu'il y a une quantité
                  uniqueId: Date.now() + Math.random(), // Identifiant unique pour le panier
                };

                onAddToCart(formattedProduct);
                onClose();
              }}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
