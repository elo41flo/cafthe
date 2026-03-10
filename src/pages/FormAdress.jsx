// Importations
import React, { useState } from "react";
import "../styles/Pages/FormAdress.css";

const FormAdresse = ({ user, onBack, apiUrl, fetchUserData }) => {
  // État pour savoir si l'utilisateur modifie l'adresse de 'livraison' ou de 'facturation'
  const [type, setType] = useState("livraison");

  // Objet d'état pour regrouper tous les champs du formulaire d'adresse
  const [newAddr, setNewAddr] = useState({
    rue: "",
    cp: "",
    ville: "",
    nom_adresse: "",
  });

  // Fonction de soumission du formulaire vers le Back-end
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérification de base pour s'assurer que les champs obligatoires sont remplis
    if (!newAddr.rue || !newAddr.cp || !newAddr.ville) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      // Récupération du token JWT stocké lors de la connexion pour identifier l'utilisateur
      const token = localStorage.getItem("token");

      // Appel API en méthode PUT pour mettre à jour les informations en base de données
      const res = await fetch(`${apiUrl}/api/clients/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Passage du token dans les headers pour la sécurité
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newAddr, // Je copie les champs de l'adresse
          type_adresse: type, // J'ajoute le type (livraison ou facturation)
        }),
      });

      if (res.ok) {
        alert(`Adresse de ${type} mise à jour !`);
        // Je vide le formulaire après le succès
        setNewAddr({ rue: "", cp: "", ville: "", nom_adresse: "" });
        // Je rafraîchis les données de l'utilisateur dans l'application globale
        await fetchUserData();
        // Je ramène l'utilisateur à l'écran précédent
        onBack();
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error("Erreur update-address:", err);
    }
  };

  return (
    <div className="address-form-container fade-in">
      {/* Bouton pour annuler et revenir au profil */}
      <button onClick={onBack} className="address-back-btn">
        ← Retour au compte
      </button>

      <h2 className="address-title">Mes adresses</h2>

      {/* 
          SYSTÈME D'ONGLETS
          Permet de basculer entre l'adresse de livraison et de facturation sur le même écran.
      */}
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

      {/* FORMULAIRE D'ADRESSE */}
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

        {/* Ligne regroupant Code Postal et Ville pour un design plus compact */}
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
