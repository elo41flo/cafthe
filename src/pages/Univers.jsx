import React from "react";
import "../styles/Pages/Univers.css";

const Univers = () => {
  return (
    <div className="univers-container">
      <header className="univers-header">
        <h1 className="univers-main-title">
          L’Art de la Dégustation <br /> & Nos Engagements
        </h1>
        <p className="univers-intro-text">
          Parce qu'un bon produit mérite d'être préparé avec <br /> soin et
          respect.
        </p>
      </header>

      <section className="univers-section">
        <h2 className="univers-h2">Nos Engagements pour la Planète</h2>
        <p className="univers-subtitle">
          La qualité commence par le respect de la terre et de ceux qui la
          cultivent.
        </p>

        <ul className="univers-list">
          <li className="univers-list-item">
            <span className="univers-bullet">●</span>
            <p>
              <strong>Sourcing Éthique :</strong> Nous travaillons en direct
              avec des petites coopératives pour garantir un prix juste aux
              producteurs.
            </p>
          </li>
          <li className="univers-list-item">
            <span className="univers-bullet">●</span>
            <p>
              <strong>Torréfaction Artisanale :</strong> À Blois, nous
              torréfions nos grains chaque semaine pour une fraîcheur absolue.
            </p>
          </li>
          <li className="univers-list-item">
            <span className="univers-bullet">●</span>
            <p>
              <strong>Zéro Plastique :</strong> Nos sachets kraft sont 100%
              recyclables et nos accessoires sont sélectionnés pour leur
              durabilité.
            </p>
          </li>
        </ul>
      </section>

      <section className="univers-section">
        <h2 className="univers-h2">Le Guide du Barista : Réussir son Café</h2>
        <p className="univers-subtitle">
          Le secret d'une tasse parfaite réside dans les détails.
        </p>

        <div style={{ marginTop: "30px" }}>
          <div className="univers-list-item">
            <span className="univers-bullet">●</span>
            <h3 className="univers-h3">La Mouture</h3>
          </div>
          <p style={{ marginLeft: "45px", marginBottom: "20px" }}>
            Adaptez la taille du grain à votre machine :
          </p>
          <ul className="univers-list" style={{ marginLeft: "60px" }}>
            <li className="univers-list-item-small">
              <span style={{ fontSize: "8px" }}>●</span> Fine (sel fin) : Pour
              l'Espresso.
            </li>
            <li className="univers-list-item-small">
              <span style={{ fontSize: "8px" }}>●</span> Moyenne (sucre en
              poudre) : Filtre ou V60.
            </li>
            <li className="univers-list-item-small">
              <span style={{ fontSize: "8px" }}>●</span> Grossière (gros sel) :
              Presse Française.
            </li>
          </ul>

          <div className="univers-list-item" style={{ marginTop: "40px" }}>
            <span className="univers-bullet">●</span>
            <h3 className="univers-h3">L’Eau et la Température</h3>
          </div>
          <p style={{ marginLeft: "45px" }}>
            Utilisez de l'eau filtrée si possible. Ne versez jamais d'eau
            bouillante ! La température idéale se situe entre 90°C et 94°C.
          </p>
        </div>
      </section>

      <section className="univers-section">
        <h2 className="univers-h2">Le Rituel du Thé : L’Infusion Parfaite</h2>
        <p className="univers-subtitle">
          Chaque feuille a son secret, ne la brûlez pas !
        </p>

        <h3 className="univers-h3" style={{ marginTop: "30px" }}>
          Les temps d’infusion
        </h3>
        <table className="univers-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Température</th>
              <th>Temps d’infusion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Thé vert</td>
              <td>75°C - 80°C</td>
              <td>2 à 3 minutes</td>
            </tr>
            <tr>
              <td>Thé Noir</td>
              <td>85°C - 90°C</td>
              <td>3 à 5 minutes</td>
            </tr>
            <tr>
              <td>Infusion / Rooibos</td>
              <td>95°C</td>
              <td>5 à 7 minutes</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="univers-section">
        <h2 className="univers-h2">Entretenir son Matériel</h2>
        <p className="univers-subtitle">
          Un outil propre est la clé d'un arôme pur.
        </p>
        <ul className="univers-list" style={{ marginTop: "30px" }}>
          <li className="univers-list-item">
            <span className="univers-bullet">●</span>
            <p>
              <strong>Le Moulin :</strong> Nettoyez les meules une fois par mois
              pour éviter que les huiles ne rancissent.
            </p>
          </li>
          <li className="univers-list-item">
            <span className="univers-bullet">●</span>
            <p>
              <strong>La Théière :</strong> Rincez-la à l'eau claire. Si c'est
              de la fonte, ne frottez jamais l'intérieur !
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Univers;
