import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/CréationClientMagasin.css"; // Import du style

const CreationClientMagasin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mot de passe temporaire pour le client
    const newUser = {
      ...formData,
      password: "CaftheTemporaire2026!",
      role: "client",
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "✅ Compte client créé avec succès !",
        });
        setFormData({ nom: "", prenom: "", email: "", telephone: "" });
      } else {
        setMessage({
          type: "error",
          text: `❌ Erreur : ${data.message || "Impossible de créer le compte"}`,
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "❌ Erreur de connexion au serveur." });
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-card fade-in">
        <h2 className="shop-title">Espace Magasin</h2>
        <p className="shop-subtitle">Création rapide d'un compte client</p>

        {message.text && (
          <div className={`shop-alert ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="shop-form">
          <div className="shop-row">
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

          <p className="shop-pwd-info">
            Mot de passe provisoire : <strong>CaftheTemporaire2026!</strong>
          </p>

          <button type="submit" className="shop-btn-submit">
            Enregistrer le client
          </button>

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
