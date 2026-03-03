import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/Panier.css";

const Panier = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const data = localStorage.getItem("panier");
    if (data) {
      try {
        setItems(JSON.parse(data));
      } catch (e) {
        console.error("Erreur lecture panier", e);
        setItems([]);
      }
    }
  }, []);

  const saveAndSync = (nouveauPanier) => {
    setItems(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const updateQty = (uniqueId, delta) => {
    const nouveauPanier = items.map((item) => {
      if (item.uniqueId === uniqueId) {
        const actuelle = parseInt(item.quantite) || 1;
        const nouvelle = actuelle + delta;
        return { ...item, quantite: nouvelle < 1 ? 1 : nouvelle };
      }
      return item;
    });
    saveAndSync(nouveauPanier);
  };

  const removeItem = (uniqueId) => {
    const nouveauPanier = items.filter((item) => item.uniqueId !== uniqueId);
    saveAndSync(nouveauPanier);
  };

  const handleValidation = () => {
    const userData = localStorage.getItem("user");
    // On vérifie l'existence ET la validité du JSON
    const user = userData ? JSON.parse(userData) : null;

    if (user && user.token) {
      navigate("/livraisonretrait");
    } else {
      // Conseil : redirige vers Login, mais assure-toi que ton Login
      // transmet le paramètre au Register si besoin.
      navigate("/login?redirect=livraisonretrait");
    }
  };

  // Calculs avec sécurité (fallback à 0 pour éviter le NaN)
  const totalTTC = items.reduce((acc, item) => {
    const p = parseFloat(item.prix) || 0;
    const q = parseInt(item.quantite) || 0;
    return acc + p * q;
  }, 0);

  const totalHT = totalTTC / 1.2;
  const tva = totalTTC - totalHT;
  const livraisonOfferte = totalTTC >= 45;
  const fraisPort = items.length > 0 && !livraisonOfferte ? 4.9 : 0;

  return (
    <div className="panier-container">
      <h1 className="panier-main-title">Votre panier Caf’Thé</h1>

      <section className="panier-section fade-in">
        <h2 className="panier-section-title">Récapitulatif des articles</h2>

        {items.length === 0 ? (
          <div className="panier-empty-container">
            <p className="panier-empty-text">Votre panier est vide.</p>
            <button
              onClick={() => navigate("/boutique")}
              className="btn-return-shop"
            >
              Retour à la boutique
            </button>
          </div>
        ) : (
          <>
            <div className="panier-table-header">
              <span style={{ flex: 3 }}>Produit</span>
              <span style={{ flex: 1, textAlign: "center" }}>Prix</span>
              <span style={{ flex: 1, textAlign: "center" }}>Qté</span>
              <span style={{ width: "40px" }}></span>
            </div>

            {items.map((item) => (
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
                      {item.format || "Sachet 250g"}
                    </span>
                  </div>
                </div>

                <span className="panier-unit-price">
                  {(parseFloat(item.prix) || 0).toFixed(2)}€
                </span>

                <div className="panier-qty-controls">
                  <button
                    onClick={() => updateQty(item.uniqueId, -1)}
                    className="panier-qty-btn"
                  >
                    –
                  </button>
                  <span className="panier-qty-value">{item.quantite}</span>
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
                >
                  ✕
                </button>
              </div>
            ))}
          </>
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
                  className={`panier-shipping-cost ${livraisonOfferte ? "free" : ""}`}
                >
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
