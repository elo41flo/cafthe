import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ProductQuickView from "../components/ProductQuickView";
import "../styles/Pages/Boutique.css"; // Import des styles

const Boutique = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [openCategory, setOpenCategory] = useState("Cafe");
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

  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("panier")) || [];

    // On crée un objet propre avec les clés attendues par le Panier
    const newProduct = {
      uniqueId: Date.now() + Math.random(),
      id: product.numero_produit || product.id,
      nom: product.nom_produit, // On transforme nom_produit en nom
      prix: product.prix_ttc, // On transforme prix_ttc en prix
      format: product.format || "Sachet 250g",
      quantite: product.quantite || 1,
      image: product.image_produit || product.image,
    };

    const updatedCart = [...currentCart, newProduct];
    localStorage.setItem("panier", JSON.stringify(updatedCart));

    // Notification pour les autres composants (Header, Drawer)
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
  };

  return (
    <div className="boutique-page">
      <Helmet>
        <title>Boutique Caf'Thé | Cafés de Terroir & Thés Bio</title>
      </Helmet>

      {/* HEADER */}
      <section className="boutique-header">
        <h1 className="boutique-title">La Boutique</h1>
        <p className="boutique-intro">
          Affinez votre sélection et trouvez votre bonheur.
        </p>
      </section>

      {/* BARRE DE FILTRES */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <span>🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sort-wrapper">
          <label className="sort-label">Trier par :</label>
          <select
            className="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Pertinence</option>
            <option value="asc">Prix : Croissant</option>
            <option value="desc">Prix : Décroissant</option>
          </select>
        </div>
      </div>

      {/* ACCORDÉONS */}
      <div className="boutique-container">
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
            <div key={cat.id} className="category-wrapper">
              <div
                className={`accordion-header ${isOpened ? "active" : ""}`}
                onClick={() => toggleCategory(cat.id)}
              >
                <h2 className="cat-title">{cat.title}</h2>
                <span
                  className="accordion-icon"
                  style={{
                    transform: isOpened ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </div>

              {isOpened && (
                <div className="product-grid fade-in">
                  {loading ? (
                    [1, 2, 3].map((n) => <SkeletonCard key={n} />)
                  ) : produitsFiltres.length > 0 ? (
                    produitsFiltres.map((p) => (
                      <ProductCard
                        key={p.numero_produit || p.id}
                        produit={p}
                        onQuickView={() => setSelectedProduct(p)}
                      />
                    ))
                  ) : (
                    <p className="empty-msg">Aucun résultat.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODALE D'APERÇU RAPIDE */}
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

export default Boutique;
