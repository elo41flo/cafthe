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
    adresse_livraison: "",
    ville_livraison: "",
    cp_livraison: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mdpRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (formData.nom_client.trim().length < 2)
      errors.nom_client = "Nom requis.";
    if (formData.prenom_client.trim().length < 2)
      errors.prenom_client = "Prénom requis.";
    if (!emailRegex.test(formData.email_client))
      errors.email_client = "Email invalide.";

    if (!mdpRegex.test(formData.mdp_client)) {
      errors.mdp_client =
        "Requis : 12 caractères, 1 Majuscule, 1 Chiffre et 1 Caractère spécial (@$!%*?&).";
    }

    if (formData.mdp_client !== formData.confirm_mdp) {
      setErrorMsg("Les mots de passe ne correspondent pas");
      return false;
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
        {successMsg && (
          <p className="auth-success" style={{ color: "green" }}>
            ✅ {successMsg}
          </p>
        )}

        <p className="auth-section-title">Identité</p>

        <div className="auth-input-group">
          <label htmlFor="email_client" className="sr-only">
            E-mail :
          </label>
          <span className="auth-input-icon">@</span>
          <input
            id="email_client"
            type="email"
            name="email_client"
            placeholder="E-mail *"
            className={`auth-input ${formErrors.email_client ? "has-error" : ""}`}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="mdp_client" className="sr-only">
            Mot de passe :
          </label>
          <span className="auth-input-icon">🔒</span>
          <input
            id="mdp_client"
            type="password"
            name="mdp_client"
            placeholder="Mot de passe *"
            className={`auth-input ${formErrors.mdp_client ? "has-error" : ""}`}
            onChange={handleChange}
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="confirm_mdp" className="sr-only">
            Confirmer le mot de passe :
          </label>
          <span className="auth-input-icon">🔒</span>
          <input
            id="confirm_mdp"
            type="password"
            name="confirm_mdp"
            placeholder="Confirmer mot de passe *"
            className="auth-input"
            onChange={handleChange}
          />
        </div>

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
          </div>
        </div>

        <button type="submit" className="auth-btn">
          S'inscrire
        </button>

        {/* LIEN DE CONNEXION RÉINSÉRÉ ICI */}
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
