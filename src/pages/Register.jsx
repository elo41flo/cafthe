import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Pages/Register.css"; // Import du style commun

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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formData.nom_client.trim().length < 2)
      errors.nom_client = "Nom requis.";
    if (formData.prenom_client.trim().length < 2)
      errors.prenom_client = "Prénom requis.";

    if (!formData.email_client) {
      errors.email_client = "Email requis.";
    } else if (!emailRegex.test(formData.email_client)) {
      errors.email_client = "Format d'email invalide.";
    }

    if (formData.mdp_client.length < 12) {
      errors.mdp_client = "Le mot de passe doit faire au moins 12 caractères.";
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

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setErrorMsg(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setErrorMsg("Le serveur ne répond pas.");
    }
  };

  return (
    <div className="auth-container">
      <form
        onSubmit={handleSubmit}
        className="auth-card fade-in"
        style={{ maxWidth: "450px" }}
      >
        <img
          src="/logo_2.webp"
          alt="Caf'Thé"
          className="auth-logo"
          style={{ height: "80px" }}
        />
        <h1 className="auth-title">S’inscrire</h1>

        {errorMsg && <p className="shop-alert error">{errorMsg}</p>}

        <p className="auth-section-title">
          IDENTITÉ <span style={{ color: "red" }}>*</span>
        </p>

        <div className="auth-input-group">
          <span className="auth-input-icon">👤</span>
          <input
            type="text"
            name="nom_client"
            placeholder="Nom *"
            className={`auth-input ${formErrors.nom_client ? "has-error" : ""}`}
            style={{ paddingLeft: "55px" }}
            onChange={handleChange}
            autoComplete="off"
          />
          {formErrors.nom_client && (
            <span className="auth-validation-error">
              {formErrors.nom_client}
            </span>
          )}
        </div>

        <div className="auth-input-group">
          <span className="auth-input-icon">📇</span>
          <input
            type="text"
            name="prenom_client"
            placeholder="Prénom *"
            className={`auth-input ${formErrors.prenom_client ? "has-error" : ""}`}
            style={{ paddingLeft: "55px" }}
            onChange={handleChange}
            autoComplete="off"
          />
          {formErrors.prenom_client && (
            <span className="auth-validation-error">
              {formErrors.prenom_client}
            </span>
          )}
        </div>

        <div className="auth-input-group">
          <span className="auth-input-icon">@</span>
          <input
            type="email"
            name="email_client"
            placeholder="E-mail *"
            className={`auth-input ${formErrors.email_client ? "has-error" : ""}`}
            style={{ paddingLeft: "55px" }}
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
            placeholder="Mot de passe (12 car. min) *"
            className={`auth-input ${formErrors.mdp_client ? "has-error" : ""}`}
            style={{ paddingLeft: "55px" }}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {formErrors.mdp_client && (
            <span className="auth-validation-error">
              {formErrors.mdp_client}
            </span>
          )}
        </div>

        <p className="auth-section-title">ADRESSES</p>

        <div className="auth-input-group">
          <span className="auth-input-icon">🚚</span>
          <input
            type="text"
            name="adresse_livraison"
            placeholder="Adresse de livraison"
            className="auth-input"
            style={{ paddingLeft: "55px" }}
            onChange={handleChange}
          />
        </div>

        <div
          className="shop-row"
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <input
            type="text"
            name="cp_livraison"
            placeholder="Code Postal"
            className="auth-input"
            style={{ paddingLeft: "20px" }}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ville_livraison"
            placeholder="Ville"
            className="auth-input"
            style={{ paddingLeft: "20px" }}
            onChange={handleChange}
          />
        </div>

        <div className="auth-checkbox-wrapper">
          <input type="checkbox" id="cgu" required />
          <label htmlFor="cgu" className="auth-checkbox-label">
            J’accepte les{" "}
            <Link
              to="/cgv"
              style={{ fontWeight: "bold", color: "var(--color-text)" }}
            >
              CGV
            </Link>{" "}
            et la{" "}
            <Link
              to="/politique-de-confidentialite"
              style={{ fontWeight: "bold", color: "var(--color-text)" }}
            >
              Politique de confidentialité
            </Link>
            .
          </label>
        </div>

        <button type="submit" className="auth-btn" style={{ width: "100%" }}>
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
