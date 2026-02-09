import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../components/ProductCard"; 

const ProductList = () => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setIsLoading(true); 
                setError(null);

                // CORRECTION : Ajout du 's' à produits pour correspondre au server.js
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/produits`);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                
                // On vérifie si les données sont dans data.produits (pluriel), data.produit ou data directement
                const liste = data.produits || data.produit || data.articles || data;
                setProduits(Array.isArray(liste) ? liste : []);
                
            } catch (err) {
                setError("Oups ! Impossible de charger les produits pour le moment.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduits();
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}><Skeleton height={250} borderRadius={12} /></div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: '#e74c3c' }}>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} style={{ marginTop: '10px', cursor: 'pointer' }}>Réessayer</button>
            </div>
        );
    }

    return (
        <div className="product-list-container" style={{ padding: '20px' }}>
            <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {produits.map((item, index) => (
                    <ProductCard 
                        key={item.id_produit || item.id || index} 
                        produit={item} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;