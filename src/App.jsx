import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CookieConsent from "react-cookie-consent";
import { AuthProvider, useAuth } from "./context/AuthContext";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
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
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import PlanDuSite from "./pages/PlanDuSite";
import NotFound from "./pages/NotFound";

// 1. IMPORT DE LA NOUVELLE PAGE ABONNEMENT
import Abonnement from "./pages/Abonnement";

function AppRoutes({
  isAuthPage,
  isDrawerOpen,
  setIsDrawerOpen,
  cart,
  removeFromCart,
  initialPayPalOptions,
}) {
  const { user } = useAuth();

  return (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          cartItems={cart}
          removeItem={removeFromCart}
        />

        {!isAuthPage && <NavBar onOpenCart={() => setIsDrawerOpen(true)} />}

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/univers" element={<Univers />} />
            <Route path="/pepite" element={<Pepite />} />

            {/* 2. ROUTE POUR LA BOX PAR ABONNEMENT */}
            <Route path="/abonnement" element={<Abonnement />} />

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

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/produit/:id" element={<ProductDetails />} />
            <Route path="/aidecontact" element={<AideContact />} />
            <Route path="/contact" element={<AideContact />} />
            <Route path="/moncompte" element={<MonCompte />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/livraisonretrait" element={<LivraisonRetrait />} />
            <Route path="/choix-relais" element={<ChoixRelais />} />
            <Route path="/paiement" element={<Paiement />} />
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
            padding: "10px 20px",
            alignItems: "center",
          }}
          buttonStyle={{
            backgroundColor: "#97af6e",
            color: "white",
            fontSize: "14px",
            borderRadius: "25px",
            padding: "10px 30px",
            fontWeight: "bold",
          }}
          declineButtonStyle={{
            backgroundColor: "transparent",
            border: "1px solid #fff",
            borderRadius: "25px",
            fontSize: "13px",
            color: "white",
            padding: "8px 20px",
          }}
          expires={150}
        >
          🍪 Chez Caf'Thé, nous utilisons des cookies pour assurer le bon
          fonctionnement de la boutique et analyser notre trafic.
          <a
            href="/politiqueconfidentialite"
            style={{
              color: "#97af6e",
              textDecoration: "underline",
              marginLeft: "5px",
            }}
          >
            En savoir plus
          </a>
        </CookieConsent>
      </div>
    </PayPalScriptProvider>
  );
}

function App() {
  const location = useLocation();

  const initialPayPalOptions = {
    "client-id": "test",
    currency: "EUR",
    intent: "capture",
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cart, setCart] = useState([]);

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
  );
}

export default App;
