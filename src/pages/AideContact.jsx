import React from "react";

const AideContact = () => {
  return (
    <div
      style={{ backgroundColor: "#fff", color: "#000", paddingBottom: "100px" }}
    >
      {/* HEADER */}
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={mainTitleStyle}>
          Besoin d’aide ? On <br /> s’occupe de tout.
        </h1>
        <p style={introTextStyle}>
          Une question sur votre commande, une hésitation sur <br />
          une mouture ou simplement envie de nous dire <br />
          bonjour ? Vous êtes au bon endroit.
        </p>
      </section>

      {/* SECTION FAQ */}
      <section style={contentContainerStyle}>
        <h2 style={h2Style}>Foire Aux Questions (FAQ)</h2>
        <p style={subTitleStyle}>
          Gagnez du temps avec les réponses aux questions les plus fréquentes.
        </p>

        <div style={faqWrapper}>
          <div style={faqItemStyle}>
            <span style={bulletStyle}>●</span>
            <div>
              <h3 style={faqCategoryTitle}>Commandes & Livraison</h3>
              <p style={questionStyle}>Quels sont les délais de livraison ?</p>
              <p style={answerStyle}>
                Réponse : Vos commandes sont préparées sous 24h. Comptez 2 à 4
                jours ouvrés pour une livraison à domicile ou en point relais.
              </p>

              <p style={questionStyle}>La livraison est-elle offerte ?</p>
              <p style={answerStyle}>
                Réponse : Oui, dès 45€ d’achat en France métropolitaine !
              </p>
            </div>
          </div>

          <div style={faqItemStyle}>
            <span style={bulletStyle}>●</span>
            <div>
              <h3 style={faqCategoryTitle}>Nos Produits</h3>
              <p style={questionStyle}>Proposez-vous du café déjà moulu ?</p>
              <p style={answerStyle}>
                Réponse : Bien sûr ! Sur chaque fiche produit, vous pouvez
                choisir entre grains ou mouture adaptée (Espresso, Filtre,
                Piston).
              </p>

              <p style={questionStyle}>Vos thés sont-ils bio ?</p>
              <p style={answerStyle}>
                Réponse : Une grande partie de notre sélection est certifiée
                Bio. Cherchez le petit logo sur les fiches produits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION FORMULAIRE */}
      <section style={contentContainerStyle}>
        <h2 style={h2Style}>Nous envoyer un message</h2>
        <p style={subTitleStyle}>
          Julien et Thomas vous répondent personnellement sous 24h.
        </p>

        {/* Remplacer 'VOTRE_ID_FORMSPREE' par l'ID fourni par Formspree */}
        <form
          action="https://formspree.io/f/xojnwark"
          method="POST"
          style={formStyle}
        >
          <input
            type="text"
            name="sujet"
            placeholder="Sujet"
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            style={inputStyle}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={inputStyle}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            style={textareaStyle}
            required
          ></textarea>

          <button type="submit" style={btnStyle}>
            Envoyer le message
          </button>
        </form>
      </section>

      {/* SECTION LOCALISATION */}
      <section style={contentContainerStyle}>
        <h2 style={h2Style}>Nous trouver à Blois</h2>
        <p style={subTitleStyle}>
          Envie de sentir l’odeur du café fraîchement torréfié ? Passez nous
          voir !
        </p>

        <div style={infoBoxStyle}>
          <p>
            <strong>Adresse :</strong> Avenue du Moulin à Café 41, 41000 Blois
          </p>
          <p>
            <strong>Horaires :</strong> Lundi au Vendredi, 9h - 18h
          </p>
          <p>
            <strong>Téléphone :</strong> 02 54 99 99 99
          </p>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.9157204481356!2d1.3283!3d47.5833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDM1JzAwLjAiTiAxwrAxOSc0MS45IkU!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "20px", marginTop: "20px" }} // Objet {{ }} au lieu de string " "
          allowFullScreen="" // Majuscule sur le S
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" // Majuscule sur le P
        ></iframe>
      </section>
    </div>
  );
};

// --- STYLES FIGMA ---
const mainTitleStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "20px",
};
const introTextStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "16px",
  color: "#333",
  textAlign: "right",
  maxWidth: "900px",
  margin: "0 auto",
};

const contentContainerStyle = {
  maxWidth: "900px",
  margin: "0 auto 60px auto",
  padding: "0 20px",
};
const h2Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "32px",
  marginBottom: "10px",
};
const subTitleStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "15px",
  color: "#444",
  marginBottom: "30px",
};

const faqWrapper = { marginTop: "30px" };
const faqItemStyle = { display: "flex", gap: "15px", marginBottom: "40px" };
const bulletStyle = { fontSize: "12px", marginTop: "8px" };
const faqCategoryTitle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "18px",
  textDecoration: "underline",
  marginBottom: "15px",
};
const questionStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "700",
  fontSize: "16px",
  marginTop: "15px",
};
const answerStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "15px",
  color: "#333",
  marginBottom: "10px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "500px",
};
const inputStyle = {
  backgroundColor: "#97af6e",
  border: "none",
  borderRadius: "20px",
  padding: "15px 25px",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "16px",
  color: "#000",
};
const textareaStyle = {
  ...inputStyle,
  minHeight: "150px",
  borderRadius: "20px",
};
const btnStyle = {
  backgroundColor: "#97af6e",
  border: "none",
  borderRadius: "20px",
  padding: "12px 30px",
  width: "fit-content",
  fontWeight: "bold",
  cursor: "pointer",
  fontFamily: "'Montserrat', sans-serif",
};

const infoBoxStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "16px",
  lineHeight: "1.8",
};

export default AideContact;
