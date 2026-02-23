import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionBox = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    type: [], // café, thé, accessoires
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
    // Ici on simule l'ajout de l'abonnement au panier
    const subscriptionItem = {
      id: "sub_" + preferences.formule,
      nom: `Abonnement Box ${formules[preferences.formule].nom}`,
      prix: formules[preferences.formule].prix,
      details: preferences,
      quantite: 1,
      image: "/src/assets/logo_2.webp", // Une image de box
    };

    const cart = JSON.parse(localStorage.getItem("panier")) || [];
    localStorage.setItem("panier", JSON.stringify([...cart, subscriptionItem]));

    window.dispatchEvent(new Event("cartUpdate"));
    navigate("/panier");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Créez votre Box sur mesure 🎁</h2>

        {/* PROGRESS BAR */}
        <div style={progressContainer}>
          <div style={progressStyle(step)} />
        </div>

        {/* ÉTAPE 1 : LES ENVIES */}
        {step === 1 && (
          <div>
            <p style={labelStyle}>Que voulez-vous recevoir ?</p>
            <div style={optionsGrid}>
              {["Café", "Thé", "Accessoires"].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleType(item)}
                  style={choiceBtnStyle(preferences.type.includes(item))}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={preferences.type.length === 0}
              style={nextBtnStyle}
            >
              Suivant
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : LES EXCLUSIONS */}
        {step === 2 && (
          <div>
            <p style={labelStyle}>
              Ce que vous ne voulez PAS recevoir (allergies, goûts...) :
            </p>
            <textarea
              style={textAreaStyle}
              placeholder="Ex: Pas de café moulu, pas de thé noir..."
              value={preferences.exclusions}
              onChange={(e) =>
                setPreferences({ ...preferences, exclusions: e.target.value })
              }
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleBack} style={backBtnStyle}>
                Retour
              </button>
              <button onClick={handleNext} style={nextBtnStyle}>
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : LA FORMULE */}
        {step === 3 && (
          <div>
            <p style={labelStyle}>Choisissez votre formule :</p>
            <div style={optionsGrid}>
              {Object.entries(formules).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() =>
                    setPreferences({ ...preferences, formule: key })
                  }
                  style={formulaCardStyle(preferences.formule === key)}
                >
                  <p style={{ fontWeight: "bold", margin: 0 }}>{val.nom}</p>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "#97af6e",
                      margin: "5px 0",
                    }}
                  >
                    {val.prix}€/mois
                  </p>
                  <p style={{ fontSize: "12px", margin: 0 }}>{val.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={handleBack} style={backBtnStyle}>
                Retour
              </button>
              <button onClick={addToCart} style={confirmBtnStyle}>
                S'abonner maintenant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  padding: "80px 20px",
  backgroundColor: "#fcfaf8",
  display: "flex",
  justifyContent: "center",
};
const cardStyle = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  maxWidth: "600px",
  width: "100%",
  textAlign: "center",
};
const titleStyle = {
  fontFamily: "Playfair Display",
  color: "#aa8d74",
  marginBottom: "30px",
};
const progressContainer = {
  width: "100%",
  height: "8px",
  backgroundColor: "#eee",
  borderRadius: "4px",
  marginBottom: "40px",
};
const progressStyle = (step) => ({
  width: `${(step / 3) * 100}%`,
  height: "100%",
  backgroundColor: "#97af6e",
  borderRadius: "4px",
  transition: "0.3s",
});
const labelStyle = {
  fontFamily: "Montserrat",
  fontSize: "18px",
  marginBottom: "20px",
  color: "#4a3b2c",
};
const optionsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "15px",
  marginBottom: "30px",
};
const choiceBtnStyle = (active) => ({
  padding: "15px",
  borderRadius: "12px",
  border: active ? "2px solid #97af6e" : "1px solid #ddd",
  backgroundColor: active ? "#f4f9eb" : "white",
  cursor: "pointer",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  color: active ? "#97af6e" : "#666",
});
const formulaCardStyle = (active) => ({
  padding: "20px",
  borderRadius: "12px",
  border: active ? "2px solid #aa8d74" : "1px solid #eee",
  cursor: "pointer",
  transition: "0.2s",
  backgroundColor: active ? "#faf7f4" : "white",
});
const textAreaStyle = {
  width: "100%",
  height: "100px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  padding: "15px",
  marginBottom: "20px",
  fontFamily: "Montserrat",
};
const nextBtnStyle = {
  backgroundColor: "#aa8d74",
  color: "white",
  padding: "12px 30px",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
};
const backBtnStyle = {
  backgroundColor: "#eee",
  color: "#666",
  padding: "12px 30px",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};
const confirmBtnStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  padding: "12px 30px",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  flex: 1,
};

export default SubscriptionBox;
