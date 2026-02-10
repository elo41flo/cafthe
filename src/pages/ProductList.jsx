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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/produits`);
                const data = await response.json();
                const liste = data.produits || data.produit || data;
                setProduits(Array.isArray(liste) ? liste : []);
            } catch (err) {
                setError("Erreur de chargement.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduits();
    }, []);

    const gridStyle = {
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, 300px)', // On force des colonnes de 300px
        gap: '30px', 
        padding: '20px',
        justifyContent: 'center' // Centre la grille sur l'écran
    };

    if (isLoading) return <div style={gridStyle}>{/* Skeletons... */}</div>;

    return (
        <div className="product-list-container">
            <h2 style={{ textAlign: 'center' }}>Notre Sélection</h2>
            <div style={gridStyle}>
                {produits.map((item) => (
                    <ProductCard key={item.numero_produit} produit={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;