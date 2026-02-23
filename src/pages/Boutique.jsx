import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ProductQuickView from "../components/ProductQuickView"; // <-- IMPORT AJOUTÉ

const Boutique = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [openCategory, setOpenCategory] = useState("Cafe");

  // --- ÉTAT POUR L'APERÇU RAPIDE ---
  const [selectedProduct, setSelectedProduct] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const categories = [
    { id: "Cafe", title: "Nos cafés d’Exception" },
    { id: "The", title: "Nos thés d’Exception" },
    { id: "Accessoire", title: "Nos accessoires d’Exception" },
    { id: "Coffret", title: "Nos coffrets d’Exception" },
  ];

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();
        if (data && Array.isArray(data.produits)) {
          setProduits(data.produits);
        }
      } catch (err) {
        console.error("Erreur Fetch Boutique:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduits();
  }, [apiUrl]);

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  // Fonction pour ajouter au panier (utilisée par la modale)
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("panier")) || [];
    const newProduct = {
      ...product,
      uniqueId: Date.now() + Math.random(),
    };
    const newCart = [...currentCart, newProduct];
    localStorage.setItem("panier", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
  };

  return (
    <div style={pageStyle}>
      <Helmet>
        <title>Boutique Caf'Thé | Cafés de Terroir & Thés Bio</title>
        <meta
          name="description"
          content="Parcourez notre catalogue : cafés fraîchement torréfiés..."
        />
      </Helmet>

      {/* HEADER */}
      <section style={headerStyle}>
        <h1 style={titleStyle}>La Boutique</h1>
        <p style={introTextStyle}>
          Affinez votre sélection et trouvez votre bonheur.
        </p>
      </section>

      {/* BARRE DE FILTRES */}
      <div style={filterBarContainer}>
        <div style={inputWrapperStyle}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={sortWrapperStyle}>
          <label style={labelStyle}>Trier par :</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={selectStyle}
          >
            <option value="default">Pertinence</option>
            <option value="asc">Prix : Croissant</option>
            <option value="desc">Prix : Décroissant</option>
          </select>
        </div>
      </div>

      {/* ACCORDÉONS */}
      <div style={containerStyle}>
        {categories.map((cat) => {
          const produitsFiltres = produits
            .filter((p) => {
              const matchCategory = p.categorie === cat.id;
              const matchSearch = p.nom_produit
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              return matchCategory && matchSearch;
            })
            .sort((a, b) => {
              const prixA = parseFloat(a.prix_ttc);
              const prixB = parseFloat(b.prix_ttc);
              if (sortOrder === "asc") return prixA - prixB;
              if (sortOrder === "desc") return prixB - prixA;
              return 0;
            });

          const isOpened = searchTerm.length > 0 || openCategory === cat.id;

          return (
            <div key={cat.id} style={categoryWrapper}>
              <div
                onClick={() => toggleCategory(cat.id)}
                style={accordionHeader(isOpened)}
              >
                <h2 style={catTitleStyle}>{cat.title}</h2>
                <span
                  style={{
                    ...iconStyle,
                    transform: isOpened ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </div>

              {isOpened && (
                <div style={productGridStyle}>
                  {loading ? (
                    [1, 2, 3].map((n) => <SkeletonCard key={n} />)
                  ) : produitsFiltres.length > 0 ? (
                    produitsFiltres.map((p) => (
                      <ProductCard
                        key={p.numero_produit || p.id}
                        produit={p}
                        onQuickView={() => setSelectedProduct(p)} // <-- ACTION AJOUTÉE
                      />
                    ))
                  ) : (
                    <p style={emptyMsgStyle}>Aucun résultat.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- MODALE D'APERÇU RAPIDE --- */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

// --- STYLES (Conservés et complétés) ---
const pageStyle = {
  backgroundColor: "#fff",
  minHeight: "100vh",
  paddingBottom: "80px",
  fontFamily: "'Montserrat', sans-serif",
};
const headerStyle = { textAlign: "center", padding: "60px 20px" };
const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "48px",
  marginBottom: "10px",
  color: "#aa8d74",
};
const introTextStyle = {
  fontSize: "18px",
  color: "#555",
  maxWidth: "800px",
  margin: "0 auto",
  lineHeight: "1.6",
};
const filterBarContainer = {
  maxWidth: "1100px",
  margin: "0 auto 50px auto",
  padding: "0 20px",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
};
const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  borderRadius: "30px",
  padding: "12px 25px",
  border: "1px solid #eee",
  flex: "1",
  minWidth: "280px",
};
const searchInputStyle = {
  flex: 1,
  border: "none",
  background: "none",
  outline: "none",
  fontSize: "1rem",
  color: "#333",
};
const sortWrapperStyle = { display: "flex", alignItems: "center", gap: "10px" };
const labelStyle = { fontSize: "14px", fontWeight: "bold", color: "#555" };
const selectStyle = {
  padding: "10px 15px",
  borderRadius: "20px",
  border: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
  cursor: "pointer",
  fontFamily: "'Montserrat', sans-serif",
};
const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 20px",
};
const categoryWrapper = {
  marginBottom: "10px",
  borderBottom: "1px solid #f5f5f5",
};
const accordionHeader = (isOpen) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px 0",
  cursor: "pointer",
  borderBottom: isOpen ? "2px solid #97af6e" : "2px solid transparent",
  transition: "all 0.3s ease",
});
const catTitleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "28px",
  margin: 0,
  color: "#4a3b2c",
};
const iconStyle = { fontSize: "16px", color: "#97af6e", transition: "0.3s" };
const productGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "40px",
  padding: "40px 0",
};
const emptyMsgStyle = {
  gridColumn: "1 / -1",
  textAlign: "center",
  color: "#999",
  padding: "60px",
  fontStyle: "italic",
  backgroundColor: "#fafafa",
  borderRadius: "15px",
};

export default Boutique;
