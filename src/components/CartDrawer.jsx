// Importations
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Components/CartDrawer.css";

const CartDrawer = ({ isOpen, onClose, cartItems, removeItem }) => {
  const navigate = useNavigate();

  // Si le drawer n'est pas ouvert, on ne retourne rien
  if (!isOpen) return null;

  // Gestion de l'URL API
  // Permet de basculer facilement entre le développement local et la mise en production
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Calcul du montant total du panier
  // Utilisation de .reduce pour additionner (prix * quantité) de chaque article
  const total = cartItems.reduce((acc, item) => {
    const prixUnitaire = Number(item.prix_ttc) || Number(item.prix) || 0;
    const quantite = Number(item.quantite) || 0;
    return acc + prixUnitaire * quantite;
  }, 0);

  return (
    <>
      {/* Le fond noir transparent qui ferme le menu au clic */}
      <div className="drawer-overlay" onClick={onClose}></div>

      <div className="drawer-slide">
        <div className="drawer-header">
          <h2 style={{ fontFamily: "Playfair Display", margin: 0 }}>Mon Panier</h2>
          <button onClick={onClose} className="close-drawer-btn">✕</button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <p className="empty-cart-msg">Votre panier est vide.</p>
          ) : (
            // Rendu de la liste des produits
            cartItems.map((item) => {
              const prixAffichage = Number(item.prix_ttc) || Number(item.prix) || 0;

              // Gère les images stockées sur l'API ou les liens externes
              const imgSource = item.image?.startsWith("http")
                ? item.image
                : `${apiUrl}/images/${item.image || "logo_2.webp"}`;

              return (
                <div key={item.uniqueId} className="drawer-item">
                  <img
                    src={imgSource}
                    alt={item.nom_produit || item.nom}
                    className="drawer-img"
                    // image de secours si l'image est introuvable
                    onError={(e) => { e.target.src = "/logo_2.webp"; }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 className="drawer-item-title">{item.nom_produit || item.nom}</h4>

                    {/* Sachet, Unité ou Abonnement */}
                    <p className="drawer-subdetail">
                      {item.isSubscription
                        ? item.format || "Abonnement"
                        : item.poids_sachet === 1 || item.poids_sachet === "1" || item.format === "vendu à l'unité"
                          ? "vendu à l'unité"
                          : `sachet de ${item.poids_sachet || item.format || "250"}g`}
                    </p>

                    <p className="drawer-item-price">
                      {prixAffichage.toFixed(2)} € x {item.quantite}
                    </p>
                  </div>

                  {/* Suppression d'un article via son identifiant unique */}
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

        {/* Afichage du total et bouton vers la page panier complète */}
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