import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Panier = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Chargement initial
  useEffect(() => {
    const data = localStorage.getItem("panier");
    if (data) setItems(JSON.parse(data));
  }, []);

  // Fonction centrale pour mettre à jour le state + localStorage + NavBar
  const saveAndSync = (nouveauPanier) => {
    setItems(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
    // On prévient la NavBar que le nombre d'articles a changé
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const updateQty = (uniqueId, delta) => {
    const nouveauPanier = items.map((item) => {
      if (item.uniqueId === uniqueId) {
        const actuelle = Number(item.quantite);
        return { ...item, quantite: Math.max(1, actuelle + delta) };
      }
      return item;
    });
    saveAndSync(nouveauPanier);
  };

  const removeItem = (uniqueId) => {
    const nouveauPanier = items.filter((item) => item.uniqueId !== uniqueId);
    saveAndSync(nouveauPanier);
  };

  // Calculs financiers sécurisés
  const totalTTC = items.reduce(
    (acc, item) =>
      acc + (Number(item.prix) || 0) * (Number(item.quantite) || 0),
    0,
  );

  const totalHT = totalTTC / 1.2;
  const tva = totalTTC - totalHT;
  const livraisonOfferte = totalTTC >= 45;
  const fraisPort = livraisonOfferte ? 0 : 4.9;

  return (
    <div style={pageContainer}>
      <h1 style={mainTitle}>Votre panier Caf’Thé</h1>

      <section style={{ marginTop: "50px" }}>
        <h2 style={sectionTitle}>Récapitulatif des articles</h2>

        <div style={tableHeader}>
          <span style={{ flex: 3 }}>Produit</span>
          <span style={{ flex: 1, textAlign: "center" }}>Prix Unitaire</span>
          <span style={{ flex: 1, textAlign: "center" }}>Quantité</span>
          <span style={{ width: "40px" }}></span>
        </div>

        {items.length === 0 ? (
          <p style={emptyCartText}>Votre panier est vide.</p>
        ) : (
          items.map((item) => (
            <div key={item.uniqueId} style={productRow}>
              <div style={{ flex: 3 }}>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    display: "block",
                  }}
                >
                  ● {item.nom}
                </span>
                {/* ON N'AFFICHE LE FORMAT QUE S'IL EXISTE */}
                {item.format && (
                  <span style={formatTag}>Format : {item.format}</span>
                )}
              </div>

              <span style={{ flex: 1, textAlign: "center" }}>
                {Number(item.prix).toFixed(2)}€
              </span>

              <div style={qtyControls}>
                <button
                  onClick={() => updateQty(item.uniqueId, -1)}
                  style={qtyBtn}
                >
                  –
                </button>
                <span
                  style={{
                    fontWeight: "bold",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {item.quantite}
                </span>
                <button
                  onClick={() => updateQty(item.uniqueId, 1)}
                  style={qtyBtn}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.uniqueId)}
                style={deleteBtn}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </section>

      {items.length > 0 && (
        <>
          <section style={reglementSection}>
            <h2 style={sectionTitle}>Détail du Règlement</h2>
            <div style={reglementBox}>
              <div style={flexRow}>
                <span>Sous-total HT :</span>
                <span>{totalHT.toFixed(2)}€</span>
              </div>
              <div style={flexRow}>
                <span>TVA (20%) :</span>
                <span>{tva.toFixed(2)}€</span>
              </div>
              <div style={flexRow}>
                <span>Frais de livraison :</span>
                <span style={{ color: "#97af6e", fontWeight: "bold" }}>
                  {livraisonOfferte ? "OFFERT" : "4.90€"}
                </span>
              </div>
              <hr style={separator} />
              <div style={totalRow}>
                <span>Total TTC :</span>
                <span>{(totalTTC + fraisPort).toFixed(2)}€</span>
              </div>
            </div>
          </section>

          <button
            onClick={() => navigate("/livraisonretrait")}
            style={btnFinal}
          >
            VALIDER MA COMMANDE
          </button>
        </>
      )}
    </div>
  );
};

// --- STYLES ---
const pageContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "60px 20px",
  fontFamily: "Montserrat",
};
const mainTitle = {
  fontFamily: "Playfair Display",
  fontSize: "42px",
  textAlign: "center",
  color: "#333",
};
const sectionTitle = {
  fontFamily: "Playfair Display",
  fontSize: "26px",
  marginBottom: "20px",
  borderBottom: "2px solid #97af6e",
  paddingBottom: "10px",
  color: "#aa8d74",
};
const tableHeader = {
  display: "flex",
  color: "#888",
  fontWeight: "bold",
  fontSize: "14px",
  padding: "10px",
  textTransform: "uppercase",
};
const productRow = {
  display: "flex",
  alignItems: "center",
  padding: "20px 10px",
  borderBottom: "1px solid #eee",
};
const formatTag = {
  display: "block",
  fontSize: "13px",
  color: "#97af6e",
  fontStyle: "italic",
  marginTop: "5px",
};
const qtyControls = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};
const qtyBtn = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
  fontSize: "18px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "0.2s",
};
const deleteBtn = {
  width: "40px",
  background: "none",
  border: "none",
  color: "#ccc",
  cursor: "pointer",
  fontSize: "1.2rem",
  transition: "0.3s",
};
const reglementSection = { marginTop: "50px" };
const reglementBox = {
  backgroundColor: "#fcfdfa",
  padding: "30px",
  borderRadius: "15px",
  border: "1px solid #f0f0f0",
  boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
};
const flexRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "15px",
};
const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
  fontSize: "1.4rem",
  color: "#333",
  marginTop: "10px",
};
const separator = {
  border: "0",
  borderTop: "1px solid #eee",
  margin: "15px 0",
};
const btnFinal = {
  width: "100%",
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  borderRadius: "30px",
  padding: "20px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "40px",
  boxShadow: "0 5px 15px rgba(151,175,110,0.3)",
  transition: "0.3s",
};
const emptyCartText = {
  textAlign: "center",
  padding: "50px",
  fontFamily: "Montserrat",
  color: "#888",
};

export default Panier;
