import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // On ajoute useLocation
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Pages/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // On récupère l'objet location pour lire l'URL

  // On extrait le paramètre "redirect" de l'URL (ex: /login?redirect=livraisonretrait)
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect");

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/clients/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_client: email, mdp_client: motDePasse }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Identifiants incorrects");
        return;
      }

      localStorage.setItem("token", data.token);
      login(data.token, data.client);

      // --- LA LOGIQUE DE REDIRECTION ---
      // Si redirectPath existe (ex: "livraisonretrait"), on y va.
      // Sinon, on va à l'accueil "/"
      if (redirectPath) {
        navigate(`/${redirectPath}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMsg("Erreur de connexion au serveur.");
    }
  };

  const handleVisitor = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card fade-in">
        <img src="/logo_2.webp" alt="Logo Caf'Thé" className="auth-logo" />

        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        <div className="auth-input-group">
          <span className="auth-input-icon">@</span>
          <input
            type="email"
            placeholder="E-mail"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <span className="auth-input-icon">🔒</span>
          <input
            type="password"
            placeholder="Mot de passe"
            className="auth-input"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <Link to="/forgot-password" className="auth-forgot-link">
          Mot de passe oublié ?
        </Link>

        {/* Emojis dans des spans pour le positionnement CSS */}
        <button type="submit" className="auth-btn">
          <span>🔑</span> Se connecter
        </button>

        <button
          type="button"
          onClick={handleVisitor}
          className="auth-btn-visitor"
        >
          <span>👀</span> Continuer en tant que visiteur
        </button>

        <p className="auth-footer-text">
          Pas encore de compte ?{" "}
          <Link
            to={
              redirectPath ? `/register?redirect=${redirectPath}` : "/register"
            }
            style={{ fontWeight: "bold", color: "var(--color-text)" }}
          >
            S’inscrire
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
