import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Components/CartDrawer.css"; // Import du style

const CartDrawer = ({ isOpen, onClose, cartItems, removeItem }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

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
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-primary)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                marginTop: "50px",
                color: "var(--color-text-light)",
              }}
            >
              Votre panier est vide.
            </p>
          ) : (
            cartItems.map((item) => {
              const prixAffichage =
                Number(item.prix_ttc) || Number(item.prix) || 0;

              return (
                <div key={item.uniqueId} className="drawer-item">
                  <img
                    src={item.image}
                    alt={item.nom_produit || item.nom}
                    className="drawer-img"
                    onError={(e) => {
                      e.target.src = "/logo_2.webp";
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "14px",
                        color: "var(--color-text)",
                      }}
                    >
                      {item.nom_produit || item.nom}
                    </h4>

                    {item.isSubscription ? (
                      <p className="drawer-subdetail">{item.poids_sachet}</p>
                    ) : (
                      <p className="drawer-subdetail">
                        {item.poids_sachet === 1
                          ? "vendu à l'unité"
                          : `sachet de ${item.poids_sachet}g`}
                      </p>
                    )}

                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "var(--color-text)",
                      }}
                    >
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
