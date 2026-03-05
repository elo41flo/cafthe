import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Pages/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
        <h1 className="auth-title">Connexion</h1>

        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        <p className="auth-section-title">Vos identifiants</p>

        <div className="auth-input-group">
          <span className="auth-input-icon">@</span>
          <input
            type="email"
            placeholder="E-mail"
            className="auth-input"
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
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <Link to="/forgot-password" className="auth-forgot-link">
          Mot de passe oublié ?
        </Link>

        <button type="submit" className="auth-btn">
          Se connecter
        </button>

        <button
          type="button"
          onClick={handleVisitor}
          className="auth-btn-visitor"
        >
          Continuer en tant que visiteur
        </button>

        <div className="auth-footer-text">
          <p>Pas encore de compte ?</p>
          <Link
            to={
              redirectPath ? `/register?redirect=${redirectPath}` : "/register"
            }
            className="auth-register-link"
          >
            S’inscrire
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
