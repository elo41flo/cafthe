import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ produit }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // Utilisation des propriétés trouvées pour l'image
    const imageFileName = produit.images || produit.image || produit.image_url;

    const imageUrl = imageFileName 
        ? `${apiUrl}/images/${imageFileName}`
        : "https://placehold.co/300x200?text=Image+Indisponible";

    return (
        <div className="product-card" style={{ border: '1px solid #eee', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img 
                src={imageUrl} 
                alt={produit.nom_produit} 
                className="product-card-image"
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x200?text=Erreur+Image";
                }}
            />
            <h3 style={{ margin: '15px 0 5px 0', fontSize: '1.2rem' }}>{produit.nom_produit}</h3>
            <p style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '15px' }}>{produit.prix_ttc} €</p>

            <Link to={`/produit/${produit.id_produit || produit.id}`} className="details-btn" style={{ color: '#8e44ad', fontWeight: '500', textDecoration: 'none' }}>
                Voir les détails
            </Link>
        </div>
    );
};

export default ProductCard;