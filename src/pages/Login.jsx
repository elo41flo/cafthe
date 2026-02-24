// Importations
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Pages/Login.css";

const Login = () => {
  // Contexte et Hooks
  // On récupère la fonction login définie dans AuthContext pour mettre à jour l'état global
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Outil pour changer de page programmatiquement (ex: après un succès)

  // Etats locaux
  // Ces variables ne vivent que le temps où la page est affichée
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // Stocke le message d'erreur si la connexion échoue

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    // Récupère l'URL de l'API
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      // Appel réseau vers mon serveur Node.js
      const response = await fetch(`${baseUrl}/api/clients/login`, {
        method: "POST", // On envoie des données sensibles, donc on utilise POST
        headers: { "Content-Type": "application/json" }, // On précise qu'on envoie du JSON
        body: JSON.stringify({ email_client: email, mdp_client: motDePasse }), // Conversion de l'objet JS en texte JSON
      });

      const data = await response.json(); // On attend la réponse du serveur et on la transforme en objet JS

      // Si le serveur répond avec une erreur
      if (!response.ok) {
        setErrorMsg(data.message || "Identifiants incorrects"); // On affiche le message d'erreur du back ou un message par défaut
        return; // On arrête l'exécution ici
      }

      // SI SUCCÈS :
      // 1. On stocke le token dans le navigateur pour rester connecté même si on ferme l'onglet
      localStorage.setItem("token", data.token);

      // 2. On appelle la fonction login du contexte pour dire à toute l'app que l'user est là
      login(data.token, data.client);

      // 3. On redirige vers la page d'accueil
      navigate("/");
    } catch (error) {
      // Si le serveur est éteint ou s'il y a un problème réseau
      setErrorMsg("Erreur de connexion au serveur.");
    }
  };

  // Fonction visiteur
  const handleVisitor = () => {
    localStorage.removeItem("token"); // Par sécurité, on nettoie un éventuel ancien token
    navigate("/"); // On envoie sur l'accueil en non connecté
  };

  return (
    <div className="auth-container">
      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit} className="auth-card fade-in">
        <img
          src="/src/assets/logo_2.webp"
          alt="Logo Caf'Thé"
          className="auth-logo"
        />

        {/* Affichage conditionnel de l'erreur : n'apparaît que si errorMsg n'est pas vide */}
        {errorMsg && <p className="auth-error">⚠️ {errorMsg}</p>}

        {/* Champ Email */}
        <div className="auth-input-group">
          <span className="auth-input-icon">@</span>
          <input
            type="email"
            placeholder="E-mail"
            className="auth-input"
            value={email} // Liaison avec le state
            onChange={(e) => setEmail(e.target.value)} // Mise à jour du state à chaque touche pressée
            required
            autoComplete="username"
          />
        </div>

        {/* Champ Mot de passe */}
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

        {/* Lien mot de passe oublié */}
        <Link
          to="/forgot-password"
          alphabet="small"
          className="auth-forgot-link"
        >
          Mot de passe oublié ?
        </Link>

        {/* Bouton de validation */}
        <button type="submit" className="auth-btn" style={{ width: "100%" }}>
          Se connecter
        </button>

        {/* Bouton secondaire pour les impatients */}
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
