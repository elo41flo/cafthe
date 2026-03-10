// Importations
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ProductQuickView from "../components/ProductQuickView";
import "../styles/Pages/Boutique.css";

const Boutique = () => {
  // Mes états pour gérer les données et l'affichage
  const [produits, setProduits] = useState([]); // Liste complète des produits
  const [loading, setLoading] = useState(true); // État de chargement (pour le Skeleton)
  const [searchTerm, setSearchTerm] = useState(""); // Texte de la barre de recherche
  const [sortOrder, setSortOrder] = useState("default"); // Ordre de tri (prix...)
  const [openCategory, setOpenCategory] = useState("Cafe"); // Catégorie ouverte par défaut
  const [selectedProduct, setSelectedProduct] = useState(null); // Produit pour la modale "Vue Rapide"

  // Récupération de l'URL de l'API via les variables d'environnement
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Liste de mes catégories pour générer les accordéons dynamiquement
  const categories = [
    { id: "Cafe", title: "Nos cafés d’Exception" },
    { id: "The", title: "Nos thés d’Exception" },
    { id: "Accessoire", title: "Nos accessoires d’Exception" },
    { id: "Coffret", title: "Nos coffrets d’Exception" },
  ];

  // useEffect pour appeler mon API au chargement de la page
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        // Appel à l'endpoint de mon serveur Node.js
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();
        // Si je reçois bien des données, je les stocke dans mon état
        if (data && Array.isArray(data.produits)) {
          setProduits(data.produits);
        }
      } catch (err) {
        console.error("Erreur Fetch Boutique:", err);
      } finally {
        // Une fois fini (succès ou erreur), j'arrête le chargement
        setLoading(false);
      }
    };
    fetchProduits();
  }, [apiUrl]);

  // Fonction pour ouvrir/fermer les accordéons des catégories
  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  // Logique d'ajout au panier : je formate l'objet pour qu'il soit compatible avec mon Panier
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("panier")) || [];

    const newProduct = {
      uniqueId: Date.now() + Math.random(), // ID unique pour éviter les conflits
      id: product.numero_produit || product.id,
      nom: product.nom_produit,
      prix: product.prix_ttc,
      format: product.format || "Sachet 250g",
      quantite: product.quantite || 1,
      image: product.image_produit || product.image,
    };

    // Mise à jour du localStorage
    const updatedCart = [...currentCart, newProduct];
    localStorage.setItem("panier", JSON.stringify(updatedCart));

    // Envoi d'événements pour prévenir le Header et ouvrir le tiroir du panier
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("openCartDrawer"));
  };

  return (
    <div className="boutique-page">
      {/* Gestion du titre de l'onglet pour le SEO */}
      <Helmet>
        <title>Boutique Caf'Thé | Cafés de Terroir & Thés Bio</title>
      </Helmet>

      {/* Présentation de la boutique */}
      <section className="boutique-header">
        <h1 className="boutique-title">La Boutique</h1>
        <p className="boutique-intro">
          Affinez votre sélection et trouvez votre bonheur.
        </p>
      </section>

      {/* Recherche textuelle et Tri par prix */}
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
          <label className="sort-label">Trier par : </label>
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

      {/* Groupés par catégories (Accordéons) */}
      <div className="boutique-container">
        {categories.map((cat) => {
          // Je filtre par catégorie et par terme de recherche
          const produitsFiltres = produits
            .filter((p) => {
              const matchCategory = p.categorie === cat.id;
              const matchSearch = p.nom_produit
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              return matchCategory && matchSearch;
            })
            // Logique de tri par prix TTC
            .sort((a, b) => {
              const prixA = parseFloat(a.prix_ttc);
              const prixB = parseFloat(b.prix_ttc);
              if (sortOrder === "asc") return prixA - prixB;
              if (sortOrder === "desc") return prixB - prixA;
              return 0;
            });

          // L'accordéon s'ouvre si on clique dessus OU si on fait une recherche
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

              {/* Si l'accordéon est ouvert, on affiche la grille de produits */}
              {isOpened && (
                <div className="product-grid fade-in">
                  {/* Pendant le chargement, j'affiche des Skeletons pour l'UX */}
                  {loading ? (
                    [1, 2, 3].map((n) => <SkeletonCard key={n} />)
                  ) : produitsFiltres.length > 0 ? (
                    // On boucle sur les produits filtrés pour afficher les cartes
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

      {/* S'affiche seulement si un produit est sélectionné */}
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
