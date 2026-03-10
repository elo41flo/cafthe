// Importations
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/CréationClientMagasin.css";

const CreationClientMagasin = () => {
  // Le hook pour rediriger l'employé vers son espace après la création
  const navigate = useNavigate();

  // État local pour stocker les informations saisies dans le formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  // État pour afficher les messages de succès ou d'erreur après l'appel API
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fonction pour envoyer les données au serveur
  const handleSubmit = async (e) => {
    e.preventDefault(); // J'évite que la page ne se recharge toute seule

    // Je prépare l'objet à envoyer.
    // Comme c'est une création "magasin", je définis un mot de passe par défaut
    const newUser = {
      ...formData,
      password: "CaftheTemporaire2026!", // Mot de passe provisoire à changer par le client plus tard
      role: "client", // Je force le rôle à "client" par sécurité
    };

    try {
      // Appel à mon endpoint d'inscription (Register) en méthode POST
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        // Si ça marche, j'affiche un message de succès et je vide le formulaire
        setMessage({
          type: "success",
          text: "✅ Compte client créé avec succès !",
        });
        setFormData({ nom: "", prenom: "", email: "", telephone: "" });
      } else {
        // Si le serveur renvoie une erreur (ex: email déjà utilisé)
        setMessage({
          type: "error",
          text: `❌ Erreur : ${data.message || "Impossible de créer le compte"}`,
        });
      }
    } catch (error) {
      // Gestion de l'erreur si le serveur est éteint par exemple
      setMessage({ type: "error", text: "❌ Erreur de connexion au serveur." });
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-card fade-in">
        <h2 className="shop-title">Espace Magasin</h2>
        <p className="shop-subtitle">Création rapide d'un compte client</p>

        {/* Affichage dynamique de l'alerte de succès ou d'erreur */}
        {message.text && (
          <div className={`shop-alert ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="shop-form">
          <div className="shop-row">
            {/* Je lie chaque input à mon état formData via "value" et "onChange" */}
            <input
              type="text"
              placeholder="Prénom"
              className="shop-input"
              required
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Nom"
              className="shop-input"
              required
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
            />
          </div>

          <input
            type="email"
            placeholder="Adresse Email"
            className="shop-input"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="tel"
            placeholder="Téléphone (Optionnel)"
            className="shop-input"
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
          />

          {/* Rappel visuel du mot de passe pour l'employé du magasin */}
          <p className="shop-pwd-info">
            Mot de passe provisoire : <strong>CaftheTemporaire2026!</strong>
          </p>

          <button type="submit" className="shop-btn-submit">
            Enregistrer le client
          </button>

          {/* Bouton secondaire pour annuler et revenir au compte employé */}
          <button
            type="button"
            onClick={() => navigate("/mon-compte")}
            className="shop-btn-back"
          >
            Retour au compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreationClientMagasin;
