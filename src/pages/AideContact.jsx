import React from "react";
import "../styles/Pages/AideContact.css"; // Import des styles

const AideContact = () => {
  return (
    <div className="aide-container">
      {/* HEADER */}
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

      {/* SECTION FAQ */}
      <section className="aide-section">
        <h2 className="aide-h2">Foire Aux Questions (FAQ)</h2>
        <p className="aide-subtitle">
          Gagnez du temps avec les réponses aux questions les plus fréquentes.
        </p>

        <div className="faq-wrapper">
          <div className="faq-item">
            <span className="faq-bullet">●</span>
            <div>
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

          <div className="faq-item">
            <span className="faq-bullet">●</span>
            <div>
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

      {/* SECTION FORMULAIRE */}
      <section className="aide-section">
        <h2 className="aide-h2">Nous envoyer un message</h2>
        <p className="aide-subtitle">
          Julien et Thomas vous répondent personnellement sous 24h.
        </p>

        <form
          action="https://formspree.io/f/xojnwark"
          method="POST"
          className="aide-form"
        >
          <input
            type="text"
            name="sujet"
            placeholder="Sujet"
            className="aide-input"
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            className="aide-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="aide-input"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="aide-textarea"
            required
          />

          <button type="submit" className="aide-btn">
            Envoyer le message
          </button>
        </form>
      </section>

      {/* SECTION LOCALISATION */}
      <section className="aide-section">
        <h2 className="aide-h2">Nous trouver à Blois</h2>
        <p className="aide-subtitle">
          Envie de sentir l’odeur du café fraîchement torréfié ? Passez nous
          voir !
        </p>

        <div className="info-box">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.1328!2d1.3333" /* Mets ta vraie URL Google Maps ici */
          width="100%"
          height="450"
          className="google-map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Boutique CafThé Blois"
        ></iframe>
      </section>
    </div>
  );
};

export default AideContact;
