import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../components/ProductCard";
import "../styles/Pages/ProductList.css"; // Import du style

const ProductList = () => {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/produits`,
        );
        const data = await response.json();
        const liste = data.produits || data.produit || data;
        setProduits(Array.isArray(liste) ? liste : []);
      } catch (err) {
        setError("Erreur de chargement des produits.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduits();
  }, []);

  if (error) return <div className="product-error">{error}</div>;

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Notre Sélection</h2>

      <div className="product-grid">
        {isLoading
          ? // Affichage de 6 Skeletons pendant le chargement
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{ borderRadius: "15px", overflow: "hidden" }}
                >
                  <Skeleton height={250} />
                  <Skeleton count={2} style={{ marginTop: "10px" }} />
                </div>
              ))
          : produits.map((item) => (
              <ProductCard key={item.numero_produit} produit={item} />
            ))}
      </div>
    </div>
  );
};

export default ProductList;
