import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    nom_client: "",
    prenom_client: "",
    email_client: "",
    mdp_client: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/clients/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Inscription réussie, on redirige vers le login
        navigate("/login");
      } else {
        setErrorMsg(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setErrorMsg("Le serveur ne répond pas.");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* LOGO & TITRE */}
        <img
          src="/src/assets/logo_2.webp"
          alt="Caf'Thé"
          style={{ height: "100px", marginBottom: "10px" }}
        />
        <h1 style={titleStyle}>S’inscrire</h1>

        {errorMsg && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>
        )}

        {/* CHAMP NOM */}
        <div style={inputWrapper}>
          <span style={iconStyle}>👤</span>
          <input
            type="text"
            name="nom_client"
            placeholder="Nom"
            style={inputStyle}
            onChange={handleChange}
            required
          />
        </div>

        {/* CHAMP PRÉNOM */}
        <div style={inputWrapper}>
          <span style={iconStyle}>📇</span>
          <input
            type="text"
            name="prenom_client"
            placeholder="Prénom"
            style={inputStyle}
            onChange={handleChange}
            required
          />
        </div>

        {/* CHAMP EMAIL */}
        <div style={inputWrapper}>
          <span style={iconStyle}>@</span>
          <input
            type="email"
            name="email_client"
            placeholder="E-mail"
            style={inputStyle}
            onChange={handleChange}
            required
          />
        </div>

        {/* CHAMP MOT DE PASSE */}
        <div style={inputWrapper}>
          <span style={iconStyle}>🔒</span>
          <input
            type="password"
            name="mdp_client"
            placeholder="Mot de passe"
            style={inputStyle}
            onChange={handleChange}
            required
          />
        </div>

        {/* CASE CGU */}
        <div style={checkboxWrapper}>
          <input type="checkbox" id="cgu" required />
          <label
            htmlFor="cgu"
            style={{ fontSize: "14px", fontFamily: "Montserrat" }}
          >
            En cliquant sur Créer un compte, j’accepte la{" "}
            <Link to="/politique" style={{ color: "black" }}>
              Politique de confidentialité
            </Link>
            .
          </label>
        </div>

        {/* BOUTON CRÉER */}
        <button type="submit" style={buttonStyle}>
          Créer un compte
        </button>

        <p style={{ marginTop: "20px", fontFamily: "Montserrat" }}>
          Vous avez un compte ?{" "}
          <Link to="/login" style={{ fontWeight: "bold", color: "black" }}>
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
};

// --- STYLES ---
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
  maxWidth: "450px",
  padding: "20px",
};
const titleStyle = {
  fontFamily: "Playfair Display",
  fontSize: "40px",
  color: "#aa8d74",
  marginBottom: "30px",
};
const inputWrapper = {
  position: "relative",
  width: "100%",
  marginBottom: "15px",
};
const iconStyle = {
  position: "absolute",
  left: "20px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "18px",
};
const inputStyle = {
  width: "100%",
  padding: "15px 15px 15px 55px",
  borderRadius: "30px",
  border: "none",
  backgroundColor: "#97af6e",
  boxSizing: "border-box",
  fontSize: "16px",
};
const checkboxWrapper = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  margin: "10px 0 25px 0",
  width: "100%",
};
const buttonStyle = {
  backgroundColor: "#97af6e",
  padding: "12px 40px",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

export default Register;
