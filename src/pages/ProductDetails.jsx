import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import pour le SEO dynamique

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

          if (found && found.categorie === "Cafe") {
            setFormat("Grain");
          }
        }
      } catch (error) {
        console.error("Erreur détails produit:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduit();
    // On remonte en haut de page quand on change de produit
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
        uniqueId: uniqueId,
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

  if (loading) return <div style={msgStyle}>Chargement de votre pépite...</div>;
  if (!produit)
    return <div style={msgStyle}>Oups ! Ce produit n'existe plus.</div>;

  const stock = Number(produit.stock);

  return (
    <div style={containerStyle}>
      {/* --- SEO DYNAMIQUE : Le nom du produit dans l'onglet --- */}
      <Helmet>
        <title>{produit.nom_produit} | Caf'Thé</title>
        <meta
          name="description"
          content={produit.description?.substring(0, 150)}
        />
      </Helmet>

      <Link to="/boutique" style={backLink}>
        ← Retour à la boutique
      </Link>

      <div style={contentLayout}>
        {/* COLONNE GAUCHE : IMAGE */}
        <div style={imageWrapper}>
          <img
            src={`${apiUrl}/images/${produit.image}`}
            alt={produit.nom_produit}
            style={imageStyle}
          />
          {stock < 5 && stock > 0 && (
            <div style={stockAlert}>Dernières unités disponibles !</div>
          )}
        </div>

        {/* COLONNE DROITE : INFOS & ACHAT */}
        <div style={infoWrapper}>
          <h1 style={titleStyle}>{produit.nom_produit}</h1>

          <div style={priceContainer}>
            <p style={priceStyle}>
              {(
                (Number(produit.prix_ttc) ||
                  Number(produit.prix_unitaire_HT) * 1.2) * quantite
              ).toFixed(2)}{" "}
              €
            </p>
            <span style={tvaMention}>TVA incluse</span>
          </div>

          <p style={stockTextStyle(stock)}>
            {stock > 0
              ? `● En stock (${stock} disponibles)`
              : "○ Rupture de stock temporaire"}
          </p>

          {/* SÉLECTEUR DE FORMAT (POUR LE CAFÉ) */}
          {produit.categorie === "Cafe" && (
            <div style={{ margin: "30px 0" }}>
              <p style={labelStyle}>CHOISIR LE FORMAT :</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {formatsDisponibles.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    style={formatButtonStyle(format === f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SÉLECTEUR DE QUANTITÉ */}
          <div
            style={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <p style={labelStyle}>QUANTITÉ :</p>
            <div style={qtySelector}>
              <button
                onClick={() => setQuantite(Math.max(1, quantite - 1))}
                style={qtyBtn}
              >
                {" "}
                -{" "}
              </button>
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {quantite}
              </span>
              <button
                onClick={() => setQuantite(Math.min(stock, quantite + 1))}
                style={qtyBtn}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>

          {/* BOUTON PANIER */}
          <button
            onClick={handleAddToCart}
            style={stock > 0 ? btnAddToCart : btnDisabled}
            disabled={stock === 0}
          >
            {stock > 0 ? "AJOUTER AU PANIER" : "RUPTURE DE STOCK"}
          </button>

          {/* DESCRIPTION & DÉTAILS */}
          <div style={detailsBox}>
            <h3 style={descTitleStyle}>L'histoire de ce produit</h3>
            <p style={descriptionStyle}>{produit.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "60px 20px",
};
const backLink = {
  display: "block",
  marginBottom: "30px",
  color: "#aa8d74",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "14px",
};
const contentLayout = { display: "flex", gap: "60px", flexWrap: "wrap" };
const imageWrapper = { flex: "1.2", minWidth: "350px", position: "relative" };
const imageStyle = {
  width: "100%",
  borderRadius: "20px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
  objectFit: "cover",
};
const infoWrapper = { flex: "1", minWidth: "350px" };
const titleStyle = {
  fontFamily: "Playfair Display",
  fontSize: "3.2rem",
  color: "#4a3b2c",
  marginBottom: "15px",
  lineHeight: "1.1",
};
const priceContainer = {
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
  marginBottom: "15px",
};
const priceStyle = {
  fontSize: "2.5rem",
  fontWeight: "800",
  color: "#333",
  margin: "0",
};
const tvaMention = {
  fontSize: "12px",
  color: "#888",
  fontFamily: "Montserrat",
};
const labelStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
  fontFamily: "Montserrat",
  fontSize: "13px",
  color: "#888",
  letterSpacing: "1px",
};
const descriptionStyle = {
  lineHeight: "1.8",
  color: "#555",
  fontFamily: "Montserrat",
  fontSize: "15px",
};
const msgStyle = {
  textAlign: "center",
  padding: "150px",
  fontFamily: "Montserrat",
  color: "#aa8d74",
  fontSize: "1.2rem",
};
const detailsBox = {
  marginTop: "50px",
  borderTop: "1px solid #eee",
  paddingTop: "30px",
};
const descTitleStyle = {
  fontFamily: "Playfair Display",
  color: "#aa8d74",
  fontSize: "1.5rem",
  marginBottom: "15px",
};
const stockAlert = {
  position: "absolute",
  top: "20px",
  right: "20px",
  backgroundColor: "#d9534f",
  color: "white",
  padding: "8px 15px",
  borderRadius: "30px",
  fontWeight: "bold",
  fontSize: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
const stockTextStyle = (stock) => ({
  color: stock > 0 ? "#97af6e" : "#d9534f",
  fontWeight: "bold",
  fontSize: "13px",
  marginBottom: "25px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});
const qtySelector = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #eee",
  borderRadius: "30px",
  padding: "8px 20px",
  gap: "20px",
  backgroundColor: "#fafafa",
};
const qtyBtn = {
  background: "none",
  border: "none",
  fontSize: "22px",
  cursor: "pointer",
  color: "#97af6e",
  fontWeight: "bold",
  padding: "0 5px",
};
const formatButtonStyle = (isSelected) => ({
  padding: "12px 25px",
  borderRadius: "30px",
  border: isSelected ? "2px solid #97af6e" : "2px solid #eee",
  backgroundColor: isSelected ? "#97af6e" : "white",
  color: isSelected ? "white" : "#555",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  fontFamily: "Montserrat",
  fontSize: "14px",
});
const btnAddToCart = {
  width: "100%",
  backgroundColor: "#aa8d74",
  color: "white",
  border: "none",
  borderRadius: "40px",
  padding: "20px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "30px",
  boxShadow: "0 10px 20px rgba(170,141,116,0.2)",
  transition: "0.4s",
};
const btnDisabled = {
  ...btnAddToCart,
  backgroundColor: "#ddd",
  cursor: "not-allowed",
  boxShadow: "none",
  color: "#999",
};

export default ProductDetails;
