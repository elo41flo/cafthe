import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Abonnement = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Configuration des durées avec IDs uniques
  const durees = [
    { id: "d1", label: "1 mois", mois: 1, promo: 1 },
    { id: "d3", label: "3 mois", mois: 3, promo: 1 },
    { id: "d6", label: "6 mois", mois: 6, promo: 0.95 },
    { id: "d12", label: "12 mois", mois: 12, promo: 0.9 },
  ];

  const formules = {
    essentiel: {
      id: "ess",
      nom: "L'Essentiel",
      prix: 19.9,
      desc: "2 pépites / mois",
    },
    expert: {
      id: "exp",
      nom: "Le Sommelier",
      prix: 44.9,
      desc: "5 produits / mois",
    },
  };

  const [preferences, setPreferences] = useState({
    formuleKey: "essentiel",
    dureeId: "d1", // On utilise l'ID 'd1' pour la comparaison stricte
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

      // UTILISE LE CHEMIN RELATIF DIRECT VERS TON LOGO
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
    <div style={pageContainer}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Ma Box Personnalisée</h1>
        <p style={stepStyle}>Étape {step} / 4</p>

        {/* ÉTAPE 1 : FORMULE */}
        {step === 1 && (
          <div className="fade-in">
            <h2 style={questionStyle}>Quelle formule ?</h2>
            <div style={gridStyle}>
              {Object.entries(formules).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() =>
                    setPreferences({ ...preferences, formuleKey: key })
                  }
                  style={optionCard(preferences.formuleKey === key)}
                >
                  <h3 style={{ margin: 0 }}>{val.nom}</h3>
                  <p
                    style={{
                      color: "#97af6e",
                      fontWeight: "bold",
                      margin: "5px 0",
                    }}
                  >
                    {val.prix}€/mois
                  </p>
                </div>
              ))}
            </div>
            <button onClick={nextStep} style={btnNext}>
              Continuer
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : DURÉE (Correction du bug de sélection) */}
        {step === 2 && (
          <div className="fade-in">
            <h2 style={questionStyle}>Quelle durée ?</h2>
            <div style={gridStyle}>
              {durees.map((d) => (
                <div
                  key={d.id}
                  onClick={() =>
                    setPreferences({ ...preferences, dureeId: d.id })
                  }
                  style={optionCard(preferences.dureeId === d.id)}
                >
                  <strong>{d.label}</strong>
                  {d.promo < 1 && (
                    <p
                      style={{
                        color: "red",
                        margin: 0,
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      PROMO
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div style={btnGroup}>
              <button onClick={prevStep} style={btnBack}>
                Retour
              </button>
              <button onClick={nextStep} style={btnNext}>
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : GOÛTS */}
        {step === 3 && (
          <div className="fade-in">
            <h2 style={questionStyle}>Vos goûts</h2>
            <div style={gridStyle}>
              {["Café", "Thé", "Mixte"].map((t) => (
                <div
                  key={t}
                  onClick={() => toggleType(t)}
                  style={optionCard(preferences.type.includes(t))}
                >
                  {t}
                </div>
              ))}
            </div>
            <div style={btnGroup}>
              <button onClick={prevStep} style={btnBack}>
                Retour
              </button>
              <button onClick={nextStep} style={btnNext}>
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 4 : FINALISATION */}
        {step === 4 && (
          <div className="fade-in">
            <h2 style={questionStyle}>Derniers détails</h2>
            <textarea
              style={textareaStyle}
              placeholder="Exclusions (allergies, préférences...)"
              value={preferences.exclusions}
              onChange={(e) =>
                setPreferences({ ...preferences, exclusions: e.target.value })
              }
            />
            <div style={btnGroup}>
              <button onClick={prevStep} style={btnBack}>
                Retour
              </button>
              <button onClick={handleConfirm} style={btnFinal}>
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

// --- STYLES ---
const pageContainer = {
  minHeight: "85vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fcfaf8",
  padding: "40px 20px",
};
const cardStyle = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "25px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
  width: "100%",
  maxWidth: "600px",
};
const titleStyle = {
  fontFamily: "Playfair Display",
  color: "#aa8d74",
  textAlign: "center",
  margin: "0 0 10px 0",
};
const stepStyle = {
  color: "#999",
  fontSize: "13px",
  marginBottom: "30px",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
};
const questionStyle = {
  fontFamily: "Playfair Display",
  marginBottom: "25px",
  textAlign: "center",
  color: "#4a3b2c",
};
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginBottom: "30px",
};

const optionCard = (active) => ({
  padding: "20px",
  border: active ? "2.5px solid #97af6e" : "1px solid #eee",
  borderRadius: "15px",
  cursor: "pointer",
  backgroundColor: active ? "#f4f9eb" : "white",
  transition: "all 0.2s ease",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "80px",
});

const btnNext = {
  width: "100%",
  padding: "16px",
  backgroundColor: "#aa8d74",
  color: "white",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};
const btnBack = {
  flex: 1,
  padding: "16px",
  backgroundColor: "#eee",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#666",
};
const btnGroup = { display: "flex", gap: "12px" };
const btnFinal = {
  flex: 2,
  padding: "16px",
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};
const textareaStyle = {
  width: "100%",
  height: "120px",
  borderRadius: "15px",
  padding: "15px",
  marginBottom: "25px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
  fontFamily: "Montserrat",
  outline: "none",
};

export default Abonnement;
