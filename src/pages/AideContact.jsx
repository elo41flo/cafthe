import React from "react";
import "../styles/Pages/AideContact.css"; // Import des styles personnalisés

const AideContact = () => {
  return (
    <div className="aide-container">
      {/* --- HEADER --- 
          Utilisation de <header> pour la sémantique. Les <br /> sont conservés pour le design desktop.
      */}
      <header className="aide-header">
        <h1 className="aide-main-title">
          Besoin d’aide ? On <br /> s’occupe de tout.
        </h1>
        <p className="aide-intro-text">
          Une question sur votre commande, une hésitation sur <br />
          une mouture ou simplement envie de nous dire <br />
          bonjour ? Vous êtes au bon endroit.
        </p>
      </header>

      {/* --- SECTION FAQ --- */}
      <section className="aide-section">
        <h2 className="aide-h2">Foire Aux Questions (FAQ)</h2>
        <p className="aide-subtitle">
          Gagnez du temps avec les réponses aux questions les plus fréquentes.
        </p>

        <div className="faq-wrapper">
          {/* Bloc Livraison */}
          <div className="faq-item">
            <span className="faq-bullet">●</span>
            <div className="faq-content">
              <h3 className="faq-category-title">Commandes & Livraison</h3>
              <p className="faq-question">
                Quels sont les délais de livraison ?
              </p>
              <p className="faq-answer">
                Réponse : Vos commandes sont préparées sous 24h. Comptez 2 à 4
                jours ouvrés pour une livraison à domicile ou en point relais.
              </p>

              <p className="faq-question">La livraison est-elle offerte ?</p>
              <p className="faq-answer">
                Réponse : Oui, dès 45€ d’achat en France métropolitaine !
              </p>
            </div>
          </div>

          {/* Bloc Produits */}
          <div className="faq-item">
            <span className="faq-bullet">●</span>
            <div className="faq-content">
              <h3 className="faq-category-title">Nos Produits</h3>
              <p className="faq-question">Proposez-vous du café déjà moulu ?</p>
              <p className="faq-answer">
                Réponse : Bien sûr ! Sur chaque fiche produit, vous pouvez
                choisir entre grains ou mouture adaptée (Espresso, Filtre,
                Piston).
              </p>

              <p className="faq-question">Vos thés sont-ils bio ?</p>
              <p className="faq-answer">
                Réponse : Une grande partie de notre sélection est certifiée
                Bio. Cherchez le petit logo sur les fiches produits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION FORMULAIRE --- */}
      <section className="aide-section">
        <h2 className="aide-h2">Nous envoyer un message</h2>
        <p className="aide-subtitle">
          Julien et Thomas vous répondent personnellement sous 24h.
        </p>

        <form
          action="https://formspree.io/f/xojnwark"
          method="POST"
          className="aide-form fade-in"
        >
          <div className="aide-form-grid">
            <input
              type="text"
              name="sujet"
              placeholder="Sujet de votre demande"
              className="aide-input"
              required
            />
            <input
              type="text"
              name="nom"
              placeholder="Votre nom complet"
              className="aide-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Votre adresse email"
              className="aide-input"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Comment pouvons-nous vous aider ?"
            className="aide-textarea"
            required
          />

          {/* AJOUT : Case de consentement RGPD */}
          <div className="aide-form-rgpd">
            <input
              type="checkbox"
              id="rgpd-consent"
              name="consentement_rgpd"
              required
            />
            <label htmlFor="rgpd-consent">
              J'accepte que mes données soient utilisées pour répondre à ma
              demande conformément à la{" "}
              <strong>politique de confidentialité</strong>.
            </label>
          </div>

          <button type="submit" className="aide-btn">
            Envoyer le message
          </button>
        </form>
      </section>

      {/* --- SECTION LOCALISATION --- */}
      <section className="aide-section">
        <h2 className="aide-h2">Nous trouver à Blois</h2>
        <p className="aide-subtitle">
          Envie de sentir l’odeur du café fraîchement torréfié ? Passez nous
          voir !
        </p>

        <div className="info-box">
          <p>
            <strong>📍 Adresse :</strong> Avenue du Moulin à Café 41, 41000
            Blois
          </p>
          <p>
            <strong>🕒 Horaires :</strong> Lundi au Vendredi, 9h - 18h
          </p>
          <p>
            <strong>📞 Téléphone :</strong> 02 54 99 99 99
          </p>
        </div>

        {/* Intégration de la Google Maps avec l'URL corrigée pour React. 
            Note : On utilise {{ border: 0 }} car l'attribut style attend un objet en JSX.
        */}
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.136896264906!2d1.3259833768853754!3d47.58410298950435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fb0664e52b217d%3A0xc3f8f11736b42b10!2sBlois!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
            width="100%"
            height="450"
            className="google-map"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Boutique Caf'Thé Blois"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default AideContact;
