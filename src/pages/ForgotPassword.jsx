import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Nouveau MDP
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // Pour afficher les erreurs proprement
  const navigate = useNavigate();

  // 1. Déclare l'URL de base (Vite utilise import.meta.env)
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      // 2. Utilise la variable baseUrl
      const response = await fetch(`${baseUrl}/api/clients/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_client: email,
          new_password: newPassword,
        }),
      });
      // ... reste du code

      const data = await response.json();

      if (response.ok) {
        alert("Succès ! Votre mot de passe a été réinitialisé.");
        navigate("/login");
      } else {
        setErrorMsg(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur Reset Password:", error);
      setErrorMsg("Impossible de joindre le serveur.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2 className="auth-title">Réinitialisation</h2>

        {/* Affichage du message d'erreur s'il y en a un */}
        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        {step === 1 ? (
          <form onSubmit={handleCheckEmail}>
            <p className="auth-text">
              Entrez votre email pour modifier votre mot de passe.
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
              Email : <strong>{email}</strong>
            </p>
            <input
              type="password"
              className="auth-input"
              placeholder="Nouveau mot de passe"
              required
              minLength="12" // Sécurité de base
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" className="auth-btn">
              Changer mon mot de passe
            </button>
            <button
              type="button"
              className="auth-btn-secondary"
              onClick={() => setStep(1)}
              style={{
                marginTop: "10px",
                background: "none",
                color: "#666",
                border: "none",
                cursor: "pointer",
              }}
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
