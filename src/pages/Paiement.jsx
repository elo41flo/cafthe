import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Paiement = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const cartItems = JSON.parse(localStorage.getItem("panier")) || [];
  const relais = JSON.parse(localStorage.getItem("relais_selected"));
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const sousTotal = cartItems.reduce(
    (acc, item) => acc + item.prix * item.quantite,
    0,
  );
  const fraisLivraison = sousTotal >= 50 ? 0 : 4.9;
  const totalFinal = (sousTotal + fraisLivraison).toFixed(2);
  const montantTva = (sousTotal - sousTotal / 1.2).toFixed(2);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Règlement de votre commande</h1>

      <div style={summaryBox}>
        <h3
          style={{
            fontFamily: "Playfair Display",
            color: "#aa8d74",
            marginBottom: "15px",
          }}
        >
          Récapitulatif
        </h3>
        <div style={rowStyle}>
          <span>Articles ({cartItems.length}) :</span>
          <span>{sousTotal.toFixed(2)} €</span>
        </div>
        <div style={rowStyle}>
          <span>Frais de livraison :</span>
          <span
            style={{
              color: fraisLivraison === 0 ? "#97af6e" : "#333",
              fontWeight: "bold",
            }}
          >
            {fraisLivraison === 0
              ? "GRATUIT"
              : `${fraisLivraison.toFixed(2)} €`}
          </span>
        </div>
        <hr style={separator} />
        <div style={{ ...rowStyle, fontSize: "18px", fontWeight: "bold" }}>
          <span>Total TTC :</span>
          <span>{totalFinal} €</span>
        </div>
        <p style={tvaNote}>Dont TVA (20%) : {montantTva} €</p>

        {relais && (
          <div style={relaisDetail}>
            <p style={{ margin: 0, fontWeight: "bold" }}>📍 Point Relais :</p>
            <p style={{ margin: 0 }}>
              {relais.Nom}, {relais.Ville}
            </p>
          </div>
        )}
      </div>

      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}

      <div style={paypalContainer}>
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
              const details = await actions.order.capture();

              const boxItem = cartItems.find(
                (item) =>
                  item.nom?.toLowerCase().includes("box") ||
                  item.nom_produit?.toLowerCase().includes("box"),
              );

              const orderData = {
                total: totalFinal,
                numero_client: user?.numero_client || user?.id,
                panier: cartItems.map((item) => ({
                  numero_produit: item.numero_produit || item.id,
                  quantite: item.quantite,
                })),
                is_abonnement: !!boxItem,
                type_abo: boxItem ? boxItem.nom || boxItem.nom_produit : null,
                duree_abo: boxItem ? 6 : null,
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

              if (!response.ok)
                throw new Error("Erreur lors de l'enregistrement");

              // --- ÉTAPE CRUCIALE POUR LA MISE À JOUR ---
              // 1. On nettoie le panier
              localStorage.removeItem("panier");
              localStorage.removeItem("relais_selected");

              // 2. On prévient le reste de l'appli
              window.dispatchEvent(new Event("cartUpdate"));

              // 3. Redirection vers Mon Compte pour forcer le nouveau fetch des données
              navigate("/mon-compte");

              // 4. Petit hack propre : on force un léger rafraîchissement pour être sûr que le
              // useEffect de MonCompte récupère les nouvelles infos SQL
              setTimeout(() => {
                window.location.reload();
              }, 100);
            } catch (error) {
              setErrorMessage(
                "Paiement validé, mais erreur d'enregistrement. Contactez-nous.",
              );
            }
          }}
        />
      </div>

      <button onClick={() => navigate("/choix-relais")} style={btnBack}>
        Modifier le mode de livraison
      </button>
    </div>
  );
};

// Styles (Gardés identiques à ton fichier pour ne pas casser ton design)
const containerStyle = {
  maxWidth: "500px",
  margin: "60px auto",
  padding: "20px",
  fontFamily: "Montserrat",
};
const titleStyle = {
  fontFamily: "Playfair Display",
  color: "#aa8d74",
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "28px",
};
const summaryBox = {
  padding: "25px",
  backgroundColor: "#fcfaf8",
  borderRadius: "15px",
  marginBottom: "30px",
  border: "1px solid #eee",
};
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
  fontSize: "15px",
};
const separator = {
  border: "none",
  borderBottom: "1px solid #ddd",
  margin: "15px 0",
};
const tvaNote = {
  fontSize: "12px",
  color: "#888",
  textAlign: "right",
  marginTop: "5px",
  fontStyle: "italic",
};
const relaisDetail = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#f3f3f3",
  borderRadius: "8px",
  fontSize: "13px",
};
const paypalContainer = { marginTop: "10px" };
const errorStyle = {
  color: "#d9534f",
  backgroundColor: "#f2dede",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  marginBottom: "15px",
};
const btnBack = {
  background: "none",
  border: "none",
  color: "#888",
  textDecoration: "underline",
  width: "100%",
  marginTop: "30px",
  cursor: "pointer",
  fontSize: "14px",
};

export default Paiement;
