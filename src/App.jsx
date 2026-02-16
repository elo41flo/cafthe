import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Boutique from "./pages/Boutique";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pepite from "./pages/Pepite";
import Univers from "./pages/Univers";
import AideContact from "./pages/AideContact";
import LivraisonRetrait from "./pages/LivraisonRetrait";
import Panier from "./pages/Panier"; // CORRECT : On pointe sur le bon fichier
import ChoixRelais from "./pages/ChoixRelais"; // Import séparé pour la suite
import ProductDetails from "./pages/ProductDetails";
import MonCompte from "./pages/MonCompte";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import PlanDuSite from "./pages/PlanDuSite";

function App() {
  const location = useLocation();

  // Pages où on ne veut pas afficher la NavBar et le Footer
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Affichage conditionnel de la barre de navigation */}
      {!isAuthPage && <NavBar />}

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Accueil et Boutique */}
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/univers" element={<Univers />} />
          <Route path="/pepite" element={<Pepite />} />

          {/* Authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Détails Produit Dynamique */}
          <Route path="/produit/:id" element={<ProductDetails />} />

          {/* Aide et Contact (Double route pour éviter les erreurs) */}
          <Route path="/aidecontact" element={<AideContact />} />
          <Route path="/contact" element={<AideContact />} />

          {/* Tunnel de commande */}
          <Route path="/moncompte" element={<MonCompte />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/livraisonretrait" element={<LivraisonRetrait />} />
          <Route path="/choix-relais" element={<ChoixRelais />} />

          {/* Page obligatoire */}
          <Route
            path="/politiqueconfidentialite"
            element={<PolitiqueConfidentialite />}
          />
          <Route path="/mentionslegales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/plandusite" element={<PlanDuSite />} />
        </Routes>
      </main>

      {/* Affichage conditionnel du footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
