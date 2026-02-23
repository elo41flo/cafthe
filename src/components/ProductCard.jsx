import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ produit, onQuickView }) => {
  const [isQuickViewHovered, setIsQuickViewHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";
  const imageUrl = `${apiUrl}/images/${produit.image}`;
  const stock = Number(produit.stock);

  // --- LOGIQUE DE POIDS ET UNITÉS ---
  const id = Number(produit.numero_produit);
  const nomBas = (produit.nom_produit || "").toLowerCase();

  let poidsTexte = "";
  let poidsValeur = 1;

  // 1. DÉTECTION DU THÉ (100g) : Par ID ou par mot-clé dans le nom
  const estUnThe =
    (id >= 201 && id <= 230) ||
    nomBas.includes("the") ||
    nomBas.includes("earl grey");

  if (estUnThe) {
    poidsTexte = "le sachet de 100g";
    poidsValeur = 100;
  }
  // 2. ACCESSOIRES : Vendu à l'unité
  else if (
    nomBas.includes("coffret") ||
    nomBas.includes("tasse") ||
    nomBas.includes("boite") ||
    nomBas.includes("moulin")
  ) {
    poidsTexte = "vendu à l'unité";
    poidsValeur = 1;
  }
  // 3. PAR DÉFAUT : C'est du CAFÉ (250g)
  else {
    poidsTexte = "le sachet de 250g";
    poidsValeur = 250;
  }

  const handleAddToCart = () => {
    // Sécurité : conversion du prix pour éviter les erreurs de type
    const prixFinal = parseFloat(produit.prix_ttc) || 0;

    const currentCart = JSON.parse(localStorage.getItem("panier")) || [];
    const completeImageUrl = `${apiUrl}/images/${produit.image}`;

    const itemToAdd = {
      ...produit,
      id: produit.numero_produit,
      numero_produit: produit.numero_produit,
      nom: produit.nom_produit,
      prix: prixFinal, // Utilisé pour les calculs totaux
      image: completeImageUrl,
      quantite: 1,
      poids_sachet: poidsValeur,
      quantite_gramme: poidsValeur,
      uniqueId: Date.now() + Math.random(),
    };

    localStorage.setItem("panier", JSON.stringify([...currentCart, itemToAdd]));

    // Déclenchement des événements pour mettre à jour la NavBar et le tiroir
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
  };

  return (
    <div style={cardContainerStyle}>
      {stock === 0 && <div style={badgeStyle}>RUPTURE</div>}

      <div style={imageContainerStyle}>
        <img src={imageUrl} alt={produit.nom_produit} style={imgStyle} />
      </div>

      <div style={contentStyle}>
        <h3 style={titleStyle}>{produit.nom_produit}</h3>

        {stock > 0 && stock < 5 && (
          <p style={lowStockAlertStyle}>⚠️ Plus que {stock} en stock !</p>
        )}

        <p style={descriptionStyle}>
          {produit.description?.substring(0, 80)}...
        </p>

        <div style={footerCardStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={priceStyle}>{produit.prix_ttc} €</p>
            <span style={poidsStyle}>{poidsTexte}</span>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {stock > 0 ? (
              <>
                <button
                  onClick={onQuickView}
                  onMouseEnter={() => setIsQuickViewHovered(true)}
                  onMouseLeave={() => setIsQuickViewHovered(false)}
                  style={{
                    ...iconBtnStyle,
                    backgroundColor: isQuickViewHovered ? "#f0f0f0" : "#ffffff",
                    border: isQuickViewHovered
                      ? "1px solid #97af6e"
                      : "1px solid #ddd",
                  }}
                  title="Aperçu rapide"
                >
                  👁️
                </button>

                <button
                  onClick={handleAddToCart}
                  onMouseEnter={() => setIsCartHovered(true)}
                  onMouseLeave={() => setIsCartHovered(false)}
                  style={{
                    ...iconBtnStyle,
                    backgroundColor: isCartHovered ? "#f0f0f0" : "#ffffff",
                    border: isCartHovered
                      ? "1px solid #97af6e"
                      : "1px solid #ddd",
                  }}
                  title="Ajouter au panier"
                >
                  🛒
                </button>

                <Link
                  to={`/produit/${produit.numero_produit}`}
                  style={btnStyle}
                >
                  Détails
                </Link>
              </>
            ) : (
              <span style={btnDisabledStyle}>Indisponible</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const cardContainerStyle = {
  width: "300px",
  border: "1px solid #ddd",
  borderRadius: "15px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#aa8d74",
  color: "black",
  position: "relative",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};
const imageContainerStyle = {
  width: "300px",
  height: "200px",
  overflow: "hidden",
  backgroundColor: "#eee",
};
const imgStyle = {
  width: "300px",
  height: "200px",
  objectFit: "cover",
  display: "block",
};
const contentStyle = {
  padding: "20px",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
};
const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "22px",
  fontWeight: 600,
  margin: "0 0 10px 0",
};
const descriptionStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "14px",
  color: "#f5f5f5",
  lineHeight: "1.4",
  marginBottom: "15px",
};
const lowStockAlertStyle = {
  fontWeight: "bold",
  fontSize: "0.9rem",
  margin: "0 0 10px 0",
  color: "#ffee00",
  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
};
const footerCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
};
const priceStyle = { fontWeight: "bold", fontSize: "1.2rem", margin: 0 };
const poidsStyle = {
  fontSize: "0.75rem",
  color: "#f0f0f0",
  marginTop: "2px",
  fontStyle: "italic",
};
const btnStyle = {
  padding: "8px 18px",
  backgroundColor: "#97af6e",
  color: "white",
  textDecoration: "none",
  borderRadius: "25px",
  fontWeight: "bold",
  fontSize: "0.9rem",
};
const iconBtnStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "18px",
  transition: "all 0.2s ease",
  padding: 0,
};
const btnDisabledStyle = {
  padding: "8px 18px",
  backgroundColor: "#666",
  color: "#ccc",
  borderRadius: "25px",
  fontWeight: "bold",
  fontSize: "0.9rem",
};
const badgeStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#d9534f",
  color: "white",
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: "bold",
  zIndex: 10,
};

export default ProductCard;
