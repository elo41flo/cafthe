import React, { useState, useEffect } from "react";

const Pepite = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/produits`);
        const data = await response.json();
        if (data && data.produits) {
          setProduits(data.produits);
        }
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  // Fonction pour récupérer un produit par son ID (numero_produit)
  const findById = (id) => produits.find((p) => p.numero_produit === id);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Chargement de la sélection...
      </div>
    );

  return (
    <div style={{ backgroundColor: "#fff", paddingBottom: "100px" }}>
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={titleStyle}>Les Pépites de Caf’Thé</h1>
        <p style={subtitleStyle}>
          Chaque mois, notre équipe déguste et sélectionne pour <br />
          vous le meilleur de nos arrivages.
        </p>
      </section>

      {/* 101 : Moka d'Ethiopie */}
      <PépiteCard
        titre="Le Coup de Cœur de Julien : Torréfaction"
        sousTitre="Julien a sélectionné ce Moka pour sa finesse légendaire."
        produit={findById(101)}
        labelBtn="Découvrir ce café"
      />

      {/* 201 : Darjeeling FF */}
      <PépiteCard
        titre="La Sélection Thé de Thomas"
        sousTitre="Une immersion printanière dans les jardins de l'Himalaya."
        produit={findById(201)}
        labelBtn="Découvrir ce thé"
      />

      {/* 301 : Moulin Manuel Pro */}
      <PépiteCard
        titre="L’Accessoire Indispensable"
        sousTitre="L'outil qui change tout pour votre rituel matinal."
        produit={findById(301)}
        labelBtn="Découvrir l'accessoire"
      />

      {/* 408 : Energie & Focus */}
      <PépiteCard
        titre="Le Coffret Focus & Productivité"
        sousTitre="Le boost naturel idéal pour vos journées de travail."
        produit={findById(408)}
        labelBtn="Découvrir le coffret"
      />
    </div>
  );
};

// Composant interne pour le design des bannières marron
const PépiteCard = ({ titre, sousTitre, produit, labelBtn }) => {
  if (!produit) return null;

  return (
    <div style={containerStyle}>
      <h2 style={h2Style}>{titre}</h2>
      <p style={subTextStyle}>{sousTitre}</p>
      <div style={bannerStyle}>
        <div style={{ maxWidth: "70%" }}>
          <h3 style={pepiteNameStyle}>{produit.nom_produit}</h3>
          <p style={descStyle}>
            <strong>L'avis de l'expert :</strong> {produit.description}
          </p>
          {produit.origine && (
            <p style={descStyle}>
              <strong>Origine :</strong> {produit.origine}
            </p>
          )}
        </div>
        <button style={btnStyle}>{labelBtn}</button>
      </div>
    </div>
  );
};

// --- STYLES ---
const titleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "48px",
  marginBottom: "20px",
};
const subtitleStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  marginBottom: "40px",
};
const containerStyle = {
  maxWidth: "900px",
  margin: "0 auto 60px auto",
  padding: "0 20px",
};
const h2Style = {
  fontFamily: "Playfair Display, serif",
  fontSize: "28px",
  marginBottom: "5px",
};
const subTextStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "14px",
  marginBottom: "20px",
};
const bannerStyle = {
  backgroundColor: "#aa8d74",
  borderRadius: "20px",
  padding: "40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  color: "#000",
};
const pepiteNameStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "15px",
};
const descStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "15px",
  marginBottom: "10px",
  lineHeight: "1.4",
};
const btnStyle = {
  backgroundColor: "#97af6e",
  border: "none",
  borderRadius: "15px",
  padding: "12px 25px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
};

export default Pepite;
