import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const NavBar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
    window.addEventListener("cartUpdate", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdate", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header style={headerStyle}>
        <Link to="/">
          <img
            src="/src/assets/logo.webp"
            alt="Caf'Thé Logo"
            style={{ height: "80px" }}
          />
        </Link>

        {/* LE BOUTON MENU ÉTAIT MANQUANT ICI */}
        <button onClick={toggleMenu} style={menuBtnStyle}>
          Menu
        </button>
      </header>

      {/* OVERLAY SOMBRE */}
      {isOpen && <div onClick={toggleMenu} style={overlayStyle} />}

      {/* MENU LATÉRAL (SIDEBAR) */}
      <div
        style={{
          ...sidebarStyle,
          right: isOpen ? "0" : "-100%",
        }}
      >
        <button onClick={toggleMenu} style={closeBtnStyle}>
          ✕
        </button>

        {/* Zone Icones */}
        <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>
          <Link to="/panier" onClick={toggleMenu} style={cartIconStyle}>
            🛒
            {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
          </Link>
          <Link
            to={isAuthenticated ? "/moncompte" : "/login"}
            onClick={toggleMenu}
            style={{ fontSize: "2rem", textDecoration: "none" }}
          >
            👤
          </Link>
        </div>

        {/* Liens de navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <Link to="/" onClick={toggleMenu} style={linkStyle}>
            Accueil
          </Link>
          <Link to="/boutique" onClick={toggleMenu} style={linkStyle}>
            Boutique
          </Link>
          <Link to="/selection" onClick={toggleMenu} style={linkStyle}>
            Sélection du moment
          </Link>
          <Link to="/univers" onClick={toggleMenu} style={linkStyle}>
            Notre univers
          </Link>
          <Link to="/contact" onClick={toggleMenu} style={linkStyle}>
            Aide & Contact
          </Link>
        </nav>

        {/* --- SECTION DÉCONNEXION (REPLACÉE PLUS HAUT) --- */}
        <div style={statusSectionStyle}>
          {isAuthenticated ? (
            <div style={{ width: "100%" }}>
              <p style={welcomeTextStyle}>
                Connecté : <strong>{user?.prenom}</strong>
              </p>
              <button onClick={handleLogout} style={logoutBtnStyle}>
                SE DÉCONNECTER
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={toggleMenu} style={loginBtnStyle}>
              SE CONNECTER
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

// --- STYLES ---
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 40px",
  backgroundColor: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  height: "100px",
};
const menuBtnStyle = {
  backgroundColor: "#97af6e",
  color: "#1a1a1a",
  border: "none",
  padding: "10px 25px",
  borderRadius: "20px",
  fontSize: "1.2rem",
  fontFamily: "'Playfair Display', serif",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 1500,
};
const sidebarStyle = {
  position: "fixed",
  top: 0,
  width: "80%",
  maxWidth: "400px",
  height: "100vh",
  backgroundColor: "#aa8d74",
  transition: "right 0.4s ease-in-out",
  zIndex: 2000,
  padding: "40px",
  display: "flex",
  flexDirection: "column",
};
const closeBtnStyle = {
  alignSelf: "flex-end",
  background: "none",
  border: "none",
  fontSize: "2.5rem",
  cursor: "pointer",
  marginBottom: "20px",
};
const cartIconStyle = {
  fontSize: "2rem",
  textDecoration: "none",
  position: "relative",
};
const badgeStyle = {
  position: "absolute",
  top: "-5px",
  right: "-10px",
  backgroundColor: "#97af6e",
  color: "white",
  fontSize: "0.8rem",
  fontWeight: "bold",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Montserrat', sans-serif",
};
const linkStyle = {
  textDecoration: "none",
  color: "#1a1a1a",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.5rem",
  fontWeight: "500",
};

// Styles de la zone de statut
const statusSectionStyle = {
  marginTop: "40px",
  paddingTop: "20px",
  borderTop: "1px solid rgba(0,0,0,0.1)",
  width: "100%",
};
const welcomeTextStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "0.9rem",
  marginBottom: "15px",
  color: "#1a1a1a",
};
const logoutBtnStyle = {
  backgroundColor: "#1a1a1a",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "25px",
  fontWeight: "bold",
  cursor: "pointer",
  fontFamily: "'Montserrat', sans-serif",
};
const loginBtnStyle = {
  ...linkStyle,
  textAlign: "center",
  backgroundColor: "#97af6e",
  padding: "12px",
  borderRadius: "25px",
  display: "block",
  fontSize: "1.1rem",
};

export default NavBar;
