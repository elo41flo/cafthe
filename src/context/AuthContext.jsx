// Importations
import React, { createContext, useState, useEffect, useContext } from "react";

// Initialisation du contexte d'authentification
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // États pour stocker les informations de session
  const [user, setUser] = useState(null);  // Données de l'utilisateur (nom, email, etc.)
  const [token, setToken] = useState(null); // Le Token JWT (clé de sécurité)

  // Récupération de la session au chargement
  // Au démarrage de l'app on vérifie si une session existe déjà dans le navigateur
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); // On transforme la chaîne JSON en objet JS
    }
  }, []);

  // Synchronisation automatique avec le LocalStorage
  // Dès que 'user' ou 'token' change, on met à jour, ou on vide le stockage local
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [user, token]);

  // Fonctions de gestion de session
  const login = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Objet de valeur exposé à toute l'application
  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé pour simplifier l'utilisation dans les composants
export const useAuth = () => {
  return useContext(AuthContext);
};