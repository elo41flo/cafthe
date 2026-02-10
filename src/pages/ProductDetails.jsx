import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL;

    const colors = {
        vert: "#97af6e",
        marron: "#aa8d74",
        jaune: "#ffeb9c",
        fonce: "#2c3e50"
    };

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/produits/${id}`);
                const data = await response.json();
                const result = Array.isArray(data) ? data[0] : (data.produit || data);
                setProduit(result);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduit();
    }, [id, apiUrl]);

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
    if (!produit) return <div style={{ padding: '20px', textAlign: 'center' }}>Produit introuvable.</div>;

    return (
        <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            padding: '20px', 
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center' // Pour tout centrer comme sur la maquette
        }}>
            
            <Link to="/" style={{ color: colors.marron, textDecoration: 'none', display: 'block', marginBottom: '20px', fontWeight: 'bold' }}>
                ← RETOUR
            </Link>

            {/* 1. L'IMAGE AU CENTRE (300x200) */}
            <div style={{ 
                width: '300px', 
                height: '200px', 
                margin: '0 auto 30px auto', 
                borderRadius: '12px', 
                overflow: 'hidden',
                border: `2px solid ${colors.vert}`
            }}>
                <img 
                    src={`${apiUrl}/images/${produit.image}`} 
                    alt={produit.nom_produit} 
                    style={{ width: '300px', height: '200px', objectFit: 'cover' }} 
                />
            </div>

            {/* 2. APERÇU & PRIX */}
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: colors.marron, fontSize: '2.5rem', marginBottom: '10px' }}>
                {produit.nom_produit}
            </h1>
            <div style={{ 
                backgroundColor: colors.jaune, 
                display: 'inline-block', 
                padding: '10px 30px', 
                borderRadius: '30px', 
                fontWeight: 'bold', 
                fontSize: '1.5rem',
                marginBottom: '30px'
            }}>
                {produit.prix_ttc} €
            </div>

            {/* 3. BOUTON AJOUTER AU PANIER */}
            <div style={{ marginBottom: '40px' }}>
                <button style={{ 
                    backgroundColor: colors.vert, 
                    color: 'white', 
                    border: 'none', 
                    padding: '15px 50px', 
                    borderRadius: '5px', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    AJOUTER AU PANIER
                </button>
                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: colors.vert }}>
                    {produit.stock > 0 ? `● Disponible en stock` : "○ Rupture de stock"}
                </p>
            </div>

            {/* 4. DESCRIPTION */}
            <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: colors.marron, borderBottom: `1px solid ${colors.jaune}` }}>
                    DESCRIPTION
                </h3>
                <p style={{ lineHeight: '1.6', color: '#555' }}>
                    {produit.description || produit.Description}
                </p>
            </div>

            {/* 5. CARACTÉRISTIQUES TECHNIQUES */}
            <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: colors.marron, borderBottom: `1px solid ${colors.jaune}` }}>
                    CARACTÉRISTIQUES TECHNIQUES
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                    <li><strong>Origine :</strong> {produit.origine || 'Non spécifiée'}</li>
                    <li><strong>Catégorie :</strong> {produit.Catégorie}</li>
                    <li><strong>Type :</strong> {produit.type_vente}</li>
                </ul>
            </div>

            {/* 6. CONSEILS DE PRÉPARATION */}
            <div style={{ textAlign: 'left', paddingBottom: '50px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: colors.marron, borderBottom: `1px solid ${colors.jaune}` }}>
                    CONSEILS DE PRÉPARATION
                </h3>
                <p style={{ color: '#555', fontStyle: 'italic' }}>
                    Pour révéler tous les arômes de ce {produit.Catégorie}, nous vous conseillons une eau à 90°C et une infusion de 3 à 5 minutes.
                </p>
            </div>

        </div>
    );
};

export default ProductDetails;