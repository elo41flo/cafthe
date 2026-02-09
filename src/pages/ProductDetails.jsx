import React, { useState, useEffect } from "react"; // Ne pas oublier useState et useEffect !
import { useParams, Link } from "react-router-dom"; 

const ProductDetails = () => {
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                setIsLoading(true); 
                setError(null);

                const response = await fetch(`${apiUrl}/api/produit/${id}`);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                
                // Ici, on récupère un seul objet produit, pas un tableau
                const detailProduit = data.produit || data.article || data;
                setProduit(detailProduit);
                
            } catch (err) {
                console.error(err);
                setError("Oups ! Impossible de charger les détails de ce café.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduit();
    }, [id, apiUrl]); // On ajoute id et apiUrl dans les dépendances

    if (isLoading) return <div style={{ padding: '50px', textAlign: 'center' }}>Chargement du café...</div>;

    if (error || !produit) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: '#e74c3c' }}>
                <p>{error || "Produit introuvable"}</p>
                <Link to="/" style={{ color: '#8e44ad' }}>Retour à l'accueil</Link>
            </div>
        );
    }

    // Gestion de l'image
    const imageFileName = produit.images || produit.image || produit.image_url;
    const imageUrl = imageFileName 
        ? `${apiUrl}/images/${imageFileName}`
        : "https://placehold.co/300x200?text=Image+Indisponible";

    return (
        <div className="product-details" style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
            <img 
                src={imageUrl} 
                alt={produit.nom_produit} 
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x200?text=Erreur+Image";
                }}
            />
            <h2 style={{ margin: '20px 0' }}>{produit.nom_produit}</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>{produit.prix_ttc} €</p>
            
            <div style={{ margin: '20px 0', lineHeight: '1.6' }}>
                <p><strong>Description :</strong> {produit.description || "Aucune description disponible."}</p>
                <p><strong>Stock disponible :</strong> {produit.stock} unités</p>
            </div>

            <Link to="/" style={{ display: 'inline-block', marginTop: '20px', color: '#8e44ad', textDecoration: 'none', fontWeight: 'bold' }}>
                ← Retour aux produits
            </Link>
        </div>
    );
};

export default ProductDetails;