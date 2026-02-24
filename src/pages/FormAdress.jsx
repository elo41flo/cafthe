import React, { useState } from "react";
import "../styles/Pages/FormAdress.css"; // Import des styles

const FormAdresse = ({ user, onBack, apiUrl, fetchUserData }) => {
  // On gère l'onglet actif : 'livraison' ou 'facturation'
  const [type, setType] = useState("livraison");

  // Objet pour stocker les nouveaux champs
  const [newAddr, setNewAddr] = useState({
    rue: "",
    cp: "",
    ville: "",
    nom_adresse: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAddr.rue || !newAddr.cp || !newAddr.ville) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/clients/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newAddr,
          type_adresse: type,
        }),
      });

      if (res.ok) {
        alert(`Adresse de ${type} mise à jour !`);
        setNewAddr({ rue: "", cp: "", ville: "", nom_adresse: "" });
        await fetchUserData();
        onBack();
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="address-form-container fade-in">
      <button onClick={onBack} className="address-back-btn">
        ← Retour au compte
      </button>

      <h2 className="address-title">Mes adresses</h2>

      {/* --- ONGLES DE SÉLECTION --- */}
      <div className="tab-container">
        <button
          onClick={() => setType("livraison")}
          className={`tab-btn ${type === "livraison" ? "active" : "inactive"}`}
        >
          Livraison
        </button>
        <button
          onClick={() => setType("facturation")}
          className={`tab-btn ${type === "facturation" ? "active" : "inactive"}`}
        >
          Facturation
        </button>
      </div>

      <p className="address-info-text">
        Vous modifiez votre adresse de <strong>{type}</strong>.
      </p>

      {/* --- FORMULAIRE --- */}
      <form onSubmit={handleSubmit} className="address-form">
        <input
          className="address-input"
          placeholder="Nom de l'adresse (ex: Maison, Bureau...)"
          value={newAddr.nom_adresse}
          onChange={(e) =>
            setNewAddr({ ...newAddr, nom_adresse: e.target.value })
          }
        />

        <input
          className="address-input"
          placeholder="Numéro et nom de rue"
          value={newAddr.rue}
          onChange={(e) => setNewAddr({ ...newAddr, rue: e.target.value })}
          required
        />

        <div className="address-row">
          <input
            className="address-input"
            style={{ flex: 1 }}
            placeholder="Code Postal"
            value={newAddr.cp}
            onChange={(e) => setNewAddr({ ...newAddr, cp: e.target.value })}
            required
          />
          <input
            className="address-input"
            style={{ flex: 2 }}
            placeholder="Ville"
            value={newAddr.ville}
            onChange={(e) => setNewAddr({ ...newAddr, ville: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn-save-address">
          Enregistrer l'adresse de {type}
        </button>
      </form>
    </div>
  );
};

export default FormAdresse;
