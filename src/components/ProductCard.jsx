import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ produit }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const imageUrl = `${apiUrl}/images/${produit.image}`;

  return (
    <div
      style={{
        width: "300px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#aa8d74",
        color: "black",
      }}
    >
      <div
        style={{
          width: "300px",
          height: "200px",
          overflow: "hidden",
          backgroundColor: "#eee",
        }}
      >
        <img
          src={imageUrl}
          alt={produit.nom_produit}
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: "15px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 600, // Semi Bold
            margin: "0 0 10px 0",
          }}
        >
          {produit.nom_produit}
        </h3>

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "24px",
            fontWeight: 400, // Regular
            lineHeight: "1.4",
          }}
        >
          {produit.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: 0,
            }}
          >
            {produit.prix_ttc} €
          </p>

          <Link
            to={`/produit/${produit.numero_produit}`}
            style={{
              padding: "8px 15px",
              backgroundColor: "#97af6e",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
