// Importations
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/ForgotPassword.css";

const ForgotPassword = () => {
  // États pour stocker les saisies de l'utilisateur et gérer les erreurs
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Vérification email / Nouveau MDP
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // URL de mon serveur récupérée depuis mon fichier de configuration .env
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Vérifier si l'utilisateur existe bien dans la base de données ---
  const handleCheckEmail = async (e) => {
    e.preventDefault(); // J'empêche le rechargement de la page
    setErrorMsg(""); // Je réinitialise les erreurs à chaque tentative

    try {
      // Appel API en POST pour envoyer l'email au serveur
      const response = await fetch(`${baseUrl}/api/clients/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_client: email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si l'email est trouvé, on passe à l'étape du nouveau mot de passe
        setStep(2);
      } else {
        // Sinon, j'affiche le message d'erreur envoyé par le serveur
        setErrorMsg(data.message || "Email non reconnu.");
      }
    } catch (error) {
      console.error("Erreur check-email:", error);
      setErrorMsg("Le serveur ne répond pas.");
    }
  };

  // Envoyer le nouveau mot de passe pour mise à jour ---
  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      // J'utilise la méthode PUT car je vais modifier une donnée existante (le MDP)
      const response = await fetch(`${baseUrl}/api/clients/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_client: email,
          new_password: newPassword, // Le nouveau MDP saisi à l'étape 2
        }),
      });

      if (response.ok) {
        alert("Succès ! Votre mot de passe a été modifié.");
        // Une fois changé, je redirige l'utilisateur vers la page de connexion
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

        {/* Affichage conditionnel de l'erreur si elle existe */}
        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        {/* AFFICHAGE CONDITIONNEL SELON L'ÉTAPE */}
        {step === 1 ? (
          // Saisie de l'email
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
          // Saisie du nouveau mot de passe
          <form onSubmit={handleReset}>
            <p className="auth-text">
              Nouveau mot de passe pour <strong>{email}</strong>
            </p>
            <input
              type="password"
              className="auth-input"
              placeholder="12 caractères minimum"
              required
              minLength="12" // Sécurité : je force une longueur minimale
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" className="auth-btn">
              Changer mon mot de passe
            </button>
            {/* Bouton pour revenir à l'étape 1 si on s'est trompé d'email */}
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
