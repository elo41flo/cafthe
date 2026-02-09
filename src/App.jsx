import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import React from "react";
import Login from "./pages/Login.jsx";
import Layout from "./layout/Layout.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    // AuthProvider enveloppe toute l'app pour partager l'état de l'authentification
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Route parent : Layout contient NavBar + outlet + footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* ID est un paramètres dynamique contenu dans l'url */}
          <Route path="produit/:id" element={<ProductDetails />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App