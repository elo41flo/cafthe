import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Components/Subscription.css"; // Import des styles

const SubscriptionBox = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    type: [],
    exclusions: "",
    frequence: "mensuel",
    formule: "decouverte",
  });

  const formules = {
    decouverte: { nom: "Découverte", prix: 19, desc: "2 produits surprises" },
    passion: { nom: "Passion", prix: 29, desc: "3 produits + 1 accessoire" },
    expert: { nom: "Expert", prix: 45, desc: "La totale : 5 pépites premium" },
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleType = (val) => {
    const current = preferences.type.includes(val)
      ? preferences.type.filter((t) => t !== val)
      : [...preferences.type, val];
    setPreferences({ ...preferences, type: current });
  };

  const addToCart = () => {
    const subscriptionItem = {
      id: "sub_" + preferences.formule,
      nom: `Abonnement Box ${formules[preferences.formule].nom}`,
      prix: formules[preferences.formule].prix,
      details: preferences,
      quantite: 1,
      image: "/src/assets/logo_2.webp",
    };

    const cart = JSON.parse(localStorage.getItem("panier")) || [];
    localStorage.setItem("panier", JSON.stringify([...cart, subscriptionItem]));
    window.dispatchEvent(new Event("cartUpdate"));
    navigate("/panier");
  };

  return (
    <div className="sub-container">
      <div className="sub-card fade-in">
        <h2 className="sub-title">Créez votre Box sur mesure 🎁</h2>

        {/* PROGRESS BAR */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* ÉTAPE 1 : LES ENVIES */}
        {step === 1 && (
          <div className="fade-in">
            <p
              className="legals-text"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              Que voulez-vous recevoir ?
            </p>
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
              disabled={preferences.type.length === 0}
              className="btn-sub-next"
            >
              Suivant
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : LES EXCLUSIONS */}
        {step === 2 && (
          <div className="fade-in">
            <p
              className="legals-text"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              Ce que vous ne voulez PAS recevoir :
            </p>
            <textarea
              className="sub-textarea"
              placeholder="Ex: Pas de café moulu, pas de thé noir..."
              value={preferences.exclusions}
              onChange={(e) =>
                setPreferences({ ...preferences, exclusions: e.target.value })
              }
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleBack} className="btn-sub-back">
                Retour
              </button>
              <button onClick={handleNext} className="btn-sub-next">
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : LA FORMULE */}
        {step === 3 && (
          <div className="fade-in">
            <p
              className="legals-text"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              Choisissez votre formule :
            </p>
            <div className="options-grid">
              {Object.entries(formules).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() =>
                    setPreferences({ ...preferences, formule: key })
                  }
                  className={`formula-card ${preferences.formule === key ? "active" : ""}`}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                      color: "var(--color-text)",
                    }}
                  >
                    {val.nom}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "var(--color-secondary)",
                      margin: "5px 0",
                    }}
                  >
                    {val.prix}€/mois
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      margin: 0,
                      color: "var(--color-text-light)",
                    }}
                  >
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={handleBack} className="btn-sub-back">
                Retour
              </button>
              <button onClick={addToCart} className="btn-sub-confirm">
                S'abonner maintenant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionBox;
