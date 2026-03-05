import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Pages/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    nom_client: "",
    prenom_client: "",
    email_client: "",
    mdp_client: "",
    adresse_livraison: "",
    ville_livraison: "",
    cp_livraison: "",
    adresse_facturation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Regex Email : doit contenir un @ et un . (avec des caractères autour)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex Mot de passe : 1 Majuscule, 1 Chiffre, 1 Caractère spécial
    const mdpRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    // Validation Identité
    if (formData.nom_client.trim().length < 2)
      errors.nom_client = "Nom requis.";
    if (formData.prenom_client.trim().length < 2)
      errors.prenom_client = "Prénom requis.";

    // Validation Email
    if (!formData.email_client) {
      errors.email_client = "Email requis.";
    } else if (!emailRegex.test(formData.email_client)) {
      errors.email_client = "L'email doit contenir un '@' et un '.'.";
    }

    // Validation Mot de passe
    if (!formData.mdp_client) {
      errors.mdp_client = "Mot de passe requis.";
    } else if (!mdpRegex.test(formData.mdp_client)) {
      errors.mdp_client =
        "Requis : 12 caractères, 1 Majuscule, 1 Chiffre et 1 Caractère spécial (@$!%*?&).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validateForm()) return;

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/clients/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setErrorMsg(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setErrorMsg("Le serveur ne répond pas.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card fade-in">
        <img
          src="/logo_2.webp"
          alt="Caf'Thé"
          className="auth-logo"
          height="80"
        />
        <h1 className="auth-title">S’inscrire</h1>

        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        <p className="auth-section-title">Identité</p>

        <div className="auth-input-group">
          <span className="auth-input-icon">@</span>
          <input
            type="email"
            name="email_client"
            placeholder="E-mail *"
            className={`auth-input ${formErrors.email_client ? "has-error" : ""}`}
            onChange={handleChange}
            autoComplete="email"
          />
          {formErrors.email_client && (
            <span className="auth-validation-error">
              {formErrors.email_client}
            </span>
          )}
        </div>

        <div className="auth-input-group">
          <span className="auth-input-icon">🔒</span>
          <input
            type="password"
            name="mdp_client"
            placeholder="Mot de passe *"
            className={`auth-input ${formErrors.mdp_client ? "has-error" : ""}`}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {formErrors.mdp_client && (
            <span className="auth-validation-error">
              {formErrors.mdp_client}
            </span>
          )}
        </div>

        <div className="shop-row">
          <input
            type="text"
            name="nom_client"
            placeholder="Nom *"
            className={`auth-input ${formErrors.nom_client ? "has-error" : ""}`}
            onChange={handleChange}
          />
          <input
            type="text"
            name="prenom_client"
            placeholder="Prénom *"
            className={`auth-input ${formErrors.prenom_client ? "has-error" : ""}`}
            onChange={handleChange}
          />
        </div>

        <p className="auth-section-title">Adresses</p>

        <div className="auth-input-group">
          <input
            type="text"
            name="adresse_livraison"
            placeholder="Adresse de livraison"
            className="auth-input"
            style={{ paddingLeft: "20px" }}
            onChange={handleChange}
          />
        </div>

        <div className="shop-row">
          <input
            type="text"
            name="cp_livraison"
            placeholder="CP"
            className="auth-input"
            onChange={handleChange}
          />
          <input
            type="text"
            name="ville_livraison"
            placeholder="Ville"
            className="auth-input"
            onChange={handleChange}
          />
        </div>

        <div className="auth-checkbox-wrapper">
          <input type="checkbox" id="cgu" required />
          <label htmlFor="cgu" className="auth-checkbox-label">
            J’accepte les <strong>CGV</strong> et la{" "}
            <strong>Politique de confidentialité</strong>.
          </label>
        </div>

        <button type="submit" className="auth-btn">
          Créer mon compte
        </button>

        <div className="auth-footer-text">
          <p>Vous avez déjà un compte ?</p>
          <Link
            to="/login"
            style={{ fontWeight: "bold", color: "var(--color-primary)" }}
          >
            Se connecter
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
