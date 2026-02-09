import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Ajout des guillemets ici
import { AuthContext } from "../context/AuthContext.jsx";

const NavBar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout(); // Corrigé : lougout() -> logout()
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Cafthé
            </Link>

            <div className="navbar-right">
                {/* Affichage conditionnel : connecté ou non */}
                {isAuthenticated && user ? ( // Ajout d'une sécurité "&& user"
                    <>
                        <span className="nav-bar-user">
                            Bonjour {user.prenom} {user.nom}
                        </span>
                        <button 
                            className="navbar-logout-button"
                            onClick={handleLogout}
                        >
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-link">
                        Se connecter
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;