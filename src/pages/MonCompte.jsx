import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/MonCompte.css";

// Import des sous-composants
import FormProfil from "../pages/FormProfil.jsx";
import FormAdresse from "../pages/FormAdress.jsx";
import FormPassword from "../pages/FormPassword.jsx";

/**
 * Simule le statut de livraison Mondial Relay en fonction de la date
 */
const getDeliveryStatus = (dateCommande, typeLivraison) => {
  if (typeLivraison === "magasin" || !typeLivraison) {
    return { label: "Retiré", class: "status-ready" };
  }

  const dateCmd = new Date(dateCommande);
  const aujourdhui = new Date();
  const diffJours = Math.floor((aujourdhui - dateCmd) / (1000 * 60 * 60 * 24));

  if (diffJours === 0) return { label: "En préparation", class: "status-prep" };
  if (diffJours <= 2)
    return { label: "En cours d'acheminement", class: "status-shipping" };
  return { label: "Disponible au point relais", class: "status-delivered" };
};

/**
 * Calcule les infos d'abonnement
 */
const getSubscriptionDetails = (dateDebut, dureeMois) => {
  if (!dateDebut || !dureeMois) return null;
  const nbMois = parseInt(dureeMois);
  const debut = new Date(dateDebut);
  const fin = new Date(dateDebut);
  fin.setMonth(fin.getMonth() + nbMois);
  const aujourdhui = new Date();
  const diffMs = fin.getTime() - aujourdhui.getTime();
  const joursRestants = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let prochaine = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), 5);
  if (aujourdhui.getDate() >= 5) prochaine.setMonth(prochaine.getMonth() + 1);

  return {
    expireLe: fin.toLocaleDateString("fr-FR"),
    joursRestants: joursRestants > 0 ? joursRestants : 0,
    prochaineLivraison: prochaine.toLocaleDateString("fr-FR"),
    estActif: joursRestants > 0,
  };
};

