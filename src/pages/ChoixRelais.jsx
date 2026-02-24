import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  const [selectedRelais, setSelectedRelais] = useState(null);

  useEffect(() => {
    // Initialisation du Widget Mondial Relay via jQuery (window.$)
    if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
      window.$("#Zone_Widget").MR_ParcelShopPicker({
        Target: "#Target_Result",
        Brand: "BDTEST  ", // Sandbox
        Country: "FR",
        PostCode: "41000", // Blois !
        ColLivMod: "24R",
        NbResults: "7",
        OnParcelShopSelected: (data) => {
          console.log("Relais sélectionné :", data);
          setSelectedRelais(data);
        },
      });
    }
  }, []);

  const handleConfirm = () => {
    if (selectedRelais) {
      localStorage.setItem("relais_selected", JSON.stringify(selectedRelais));
      navigate("/paiement");
    } else {
      alert("Veuillez sélectionner un point relais sur la carte.");
    }
  };

  return (
    <div className="relais-container">
      <h1 className="relais-title">Choisissez votre Point Relais</h1>
      <p className="relais-intro">
        Sélectionnez le point le plus proche de chez vous !
      </p>

      {/* Zone d'affichage du Widget */}
      <div id="Zone_Widget"></div>

      {/* Affichage conditionnel de la sélection */}
      {selectedRelais && (
        <div className="selection-box fade-in">
          <p>
            <strong>Point sélectionné :</strong> {selectedRelais.Nom}
          </p>
          <p>
            {selectedRelais.Adresse1}, {selectedRelais.CP}{" "}
            {selectedRelais.Ville}
          </p>
        </div>
      )}

      <div className="relais-btn-group">
        <button
          onClick={() => navigate("/livraisonretrait")}
          className="btn-relais-back"
        >
          Retour
        </button>
        <button onClick={handleConfirm} className="btn-relais-confirm">
          Confirmer et payer
        </button>
      </div>
    </div>
  );
};

export default ChoixRelais;
