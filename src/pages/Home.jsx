import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      {/* SECTION HERO */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h1 style={h1Style}>L'Art de l'éveil, la douceur de l'instant</h1>
          <p style={pHeroStyle}>
            Découvrez une sélection unique de cafés de terroirs
            <br />
            et de thés d’exception, livrés chez vous.
          </p>
          <Link to="/boutique" style={buttonStyle}>
            Découvrir notre boutique
          </Link>
        </div>
      </section>

      {/* SECTION ENGAGEMENTS */}
      <section style={engagementSectionStyle}>
        <div style={engagementItemStyle}>
          <span style={iconStyle}>🌱</span>
          <p>Agriculture Durable</p>
        </div>
        <div style={engagementItemStyle}>
          <span style={iconStyle}>♻️</span>
          <p>Emballages Recyclables</p>
        </div>
        <div style={engagementItemStyle}>
          <span style={iconStyle}>🚀</span>
          <p>Livraison 48h</p>
        </div>
      </section>

      {/* NOUVELLE SECTION : LA BOX PAR ABONNEMENT */}
      <section style={boxSectionStyle}>
        <div style={boxContentStyle}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2 style={boxTitleStyle}>La Box Caf'Thé : Votre rituel mensuel</h2>
            <p style={boxDescStyle}>
              Recevez chaque mois une sélection personnalisée de nos meilleures
              découvertes. Choisissez vos préférences, on s'occupe du reste.
            </p>
            <ul style={boxListStyle}>
              <li>
                ✨ <strong>Sur-mesure :</strong> Thé, Café ou Mixte selon vos
                goûts.
              </li>
              <li>
                🎁 <strong>Surprise :</strong> Des produits exclusifs et des
                accessoires.
              </li>
              <li>
                📦 <strong>Liberté :</strong> Abonnement sans engagement,
                résiliable en un clic.
              </li>
            </ul>
            <Link to="/abonnement" style={boxButtonStyle}>
              Créer ma box personnalisée
            </Link>
          </div>
          <div style={boxImageWrapperStyle}>
            {/* Tu pourras remplacer cette URL par une image de box réelle */}
            <img
              src="/src/assets/image_accueil.webp"
              alt="Box Caf'Thé"
              style={boxImgStyle}
            />
          </div>
        </div>
      </section>

      {/* BANNIÈRE RÉASSURANCE */}
      <div style={fullBannerStyle}>
        <p style={bannerTextStyle}>
          Nous sélectionnons nos produits avec soin auprès de petits producteurs
          passionnés. Une démarche équitable pour une dégustation qui a du sens.
        </p>
      </div>

      {/* SECTION LES PÉPITES */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          backgroundColor: "#fcfaf8",
        }}
      >
        <h2 style={h2Style}>Les Pépites de Caf’Thé</h2>
        <p style={pIntroStyle}>
          Chaque mois, notre équipe déguste et sélectionne pour <br />
          vous le meilleur de nos arrivages.
        </p>

        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={pepiteContainerStyle}>
            <h3 style={pepiteSubTitle}>
              Le Coup de Cœur de Julien : Torréfaction
            </h3>
            <div style={pepiteCardStyle}>
              <div style={{ textAlign: "left", maxWidth: "70%" }}>
                <h4 style={pepiteNameStyle}>Himalaya Népal</h4>
                <p style={pepiteDescStyle}>
                  <strong>Pourquoi ce choix ?</strong> "Un café d'altitude
                  exceptionnel avec des notes de cacao uniques."
                </p>
                <p style={pepiteDescStyle}>
                  <strong>Intensité :</strong> 3/5 | <strong>Origine :</strong>{" "}
                  Népal
                </p>
              </div>
              <Link to="/boutique" style={smallButtonStyle}>
                Découvrir
              </Link>
            </div>
          </div>

          <div style={pepiteContainerStyle}>
            <h3 style={pepiteSubTitle}>La Sélection Thé de Thomas</h3>
            <div style={pepiteCardStyle}>
              <div style={{ textAlign: "left", maxWidth: "70%" }}>
                <h4 style={pepiteNameStyle}>Darjeeling First Flush</h4>
                <p style={pepiteDescStyle}>
                  <strong>L'avis de l'expert :</strong> "La toute première
                  récolte du printemps. Fin et floral."
                </p>
                <p style={pepiteDescStyle}>
                  <strong>Type :</strong> Thé Noir | <strong>Origine :</strong>{" "}
                  Inde
                </p>
              </div>
              <Link to="/boutique" style={smallButtonStyle}>
                Découvrir
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <p
          style={{
            ...pStyle,
            textDecoration: "underline",
            marginBottom: "30px",
          }}
        >
          Livraison offerte dès 45€ d’achat.
        </p>

        {!isLoggedIn ? (
          <Link
            to="/register"
            style={{
              ...buttonStyle,
              backgroundColor: "#aa8d74",
              color: "white",
            }}
          >
            Rejoindre l'aventure
          </Link>
        ) : (
          <p
            style={{
              fontFamily: "Montserrat",
              color: "#aa8d74",
              fontWeight: "bold",
            }}
          >
            Heureux de vous revoir parmi nous !
          </p>
        )}
      </section>
    </div>
  );
};

