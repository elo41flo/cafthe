import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/Panier.css";

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

  /**
   * LOGIQUE DE VALIDATION DU TUNNEL
   * Vérifie si l'utilisateur est connecté avant d'aller plus loin
   */
  const handleValidation = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      // Cas 1 : Connecté -> Direction livraison
      navigate("/livraisonretrait");
    } else {
      // Cas 2 : Non connecté -> Direction Register/Login
      // On passe l'URL de retour en paramètre pour automatiser la redirection après login
      navigate("/login?redirect=livraisonretrait");
    }
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
              <div className="panier-item-info-zone">
                <img
                  src={`${apiUrl}/images/${item.image || "default.webp"}`}
                  alt={item.nom}
                  className="panier-item-img"
                />
                <div className="panier-item-text">
                  <span className="panier-product-name">{item.nom}</span>
                  <span className="panier-format-tag">
                    Format : {item.format || "Sachet 250g"}
                  </span>
                </div>
              </div>

              <span className="panier-unit-price">
                {Number(item.prix).toFixed(2)}€
              </span>

              <div className="panier-qty-controls">
                <button
                  onClick={() => updateQty(item.uniqueId, -1)}
                  className="panier-qty-btn"
                >
                  {" "}
                  –{" "}
                </button>
                <span className="panier-qty-value">{item.quantite}</span>
                <button
                  onClick={() => updateQty(item.uniqueId, 1)}
                  className="panier-qty-btn"
                >
                  {" "}
                  +{" "}
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
                <span className="panier-shipping-cost">
                  {livraisonOfferte ? "OFFERT" : "4.90€"}
                </span>
              </div>
              <hr className="panier-hr" />
              <div className="panier-total-row">
                <span>Total TTC :</span>
                <span>{(totalTTC + fraisPort).toFixed(2)}€</span>
              </div>
            </div>
          </section>

          <button onClick={handleValidation} className="panier-btn-final">
            VALIDER MA COMMANDE
          </button>
        </div>
      )}
    </div>
  );
};

export default Panier;
