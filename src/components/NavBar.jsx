import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/Components/NavBar.css"; // Import du style
import logo from "../assets/logo_2.webp"; // Import direct

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { isDarkMode, toggleTheme } = useTheme();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthStatus = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateCartCount = () => {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const total = panier.reduce(
      (acc, item) => acc + (Number(item.quantite) || 0),
      0,
    );
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    updateAuthStatus();
    window.addEventListener("cartUpdate", updateCartCount);
    window.addEventListener("storage", () => {
      updateCartCount();
      updateAuthStatus();
    });
    window.addEventListener("authUpdate", updateAuthStatus);

    return () => {
      window.removeEventListener("cartUpdate", updateCartCount);
      window.removeEventListener("storage", updateAuthStatus);
      window.removeEventListener("authUpdate", updateAuthStatus);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    updateAuthStatus();
    setIsOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="header-main">
        <Link to="/">
          <img
            src="/logo_2.webp" // Le slash "/" au début est CRUCIAL
            alt="Caf'Thé Logo"
            style={{ height: "80px" }}
          />
        </Link>

        <button onClick={toggleMenu} className="menu-toggle-btn">
          Menu
        </button>
      </header>

      {isOpen && <div onClick={toggleMenu} className="sidebar-overlay" />}

      <div className="sidebar-menu" style={{ right: isOpen ? "0" : "-100%" }}>
        <button onClick={toggleMenu} className="close-sidebar-btn">
          ✕
        </button>

        <div className="sidebar-icons-row">
          <Link
            to="/panier"
            onClick={toggleMenu}
            className="nav-link-item"
            style={{ position: "relative", fontSize: "2rem" }}
          >
            🛒{" "}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link
            to={isAuthenticated ? "/mon-compte" : "/login"}
            onClick={toggleMenu}
            style={{ fontSize: "2rem", textDecoration: "none" }}
          >
            👤
          </Link>

          <button onClick={toggleTheme} className="theme-toggle-btn">
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <Link to="/" onClick={toggleMenu} className="nav-link-item">
            Accueil
          </Link>
          <Link to="/boutique" onClick={toggleMenu} className="nav-link-item">
            Boutique
          </Link>
          <Link to="/pepite" onClick={toggleMenu} className="nav-link-item">
            Sélection du moment
          </Link>
          <Link to="/univers" onClick={toggleMenu} className="nav-link-item">
            Notre univers
          </Link>
          <Link to="/contact" onClick={toggleMenu} className="nav-link-item">
            Aide & Contact
          </Link>
        </nav>
        <br />
        <div className="sidebar-status-section">
          {isAuthenticated ? (
            <div>
              <p style={{ fontFamily: "Montserrat", marginBottom: "15px" }}>
                Connecté :{" "}
                <strong>{user?.prenom_client || user?.prenom || "Ami"}</strong>
              </p>
              <button onClick={handleLogout} className="btn-logout">
                SE DÉCONNECTER
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="btn-login-sidebar"
            >
              SE CONNECTER
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
