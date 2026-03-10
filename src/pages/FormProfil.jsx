// Importations
import React, { useState } from "react";
import "../styles/Pages/FormProfil.css";

const FormProfil = ({ user, onBack, apiUrl, fetchUserData }) => {
  // Initialisation de l'état avec les données actuelles de l'utilisateur
  const [formData, setFormData] = useState({
    nom: user?.nom_client || "",
    prenom: user?.prenom_client || "",
    telephone: user?.telephone || "",
  });

  // Fonction pour envoyer les modifications au serveur
  const handleSubmit = async (e) => {
    e.preventDefault(); // On empêche le rechargement de la page au clic sur le bouton
    try {
      // Récupération du token JWT pour prouver que l'utilisateur est bien connecté
      const token = localStorage.getItem("token");

      // Appel API en PUT
      const res = await fetch(`${apiUrl}/api/clients/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // On envoie le token pour sécuriser l'accès
        },
        body: JSON.stringify(formData), // On transforme l'objet JS en chaîne JSON
      });

      if (res.ok) {
        alert("Profil mis à jour !");
        // Je demande au composant parent de rafraîchir les données pour mettre à jour l'affichage
        await fetchUserData();
        // Je rappelle la fonction onBack pour quitter le formulaire
        onBack();
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (err) {
      // Log de l'erreur dans la console pour faciliter le débogage
      console.error("Erreur update-profile:", err);
    }
  };

  return (
    <div className="profile-form-container fade-in">
      <button onClick={onBack} className="profile-back-btn">
        ← Retour
      </button>

      <h2 className="profile-title">Modifier mon profil</h2>

      {/* Début du formulaire de modification */}
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
          type="tel"
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
