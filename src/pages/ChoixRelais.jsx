import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  const [selectedRelais, setSelectedRelais] = useState(null);

  useEffect(() => {
    // On crée un intervalle pour vérifier la disponibilité de Mondial Relay
    // car les scripts externes chargent parfois après le rendu de React
    const checkScript = setInterval(() => {
      if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
        
        // Initialisation du widget
        window.$("#Zone_Widget").MR_ParcelShopPicker({
          Target: "#Target_Result",
          Brand: "BDTEST  ", // ⚠️ Attention : Garde bien les deux espaces après TEST
          Country: "FR",
          PostCode: "41000",
          ColLivMod: "24R",
          NbResults: "7",
          Responsive: true,
          ShowResultsOnMap: true,
          OnParcelShopSelected: (data) => {
            setSelectedRelais(data);
          },
        });

        // Une fois chargé, on stoppe l'intervalle
        clearInterval(checkScript);
      }
    }, 500); // On vérifie toutes les 500ms

    // Nettoyage : si l'utilisateur quitte la page avant le chargement
    return () => clearInterval(checkScript);
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
        <p>Sélectionnez votre lieu de retrait pour votre commande Caf'Thé</p>
      </div>

      {/* IMPORTANT : Assure-toi que #Zone_Widget a une hauteur 
          dans ton CSS (ex: min-height: 500px) sinon il sera invisible !
      */}
      <div id="Zone_Widget" className="MRW-Widget"></div>

      <div className="relais-footer-sticky">
        {selectedRelais ? (
          <div className="relais-info-mini">
            <strong>{selectedRelais.Nom}</strong>
            <p>{selectedRelais.Ville} ({selectedRelais.CP})</p>
          </div>
        ) : (
          <p className="relais-hint">Veuillez choisir un point sur la carte</p>
        )}

        <button
          onClick={handleConfirm}
          className="btn-relais-next"
          disabled={!selectedRelais}
        >
          Valider la livraison
        </button>
      </div>
    </div>
  );
};

export default ChoixRelais;