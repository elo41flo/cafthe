import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Nouveau MDP
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // --- ÉTAPE 1 : LA FONCTION QUI MANQUAIT ---
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    console.log("Vérification de l'email :", email);

    try {
      const response = await fetch(`${baseUrl}/api/clients/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_client: email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2); // On passe au changement de mot de passe
      } else {
        setErrorMsg(data.message || "Email non reconnu.");
      }
    } catch (error) {
      console.error("Erreur check-email:", error);
      setErrorMsg("Le serveur ne répond pas.");
    }
  };

  // --- ÉTAPE 2 : LE RESET EFFECTIF ---
  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await fetch(`${baseUrl}/api/clients/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_client: email,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        alert("Succès ! Mot de passe modifié.");
        navigate("/login");
      } else {
        const data = await response.json();
        setErrorMsg(data.message || "Erreur lors de la mise à jour.");
      }
    } catch (error) {
      setErrorMsg("Erreur réseau.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2 className="auth-title">Réinitialisation</h2>
        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        {step === 1 ? (
          <form onSubmit={handleCheckEmail}>
            <p className="auth-text">
              Entrez votre email pour vérifier votre compte.
            </p>
            <input
              type="email"
              className="auth-input"
              placeholder="Votre e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="auth-btn">
              Vérifier mon compte
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <p className="auth-text">
              Nouveau mot de passe pour <strong>{email}</strong>
            </p>
            <input
              type="password"
              className="auth-input"
              placeholder="12 caractères minimum"
              required
              minLength="12"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" className="auth-btn">
              Changer mon mot de passe
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="auth-btn-visitor"
            >
              Retour
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
