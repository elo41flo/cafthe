import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard"; // Assure-toi que ce composant existe

const Boutique = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState(null); // Gère l'accordéon
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Liste des catégories pour l'affichage
  const categories = [
    { id: "Cafe", title: "Nos cafés d’Exception", label: "Cafés" },
    { id: "The", title: "Nos thés d’Exception", label: "Thés" },
    {
      id: "Accessoire",
      title: "Nos accessoires d’Exception",
      label: "Accessoires",
    },
    { id: "Coffret", title: "Nos coffrets d’Exception", label: "Coffrets" },
  ];

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();
        if (data && data.produits) {
          setProduits(data.produits);
        }
      } catch (err) {
        console.error("Erreur boutique:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduits();
  }, [apiUrl]);

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  if (loading) return <div style={msgStyle}>Chargement de la boutique...</div>;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      {/* HEADER DE LA PAGE */}
      <section style={headerStyle}>
        <h1 style={titleStyle}>La Boutique</h1>
        <p style={introTextStyle}>
          Sélectionnez une catégorie pour découvrir nos produits.
        </p>
      </section>

      {/* SYSTÈME D'ACCORDÉONS */}
      <div style={containerStyle}>
        {categories.map((cat) => (
          <div key={cat.id} style={categoryWrapper}>
            {/* EN-TÊTE DE L'ACCORDÉON */}
            <div
              onClick={() => toggleCategory(cat.id)}
              style={accordionHeader(openCategory === cat.id)}
            >
              <h2 style={catTitleStyle}>{cat.title}</h2>
              <span style={iconStyle}>
                {openCategory === cat.id ? "▲" : "▼"}
              </span>
            </div>

            {/* GRILLE DE PRODUITS (AFFICHEE SI OUVERT) */}
            {openCategory === cat.id && (
              <div style={productGridStyle}>
                {produits.filter((p) => p.categorie === cat.id).length > 0 ? (
                  produits
                    .filter((p) => p.categorie === cat.id)
                    .map((p) => (
                      <ProductCard key={p.numero_produit} produit={p} />
                    ))
                ) : (
                  <p style={emptyMsgStyle}>
                    Bientôt disponible dans cette catégorie !
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STYLES ---

const headerStyle = { textAlign: "center", padding: "60px 20px" };
const titleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "48px",
  marginBottom: "10px",
};
const introTextStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "18px",
  color: "#333",
  textAlign: "right",
  maxWidth: "800px",
  margin: "0 auto",
};
const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 20px",
};

const categoryWrapper = {
  marginBottom: "20px",
  borderBottom: "1px solid #eee",
};

const accordionHeader = (isOpen) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "25px 0",
  cursor: "pointer",
  transition: "0.3s",
});

const catTitleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "28px",
  margin: 0,
};
const iconStyle = { fontSize: "20px", color: "#aa8d74" };

const productGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "30px",
  padding: "30px 0",
  animation: "fadeIn 0.5s ease-in-out",
};

const msgStyle = {
  textAlign: "center",
  padding: "100px",
  fontFamily: "Montserrat",
};
const emptyMsgStyle = {
  gridColumn: "1 / -1",
  textAlign: "center",
  color: "#888",
  padding: "20px",
};

export default Boutique;
