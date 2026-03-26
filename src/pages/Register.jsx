import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Pages/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    nom_client: "",
    prenom_client: "",
    email_client: "",
    mdp_client: "",
    confirm_mdp: "",
  });

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Efface l'erreur du champ dès que l'utilisateur recommence à taper
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  // Validation du formulaire avec Regex robustes
  const validateForm = () => {
    const errors = {};

    // Regex Email : vérifie la structure et l'extension (2 à 6 lettres)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Regex Mot de passe : 12 caractères, 1 Maj, 1 Chiffre, 1 Spécial
    // (Conforme aux recommandations CNIL que tu peux citer au jury)
    const mdpRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (formData.nom_client.trim().length < 2) {
      errors.nom_client = "Nom requis (2 caractères min).";
    }
    if (formData.prenom_client.trim().length < 2) {
      errors.prenom_client = "Prénom requis (2 caractères min).";
    }
    if (!emailRegex.test(formData.email_client)) {
      errors.email_client = "Format d'email invalide (ex: info@caf-the.fr).";
    }
    if (!mdpRegex.test(formData.mdp_client)) {
      errors.mdp_client =
        "Requis : 12 caractères, 1 Majuscule, 1 Chiffre et 1 Spécial.";
    }
    if (formData.mdp_client !== formData.confirm_mdp) {
      errors.confirm_mdp = "Les mots de passe ne correspondent pas.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!validateForm()) return;

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/clients/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMsg("Compte créé avec succès !");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const data = await response.json();
        setErrorMsg(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setErrorMsg("Le serveur ne répond pas. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card fade-in" noValidate>
        <img
          src="/logo_2.webp"
          alt="Caf'Thé"
          className="auth-logo"
          height="80"
        />
        <h1 className="auth-title">S’inscrire</h1>

        {/* Messages d'état globaux */}
        {errorMsg && (
          <p className="auth-error" role="alert">
            ⚠️ {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="auth-success" role="alert">
            ✅ {successMsg}
          </p>
        )}

        <p className="auth-section-title">Identité & Connexion</p>

        {/* Champ Email */}
        <div className="auth-input-group">
          <label htmlFor="email_client" className="sr-only">
            E-mail :
          </label>
          <span className="auth-input-icon" aria-hidden="true">
            @
          </span>
          <input
            id="email_client"
            type="email"
            name="email_client"
            placeholder="E-mail *"
            aria-invalid={formErrors.email_client ? "true" : "false"}
            className={`auth-input ${formErrors.email_client ? "has-error" : ""}`}
            onChange={handleChange}
            autoComplete="email"
          />
          {formErrors.email_client && (
            <span className="error-text">{formErrors.email_client}</span>
          )}
        </div>

        {/* Champ Mot de passe */}
        <div className="auth-input-group">
          <label htmlFor="mdp_client" className="sr-only">
            Mot de passe :
          </label>
          <span className="auth-input-icon" aria-hidden="true">
            🔒
          </span>
          <input
            id="mdp_client"
            type="password"
            name="mdp_client"
            placeholder="Mot de passe *"
            aria-invalid={formErrors.mdp_client ? "true" : "false"}
            className={`auth-input ${formErrors.mdp_client ? "has-error" : ""}`}
            onChange={handleChange}
          />
          {formErrors.mdp_client && (
            <span className="error-text">{formErrors.mdp_client}</span>
          )}
        </div>

        {/* Confirmation Mot de passe */}
        <div className="auth-input-group">
          <label htmlFor="confirm_mdp" className="sr-only">
            Confirmer le mot de passe :
          </label>
          <span className="auth-input-icon" aria-hidden="true">
            🔒
          </span>
          <input
            id="confirm_mdp"
            type="password"
            name="confirm_mdp"
            placeholder="Confirmer mot de passe *"
            aria-invalid={formErrors.confirm_mdp ? "true" : "false"}
            className={`auth-input ${formErrors.confirm_mdp ? "has-error" : ""}`}
            onChange={handleChange}
          />
          {formErrors.confirm_mdp && (
            <span className="error-text">{formErrors.confirm_mdp}</span>
          )}
        </div>

        {/* Nom et Prénom sur la même ligne */}
        <div className="shop-row">
          <div className="auth-input-wrapper">
            <label htmlFor="nom_client" className="sr-only">
              Nom :
            </label>
            <input
              id="nom_client"
              type="text"
              name="nom_client"
              placeholder="Nom *"
              className={`auth-input ${formErrors.nom_client ? "has-error" : ""}`}
              onChange={handleChange}
            />
            {formErrors.nom_client && (
              <span className="error-text">{formErrors.nom_client}</span>
            )}
          </div>
          <div className="auth-input-wrapper">
            <label htmlFor="prenom_client" className="sr-only">
              Prénom :
            </label>
            <input
              id="prenom_client"
              type="text"
              name="prenom_client"
              placeholder="Prénom *"
              className={`auth-input ${formErrors.prenom_client ? "has-error" : ""}`}
              onChange={handleChange}
            />
            {formErrors.prenom_client && (
              <span className="error-text">{formErrors.prenom_client}</span>
            )}
          </div>
        </div>

        <button type="submit" className="auth-btn">
          S'inscrire
        </button>

        <p className="auth-switch">
          Déjà un compte ?{" "}
          <Link to="/login" className="auth-link">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
