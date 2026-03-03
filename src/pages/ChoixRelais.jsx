import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  const [selectedRelais, setSelectedRelais] = useState(null);

  useEffect(() => {
    // On s'assure que jQuery et le plugin sont chargés
    if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
      window.$("#Zone_Widget").MR_ParcelShopPicker({
        Target: "#Target_Result",
        Brand: "BDTEST  ", // Ton code enseigne
        Country: "FR",
        PostCode: "41000",
        ColLivMod: "24R",
        NbResults: "7",
        Responsive: true, // ACTIVE LE MODE MOBILE NATIF
        ShowResultsOnMap: true,
        OnParcelShopSelected: (data) => {
          setSelectedRelais(data);
        },
      });
    }
  }, []);

  const handleConfirm = () => {
    if (selectedRelais) {
      localStorage.setItem("relais_selected", JSON.stringify(selectedRelais));
      navigate("/paiement");
    }
  };

  return (
    <div className="relais-mobile-wrapper">
      <div className="relais-header-simple">
        <h1>Point Relais</h1>
        <p>Sélectionnez votre lieu de retrait</p>
      </div>

      {/* Le conteneur du widget avec la classe responsive de MR */}
      <div id="Zone_Widget" className="MRW-Widget"></div>

      <div className="relais-footer-sticky">
        {selectedRelais ? (
          <div className="relais-info-mini">
            <strong>{selectedRelais.Nom}</strong>
            <p>{selectedRelais.Ville}</p>
          </div>
        ) : (
          <p className="relais-hint">Cliquez sur un point de la carte</p>
        )}

        <button
          onClick={handleConfirm}
          className="btn-relais-next"
          disabled={!selectedRelais}
        >
          Valider ce choix
        </button>
      </div>
    </div>
  );
};

export default ChoixRelais;
