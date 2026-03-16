import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Components/Subscription.css";

const SubscriptionBox = () => {
  const navigate = useNavigate();

  // État pour la navigation entre les étapes
  const [step, setStep] = useState(1);

  // État global des préférences de l'abonnement
  const [preferences, setPreferences] = useState({
    type: [],         // Choix multiples
    exclusions: "",   // Texte libre pour les préférences négatives
    frequence: "mensuel",
    formule: "decouverte",
  });

  // Configuration des offres
  const formules = {
    decouverte: { nom: "Découverte", prix: 19, desc: "2 produits surprises" },
    passion: { nom: "Passion", prix: 29, desc: "3 produits + 1 accessoire" },
    expert: { nom: "Expert", prix: 45, desc: "La totale : 5 pépites premium" },
  };

  // Fonctions de navigation
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  // Logique de sélection multiple
    const toggleType = (val) => {
    const current = preferences.type.includes(val)
      ? preferences.type.filter((t) => t !== val)
      : [...preferences.type, val];
    setPreferences({ ...preferences, type: current });
  };

  // Finalisation et mise en panier
  const addToCart = () => {
    const subscriptionItem = {
      id: "sub_" + preferences.formule,
      nom: `Abonnement Box ${formules[preferences.formule].nom}`,
      prix: formules[preferences.formule].prix,
      details: preferences, // On embarque toutes les étapes remplies
      quantite: 1,
      image: "/src/assets/logo_2.webp",
    };

    // Persistance dans le LocalStorage
    const cart = JSON.parse(localStorage.getItem("panier")) || [];
    localStorage.setItem("panier", JSON.stringify([...cart, subscriptionItem]));
    
    window.dispatchEvent(new Event("cartUpdate"));
    navigate("/panier");
  };

  return (
    <div className="sub-container">
      <div className="sub-card fade-in">
        <h2 className="sub-title">Créez votre Box sur mesure 🎁</h2>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="fade-in">
            <p className="legals-text">Que voulez-vous recevoir ?</p>
            <div className="options-grid">
              {["Café", "Thé", "Accessoires"].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleType(item)}
                  className={`choice-btn ${preferences.type.includes(item) ? "active" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={preferences.type.length === 0} // On ne peut pas avancer sans choixd
              className="btn-sub-next"
            >
              Suivant
            </button>
          </div>
        )}

        {/* Saisie des exclusions */}
        {step === 2 && (
          <div className="fade-in">
            <p className="legals-text">Ce que vous ne voulez PAS recevoir :</p>
            <textarea
              className="sub-textarea"
              placeholder="Ex: Pas de café moulu, pas de thé noir..."
              value={preferences.exclusions}
              onChange={(e) => setPreferences({ ...preferences, exclusions: e.target.value })}
            />
            {/* ... boutons retour/suivant ... */}
          </div>
        )}

        {/* 
        Choix de la formule finale */}
        {step === 3 && (
          <div className="fade-in">
            <p className="legals-text">Choisissez votre formule :</p>
            <div className="options-grid">
              {Object.entries(formules).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() => setPreferences({ ...preferences, formule: key })}
                  className={`formula-card ${preferences.formule === key ? "active" : ""}`}
                >
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};