// --- STYLES ---

// Styles pour la Box
const boxSectionStyle = {
  padding: "100px 20px",
  backgroundColor: "#f4f1ee", // Couleur un peu plus chaude/crème
  display: "flex",
  justifyContent: "center",
};

const boxContentStyle = {
  maxWidth: "1100px",
  display: "flex",
  alignItems: "center",
  gap: "50px",
  flexWrap: "wrap-reverse",
  textAlign: "left",
};

const boxTitleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "36px",
  color: "#4a3b2c",
  marginBottom: "20px",
};

const boxDescStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  color: "#555",
  lineHeight: "1.6",
  marginBottom: "25px",
};

const boxListStyle = {
  listStyle: "none",
  padding: 0,
  fontFamily: "Montserrat, sans-serif",
  fontSize: "16px",
  color: "#4a3b2c",
  marginBottom: "35px",
  lineHeight: "2",
};

const boxButtonStyle = {
  backgroundColor: "#aa8d74",
  color: "white",
  padding: "16px 35px",
  borderRadius: "30px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold",
  display: "inline-block",
  transition: "0.3s",
  boxShadow: "0 4px 15px rgba(170, 141, 116, 0.3)",
};

const boxImageWrapperStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  minWidth: "300px",
};

const boxImgStyle = {
  width: "100%",
  maxWidth: "500px",
  borderRadius: "20px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
};

// Styles existants
const heroSectionStyle = {
  height: "80vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const heroOverlayStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  padding: "50px",
  borderRadius: "15px",
  textAlign: "center",
  maxWidth: "800px",
  margin: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};
const h1Style = {
  fontFamily: "Playfair Display, serif",
  fontSize: "42px",
  color: "#4a3b2c",
  marginBottom: "20px",
};
const pHeroStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  color: "#555",
  marginBottom: "30px",
  lineHeight: "1.6",
};
const engagementSectionStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "60px 20px",
  backgroundColor: "#fff",
  flexWrap: "wrap",
  gap: "30px",
};
const engagementItemStyle = {
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#aa8d74",
};
const iconStyle = { display: "block", fontSize: "40px", marginBottom: "10px" };
const h2Style = {
  fontFamily: "Playfair Display, serif",
  fontSize: "36px",
  color: "#aa8d74",
  marginBottom: "20px",
};
const pStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  lineHeight: "1.5",
};
const pIntroStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  color: "#666",
  marginBottom: "50px",
};
const fullBannerStyle = {
  backgroundColor: "#aa8d74",
  padding: "60px 20px",
  textAlign: "center",
  color: "white",
};
const bannerTextStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  maxWidth: "850px",
  margin: "0 auto",
  lineHeight: "1.8",
};
const buttonStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  padding: "16px 40px",
  borderRadius: "30px",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "bold",
  transition: "0.3s",
  display: "inline-block",
};
const pepiteContainerStyle = { marginBottom: "40px", textAlign: "left" };
const pepiteSubTitle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "22px",
  color: "#4a3b2c",
  marginBottom: "15px",
  paddingLeft: "10px",
  borderLeft: "4px solid #97af6e",
};
const pepiteCardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#333",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  border: "1px solid #eee",
};
const pepiteNameStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "24px",
  color: "#aa8d74",
  marginBottom: "10px",
};
const pepiteDescStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "14px",
  marginBottom: "8px",
  lineHeight: "1.4",
};
const smallButtonStyle = {
  backgroundColor: "#97af6e",
  color: "white",
  padding: "12px 25px",
  borderRadius: "20px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "bold",
};

export default Home;
