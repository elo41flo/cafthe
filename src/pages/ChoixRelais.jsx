import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  const [selectedRelais, setSelectedRelais] = useState(null);
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    // Initialisation sécurisée du Widget
    const initMR = () => {
      if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
        window.$("#Zone_Widget").MR_ParcelShopPicker({
          Target: "#Target_Result",
          Brand: "BDTEST  ", // Sandbox
          Country: "FR",
          PostCode: "41000",
          ColLivMod: "24R",
          NbResults: "7",
          Responsive: true, // Option importante si supportée
          OnParcelShopSelected: (data) => {
            setSelectedRelais(data);
          },
        });

        // FIX : On attend que le DOM du widget soit injecté pour forcer le resize
        setTimeout(() => {
          setIsWidgetLoaded(true);
          window.dispatchEvent(new Event("resize"));
        }, 1000);
      }
    };

    initMR();
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
    <div className="relais-page-container">
      <div className="relais-header">
        <h1 className="relais-title">Point Relais</h1>
        <p className="relais-subtitle">Sélectionnez votre lieu de retrait</p>
      </div>

      {/* Conteneur principal du widget */}
      <div className="widget-wrapper">
        <div id="Zone_Widget"></div>
      </div>

      <div
        className={`relais-selection-card ${selectedRelais ? "active" : ""}`}
      >
        {selectedRelais ? (
          <div className="relais-details">
            <p className="relais-name">📍 {selectedRelais.Nom}</p>
            <p className="relais-address">
              {selectedRelais.Adresse1}, {selectedRelais.Ville}
            </p>
          </div>
        ) : (
          <p className="relais-placeholder">
            Sélectionnez un point sur la carte pour continuer
          </p>
        )}
      </div>

      <div className="relais-footer">
        <button
          onClick={handleConfirm}
          className="btn-relais-next"
          disabled={!selectedRelais}
        >
          CONFIRMER CE POINT
        </button>
        <button
          onClick={() => navigate("/livraisonretrait")}
          className="btn-relais-link"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default ChoixRelais;
