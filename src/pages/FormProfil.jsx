import React, { useState } from "react";

const FormProfil = ({ user, onBack }) => {
  const [formData, setFormData] = useState({
    nom: user.nom,
    prenom: user.prenom,
    telephone: user.telephone || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/utilisateurs/${user.id_utilisateur}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (res.ok) {
        alert("Profil mis à jour !");
        onBack();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour
      </button>
      <h2 style={sectionTitle}>Modifier mon profil</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Nom</label>
        <input
          style={inputStyle}
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
        />

        <label>Prénom</label>
        <input
          style={inputStyle}
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
        />

        <label>Téléphone</label>
        <input
          style={inputStyle}
          value={formData.telephone}
          onChange={(e) =>
            setFormData({ ...formData, telephone: e.target.value })
          }
        />

        <button type="submit" style={btnVertStyle}>
          Enregistrer les modifications
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
