import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // AGATHE : Vérification que l'URL du back est bien récupérée
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/clients/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // AGATHE : Indispensable pour autoriser le passage des cookies entre Front et Back
        credentials: "include",
        body: JSON.stringify({
          email_client: email,
          mdp_client: motDePasse,
        }),
      });

      // AGATHE : Si le serveur répond, on transforme la réponse en JSON
      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Identifiants incorrects");
        return;
      }

      // AGATHE : On récupère les données renvoyées par le contrôleur
      const { client, token } = data;

      // AGATHE : Mise à jour du contexte avec les infos reçues
      login(token, client);

      navigate("/");
    } catch (error) {
      // AGATHE : Si on arrive ici, c'est que le fetch n'a même pas pu atteindre le serveur
      console.error("Erreur login:", error);
      setErrorMsg(
        "Le serveur ne répond pas. Vérifiez que votre Backend est lancé sur le port 3000.",
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 style={{ fontFamily: "Playfair Display, serif", color: "#aa8d74" }}>
          Connexion
        </h2>

        {errorMsg && (
          <div
            className="error-banner"
            style={{ color: "red", marginBottom: "10px" }}
          >
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.fr"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={motDePasse}
              required
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            style={{
              backgroundColor: "#97af6e",
              color: "white",
              cursor: "pointer",
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
