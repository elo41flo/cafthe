import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChoixRelais = () => {
  const navigate = useNavigate();
  const [selectedRelais, setSelectedRelais] = useState(null);

  useEffect(() => {
    // Initialisation du Widget Mondial Relay
    window.$("#Zone_Widget").MR_ParcelShopPicker({
      Target: "#Target_Result", // Champ qui recevra l'ID du relais
      Brand: "BDTEST  ", // Code marque de test obligatoire en sandbox
      Country: "FR", // Pays par défaut
      PostCode: "41000", // Code postal par défaut (Blois pour toi !)
      ColLivMod: "24R", // Mode de livraison
      NbResults: "7", // Nombre de points affichés
      OnParcelShopSelected: (data) => {
        // Cette fonction s'exécute quand l'utilisateur clique sur "Choisir"
        console.log("Relais sélectionné :", data);
        setSelectedRelais(data);
      },
    });
  }, []);

  const handleConfirm = () => {
    if (selectedRelais) {
      // On sauvegarde le choix dans le localStorage pour la commande
      localStorage.setItem("relais_selected", JSON.stringify(selectedRelais));
      navigate("/paiement");
    } else {
      alert("Veuillez sélectionner un point relais sur la carte.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Choisissez votre Point Relais</h1>
      <p style={{ marginBottom: "20px" }}>
        Sélectionnez le point le plus proche de chez vous !
      </p>

      {/* Le Widget va s'afficher ici */}
      <div id="Zone_Widget" style={{ marginBottom: "20px" }}></div>

      {/* Affichage du relais sélectionné */}
      {selectedRelais && (
        <div style={selectionBox}>
          <p>
            <strong>Point sélectionné :</strong> {selectedRelais.Nom}
          </p>
          <p>
            {selectedRelais.Adresse1}, {selectedRelais.CP}{" "}
            {selectedRelais.Ville}
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <button onClick={() => navigate("/livraisonretrait")} style={btnBack}>
          Retour
        </button>
        <button onClick={handleConfirm} style={btnNext}>
          Confirmer et payer
        </button>
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "20px",
  textAlign: "center",
  fontFamily: "Montserrat",
};
const titleStyle = {
  fontFamily: "Playfair Display",
  color: "#aa8d74",
  fontSize: "32px",
};
const selectionBox = {
  padding: "15px",
  backgroundColor: "#f9fcf6",
  border: "1px solid #97af6e",
  borderRadius: "10px",
  marginTop: "20px",
};
const btnNext = {
  flex: 2,
  backgroundColor: "#97af6e",
  color: "white",
  padding: "15px",
  borderRadius: "30px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};
const btnBack = {
  flex: 1,
  backgroundColor: "#ccc",
  color: "white",
  padding: "15px",
  borderRadius: "30px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};

export default ChoixRelais;
