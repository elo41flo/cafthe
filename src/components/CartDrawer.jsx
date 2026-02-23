import React from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose, cartItems, removeItem }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // --- LOGIQUE DE CALCUL DU TOTAL SÉCURISÉE ---
  const total = cartItems.reduce((acc, item) => {
    const prixUnitaire = Number(item.prix_ttc) || Number(item.prix) || 0;
    const quantite = Number(item.quantite) || 0;
    return acc + prixUnitaire * quantite;
  }, 0);

  return (
    <>
      {/* Fond sombre */}
      <div style={overlayStyle} onClick={onClose}></div>

      {/* Volet coulissant */}
      <div style={drawerStyle}>
        <div style={headerStyle}>
          <h2 style={{ fontFamily: "Playfair Display", margin: 0 }}>
            Mon Panier
          </h2>
          <button onClick={onClose} style={closeBtnStyle}>
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          {cartItems.length === 0 ? (
            <p
              style={{ textAlign: "center", marginTop: "50px", color: "#888" }}
            >
              Votre panier est vide.
            </p>
          ) : (
            cartItems.map((item) => {
              const prixAffichage =
                Number(item.prix_ttc) || Number(item.prix) || 0;

              return (
                <div key={item.uniqueId} style={itemStyle}>
                  {/* IMAGE REDIMENSIONNÉE POUR LOGO ET PRODUITS */}
                  <img
                    src={item.image}
                    alt={item.nom_produit || item.nom}
                    style={imgStyle}
                    onError={(e) => {
                      // Fallback si l'image ne charge pas
                      e.target.src = "/logo_2.webp";
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "14px",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {item.nom_produit || item.nom}
                    </h4>

                    {/* Affichage spécifique pour l'abonnement */}
                    {item.isSubscription ? (
                      <p style={subDetailStyle}>{item.poids_sachet}</p>
                    ) : (
                      <p style={subDetailStyle}>
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
                      }}
                    >
                      {prixAffichage.toFixed(2)} € x {item.quantite}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem && removeItem(item.uniqueId)}
                    style={deleteBtnStyle}
                  >
                    🗑️
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={footerStyle}>
            <div style={totalStyle}>
              <span>Total :</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate("/panier");
              }}
              style={checkoutBtnStyle}
            >
              VOIR LE PANIER COMPLET
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// --- STYLES ---

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 1000,
};

const drawerStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "350px",
  height: "100vh",
  backgroundColor: "#fff",
  zIndex: 1001,
  boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
};

const headerStyle = {
  padding: "20px",
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#aa8d74",
};

const contentStyle = { flex: 1, overflowY: "auto", padding: "20px" };

const itemStyle = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px",
  alignItems: "center",
  borderBottom: "1px solid #f9f9f9",
  paddingBottom: "10px",
};

const imgStyle = {
  width: "65px",
  height: "65px",
  // "contain" affiche l'image entière dans le cadre sans la couper
  objectFit: "contain",
  borderRadius: "8px",
  backgroundColor: "#fff", // Fond blanc pour faire ressortir le logo
  border: "1px solid #f0f0f0",
  padding: "4px", // Petit espacement interne
  display: "block",
};

const subDetailStyle = {
  margin: "0 0 5px 0",
  fontSize: "11px",
  color: "#97af6e",
  fontStyle: "italic",
};

const deleteBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  color: "#ccc",
};

const footerStyle = {
  padding: "20px",
  borderTop: "1px solid #eee",
  backgroundColor: "#fcfaf8",
};

const totalStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
  fontSize: "18px",
  marginBottom: "20px",
  color: "#333",
};

const checkoutBtnStyle = {
  width: "100%",
  padding: "15px",
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  borderRadius: "30px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
};

export default CartDrawer;
