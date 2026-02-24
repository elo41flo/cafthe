import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/Abonnement.css"; // Import du CSS spécifique

const Abonnement = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const durees = [
    { id: "d1", label: "1 mois", mois: 1, promo: 1 },
    { id: "d3", label: "3 mois", mois: 3, promo: 1 },
    { id: "d6", label: "6 mois", mois: 6, promo: 0.95 },
    { id: "d12", label: "12 mois", mois: 12, promo: 0.9 },
  ];

  const formules = {
    essentiel: { id: "ess", nom: "L'Essentiel", prix: 19.9 },
    expert: { id: "exp", nom: "Le Sommelier", prix: 44.9 },
  };

  const [preferences, setPreferences] = useState({
    formuleKey: "essentiel",
    dureeId: "d1",
    type: [],
    exclusions: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const toggleType = (val) => {
    setPreferences((prev) => ({
      ...prev,
      type: prev.type.includes(val)
        ? prev.type.filter((t) => t !== val)
        : [...prev.type, val],
    }));
  };

  const handleConfirm = () => {
    const f = formules[preferences.formuleKey];
    const d = durees.find((dur) => dur.id === preferences.dureeId);
    const prixTotal = (f.prix * d.mois * d.promo).toFixed(2);

    const boxItem = {
      uniqueId: Date.now() + Math.random(),
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

    const currentCart = JSON.parse(localStorage.getItem("panier")) || [];
    localStorage.setItem("panier", JSON.stringify([...currentCart, boxItem]));

    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
    navigate("/boutique");
  };

  const selectedFormule = formules[preferences.formuleKey];
  const selectedDuree = durees.find((d) => d.id === preferences.dureeId);

  return (
    <div className="abonnement-page">
      <div className="abonnement-card">
        <h1 className="abonnement-title">Ma Box Personnalisée</h1>
        <p className="step-indicator">Étape {step} / 4</p>

        {/* ÉTAPE 1 : FORMULE */}
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
                      margin: "5px 0",
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

        {/* ÉTAPE 2 : DURÉE */}
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

        {/* ÉTAPE 3 : GOÛTS */}
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

        {/* ÉTAPE 4 : FINALISATION */}
        {step === 4 && (
          <div className="fade-in">
            <h2 className="question-title">Derniers détails</h2>
            <textarea
              className="exclusions-area"
              placeholder="Exclusions (allergies, préférences...)"
              value={preferences.exclusions}
              onChange={(e) =>
                setPreferences({ ...preferences, exclusions: e.target.value })
              }
            />
            <div className="btn-group">
              <button onClick={prevStep} className="btn-back">
                Retour
              </button>
              <button onClick={handleConfirm} className="btn-final">
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
