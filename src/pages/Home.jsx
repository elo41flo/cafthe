import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* SECTION HERO */}
      <section style={sectionStyle}>
        <h1 style={h1Style}>L'Art de l'éveil, la douceur de l'instant</h1>
        <p style={pStyle}>
          Découvrez une sélection unique de cafés de terroirs
          <br />
          et de thés d’exception, livrés chez vous.
        </p>
      </section>

      {/* BANNIÈRE MARRON 1 */}
      <div style={fullBannerStyle}>
        <p style={bannerTextStyle}>
          Nous vous assurons des produits sélectionnés avec soin auprès de
          petits producteurs. Des emballages recyclables et agricultures
          durable. Nous sommes chez vous en 48 heure pour vous livrer.
        </p>
      </div>

      {/* CALL TO ACTION */}
      <section style={sectionStyle}>
        <p
          style={{
            ...pStyle,
            textDecoration: "underline",
            marginBottom: "30px",
          }}
        >
          Livraison offertes dès 45€ d’achat.
        </p>
        <Link to="/boutique" style={buttonStyle}>
          Découvrir notre boutique
        </Link>
      </section>

      {/* --- SECTION LES PÉPITES DE CAF'THÉ --- */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={h2Style}>Les Pépites de Caf’Thé</h2>
        <p style={pIntroStyle}>
          Chaque mois, notre équipe déguste et sélectionne pour <br />
          vous le meilleur de nos arrivages.
        </p>

        {/* CONTENEUR DES PÉPITES */}
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* CAFÉ DE JULIEN */}
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

          {/* THÉ DE THOMAS */}
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

      {/* BANNIÈRE MARRON FINALE */}
      <div style={fullBannerStyle}>
        <p style={bannerTextStyle}>
          Chez Caf’Thé, chaque tasse raconte une histoire équitable.
        </p>
      </div>
    </div>
  );
};

// --- STYLES ---
const sectionStyle = {
  padding: "80px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const h1Style = {
  fontFamily: "Playfair Display, serif",
  fontSize: "48px",
  marginBottom: "30px",
};
const h2Style = {
  fontFamily: "Playfair Display, serif",
  fontSize: "40px",
  marginBottom: "20px",
};
const pStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "22px",
  lineHeight: "1.5",
};
const pIntroStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  marginBottom: "50px",
};

const fullBannerStyle = {
  backgroundColor: "#aa8d74",
  padding: "60px 20px",
  textAlign: "center",
};
const bannerTextStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  maxWidth: "900px",
  margin: "0 auto",
};

const buttonStyle = {
  backgroundColor: "#97af6e",
  color: "#000",
  padding: "15px 40px",
  borderRadius: "25px",
  textDecoration: "none",
  fontSize: "20px",
  fontWeight: "bold",
};

const pepiteContainerStyle = { marginBottom: "60px", textAlign: "left" };
const pepiteSubTitle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "24px",
  marginBottom: "15px",
};
const pepiteCardStyle = {
  backgroundColor: "#aa8d74",
  padding: "30px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#000",
};
const pepiteNameStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "22px",
  marginBottom: "10px",
};
const pepiteDescStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: "15px",
  marginBottom: "5px",
};
const smallButtonStyle = {
  backgroundColor: "#97af6e",
  color: "#000",
  padding: "10px 25px",
  borderRadius: "15px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "bold",
};

export default Home;
