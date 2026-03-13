// Importations
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ChoixRelais.css";

const ChoixRelais = () => {
  const navigate = useNavigate();
  
  // 1. État pour stocker les infos du point relais choisi
  // Cet état permet de lier le widget (externe) à l'interface React
  const [selectedRelais, setSelectedRelais] = useState(null);

  // 2. Initialisation du widget Mondial Relay
  useEffect(() => {
    // Sécurité : Je vérifie que jQuery ($) et le script du widget sont bien chargés
    // C'est crucial car React charge plus vite que les scripts externes du index.html
    if (window.$ && window.$("#Zone_Widget").MR_ParcelShopPicker) {
      
      // Configuration du widget selon la documentation technique officielle
      window.$("#Zone_Widget").MR_ParcelShopPicker({
        Target: "#Target_Result", 
        Brand: "BDTEST  ", // Code enseigne (test ici, à remplacer en production)
        Country: "FR",
        PostCode: "41000", // Localisation par défaut (Blois)
        ColLivMod: "24R",  // Mode de livraison (Point Relais L)
        NbResults: "7",
        Responsive: true,  // Adaptabilité automatique aux écrans mobiles
        ShowResultsOnMap: true,
        
        // 3. Callback : Fonction exécutée lors de la sélection d'un point
        // C'est ici que l'on récupère les données "brutes" du widget pour React
        OnParcelShopSelected: (data) => {
          setSelectedRelais(data); 
        },
      });
    }
  }, []); // Exécution unique au montage du composant

  // 4. Gestion de la confirmation
  const handleConfirm = () => {
    if (selectedRelais) {
      // Persistance du choix pour l'étape finale du tunnel d'achat
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

      {/* 5. Conteneur d'injection */}
      {/* C'est ici que le script externe vient "dessiner" la carte et la liste */}
      <div id="Zone_Widget" className="MRW-Widget"></div>

      {/* 6. Feedback utilisateur (UX) */}
      {/* Barre de validation fixe (Sticky) pour une meilleure ergonomie sur mobile */}
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
          disabled={!selectedRelais} // Empêche de valider sans sélection
        >
          Valider ce choix
        </button>
      </div>
    </div>
  );
};

export default ChoixRelais;