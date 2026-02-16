import React from "react";
import { useNavigate } from "react-router-dom";

const Panier = () => {
  const navigate = useNavigate();

  // Pour l'instant on simule un panier, plus tard ce sera via ton Context ou LocalStorage
  const panierSimule = [
    { id: 101, nom: "Moka d'Ethiopie", prix: 12.5, quantite: 2 },
    { id: 408, nom: "Coffret Focus", prix: 35.0, quantite: 1 },
  ];

  const total = panierSimule.reduce(
    (acc, item) => acc + item.prix * item.quantite,
    0,
  );

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "80px 20px",
      }}
    >
      <h1 style={titleStyle}>Votre Panier</h1>

      <div style={containerStyle}>
        {/* LISTE DES PRODUITS */}
        <div style={listContainer}>
          {panierSimule.map((item) => (
            <div key={item.id} style={itemCardStyle}>
              <div style={{ flex: 2 }}>
                <h3 style={productNameStyle}>{item.nom}</h3>
                <p style={priceStyle}>{item.prix.toFixed(2)}€ / unité</p>
              </div>
              <div style={qtyControls}>
                <button style={qtyBtn}>-</button>
                <span style={{ margin: "0 15px", fontWeight: "bold" }}>
                  {item.quantite}
                </span>
                <button style={qtyBtn}>+</button>
              </div>
              <p style={subtotalStyle}>
                {(item.prix * item.quantite).toFixed(2)}€
              </p>
            </div>
          ))}
        </div>

        {/* RÉCAPITULATIF COMMANDE */}
        <div style={summaryCard}>
          <h2 style={{ fontFamily: "Playfair Display", fontSize: "24px" }}>
            Résumé
          </h2>
          <hr style={{ border: "0.5px solid #eee", margin: "20px 0" }} />
          <div style={flexRow}>
            <span>Sous-total</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <div style={flexRow}>
            <span>Livraison</span>
            <span style={{ color: "#97af6e" }}>
              Calculée à l'étape suivante
            </span>
          </div>
          <div
            style={{
              ...flexRow,
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            <span>Total</span>
            <span>{total.toFixed(2)}€</span>
          </div>

          <button onClick={() => navigate("/livraison")} style={btnVertStyle}>
            Passer à la livraison
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const titleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "42px",
  textAlign: "center",
  marginBottom: "50px",
};
const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "flex",
  gap: "50px",
  flexWrap: "wrap",
};
const listContainer = { flex: 2, minWidth: "300px" };
const summaryCard = {
  flex: 1,
  minWidth: "300px",
  padding: "30px",
  border: "1px solid #eee",
  borderRadius: "20px",
  height: "fit-content",
};

const itemCardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "20px 0",
  borderBottom: "1px solid #eee",
};
const productNameStyle = {
  fontFamily: "Montserrat",
  fontSize: "18px",
  fontWeight: "bold",
  margin: 0,
};
const priceStyle = {
  fontFamily: "Montserrat",
  color: "#666",
  fontSize: "14px",
};
const subtotalStyle = {
  flex: 1,
  textAlign: "right",
  fontWeight: "bold",
  fontFamily: "Montserrat",
};

const qtyControls = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  padding: "5px 15px",
  borderRadius: "15px",
};
const qtyBtn = {
  border: "none",
  background: "none",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};

const flexRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontFamily: "Montserrat",
};

const btnVertStyle = {
  backgroundColor: "#97af6e",
  color: "#000",
  border: "none",
  borderRadius: "25px",
  padding: "15px",
  width: "100%",
  marginTop: "30px",
  fontWeight: "bold",
  cursor: "pointer",
  fontFamily: "Montserrat",
  boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
};

export default Panier;
