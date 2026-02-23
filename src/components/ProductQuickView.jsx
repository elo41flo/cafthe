import React from "react";

const ProductQuickView = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  // On récupère l'URL de l'API comme dans ton ProductCard
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const imageUrl = `${apiUrl}/images/${product.image}`;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose}>
          ×
        </button>

        <div style={contentStyle}>
          <div style={imageContainer}>
            {/* Utilisation de imageUrl corrigée */}
            <img src={imageUrl} alt={product.nom_produit} style={imgStyle} />
          </div>

          <div style={detailsStyle}>
            {/* Utilisation de nom_produit */}
            <h2 style={titleStyle}>{product.nom_produit}</h2>
            {/* Utilisation de prix_ttc */}
            <p style={priceStyle}>{product.prix_ttc} €</p>
            {/* Utilisation de la description de ta base */}
            <p style={descStyle}>{product.description}</p>

            <button
              style={addBtnStyle}
              onClick={() => {
                onAddToCart(product);
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

// Styles (identiques au précédent pour garder la structure)
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modalStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "15px",
  maxWidth: "800px",
  width: "90%",
  position: "relative",
  fontFamily: "Montserrat",
};
const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "15px",
  fontSize: "30px",
  border: "none",
  background: "none",
  cursor: "pointer",
};
const contentStyle = { display: "flex", gap: "30px", flexWrap: "wrap" };
const imageContainer = { flex: "1", minWidth: "250px" };
const imgStyle = { width: "100%", borderRadius: "10px", objectFit: "cover" };
const detailsStyle = {
  flex: "1.5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
const titleStyle = {
  fontFamily: "Playfair Display",
  fontSize: "28px",
  color: "#4a3b2c",
  marginBottom: "10px",
};
const priceStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#97af6e",
  margin: "15px 0",
};
const descStyle = { lineHeight: "1.6", color: "#666", fontSize: "15px" };
const addBtnStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "20px",
};

export default ProductQuickView;
