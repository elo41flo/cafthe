import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  const [selectedRelais, setSelectedRelais] = useState(null);

  useEffect(() => {
    // Initialisation du Widget Mondial Relay
    if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
      window.$("#Zone_Widget").MR_ParcelShopPicker({
        Target: "#Target_Result",
        Brand: "BDTEST  ", // Sandbox pour tes tests
        Country: "FR",
        PostCode: "41000", // Blois
        ColLivMod: "24R",
        NbResults: "7",
        OnParcelShopSelected: (data) => {
          console.log("Relais sélectionné :", data);
          setSelectedRelais(data);
        },
      });

      // FIX CRUCIAL : Force la carte à se dessiner correctement après l'init
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 1000);

      return () => clearTimeout(timer);
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
    <div className="relais-page-wrapper">
      <div className="relais-container">
        <h1 className="relais-title">Votre Point Relais</h1>
        <p className="relais-intro">
          Sélectionnez l'endroit le plus pratique pour vous.
        </p>

        {/* Le conteneur du Widget */}
        <div id="Zone_Widget"></div>

        {/* Détails de la sélection */}
        <div className={`selection-info-box ${selectedRelais ? "active" : ""}`}>
          {selectedRelais ? (
            <>
              <p>
                <strong>{selectedRelais.Nom}</strong>
              </p>
              <p>
                {selectedRelais.Adresse1}, {selectedRelais.CP}{" "}
                {selectedRelais.Ville}
              </p>
            </>
          ) : (
            <p className="placeholder-text">
              Aucun point sélectionné sur la carte
            </p>
          )}
        </div>

        <div className="relais-actions">
          <button onClick={handleConfirm} className="btn-confirm-relais">
            Confirmer la livraison
          </button>
          <button
            onClick={() => navigate("/livraisonretrait")}
            className="btn-back-relais"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoixRelais;
