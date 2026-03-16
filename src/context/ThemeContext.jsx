// Importations
import React, { createContext, useContext, useState, useEffect } from "react";

// Création du contexte pour le thème
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  
  // Initialisation de l'état avec la persistance (LocalStorage)
  // On vérifie si l'utilisateur a déjà une préférence enregistrée dans le navigateur
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  // Fonction pour basculer entre le mode clair et sombre
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Synchronisation avec le DOM et le stockage local
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    
    // On définit un attribut "data-theme" sur la balise html
    // Permet au CSS d'utiliser des variables
    document.documentElement.setAttribute("data-theme", theme);
    
    // On sauvegarde le choix pour la prochaine visite
    localStorage.setItem("theme", theme);
  }, [isDarkMode]); // S'exécute à chaque fois que isDarkMode change

  return (
    // Diffusion de l'état et de la fonction à toute l'application
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé
// Permet d'utiliser le thème dans n'importe quel composant sans importer useContext partout
export const useTheme = () => useContext(ThemeContext);
