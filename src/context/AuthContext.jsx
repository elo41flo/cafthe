import React, { createContext, useState, useEffect } from "react";

// 1. Correction de l'import : "create" n'existe pas, c'est "createContext"
// 2. Exportation du contexte
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Au montage du composant, on restaure la session
    useEffect(() => {
        const storedToken = localStorage.getItem("token"); // Corrigé : storeToken -> storedToken
        const storedUser = localStorage.getItem("user");   // Corrigé : storeUsed -> storedUser

        if (storedUser && storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser)); // Corrigé : setuser -> setUser + JSON.parse
        }
    }, []);

    // Synchronise le localStorage
    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [user, token]);

    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}