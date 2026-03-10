// Importations
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  // État pour stocker les infos du point relais choisi sur la carte
  const [selectedRelais, setSelectedRelais] = useState(null);

  // useEffect pour initialiser le widget Mondial Relay au chargement du composant
  useEffect(() => {
    // Je vérifie que jQuery et le script de Mondial Relay sont bien chargés dans la fenêtre
    if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
      // Configuration du widget selon la documentation technique de Mondial Relay
      window.$("#Zone_Widget").MR_ParcelShopPicker({
        Target: "#Target_Result",
        Brand: "BDTEST  ", // Mon code enseigne de test
        Country: "FR",
        PostCode: "41000", // Ville de Blois par défaut
        ColLivMod: "24R", // Mode de livraison standard en point relais
        NbResults: "7",
        Responsive: true, // Option importante pour que la carte s'adapte aux mobiles
        ShowResultsOnMap: true,
        // Cette fonction s'exécute quand l'utilisateur clique sur un relais
        OnParcelShopSelected: (data) => {
          setSelectedRelais(data); // Je stocke les infos du relais dans mon état
        },
      });
    }
  }, []); // Le tableau vide [] fait que l'initialisation ne se lance qu'une seule fois

  // Fonction pour enregistrer le choix et passer à l'étape suivante
  const handleConfirm = () => {
    if (selectedRelais) {
      // Je sauvegarde le choix dans le localStorage pour le récupérer sur la page de paiement
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

      {/* Conteneur où le script externe va injecter la carte et la liste */}
      <div id="Zone_Widget" className="MRW-Widget"></div>

      {/* Barre de validation fixe en bas de l'écran pour l'ergonomie mobile */}
      <div className="relais-footer-sticky">
        {selectedRelais ? (
          // Si un relais est sélectionné, j'affiche son nom et sa ville
          <div className="relais-info-mini">
            <strong>{selectedRelais.Nom}</strong>
            <p>{selectedRelais.Ville}</p>
          </div>
        ) : (
          // Sinon, j'affiche un petit message d'aide
          <p className="relais-hint">Cliquez sur un point de la carte</p>
        )}

        {/* Le bouton est désactivé tant que l'utilisateur n'a pas choisi de relais */}
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
