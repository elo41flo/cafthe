import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/Panier.css"; // Import du style

const Panier = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // URL de l'API pour récupérer les images
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const data = localStorage.getItem("panier");
    if (data) setItems(JSON.parse(data));
  }, []);

  const saveAndSync = (nouveauPanier) => {
    setItems(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
    // Notifier les autres composants (ex: le compteur du Header)
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

  // Calculs financiers
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
    <div className="panier-container">
      <h1 className="panier-main-title">Votre panier Caf’Thé</h1>

      <section className="panier-section fade-in">
        <h2 className="panier-section-title">Récapitulatif des articles</h2>

        <div className="panier-table-header">
          <span style={{ flex: 3 }}>Produit</span>
          <span style={{ flex: 1, textAlign: "center" }}>Prix Unitaire</span>
          <span style={{ flex: 1, textAlign: "center" }}>Quantité</span>
          <span style={{ width: "40px" }}></span>
        </div>

        {items.length === 0 ? (
          <p className="panier-empty-text">Votre panier est vide.</p>
        ) : (
          items.map((item) => (
            <div key={item.uniqueId} className="panier-product-row">
              {/* Zone Produit avec Image et Nom */}
              <div
                style={{
                  flex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <img
                  src={`${apiUrl}/images/${item.image || "default.webp"}`}
                  alt={item.nom}
                  className="panier-item-img"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="panier-product-name">{item.nom}</span>
                  {/* Gestion du format pour éviter le "undefined" */}
                  <span className="panier-format-tag">
                    Format : {item.format ? item.format : "Sachet 250g"}
                  </span>
                </div>
              </div>

              <span style={{ flex: 1, textAlign: "center" }}>
                {Number(item.prix).toFixed(2)}€
              </span>

              <div className="panier-qty-controls">
                <button
                  onClick={() => updateQty(item.uniqueId, -1)}
                  className="panier-qty-btn"
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
                  className="panier-qty-btn"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.uniqueId)}
                className="panier-delete-btn"
                title="Supprimer l'article"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </section>

      {items.length > 0 && (
        <div className="fade-in">
          <section className="panier-section">
            <h2 className="panier-section-title">Détail du Règlement</h2>
            <div className="panier-reglement-box">
              <div className="panier-flex-row">
                <span>Sous-total HT :</span>
                <span>{totalHT.toFixed(2)}€</span>
              </div>
              <div className="panier-flex-row">
                <span>TVA (20%) :</span>
                <span>{tva.toFixed(2)}€</span>
              </div>
              <div className="panier-flex-row">
                <span>Frais de livraison :</span>
                <span
                  style={{
                    color: "var(--color-secondary)",
                    fontWeight: "bold",
                  }}
                >
                  {livraisonOfferte ? "OFFERT" : "4.90€"}
                </span>
              </div>
              <hr
                style={{
                  border: "0",
                  borderTop: "1px solid var(--color-border)",
                  margin: "15px 0",
                }}
              />
              <div className="panier-total-row">
                <span>Total TTC :</span>
                <span>{(totalTTC + fraisPort).toFixed(2)}€</span>
              </div>
            </div>
          </section>

          <button
            onClick={() => navigate("/livraisonretrait")}
            className="panier-btn-final"
          >
            VALIDER MA COMMANDE
          </button>
        </div>
      )}
    </div>
  );
};

export default Panier;
