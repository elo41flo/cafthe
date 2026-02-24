import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import "../styles/Pages/Paiement.css"; // Import du style

const Paiement = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const cartItems = JSON.parse(localStorage.getItem("panier")) || [];
  const relais = JSON.parse(localStorage.getItem("relais_selected"));
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // --- LOGIQUE DE CALCUL ---
  const sousTotal = cartItems.reduce(
    (acc, item) => acc + item.prix * item.quantite,
    0,
  );
  const fraisLivraison = sousTotal >= 50 ? 0 : 4.9;
  const totalFinal = (sousTotal + fraisLivraison).toFixed(2);
  const montantTva = (sousTotal - sousTotal / 1.2).toFixed(2);

  return (
    <div className="paiement-container">
      <h1 className="paiement-title">Règlement de votre commande</h1>

      <div className="paiement-summary-box">
        <h3 className="paiement-summary-title">Récapitulatif</h3>

        <div className="paiement-row">
          <span>Articles ({cartItems.length}) :</span>
          <span>{sousTotal.toFixed(2)} €</span>
        </div>

        <div className="paiement-row">
          <span>Frais de livraison :</span>
          <span
            style={{
              color:
                fraisLivraison === 0 ? "var(--color-secondary)" : "inherit",
              fontWeight: "bold",
            }}
          >
            {fraisLivraison === 0
              ? "GRATUIT"
              : `${fraisLivraison.toFixed(2)} €`}
          </span>
        </div>

        <hr className="paiement-separator" />

        <div
          className="paiement-row"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          <span>Total TTC :</span>
          <span>{totalFinal} €</span>
        </div>

        <p className="paiement-tva-note">Dont TVA (20%) : {montantTva} €</p>

        {relais && (
          <div className="relais-detail-box">
            <p style={{ margin: 0, fontWeight: "bold" }}>📍 Point Relais :</p>
            <p style={{ margin: 0 }}>
              {relais.Nom}, {relais.Ville}
            </p>
          </div>
        )}
      </div>

      {errorMessage && <p className="paiement-error-msg">{errorMessage}</p>}

      <div className="paypal-button-container">
        <PayPalButtons
          style={{ layout: "vertical", shape: "pill", label: "pay" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Commande Caf'Thé",
                  amount: { currency_code: "EUR", value: totalFinal },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              await actions.order.capture();

              // 1. Détection dynamique de la Box
              const boxItem = cartItems.find((item) =>
                (item.nom || item.nom_produit || "")
                  .toLowerCase()
                  .includes("box"),
              );

              let dureeFinale = 6; // Par défaut
              if (boxItem) {
                const nom = (boxItem.nom || boxItem.nom_produit).toLowerCase();
                if (nom.includes("1 mois")) dureeFinale = 1;
                else if (nom.includes("3 mois")) dureeFinale = 3;
                else if (nom.includes("6 mois")) dureeFinale = 6;
              }

              const orderData = {
                total: totalFinal,
                numero_client: user?.numero_client || user?.id,
                panier: cartItems.map((item) => ({
                  numero_produit: item.numero_produit || item.id,
                  quantite: item.quantite,
                })),
                is_abonnement: !!boxItem,
                type_abo: boxItem ? boxItem.nom || boxItem.nom_produit : null,
                duree_abo: dureeFinale,
              };

              const response = await fetch(
                "http://localhost:3000/api/commandes/register-order",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(orderData),
                },
              );

              if (!response.ok) throw new Error("Erreur d'enregistrement");

              localStorage.removeItem("panier");
              localStorage.removeItem("relais_selected");
              window.dispatchEvent(new Event("cartUpdate"));
              navigate("/mon-compte");

              setTimeout(() => window.location.reload(), 200);
            } catch (error) {
              setErrorMessage(
                "Paiement validé, mais l'enregistrement en base a échoué.",
              );
            }
          }}
        />
      </div>

      <button
        onClick={() => navigate("/choix-relais")}
        className="btn-modify-delivery"
      >
        Modifier le mode de livraison
      </button>
    </div>
  );
};

export default Paiement;
