import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  // On initialise à null, on le fixera dans un useEffect
  const [format, setFormat] = useState(null);
  const navigate = useNavigate();

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

          // --- LOGIQUE DE FORMAT PAR DÉFAUT ---
          if (found && found.categorie === "Cafe") {
            setFormat("Grain");
          } else {
            setFormat(null);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduit();
  }, [id, apiUrl]);

  const handleAddToCart = () => {
    if (!produit) return;

    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    // On vérifie si c'est du "Cafe" pour décider du format dans l'ID unique
    const isCafe = produit.categorie === "Cafe";
    const uniqueId = isCafe
      ? `${produit.numero_produit}-${format}`
      : `${produit.numero_produit}`;

    const existingIndex = panier.findIndex(
      (item) => item.uniqueId === uniqueId,
    );

    if (existingIndex !== -1) {
      panier[existingIndex].quantite += 1;
    } else {
      panier.push({
        uniqueId: uniqueId,
        id: produit.numero_produit,
        nom: produit.nom_produit,
        format: isCafe ? format : null, // On ne met pas de format si ce n'est pas du café
        prix:
          Number(produit.prix_ttc) || Number(produit.prix_unitaire_HT) * 1.2,
        quantite: 1,
      });
    }

    // Sauvegarde unique et propre
    localStorage.setItem("panier", JSON.stringify(panier));

    // Signale à la NavBar de mettre à jour le petit badge vert
    window.dispatchEvent(new Event("cartUpdate"));

    // Redirection
    navigate("/panier");
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>Chargement...</div>
    );
  if (!produit)
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        Produit introuvable.
      </div>
    );

  return (
    <div style={containerStyle}>
      <Link to="/boutique" style={backLink}>
        ← Retour à la boutique
      </Link>

      <div style={contentLayout}>
        <div style={imageWrapper}>
          <img
            src={`${apiUrl}/images/${produit.image}`}
            alt={produit.nom_produit}
            style={imageStyle}
          />
        </div>

        <div style={infoWrapper}>
          <h1 style={titleStyle}>{produit.nom_produit}</h1>
          <p style={priceStyle}>
            {(
              Number(produit.prix_ttc) || Number(produit.prix_unitaire_HT) * 1.2
            ).toFixed(2)}{" "}
            €
          </p>

          {/* SÉLECTEUR DE FORMAT - Uniquement pour la catégorie Cafe */}
          {produit.categorie === "Cafe" && (
            <div style={{ margin: "30px 0" }}>
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "15px",
                  fontFamily: "Montserrat",
                }}
              >
                CHOISIR LE FORMAT :
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
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

          <button onClick={handleAddToCart} style={btnAddToCart}>
            AJOUTER AU PANIER
          </button>

          <p style={descriptionStyle}>{produit.description}</p>
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
};
const contentLayout = { display: "flex", gap: "50px", flexWrap: "wrap" };
const imageWrapper = { flex: 1, minWidth: "300px" };
const imageStyle = {
  width: "100%",
  borderRadius: "15px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
};
const infoWrapper = { flex: 1, minWidth: "300px" };
const titleStyle = {
  fontFamily: "Playfair Display",
  fontSize: "3rem",
  color: "#aa8d74",
  marginBottom: "10px",
};
const priceStyle = { fontSize: "2rem", fontWeight: "bold", color: "#333" };
const descriptionStyle = {
  marginTop: "30px",
  lineHeight: "1.6",
  color: "#555",
  fontFamily: "Montserrat",
};

const formatButtonStyle = (isSelected) => ({
  padding: "10px 20px",
  borderRadius: "25px",
  border: isSelected ? "none" : "2px solid #97af6e",
  backgroundColor: isSelected ? "#97af6e" : "transparent",
  color: isSelected ? "white" : "#97af6e",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  fontFamily: "Montserrat",
});

const btnAddToCart = {
  width: "100%",
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  borderRadius: "30px",
  padding: "18px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  boxShadow: "0 5px 15px rgba(151,175,110,0.3)",
};

export default ProductDetails;
