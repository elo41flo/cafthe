import React, { useState } from "react";

const FormAdresse = ({ user, onBack }) => {
  const [adresse, setAdresse] = useState(user.adresse_principale || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `http://localhost:3000/api/utilisateurs/${user.id_utilisateur}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adresse_principale: adresse }),
        },
      );
      onBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour
      </button>
      <h2 style={sectionTitle}>Mes adresses</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Adresse de livraison complète</label>
        <textarea
          style={{ ...inputStyle, height: "100px" }}
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Rue, Code Postal, Ville..."
        />
        <button type="submit" style={btnVertStyle}>
          Mettre à jour l'adresse
        </button>
      </form>
    </div>
  );
};

const formContainer = {
  maxWidth: "600px",
  margin: "60px auto",
  padding: "20px",
  fontFamily: "Montserrat",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "30px",
};
const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontFamily: "Montserrat",
};
const btnVertStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  borderRadius: "15px",
  padding: "12px",
  fontWeight: "bold",
  cursor: "pointer",
};
const backBtn = {
  background: "none",
  border: "none",
  color: "#97af6e",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "20px",
};
