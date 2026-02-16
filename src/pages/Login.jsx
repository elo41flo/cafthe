import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

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
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <img
          src="/src/assets/logo_2.webp"
          alt="Logo"
          style={{ height: "120px", marginBottom: "50px" }}
        />

        {errorMsg && (
          <p style={{ color: "red", marginBottom: "20px" }}>{errorMsg}</p>
        )}

        <div style={inputContainerStyle}>
          <span style={iconStyle}>@</span>
          <input
            type="email"
            placeholder="E-mail"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <span style={iconStyle}>🔒</span>
          <input
            type="password"
            placeholder="Mot de passe"
            style={inputStyle}
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Se connecter
        </button>

        {/* --- LE BOUTON EST ICI MAINTENANT --- */}
        <button
          type="button"
          onClick={handleVisitor}
          style={visitorButtonStyle}
        >
          Continuer en tant que visiteur
        </button>

        <p style={{ fontFamily: "Montserrat", marginTop: "20px" }}>
          Pas encore de compte ?{" "}
          <Link to="/register" style={{ fontWeight: "bold", color: "#000" }}>
            S’inscrire
          </Link>
        </p>
      </form>
    </div>
  );
};

// Styles (Inchangés)
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
};
const inputContainerStyle = {
  position: "relative",
  width: "100%",
  marginBottom: "20px",
};
const iconStyle = {
  position: "absolute",
  left: "20px",
  top: "50%",
  transform: "translateY(-50%)",
};
const inputStyle = {
  width: "100%",
  padding: "15px 15px 15px 55px",
  borderRadius: "30px",
  border: "none",
  backgroundColor: "#97af6e",
  boxSizing: "border-box",
};
const buttonStyle = {
  backgroundColor: "#97af6e",
  padding: "15px 60px",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  fontWeight: "bold",
};
const visitorButtonStyle = {
  backgroundColor: "transparent",
  color: "#333",
  padding: "10px 30px",
  borderRadius: "25px",
  border: "1px solid #97af6e",
  cursor: "pointer",
  marginTop: "15px",
  fontFamily: "Montserrat",
  fontSize: "14px",
  fontWeight: "500",
};

export default Login;
