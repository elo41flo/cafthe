import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  const [selectedRelais, setSelectedRelais] = useState(null);

  useEffect(() => {
    const initWidget = () => {
      if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
        window.$("#Zone_Widget").MR_ParcelShopPicker({
          Target: "#Target_Result",
          Brand: "BDTEST  ", // Sandbox
          Country: "FR",
          PostCode: "41000",
          ColLivMod: "24R",
          NbResults: "7",
          OnParcelShopSelected: (data) => {
            setSelectedRelais(data);
          },
        });

        // Ce timer force la carte à apparaître si elle reste grise/blanche
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 1000);
      }
    };

    initWidget();
  }, []);

  const handleConfirm = () => {
    if (selectedRelais) {
      localStorage.setItem("relais_selected", JSON.stringify(selectedRelais));
      navigate("/paiement");
    } else {
      alert("Veuillez sélectionner un point relais.");
    }
  };

  return (
    <div className="relais-page-wrapper">
      <div className="relais-container">
        <h1 className="relais-title">Point Relais</h1>

        <div id="Zone_Widget"></div>

        <div className={`selection-status ${selectedRelais ? "selected" : ""}`}>
          {selectedRelais ? (
            <p>
              📍 <strong>{selectedRelais.Nom}</strong>
              <br />
              {selectedRelais.Ville}
            </p>
          ) : (
            <p>Veuillez choisir un point sur la carte</p>
          )}
        </div>

        <div className="relais-footer-actions">
          <button onClick={handleConfirm} className="btn-main-relais">
            Confirmer ce choix
          </button>
          <button
            onClick={() => navigate("/livraisonretrait")}
            className="btn-link-relais"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoixRelais;
