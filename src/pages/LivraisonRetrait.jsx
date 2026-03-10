// Importations
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/LivraisonRetrait.css";

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
    localStorage.setItem("temp_order_coords", JSON.stringify(userCoords));
    if (method === "relais") {
      navigate("/choix-relais");
    } else {
      navigate("/paiement");
    }
  };

  return (
    <div className="delivery-container">
      <h1 className="delivery-title">Mode de Livraison</h1>

      {/* SECTION COORDONNÉES */}
      <div className="coord-section">
        <h2 className="section-title">Mes coordonnées pour cette commande</h2>

        {!isEditing ? (
          <div className="info-box">
            <p>
              <strong>
                {userCoords.prenom} {userCoords.nom}
              </strong>
            </p>
            <p>
              {userCoords.adresse}, {userCoords.cp} {userCoords.ville}
            </p>
            <p>📞 {userCoords.telephone}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-link-btn"
            >
              Modifier mes informations
            </button>
          </div>
        ) : (
          <div className="edit-coord-form">
            <div className="form-row">
              <input
                name="prenom"
                className="coord-input"
                value={userCoords.prenom}
                onChange={handleChange}
                placeholder="Prénom"
              />
              <input
                name="nom"
                className="coord-input"
                value={userCoords.nom}
                onChange={handleChange}
                placeholder="Nom"
              />
            </div>
            <input
              name="adresse"
              className="coord-input"
              value={userCoords.adresse}
              onChange={handleChange}
              placeholder="Adresse"
            />
            <div className="form-row">
              <input
                name="cp"
                className="coord-input"
                value={userCoords.cp}
                onChange={handleChange}
                placeholder="Code Postal"
              />
              <input
                name="ville"
                className="coord-input"
                value={userCoords.ville}
                onChange={handleChange}
                placeholder="Ville"
              />
            </div>
            <input
              name="telephone"
              className="coord-input"
              value={userCoords.telephone}
              onChange={handleChange}
              placeholder="Téléphone"
            />
            <button
              onClick={() => setIsEditing(false)}
              className="btn-save-coords"
            >
              Confirmer les modifications
            </button>
          </div>
        )}
      </div>

      {/* OPTIONS DE LIVRAISON */}
      <div className="delivery-options">
        <div
          className={`method-card ${method === "domicile" ? "active" : ""}`}
          onClick={() => setMethod("domicile")}
        >
          <span style={{ fontSize: "30px" }}>🏠</span>
          <div className="method-info">
            <h3 className="method-name">Click & Collect</h3>
            <p className="method-desc">Gratuit - Retrait en boutique</p>
          </div>
          <input type="radio" checked={method === "domicile"} readOnly />
        </div>

        <div
          className={`method-card ${method === "relais" ? "active" : ""}`}
          onClick={() => setMethod("relais")}
        >
          <span style={{ fontSize: "30px" }}>📦</span>
          <div className="method-info">
            <h3 className="method-name">Point Relais</h3>
            <p className="method-desc">Sous 3 à 5 jours - 3,50 €</p>
          </div>
          <input type="radio" checked={method === "relais"} readOnly />
        </div>
      </div>

      <button onClick={handleNext} className="btn-continue-checkout">
        CONTINUER VERS LE PAIEMENT
      </button>
    </div>
  );
};

export default LivraisonRetrait;
