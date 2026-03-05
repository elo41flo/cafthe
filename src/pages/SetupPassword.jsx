import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Pages/Login.css"; // On réutilise le même CSS

const SetupPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const [mdp, setMdp] = useState("");
  const [confirmMdp, setConfirmMdp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On applique tes règles de validation strictes
    const mdpRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!mdpRegex.test(mdp)) {
      setErrorMsg(
        "Le mot de passe doit contenir 12 caractères, une majuscule, un chiffre et un caractère spécial.",
      );
      return;
    }

    if (mdp !== confirmMdp) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/clients/setup-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_client: email, mdp_client: mdp }),
      });

      if (response.ok) {
        alert(
          "Mot de passe créé avec succès ! Vous pouvez maintenant vous connecter.",
        );
        navigate("/login");
      } else {
        const data = await response.json();
        setErrorMsg(data.message || "Erreur lors de l'initialisation.");
      }
    } catch (error) {
      setErrorMsg("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card fade-in">
        <img src="/logo_2.webp" alt="Logo Caf'Thé" className="auth-logo" />
        <h1 className="auth-title">Première connexion</h1>
        <p
          className="auth-subtitle"
          style={{ marginBottom: "20px", fontSize: "14px", color: "#666" }}
        >
          Bienvenue ! Définissez un mot de passe pour accéder à votre historique
          magasin et commander en ligne.
        </p>

        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        <p className="auth-section-title">Email : {email}</p>

        <div className="auth-input-group">
          <span className="auth-input-icon">🔒</span>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="auth-input"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <span className="auth-input-icon">✅</span>
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="auth-input"
            value={confirmMdp}
            onChange={(e) => setConfirmMdp(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          Valider mon compte
        </button>
      </form>
    </div>
  );
};

export default SetupPassword;
