import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Pages/Login.css"; // Import du style commun

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
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
      navigate("/");
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
        <img
          src="/src/assets/logo_2.webp"
          alt="Logo Caf'Thé"
          className="auth-logo"
        />

        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        <div className="auth-input-group">
          <span className="auth-input-icon">@</span>
          <input
            type="email"
            placeholder="E-mail"
            className="auth-input"
            style={{ paddingLeft: "55px" }} // On garde un petit décalage pour l'icône
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="auth-input-group">
          <span className="auth-input-icon">🔒</span>
          <input
            type="password"
            placeholder="Mot de passe"
            className="auth-input"
            style={{ paddingLeft: "55px" }}
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <Link to="/forgot-password" size="small" className="auth-forgot-link">
          Mot de passe oublié ?
        </Link>

        <button type="submit" className="auth-btn" style={{ width: "100%" }}>
          Se connecter
        </button>

        <button
          type="button"
          onClick={handleVisitor}
          className="auth-btn-visitor"
        >
          Continuer en tant que visiteur
        </button>

        <p className="auth-footer-text">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
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
