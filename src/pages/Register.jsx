import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    nom_client: "",
    prenom_client: "",
    email_client: "",
    mdp_client: "",
    adresse_livraison: "",
    ville_livraison: "",
    cp_livraison: "",
    adresse_facturation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // On efface l'erreur dès que l'utilisateur recommence à taper
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    // Regex pour valider le format email (ex: nom@domaine.fr)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formData.nom_client.trim().length < 2)
      errors.nom_client = "Nom requis.";
    if (formData.prenom_client.trim().length < 2)
      errors.prenom_client = "Prénom requis.";

    // 1. Vérification du format Email
    if (!formData.email_client) {
      errors.email_client = "Email requis.";
    } else if (!emailRegex.test(formData.email_client)) {
      errors.email_client = "Format d'email invalide (ex: nom@mail.com).";
    }

    // 2. Vérification de la longueur du mot de passe (12 caractères)
    if (formData.mdp_client.length < 12) {
      errors.mdp_client = "Le mot de passe doit faire au moins 12 caractères.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Bloque l'envoi si le formulaire n'est pas valide
    if (!validateForm()) return;

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/clients/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
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
        <img
          src="/src/assets/logo_2.webp"
          alt="Caf'Thé"
          style={{ height: "80px", marginBottom: "10px" }}
        />
        <h1 style={titleStyle}>S’inscrire</h1>

        {errorMsg && <p style={serverErrorStyle}>{errorMsg}</p>}

        <p style={sectionTitle}>
          IDENTITÉ <span style={{ color: "red" }}>*</span>
        </p>

        <div style={inputWrapper}>
          <span style={iconStyle}>👤</span>
          <input
            type="text"
            name="nom_client"
            placeholder="Nom *"
            style={inputStyle(formErrors.nom_client)}
            onChange={handleChange}
            autoComplete="off"
          />
          {formErrors.nom_client && (
            <span style={errorTextStyle}>{formErrors.nom_client}</span>
          )}
        </div>

        <div style={inputWrapper}>
          <span style={iconStyle}>📇</span>
          <input
            type="text"
            name="prenom_client"
            placeholder="Prénom *"
            style={inputStyle(formErrors.prenom_client)}
            onChange={handleChange}
            autoComplete="off"
          />
          {formErrors.prenom_client && (
            <span style={errorTextStyle}>{formErrors.prenom_client}</span>
          )}
        </div>

        <div style={inputWrapper}>
          <span style={iconStyle}>@</span>
          <input
            type="email"
            name="email_client"
            placeholder="E-mail *"
            style={inputStyle(formErrors.email_client)}
            onChange={handleChange}
            autoComplete="email"
          />
          {formErrors.email_client && (
            <span style={errorTextStyle}>{formErrors.email_client}</span>
          )}
        </div>

        <div style={inputWrapper}>
          <span style={iconStyle}>🔒</span>
          <input
            type="password"
            name="mdp_client"
            placeholder="Mot de passe (12 car. min) *"
            style={inputStyle(formErrors.mdp_client)}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {formErrors.mdp_client && (
            <span style={errorTextStyle}>{formErrors.mdp_client}</span>
          )}
        </div>

        <p style={sectionTitle}>ADRESSES</p>

        <div style={inputWrapper}>
          <span style={iconStyle}>🚚</span>
          <input
            type="text"
            name="adresse_livraison"
            placeholder="Adresse de livraison"
            style={inputStyle()}
            onChange={handleChange}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <input
            type="text"
            name="cp_livraison"
            placeholder="Code Postal"
            style={{ ...inputStyle(), paddingLeft: "20px" }}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ville_livraison"
            placeholder="Ville"
            style={{ ...inputStyle(), paddingLeft: "20px" }}
            onChange={handleChange}
          />
        </div>

        <div style={inputWrapper}>
          <span style={iconStyle}>📄</span>
          <input
            type="text"
            name="adresse_facturation"
            placeholder="Adresse de facturation (si différente)"
            style={inputStyle()}
            onChange={handleChange}
          />
        </div>

        <div style={checkboxWrapper}>
          <input type="checkbox" id="cgu" required />
          <label
            htmlFor="cgu"
            style={{
              fontSize: "13px",
              fontFamily: "Montserrat",
              lineHeight: "1.4",
            }}
          >
            J’accepte les{" "}
            <Link to="/cgv" style={{ color: "black", fontWeight: "bold" }}>
              Conditions Générales de Vente
            </Link>{" "}
            et la{" "}
            <Link
              to="/Politiqueconfidentialite"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Politique de confidentialité
            </Link>
            . <span style={{ color: "red" }}>*</span>
          </label>
        </div>

        <button type="submit" style={buttonStyle}>
          Créer mon compte
        </button>

        <div style={loginRedirectStyle}>
          <p style={{ margin: 0 }}>Vous avez déjà un compte ?</p>
          <Link to="/login" style={loginLinkStyle}>
            Se connecter
          </Link>
        </div>
      </form>
    </div>
  );
};

// --- STYLES ---

const inputStyle = (hasError) => ({
  width: "100%",
  paddingTop: "15px",
  paddingRight: "15px",
  paddingBottom: "15px",
  paddingLeft: "55px",
  borderRadius: "30px",
  border: hasError ? "2px solid #ff4d4d" : "none",
  backgroundColor: "#97af6e",
  color: "white",
  boxSizing: "border-box",
  fontSize: "16px",
  outline: "none",
  marginBottom: hasError ? "0px" : "5px",
  WebkitBoxShadow: "0 0 0px 1000px #97af6e inset",
  WebkitTextFillColor: "white",
});

const errorTextStyle = {
  color: "#ff4d4d",
  fontSize: "12px",
  marginLeft: "20px",
  fontFamily: "Montserrat",
  fontWeight: "bold",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  padding: "40px 0",
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
  fontSize: "32px",
  color: "#aa8d74",
  marginBottom: "20px",
};
const sectionTitle = {
  width: "100%",
  fontFamily: "Montserrat",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "#aa8d74",
  margin: "15px 0 10px 15px",
  textAlign: "left",
};
const inputWrapper = {
  position: "relative",
  width: "100%",
  marginBottom: "15px",
};
const iconStyle = {
  position: "absolute",
  left: "20px",
  top: "25px",
  transform: "translateY(-50%)",
  fontSize: "18px",
  color: "white",
};
const checkboxWrapper = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  margin: "15px 0",
  width: "100%",
};
const buttonStyle = {
  backgroundColor: "#aa8d74",
  color: "white",
  padding: "12px 40px",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  width: "100%",
  marginTop: "10px",
};
const serverErrorStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "10px",
  borderRadius: "10px",
  width: "100%",
  textAlign: "center",
  marginBottom: "15px",
  fontFamily: "Montserrat",
};
const loginRedirectStyle = {
  marginTop: "25px",
  textAlign: "center",
  fontFamily: "Montserrat",
  fontSize: "15px",
  color: "#555",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};
const loginLinkStyle = {
  color: "#aa8d74",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "16px",
};

export default Register;
