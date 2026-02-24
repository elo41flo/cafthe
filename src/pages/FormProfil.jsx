import React, { useState } from "react";
import "../styles/Pages/FormProfil.css"; // Import des styles

const FormProfil = ({ user, onBack, apiUrl, fetchUserData }) => {
  const [formData, setFormData] = useState({
    nom: user?.nom_client || "",
    prenom: user?.prenom_client || "",
    telephone: user?.telephone || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/clients/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profil mis à jour !");
        await fetchUserData(); // Rafraîchit les données dans le composant parent
        onBack();
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-form-container fade-in">
      <button onClick={onBack} className="profile-back-btn">
        ← Retour
      </button>

      <h2 className="profile-title">Modifier mon profil</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <label htmlFor="nom">Nom</label>
        <input
          id="nom"
          className="profile-input"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          required
        />

        <label htmlFor="prenom">Prénom</label>
        <input
          id="prenom"
          className="profile-input"
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          required
        />

        <label htmlFor="tel">Téléphone</label>
        <input
          id="tel"
          className="profile-input"
          value={formData.telephone}
          onChange={(e) =>
            setFormData({ ...formData, telephone: e.target.value })
          }
        />

        <button type="submit" className="btn-update-profile">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default FormProfil;
