import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ produit }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const imageUrl = `${apiUrl}/images/${produit.image}`;

    return (
        <div style={{ 
            width: '300px', 
            border: '1px solid #ddd', 
            borderRadius: '10px', 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff'
        }}>
            {/* LE CADRE 300x200 STRICT */}
            <div style={{ 
                width: '300px', 
                height: '200px', 
                overflow: 'hidden',
                backgroundColor: '#eee' 
            }}>
                <img 
                    src={imageUrl} 
                    alt={produit.nom_produit} 
                    style={{ 
                        width: '300px', 
                        height: '200px', 
                        objectFit: 'cover', // Recadre sans déformer
                        display: 'block'
                    }} 
                />
            </div>

            <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{produit.nom_produit}</h3>
                <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>{produit.prix_ttc} €</p>
                
                <Link to={`/produit/${produit.numero_produit}`} style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#8e44ad',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}>
                    Voir les détails
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;