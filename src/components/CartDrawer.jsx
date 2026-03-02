import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Components/CartDrawer.css";

const CartDrawer = ({ isOpen, onClose, cartItems, removeItem }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Récupération de l'URL API pour les images
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const total = cartItems.reduce((acc, item) => {
    const prixUnitaire = Number(item.prix_ttc) || Number(item.prix) || 0;
    const quantite = Number(item.quantite) || 0;
    return acc + prixUnitaire * quantite;
  }, 0);

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>

      <div className="drawer-slide">
        <div className="drawer-header">
          <h2 style={{ fontFamily: "Playfair Display", margin: 0 }}>
            Mon Panier
          </h2>
          <button onClick={onClose} className="close-drawer-btn">
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <p className="empty-cart-msg">Votre panier est vide.</p>
          ) : (
            cartItems.map((item) => {
              const prixAffichage =
                Number(item.prix_ttc) || Number(item.prix) || 0;

              // --- LOGIQUE IMAGE AMÉLIORÉE ---
              // Si l'image contient déjà "http", on l'utilise telle quelle.
              // Sinon on construit l'URL avec l'API.
              const imgSource = item.image?.startsWith("http")
                ? item.image
                : `${apiUrl}/images/${item.image || "logo_2.webp"}`;

              return (
                <div key={item.uniqueId} className="drawer-item">
                  <img
                    src={imgSource}
                    alt={item.nom_produit || item.nom}
                    className="drawer-img"
                    onError={(e) => {
                      e.target.src = "/logo_2.webp"; // Image de secours si l'URL API échoue
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 className="drawer-item-title">
                      {item.nom_produit || item.nom}
                    </h4>

                    {/* --- LOGIQUE POIDS SÉCURISÉE --- */}
                    <p className="drawer-subdetail">
                      {item.isSubscription
                        ? item.format || "Abonnement"
                        : item.poids_sachet === 1 ||
                            item.poids_sachet === "1" ||
                            item.format === "vendu à l'unité"
                          ? "vendu à l'unité"
                          : `sachet de ${item.poids_sachet || item.format || "250"}g`}
                    </p>

                    <p className="drawer-item-price">
                      {prixAffichage.toFixed(2)} € x {item.quantite}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem && removeItem(item.uniqueId)}
                    className="btn-delete-item"
                  >
                    🗑️
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total">
              <span>Total :</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate("/panier");
              }}
              className="btn-checkout-drawer"
            >
              VOIR LE PANIER COMPLET
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
