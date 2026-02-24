import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CookieConsent from "react-cookie-consent";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Composants
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// Pages
import Home from "./pages/Home";
import Boutique from "./pages/Boutique";
import CreationClientMagasin from "./pages/CreationClientMagasin";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Pepite from "./pages/Pepite";
import Univers from "./pages/Univers";
import AideContact from "./pages/AideContact";
import LivraisonRetrait from "./pages/LivraisonRetrait";
import Panier from "./pages/Panier";
import ChoixRelais from "./pages/ChoixRelais";
import Paiement from "./pages/Paiement";
import ProductDetails from "./pages/ProductDetails";
import MonCompte from "./pages/MonCompte";
import Abonnement from "./pages/Abonnement";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import PlanDuSite from "./pages/PlanDuSite";
import NotFound from "./pages/NotFound";

/**
 * Gestionnaire des routes de l'application
 */
function AppRoutes({
  isAuthPage,
  isDrawerOpen,
  setIsDrawerOpen,
  cart,
  removeFromCart,
  initialPayPalOptions,
}) {
  const { user, loading } = useAuth();

  // Écran de chargement pour éviter de perdre la session au refresh
  if (loading) {
    return (
      <div className="loading-spinner-full">
        <div className="spinner"></div>
        <p>Chargement de votre univers Caf’Thé...</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Panier latéral accessible partout */}
        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          cartItems={cart}
          removeItem={removeFromCart}
        />

        {/* La NavBar ne s'affiche pas sur Login/Register */}
        {!isAuthPage && <NavBar onOpenCart={() => setIsDrawerOpen(true)} />}

        <main style={{ flex: 1 }}>
          <Routes>
            {/* --- ROUTES PUBLIQUES (Toujours accessibles) --- */}
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/univers" element={<Univers />} />
            <Route path="/pepite" element={<Pepite />} />
            <Route path="/abonnement" element={<Abonnement />} />
            <Route path="/produit/:id" element={<ProductDetails />} />
            <Route path="/aidecontact" element={<AideContact />} />
            <Route path="/contact" element={<AideContact />} />
            <Route path="/panier" element={<Panier />} />

            {/* --- ROUTES D'AUTHENTIFICATION --- */}
            {/* Si l'user est connecté, il ne peut pas retourner sur login/register */}
            <Route
              path="/login"
              element={
                !user ? <Login /> : <Navigate to="/mon-compte" replace />
              }
            />
            <Route
              path="/register"
              element={
                !user ? <Register /> : <Navigate to="/mon-compte" replace />
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* --- ROUTES PROTÉGÉES (Connexion requise) --- */}
            <Route
              path="/mon-compte"
              element={user ? <MonCompte /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/choix-relais"
              element={
                user ? <ChoixRelais /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/paiement"
              element={user ? <Paiement /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/livraisonretrait"
              element={
                user ? <LivraisonRetrait /> : <Navigate to="/login" replace />
              }
            />

            {/* Route Vendeur */}
            <Route
              path="/vendeur/creation-client"
              element={
                user && (user.role === "vendeur" || user.role === "admin") ? (
                  <CreationClientMagasin />
                ) : (
                  <Navigate to="/404" replace />
                )
              }
            />

            {/* --- PAGES LÉGALES & 404 --- */}
            <Route
              path="/politiqueconfidentialite"
              element={<PolitiqueConfidentialite />}
            />
            <Route path="/mentionslegales" element={<MentionsLegales />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/plandusite" element={<PlanDuSite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isAuthPage && <Footer />}

        {/* Consentement Cookies */}
        <CookieConsent
          location="bottom"
          buttonText="Accepter"
          declineButtonText="Refuser"
          enableDeclineButton
          cookieName="CaftheCookieConsent"
          style={{
            background: "#4a3b2c",
            fontFamily: "Montserrat",
            fontSize: "14px",
          }}
          buttonStyle={{
            backgroundColor: "#97af6e",
            color: "white",
            borderRadius: "25px",
            fontWeight: "bold",
          }}
        >
          🍪 Chez Caf'Thé, nous utilisons des cookies pour assurer le bon
          fonctionnement de la boutique.
        </CookieConsent>
      </div>
    </PayPalScriptProvider>
  );
}

/**
 * Racine de l'application
 */
function App() {
  const location = useLocation();

  const initialPayPalOptions = {
    "client-id": "test", // À remplacer par ton vrai ID PayPal
    currency: "EUR",
    intent: "capture",
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Gestion du panier (LocalStorage)
  const updateCartData = () => {
    const savedCart = JSON.parse(localStorage.getItem("panier")) || [];
    setCart(savedCart);
  };

  const removeFromCart = (uniqueId) => {
    const savedCart = JSON.parse(localStorage.getItem("panier")) || [];
    const newCart = savedCart.filter((item) => item.uniqueId !== uniqueId);
    localStorage.setItem("panier", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event("cartUpdate"));
  };

  useEffect(() => {
    updateCartData();
    const handleOpenDrawer = () => {
      updateCartData();
      setIsDrawerOpen(true);
    };
    const handleCartUpdate = () => {
      updateCartData();
    };

    window.addEventListener("openCartDrawer", handleOpenDrawer);
    window.addEventListener("cartUpdate", handleCartUpdate);

    return () => {
      window.removeEventListener("openCartDrawer", handleOpenDrawer);
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes
          isAuthPage={isAuthPage}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          cart={cart}
          removeFromCart={removeFromCart}
          initialPayPalOptions={initialPayPalOptions}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
