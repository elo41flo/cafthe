import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Nouveau MDP
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    // On simule une vérification API ou on passe direct à la suite pour la démo
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
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontFamily: "Playfair Display", color: "#4a3b2c" }}>
          Réinitialisation
        </h2>

        {step === 1 ? (
          <form onSubmit={handleCheckEmail}>
            <p>Entrez votre email pour modifier votre mot de passe.</p>
            <input
              type="email"
              placeholder="Votre e-mail"
              required
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" style={buttonStyle}>
              Vérifier mon compte
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <p>
              Email : <strong>{email}</strong>
            </p>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              required
              style={inputStyle}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" style={buttonStyle}>
              Changer mon mot de passe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Styles rapides pour la cohérence
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  fontFamily: "Montserrat",
};
const cardStyle = {
  padding: "40px",
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  textAlign: "center",
  maxWidth: "400px",
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "25px",
  border: "1px solid #97af6e",
  marginBottom: "20px",
  boxSizing: "border-box",
};
const buttonStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  padding: "12px 30px",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ForgotPassword;
