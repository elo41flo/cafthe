import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ForgotPassword.css"; // On importe le style commun à l'authentification

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Nouveau MDP
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    // Simulation : dans un vrai cas, on vérifierait si l'email existe en BDD
    setStep(2);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/clients/reset-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_client: email,
            new_password: newPassword,
          }),
        },
      );

      if (response.ok) {
        alert("Succès ! Votre mot de passe a été réinitialisé.");
        navigate("/login");
      }
    } catch (error) {
      alert("Erreur lors de la réinitialisation.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2 className="auth-title">Réinitialisation</h2>

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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" className="auth-btn">
              Changer mon mot de passe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
