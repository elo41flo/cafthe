import React, { useState } from "react";

const FormAdresse = ({ user, onBack, apiUrl, fetchUserData }) => {
  // On gère l'onglet actif : 'livraison' ou 'facturation'
  const [type, setType] = useState("livraison");

  // Objet pour stocker les nouveaux champs
  const [newAddr, setNewAddr] = useState({
    rue: "",
    cp: "",
    ville: "",
    nom_adresse: "", // Optionnel : pour donner un petit nom (Maison, Travail...)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAddr.rue || !newAddr.cp || !newAddr.ville) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // On utilise la route update-address que ton backend connaît
      const res = await fetch(`${apiUrl}/api/clients/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newAddr,
          type_adresse: type, // Indique au backend quelle adresse modifier
        }),
      });

      if (res.ok) {
        alert(`Adresse de ${type} mise à jour !`);
        setNewAddr({ rue: "", cp: "", ville: "", nom_adresse: "" });
        await fetchUserData(); // Pour rafraîchir les infos sur MonCompte.jsx
        onBack();
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour au compte
      </button>

      <h2 style={sectionTitle}>Mes adresses</h2>

      {/* --- ONGLES DE SÉLECTION --- */}
      <div style={tabContainer}>
        <button
          onClick={() => setType("livraison")}
          style={type === "livraison" ? activeTab : inactiveTab}
        >
          Livraison
        </button>
        <button
          onClick={() => setType("facturation")}
          style={type === "facturation" ? activeTab : inactiveTab}
        >
          Facturation
        </button>
      </div>

      <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
        Vous modifiez votre adresse de <strong>{type}</strong>.
      </p>

      {/* --- FORMULAIRE DÉTAILLÉ --- */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          style={inputStyle}
          placeholder="Nom de l'adresse (ex: Maison, Bureau...)"
          value={newAddr.nom_adresse}
          onChange={(e) =>
            setNewAddr({ ...newAddr, nom_adresse: e.target.value })
          }
        />

        <input
          style={inputStyle}
          placeholder="Numéro et nom de rue"
          value={newAddr.rue}
          onChange={(e) => setNewAddr({ ...newAddr, rue: e.target.value })}
          required
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            style={{ ...inputStyle, flex: 1 }}
            placeholder="Code Postal"
            value={newAddr.cp}
            onChange={(e) => setNewAddr({ ...newAddr, cp: e.target.value })}
            required
          />
          <input
            style={{ ...inputStyle, flex: 2 }}
            placeholder="Ville"
            value={newAddr.ville}
            onChange={(e) => setNewAddr({ ...newAddr, ville: e.target.value })}
            required
          />
        </div>

        <button type="submit" style={btnVertStyle}>
          Enregistrer l'adresse de {type}
        </button>
      </form>
    </div>
  );
};

// --- STYLES ---
const formContainer = {
  maxWidth: "600px",
  margin: "60px auto",
  padding: "20px",
  fontFamily: "Montserrat",
};
const sectionTitle = {
  fontFamily: "Playfair Display",
  color: "#aa8d74",
  fontSize: "28px",
  marginBottom: "20px",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};
const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontFamily: "Montserrat",
  fontSize: "15px",
};
const btnVertStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  borderRadius: "15px",
  padding: "15px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};
const backBtn = {
  background: "none",
  border: "none",
  color: "#97af6e",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "20px",
};

// Styles pour les onglets
const tabContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};
const activeTab = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#aa8d74",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};
const inactiveTab = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#f5f5f5",
  color: "#888",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default FormAdresse;
