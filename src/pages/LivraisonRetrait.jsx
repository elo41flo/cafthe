import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LivraisonRetrait = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("domicile"); // 'domicile' ou 'relais'
  const [isEditing, setIsEditing] = useState(false);

  // État pour les coordonnées
  const [userCoords, setUserCoords] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    ville: "",
    cp: "",
    telephone: "",
  });

  // Charger les infos au montage du composant
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setUserCoords({
      nom: user.nom_client || "",
      prenom: user.prenom_client || "",
      adresse: user.adresse_livraison || "",
      ville: user.ville_livraison || "",
      cp: user.cp_livraison || "",
      telephone: user.telephone || "",
    });
  }, []);

  const handleChange = (e) => {
    setUserCoords({ ...userCoords, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // On sauvegarde les infos (même modifiées) pour la commande
    localStorage.setItem("temp_order_coords", JSON.stringify(userCoords));

    if (method === "relais") {
      navigate("/choix-relais");
    } else {
      navigate("/paiement");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Mode de Livraison</h1>

      {/* --- SECTION COORDONNÉES --- */}
      <div style={coordSectionStyle}>
        <h2 style={sectionTitleStyle}>Mes coordonnées pour cette commande</h2>

        {!isEditing ? (
          <div style={infoBoxStyle}>
            <p style={{ margin: "5px 0" }}>
              <strong>
                {userCoords.prenom} {userCoords.nom}
              </strong>
            </p>
            <p style={{ margin: "5px 0" }}>
              {userCoords.adresse}, {userCoords.cp} {userCoords.ville}
            </p>
            <p style={{ margin: "5px 0" }}>📞 {userCoords.telephone}</p>
            <button onClick={() => setIsEditing(true)} style={editBtnStyle}>
              Modifier mes informations
            </button>
          </div>
        ) : (
          <div style={formContainerStyle}>
            <div style={rowStyle}>
              <input
                name="prenom"
                style={inputStyle}
                value={userCoords.prenom}
                onChange={handleChange}
                placeholder="Prénom"
              />
              <input
                name="nom"
                style={inputStyle}
                value={userCoords.nom}
                onChange={handleChange}
                placeholder="Nom"
              />
            </div>
            <input
              name="adresse"
              style={inputStyle}
              value={userCoords.adresse}
              onChange={handleChange}
              placeholder="Adresse"
            />
            <div style={rowStyle}>
              <input
                name="cp"
                style={inputStyle}
                value={userCoords.cp}
                onChange={handleChange}
                placeholder="Code Postal"
              />
              <input
                name="ville"
                style={inputStyle}
                value={userCoords.ville}
                onChange={handleChange}
                placeholder="Ville"
              />
            </div>
            <input
              name="telephone"
              style={inputStyle}
              value={userCoords.telephone}
              onChange={handleChange}
              placeholder="Téléphone"
            />
            <button onClick={() => setIsEditing(false)} style={saveBtnStyle}>
              Confirmer les modifications
            </button>
          </div>
        )}
      </div>

      <div style={optionsContainer}>
        {/* OPTION DOMICILE */}
        <div
          onClick={() => setMethod("domicile")}
          style={methodCard(method === "domicile")}
        >
          <span style={{ fontSize: "30px" }}>🏠</span>
          <div style={{ textAlign: "left" }}>
            <h3 style={methodTitle}>Click & Collect</h3>
            <p style={methodDesc}>Gratuit - Retrait en boutique</p>
          </div>
          <input type="radio" checked={method === "domicile"} readOnly />
        </div>

        {/* OPTION POINT RELAIS */}
        <div
          onClick={() => setMethod("relais")}
          style={methodCard(method === "relais")}
        >
          <span style={{ fontSize: "30px" }}>📦</span>
          <div style={{ textAlign: "left" }}>
            <h3 style={methodTitle}>Point Relais</h3>
            <p style={methodDesc}>Sous 3 à 5 jours - 3,50 €</p>
          </div>
          <input type="radio" checked={method === "relais"} readOnly />
        </div>
      </div>

      <button onClick={handleNext} style={buttonStyle}>
        CONTINUER VERS LE PAIEMENT
      </button>
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  maxWidth: "800px",
  margin: "60px auto",
  padding: "20px",
  textAlign: "center",
};
const titleStyle = {
  fontFamily: "Playfair Display",
  color: "#aa8d74",
  fontSize: "32px",
  marginBottom: "40px",
};
const sectionTitleStyle = {
  fontFamily: "Playfair Display",
  fontSize: "20px",
  color: "#4a3b2c",
  marginBottom: "15px",
  textAlign: "left",
};

const coordSectionStyle = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid #eee",
  marginBottom: "30px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const infoBoxStyle = {
  textAlign: "left",
  fontFamily: "Montserrat",
  fontSize: "15px",
  color: "#555",
};
const editBtnStyle = {
  background: "none",
  border: "none",
  color: "#aa8d74",
  textDecoration: "underline",
  cursor: "pointer",
  marginTop: "10px",
  fontWeight: "bold",
  padding: 0,
};

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const rowStyle = { display: "flex", gap: "10px" };
const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  flex: 1,
  fontFamily: "Montserrat",
};
const saveBtnStyle = {
  backgroundColor: "#aa8d74",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "40px",
};
const methodCard = (isSelected) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
  borderRadius: "15px",
  border: isSelected ? "2px solid #97af6e" : "1px solid #ddd",
  backgroundColor: isSelected ? "#f9fcf6" : "#fff",
  cursor: "pointer",
  transition: "0.3s",
});
const methodTitle = { margin: 0, fontSize: "18px", color: "#333" };
const methodDesc = { margin: "5px 0 0 0", fontSize: "14px", color: "#777" };
const buttonStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  padding: "15px 40px",
  borderRadius: "30px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  width: "100%",
  fontSize: "16px",
};

export default LivraisonRetrait;