const MonCompte = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("menu");
  const [editType, setEditType] = useState("livraison");
  const [loading, setLoading] = useState(true);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [userRes, ordersRes] = await Promise.all([
        fetch(`${apiUrl}/api/clients/me`, { headers }),
        fetch(`${apiUrl}/api/clients/my-orders`, { headers }),
      ]);

      if (userRes.status === 401 || ordersRes.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      if (userRes.ok) setUser(await userRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
    } catch (e) {
      console.error("Erreur chargement:", e);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- MODIFICATION 1 : FONCTION POUR RECOMMANDER ---
  // --- MODIFICATION : FONCTION POUR RECOMMANDER CORRIGÉE ---
  const handleReorder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/commandes/items/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const items = await res.json();

        if (items && items.length > 0) {
          // Ton panier utilise la clé "panier" d'après ton code
          const storageKey = "panier";
          const currentCart = JSON.parse(
            localStorage.getItem(storageKey) || "[]",
          );

          const formattedItems = items.map((item) => {
            const productId = item.id || item.numero_produit;
            return {
              // ON AJOUTE LE uniqueId INDISPENSABLE POUR TON PANIER
              uniqueId: `${productId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              id: productId,
              nom: item.nom || item.nom_produit,
              prix: Number(item.prix || item.prix_ttc) || 0,
              image: item.image || item.image_produit,
              quantite: Number(item.quantite || 1),
              format: item.format || "Sachet 250g", // Valeur par défaut si vide
            };
          });

          const newCart = [...currentCart, ...formattedItems];
          localStorage.setItem(storageKey, JSON.stringify(newCart));

          // On force le rechargement pour que Panier.jsx lise le localStorage
          window.location.href = "/panier";
        }
      }
    } catch (err) {
      console.error("Erreur reorder:", err);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmFirst = window.confirm(
      "ATTENTION : Souhaitez-vous vraiment supprimer votre compte Caf'Thé ?",
    );
    if (!confirmFirst) return;

    const confirmSecond = window.confirm(
      "Cette action est irréversible. Confirmer ?",
    );
    if (confirmSecond) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${apiUrl}/api/clients/delete-me`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          alert("Votre compte a été supprimé.");
          localStorage.clear();
          navigate("/");
          window.location.reload();
        } else {
          alert("Erreur lors de la suppression.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleBack = () => setView("menu");

  if (loading)
    return (
      <div className="loading-spinner">Chargement de votre univers...</div>
    );

  if (view === "edit-profil")
    return (
      <FormProfil
        user={user}
        onBack={handleBack}
        apiUrl={apiUrl}
        fetchUserData={fetchData}
      />
    );
  if (view === "edit-adresse")
    return (
      <FormAdresse
        user={user}
        initialType={editType}
        onBack={handleBack}
        apiUrl={apiUrl}
        fetchUserData={fetchData}
      />
    );
  if (view === "edit-password")
    return <FormPassword onBack={handleBack} apiUrl={apiUrl} />;

  const subData = getSubscriptionDetails(
    user?.date_debut_abo,
    user?.duree_abo_mois,
  );

  return (
    <div className="account-container fade-in">
      <header className="account-header">
        <h1 className="account-main-title">Mon espace Caf’Thé</h1>
        <p className="account-subtitle">
          Ravi de vous revoir, <strong>{user?.prenom_client}</strong>.
        </p>
      </header>

      <div className="account-content-grid">
        {/* ABONNEMENT */}
        {Number(user?.est_abonne) === 1 && (
          <section className="subscription-card">
            <h2 className="account-section-title">☕ Mon Abonnement</h2>
            <div className="sub-grid">
              <div className="sub-info-box">
                <span className="sub-label">Formule</span>
                <p className="sub-value">{user.type_abonnement}</p>
              </div>
              <div className="sub-info-box accent-box">
                <span className="sub-label">Prochaine Box</span>
                <p className="sub-value highlight">
                  {subData?.prochaineLivraison}
                </p>
              </div>
              <div className="sub-info-box">
                <span className="sub-label">Fin de validité</span>
                <p className="sub-value">
                  {subData?.expireLe}{" "}
                  <span className="days-badge">
                    {subData?.joursRestants}j restants
                  </span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* INFOS PERSO */}
        <section className="account-section info-card">
          <h2 className="account-section-title">Mes informations</h2>
          <div className="info-details">
            <p>
              <strong>Nom :</strong> {user?.prenom_client} {user?.nom_client}
            </p>
            <p>
              <strong>Email :</strong> {user?.email_client}
            </p>
            <p>
              <strong>Tel :</strong> {user?.telephone || "Non renseigné"}
            </p>
          </div>
          <button
            onClick={() => setView("edit-profil")}
            className="btn-account-action"
          >
            Modifier le profil
          </button>
        </section>

        {/* HISTORIQUE COMMANDES */}
        <section className="account-section">
          <div className="section-header-row">
            <h2 className="account-section-title">Historique des commandes</h2>
            {orders.length > 3 && (
              <button
                onClick={() => setShowAllOrders(!showAllOrders)}
                className="link-toggle"
              >
                {showAllOrders ? "Réduire" : `Tout voir (${orders.length})`}
              </button>
            )}
          </div>
          <div className="orders-list">
            {(showAllOrders ? orders : orders.slice(0, 3)).map((order) => {
              const prixNum = Number(
                order.total_ttc || order.montant_paiement || 0,
              );
              const status = getDeliveryStatus(
                order.date_commande,
                order.type_livraison,
              );
              return (
                <div key={order.numero_commande} className="order-card">
                  <div className="order-meta">
                    <span className="order-id">
                      Commande #{order.numero_commande}
                    </span>
                    <span className="order-date">
                      {new Date(order.date_commande).toLocaleDateString(
                        "fr-FR",
                      )}
                    </span>
                    <div className={`order-status-badge ${status.class}`}>
                      {status.label}
                    </div>
                  </div>
                  <div className="order-actions">
                    <span className="order-price">{prixNum.toFixed(2)} €</span>
                    {/* --- MODIFICATION 2 : ONCLICK AJOUTÉ --- */}
                    <button
                      className="btn-reorder"
                      onClick={() => handleReorder(order.numero_commande)}
                    >
                      Recommander
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ADRESSES */}
        <section className="account-section">
          <h2 className="account-section-title">Mes adresses</h2>
          <div className="addr-grid">
            <div className="addr-card">
              <h3 className="addr-type-title">📦 Livraison</h3>
              {user?.adresse_livraison ? (
                <div className="addr-body">
                  <p>
                    {user.adresse_livraison}
                    <br />
                    {user.code_postal_livraison} {user.ville_livraison}
                  </p>
                  <button
                    onClick={() => {
                      setEditType("livraison");
                      setView("edit-adresse");
                    }}
                    className="link-edit"
                  >
                    Modifier
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditType("livraison");
                    setView("edit-adresse");
                  }}
                  className="btn-add-addr"
                >
                  + Ajouter
                </button>
              )}
            </div>
          </div>
        </section>

        {/* SECURITE */}
        <section className="account-section security-card">
          <h2 className="account-section-title">Sécurité</h2>
          <div className="security-row">
            <div className="security-info">
              <p>Mot de passe</p>
              <span className="dots">••••••••••••</span>
            </div>
            <button
              onClick={() => setView("edit-password")}
              className="btn-reorder"
            >
              Modifier
            </button>
          </div>
        </section>

        {/* ZONE DE DANGER */}
        <section className="account-section delete-account-zone">
          <h2 className="account-section-title danger-title">
            Supprimez votre compte
          </h2>
          <div className="delete-box">
            <p>
              La suppression de votre compte est définitive. Toutes vos données
              seront effacées conformément au RGPD.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="btn-delete-account"
            >
              Supprimer mon compte définitivement
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MonCompte;
