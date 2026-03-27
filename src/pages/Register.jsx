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
    acceptRGPD: false, // État initial de la checkbox
  });

  // Gestion des changements (Input texte et Checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Nettoie l'erreur dès que l'utilisateur modifie le champ
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const mdpRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (formData.nom_client.trim().length < 2) {
      errors.nom_client = "Nom requis (2 caractères min).";
    }
    if (formData.prenom_client.trim().length < 2) {
      errors.prenom_client = "Prénom requis (2 caractères min).";
    }
    if (!emailRegex.test(formData.email_client)) {
      errors.email_client = "Format d'email invalide.";
    }
    if (!mdpRegex.test(formData.mdp_client)) {
      errors.mdp_client =
        "Requis : 12 caractères, 1 Maj, 1 Chiffre et 1 Spécial.";
    }
    if (formData.mdp_client !== formData.confirm_mdp) {
      errors.confirm_mdp = "Les mots de passe ne correspondent pas.";
    }

    // Validation obligatoire du RGPD
    if (!formData.acceptRGPD) {
      errors.acceptRGPD =
        "Vous devez accepter la politique de confidentialité.";
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
      // On envoie les données (sans confirm_mdp et acceptRGPD si ton API n'en a pas besoin)
      const { confirm_mdp, acceptRGPD, ...dataToSend } = formData;

      const response = await fetch(`${baseUrl}/api/clients/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
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

        {/* Email */}
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

        {/* Mot de passe */}
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

        {/* Confirmation */}
        <div className="auth-input-group">
          <label htmlFor="confirm_mdp" className="sr-only">
            Confirmer :
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

        {/* Nom & Prénom */}
        <div className="shop-row">
          <div className="auth-input-wrapper">
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

        {/* --- BLOC RGPD --- */}
        <div className="auth-checkbox-group">
          <div className="auth-checkbox-wrapper">
            <input
              id="acceptRGPD"
              type="checkbox"
              name="acceptRGPD"
              checked={formData.acceptRGPD}
              onChange={handleChange}
            />
            <label htmlFor="acceptRGPD" className="auth-checkbox-label">
              J'accepte que mes données soient collectées pour la gestion de mon
              compte conformément à la{" "}
              <Link to="/Politiqueconfidentialite" className="auth-link-small">
                politique de confidentialité
              </Link>{" "}
              *
            </label>
          </div>
          {formErrors.acceptRGPD && (
            <span className="error-text">{formErrors.acceptRGPD}</span>
          )}
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
