import React from "react";

const Univers = () => {
  return (
    <div
      style={{ backgroundColor: "#fff", color: "#000", paddingBottom: "100px" }}
    >
      {/* SECTION HEADER */}
      <section style={headerSectionStyle}>
        <h1 style={mainTitleStyle}>
          L’Art de la Dégustation <br /> & Nos Engagements
        </h1>
        <p style={introTextStyle}>
          Parce qu'un bon produit mérite d'être préparé avec <br /> soin et
          respect.
        </p>
      </section>

      {/* SECTION NOS ENGAGEMENTS */}
      <section style={contentContainerStyle}>
        <h2 style={h2Style}>Nos Engagements pour la Planète</h2>
        <p style={subTitleStyle}>
          La qualité commence par le respect de la terre et de ceux qui la
          cultivent.
        </p>

        <ul style={listStyle}>
          <li style={listItemStyle}>
            <span style={bulletStyle}>●</span>
            <p>
              <strong>Sourcing Éthique :</strong> Nous travaillons en direct
              avec des petites coopératives pour garantir un prix juste aux
              producteurs.
            </p>
          </li>
          <li style={listItemStyle}>
            <span style={bulletStyle}>●</span>
            <p>
              <strong>Torréfaction Artisanale :</strong> À Blois, nous
              torréfions nos grains chaque semaine pour une fraîcheur absolue.
            </p>
          </li>
          <li style={listItemStyle}>
            <span style={bulletStyle}>●</span>
            <p>
              <strong>Zéro Plastique :</strong> Nos sachets kraft sont 100%
              recyclables et nos accessoires sont sélectionnés pour leur
              durabilité.
            </p>
          </li>
        </ul>
      </section>

      {/* SECTION GUIDE BARISTA : CAFÉ */}
      <section style={contentContainerStyle}>
        <h2 style={h2Style}>Le Guide du Barista : Réussir son Café</h2>
        <p style={subTitleStyle}>
          Le secret d'une tasse parfaite réside dans les détails.
        </p>

        <div style={{ marginTop: "30px" }}>
          <div style={listItemStyle}>
            <span style={bulletStyle}>●</span>
            <h3 style={h3Style}>La Mouture</h3>
          </div>
          <p style={{ marginLeft: "45px", marginBottom: "20px" }}>
            Adaptez la taille du grain à votre machine :
          </p>
          <ul style={{ ...listStyle, marginLeft: "60px" }}>
            <li style={listItemSmallStyle}>
              <span style={bulletSmallStyle}>●</span> Fine (sel fin) : Pour
              l'Espresso.
            </li>
            <li style={listItemSmallStyle}>
              <span style={bulletSmallStyle}>●</span> Moyenne (sucre en poudre)
              : Pour la cafetière Filtre ou V60.
            </li>
            <li style={listItemSmallStyle}>
              <span style={bulletSmallStyle}>●</span> Grossière (gros sel) :
              Pour la Presse Française (Piston).
            </li>
          </ul>

          <div style={{ ...listItemStyle, marginTop: "40px" }}>
            <span style={bulletStyle}>●</span>
            <h3 style={h3Style}>L’Eau et la Température</h3>
          </div>
          <p style={{ marginLeft: "45px" }}>
            Utilisez de l'eau filtrée si possible. Ne versez jamais d'eau
            bouillante ! La température idéale se situe entre 90°C et 94°C.
          </p>
        </div>
      </section>

      {/* SECTION RITUEL DU THÉ + TABLEAU */}
      <section style={contentContainerStyle}>
        <h2 style={h2Style}>Le Rituel du Thé : L’Infusion Parfaite</h2>
        <p style={subTitleStyle}>
          Chaque feuille a son secret, ne la brûlez pas !
        </p>

        <h3 style={{ ...h3Style, marginTop: "30px" }}>Les temps d’infusion</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Produit</th>
              <th style={thStyle}>Température</th>
              <th style={thStyle}>Temps d’infusion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Thé vert</td>
              <td style={tdStyle}>75°C - 80°C</td>
              <td style={tdStyle}>2 à 3 minutes</td>
            </tr>
            <tr>
              <td style={tdStyle}>Thé Noir</td>
              <td style={tdStyle}>85°C - 90°C</td>
              <td style={tdStyle}>3 à 5 minutes</td>
            </tr>
            <tr>
              <td style={tdStyle}>Infusion / Rooibos</td>
              <td style={tdStyle}>95°C</td>
              <td style={tdStyle}>5 à 7 minutes</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* SECTION ENTRETIEN */}
      <section style={contentContainerStyle}>
        <h2 style={h2Style}>Entretenir son Matériel</h2>
        <p style={subTitleStyle}>Un outil propre est la clé d'un arôme pur.</p>

        <ul style={{ ...listStyle, marginTop: "30px" }}>
          <li style={listItemStyle}>
            <span style={bulletStyle}>●</span>
            <p>
              <strong>Le Moulin :</strong> Nettoyez les meules une fois par mois
              pour éviter que les huiles de café ne rancissent.
            </p>
          </li>
          <li style={listItemStyle}>
            <span style={bulletStyle}>●</span>
            <p>
              <strong>La Théière :</strong> Rincez-la simplement à l'eau claire.
              Si c'est une théière en fonte, ne frottez jamais l'intérieur !
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

// --- STYLES ---
const headerSectionStyle = { textAlign: "center", padding: "100px 20px" };
const mainTitleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "20px",
};
const introTextStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "18px",
  color: "#333",
  textAlign: "right",
  maxWidth: "800px",
  margin: "0 auto",
};

const contentContainerStyle = {
  maxWidth: "900px",
  margin: "0 auto 80px auto",
  padding: "0 20px",
};
const h2Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "32px",
  marginBottom: "10px",
};
const h3Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "24px",
  margin: 0,
};
const subTitleStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "16px",
  color: "#444",
  marginBottom: "30px",
};

const listStyle = { listStyle: "none", padding: 0 };
const listItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "15px",
  marginBottom: "20px",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "16px",
  lineHeight: "1.6",
};
const listItemSmallStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "10px",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "15px",
};

const bulletStyle = { fontSize: "12px", marginTop: "6px" };
const bulletSmallStyle = { fontSize: "8px" };

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "30px",
  fontFamily: "'Montserrat', sans-serif",
};
const thStyle = {
  textAlign: "left",
  fontSize: "20px",
  paddingBottom: "20px",
  borderBottom: "1px solid #000",
};
const tdStyle = {
  padding: "15px 0",
  fontSize: "16px",
  borderBottom: "1px solid #eee",
};

export default Univers;
