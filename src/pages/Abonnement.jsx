// Importations
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/Abonnement.css";

const Abonnement = () => {
  // Hook pour pouvoir rediriger l'utilisateur vers la boutique à la fin
  const navigate = useNavigate();

  // État qui me permet de savoir sur quelle étape du formulaire on se trouve
  const [step, setStep] = useState(1);

  // Mes données pour les durées
  const durees = [
    { id: "d1", label: "1 mois", mois: 1, promo: 1 },
    { id: "d3", label: "3 mois", mois: 3, promo: 1 },
    { id: "d6", label: "6 mois", mois: 6, promo: 0.95 },
    { id: "d12", label: "12 mois", mois: 12, promo: 0.9 },
  ];

  // Les deux formules de box
  const formules = {
    essentiel: { id: "ess", nom: "L'Essentiel", prix: 19.9 },
    expert: { id: "exp", nom: "Le Sommelier", prix: 44.9 },
  };

  // Je regroupe tous les choix de l'utilisateur
  const [preferences, setPreferences] = useState({
    formuleKey: "essentiel",
    dureeId: "d1",
    type: [],
    exclusions: "",
  });

  // Pour naviguer entre les étapes
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Fonction pour gérer la multi-sélection sans supprimer les anciens choix
  const toggleType = (val) => {
    setPreferences((prev) => ({
      ...prev,
      type: prev.type.includes(val)
        ? prev.type.filter((t) => t !== val) // Si c'est déjà dedans, on l'enlève
        : [...prev.type, val], // Sinon, on l'ajoute au tableau
    }));
  };

  // Déclenchée à la validation du formulaire
  const handleConfirm = () => {
    // Je récupère les infos séléectionnées pour calculer le prix final
    const f = formules[preferences.formuleKey];
    const d = durees.find((dur) => dur.id === preferences.dureeId);
    const prixTotal = (f.prix * d.mois * d.promo).toFixed(2);

    // Je crée un objet qui ressemble à mes produits classiques pour le panier
    const boxItem = {
      uniqueId: Date.now() + Math.random(), // ID unique
      numero_produit: 999,
      nom_produit: `Box ${f.nom} (${d.label})`,
      nom: `Box ${f.nom} (${d.label})`,
      prix: parseFloat(prixTotal),
      prix_ttc: parseFloat(prixTotal),
      image: "/src/assets/logo_2.webp",
      quantite: 1,
      isSubscription: true,
      poids_sachet: `Engagement ${d.label}`,
      details_choisis: `Goûts: ${preferences.type.join(", ")}`,
    };

    // Je récupère le panier du localStorage et j'ajoute ma box
    const currentCart = JSON.parse(localStorage.getItem("panier")) || [];
    localStorage.setItem("panier", JSON.stringify([...currentCart, boxItem]));

    // Je lance des événements pour que mon Header et mon tiroir de panier se mettent à jour tout seuls
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));

    // Redirection automatique pour montrer à l'utilisateur que c'est bien ajouté
    navigate("/boutique");
  };

  // Variables pour simplifier l'affichage dans le return
  const selectedFormule = formules[preferences.formuleKey];
  const selectedDuree = durees.find((d) => d.id === preferences.dureeId);

  return (
    <div className="abonnement-page">
      <div className="abonnement-card">
        <h1 className="abonnement-title">Ma Box Personnalisée</h1>
        <p className="step-indicator">Étape {step} / 4</p>

        {/* Choix de l'offre */}
        {step === 1 && (
          <div className="fade-in">
            <h2 className="question-title">Quelle formule ?</h2>
            <div className="options-grid">
              {Object.entries(formules).map(([key, val]) => (
                <div
                  key={key}
                  className={`option-card ${preferences.formuleKey === key ? "active" : ""}`}
                  onClick={() =>
                    setPreferences({ ...preferences, formuleKey: key })
                  }
                >
                  <h3 style={{ margin: 0 }}>{val.nom}</h3>
                  <p
                    style={{
                      color: "var(--color-secondary)",
                      fontWeight: "bold",
                    }}
                  >
                    {val.prix}€/mois
                  </p>
                </div>
              ))}
            </div>
            <button onClick={nextStep} className="btn-next">
              Continuer
            </button>
          </div>
        )}

        {/* Choix de la durée avec affichage des promos */}
        {step === 2 && (
          <div className="fade-in">
            <h2 className="question-title">Quelle durée ?</h2>
            <div className="options-grid">
              {durees.map((d) => (
                <div
                  key={d.id}
                  className={`option-card ${preferences.dureeId === d.id ? "active" : ""}`}
                  onClick={() =>
                    setPreferences({ ...preferences, dureeId: d.id })
                  }
                >
                  <strong>{d.label}</strong>
                  {/* Petit badge visuel si la durée offre une réduction */}
                  {d.promo < 1 && <p className="promo-badge">PROMO</p>}
                </div>
              ))}
            </div>
            <div className="btn-group">
              <button onClick={prevStep} className="btn-back">
                Retour
              </button>
              <button onClick={nextStep} className="btn-next">
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Personnalisation des goûts */}
        {step === 3 && (
          <div className="fade-in">
            <h2 className="question-title">Vos goûts</h2>
            <div className="options-grid">
              {["Café", "Thé", "Mixte"].map((t) => (
                <div
                  key={t}
                  className={`option-card ${preferences.type.includes(t) ? "active" : ""}`}
                  onClick={() => toggleType(t)}
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="btn-group">
              <button onClick={prevStep} className="btn-back">
                Retour
              </button>
              <button onClick={nextStep} className="btn-next">
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Résumé et validation finale */}
        {step === 4 && (
          <div className="fade-in">
            <h2 className="question-title">Derniers détails</h2>
            <textarea
              className="exclusions-area"
              placeholder="Exclusions (allergies, préférences...)"
              value={preferences.exclusions}
              // Je mets à jour l'état à chaque fois que l'utilisateur tape une lettre
              onChange={(e) =>
                setPreferences({ ...preferences, exclusions: e.target.value })
              }
            />
            <div className="btn-group">
              <button onClick={prevStep} className="btn-back">
                Retour
              </button>
              <button onClick={handleConfirm} className="btn-final">
                {/* Affichage dynamique du prix total calculé selon la promo */}
                Valider (
                {(
                  selectedFormule.prix *
                  selectedDuree.mois *
                  selectedDuree.promo
                ).toFixed(2)}{" "}
                €)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Abonnement;
