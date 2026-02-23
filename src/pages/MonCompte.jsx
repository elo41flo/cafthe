import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- FONCTION UTILITAIRE : CALCUL ABONNEMENT ---
const getSubscriptionDetails = (dateDebut, dureeMois) => {
  if (!dateDebut || !dureeMois) return null;
  const debut = new Date(dateDebut);
  const fin = new Date(dateDebut);
  fin.setMonth(fin.getMonth() + dureeMois);

  const aujourdhui = new Date();

  // Calcul de la différence en millisecondes puis conversion en jours
  const diffMs = fin.getTime() - aujourdhui.getTime();
  const joursRestants = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Estimation de la prochaine livraison (le 5 du mois suivant)
  let prochaine = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), 5);
  if (aujourdhui.getDate() >= 5) {
    prochaine.setMonth(prochaine.getMonth() + 1);
  }

  return {
    expireLe: fin.toLocaleDateString(),
    joursRestants: joursRestants > 0 ? joursRestants : 0,
    prochaineLivraison: prochaine.toLocaleDateString(),
    estActif: joursRestants > 0,
  };
};

// --- 1. FORMULAIRE : PROFIL ---
const FormProfil = ({ user, onBack, apiUrl, fetchUserData }) => {
  const [formData, setFormData] = useState({
    nom: user?.nom_client || "",
    prenom: user?.prenom_client || "",
    telephone: user?.telephone || "",
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/clients/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Profil mis à jour !");
        await fetchUserData();
        onBack();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour
      </button>
      <h2 style={sectionTitle}>Modifier mon profil</h2>
      <form onSubmit={handleUpdateProfile} style={formStyle}>
        <input
          style={inputStyle}
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          placeholder="Nom"
        />
        <input
          style={inputStyle}
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          placeholder="Prénom"
        />
        <input
          style={inputStyle}
          value={formData.telephone}
          onChange={(e) =>
            setFormData({ ...formData, telephone: e.target.value })
          }
          placeholder="Téléphone"
        />
        <button type="submit" style={btnVertStyle}>
          Enregistrer
        </button>
      </form>
    </div>
  );
};

// --- 2. FORMULAIRE : ADRESSES ---
const FormAdresse = ({
  user,
  onBack,
  apiUrl,
  fetchUserData,
  initialType = "livraison",
}) => {
  const [type, setType] = useState(initialType);
  const [newAddr, setNewAddr] = useState({
    rue:
      type === "livraison"
        ? user?.adresse_livraison || ""
        : user?.adresse_facturation || "",
    cp:
      type === "livraison"
        ? user?.code_postal_livraison || ""
        : user?.code_postal_facturation || "",
    ville:
      type === "livraison"
        ? user?.ville_livraison || ""
        : user?.ville_facturation || "",
  });

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/clients/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newAddr, type_adresse: type }),
      });
      if (res.ok) {
        alert(`Adresse de ${type} mise à jour !`);
        await fetchUserData();
        onBack();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour
      </button>
      <h2 style={sectionTitle}>Gérer mes adresses</h2>
      <div style={tabContainer}>
        <button
          onClick={() => setType("livraison")}
          style={type === "livraison" ? activeTab : inactiveTab}
        >
          Livraison
        </button>
        <button
          onClick={() => setType("facturation")}
          style={type === "facturation" ? activeTab : inactiveTab}
        >
          Facturation
        </button>
      </div>
      <form onSubmit={handleUpdateAddress} style={formStyle}>
        <input
          style={inputStyle}
          placeholder="Rue / Avenue"
          value={newAddr.rue}
          onChange={(e) => setNewAddr({ ...newAddr, rue: e.target.value })}
          required
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            style={{ ...inputStyle, flex: 1 }}
            placeholder="CP"
            value={newAddr.cp}
            onChange={(e) => setNewAddr({ ...newAddr, cp: e.target.value })}
            required
          />
          <input
            style={{ ...inputStyle, flex: 2 }}
            placeholder="Ville"
            value={newAddr.ville}
            onChange={(e) => setNewAddr({ ...newAddr, ville: e.target.value })}
            required
          />
        </div>
        <button type="submit" style={btnVertStyle}>
          Enregistrer
        </button>
      </form>
    </div>
  );
};

// --- 3. FORMULAIRE : MOT DE PASSE ---
const FormPassword = ({ onBack, apiUrl }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/clients/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      if (res.ok) {
        alert("Mot de passe modifié !");
        onBack();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour
      </button>
      <h2 style={sectionTitle}>Sécurité</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="password"
          style={inputStyle}
          placeholder="Nouveau mot de passe"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          style={inputStyle}
          placeholder="Confirmer"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && (
          <p style={{ color: "#d9534f", fontSize: "14px", margin: 0 }}>
            ⚠️ {error}
          </p>
        )}
        <button type="submit" style={btnVertStyle}>
          Confirmer
        </button>
      </form>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
const MonCompte = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("menu");
  const [editType, setEditType] = useState("livraison");
  const [loading, setLoading] = useState(true);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:3000";

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`${apiUrl}/api/clients/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUser(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${apiUrl}/api/clients/my-orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error("Erreur historique :", err);
    }
  };

  const handleDeleteAddress = async (type) => {
    if (!window.confirm(`Supprimer l'adresse de ${type} ?`)) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${apiUrl}/api/clients/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rue: "",
          cp: "",
          ville: "",
          type_adresse: type,
        }),
      });
      fetchUserData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReorder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/clients/orders/${orderId}/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const items = await res.json();
        const currentCart = JSON.parse(localStorage.getItem("panier")) || [];
        const itemsToAdd = items.map((item) => ({
          ...item,
          id: item.numero_produit,
          nom: item.nom_produit,
          prix: item.prix_ttc,
          image: `${apiUrl}/images/${item.image}`,
          quantite: 1,
          uniqueId: Date.now() + Math.random(),
        }));
        localStorage.setItem(
          "panier",
          JSON.stringify([...currentCart, ...itemsToAdd]),
        );
        window.dispatchEvent(new Event("cartUpdate"));
        window.dispatchEvent(new Event("openCartDrawer"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchOrders();
  }, []);

  const subData = getSubscriptionDetails(
    user?.date_debut_abo,
    user?.duree_abo_mois,
  );

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>Chargement...</div>
    );

  if (view === "edit-profil")
    return (
      <FormProfil
        user={user}
        onBack={() => setView("menu")}
        apiUrl={apiUrl}
        fetchUserData={fetchUserData}
      />
    );
  if (view === "edit-adresse")
    return (
      <FormAdresse
        user={user}
        initialType={editType}
        onBack={() => setView("menu")}
        apiUrl={apiUrl}
        fetchUserData={fetchUserData}
      />
    );
  if (view === "edit-password")
    return <FormPassword onBack={() => setView("menu")} apiUrl={apiUrl} />;

  return (
    <div style={pageContainer}>
      <header style={headerStyle}>
        <h1 style={mainTitle}>Mon espace Caf’Thé</h1>
        <p style={subTitle}>Ravi de vous revoir, {user?.prenom_client}.</p>
      </header>

      <div style={contentGrid}>
        {/* --- SECTION ABONNEMENT --- */}
        {Number(user?.est_abonne) === 1 && (
          <section style={subSectionCard}>
            <h2 style={sectionTitle}>☕ Mon Abonnement Caf’Thé</h2>
            <div style={subGrid}>
              <div style={subInfoBox}>
                <p style={subLabel}>Formule</p>
                <p style={subValue}>{user.type_abonnement}</p>
              </div>
              <div style={subInfoBox}>
                <p style={subLabel}>Prochaine Box</p>
                <p style={{ ...subValue, color: "#97af6e" }}>
                  {subData?.prochaineLivraison}
                </p>
              </div>
              <div style={subInfoBox}>
                <p style={subLabel}>Fin de validité</p>
                <p style={subValue}>
                  {subData?.expireLe}{" "}
                  <span style={daysBadge}>
                    {subData?.joursRestants}j restants
                  </span>
                </p>
              </div>
            </div>

            <div style={boxDetailsContainer}>
              <h4 style={boxDetailsTitle}>📦 Détails de ma formule :</h4>
              <p style={boxDetailsText}>
                {user.type_abonnement?.toLowerCase().includes("découverte")
                  ? "Votre Box Découverte comprend 2 sachets de 100g de thés ou cafés d'exception sélectionnés ce mois-ci, ainsi qu'une surprise artisanale."
                  : "Votre Formule Passionné comprend 4 sachets de 100g de thés et cafés premium, un accessoire de dégustation et des fiches descriptives détaillées."}
              </p>
              <div
                style={{
                  marginTop: "10px",
                  color: "#aa8d74",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                ℹ️ Frais de livraison calculés lors de l'expédition mensuelle.
              </div>
            </div>
          </section>
        )}

        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Mes informations</h2>
          <div style={infoBox}>
            <p>
              ●{" "}
              <strong>
                {user?.prenom_client} {user?.nom_client}
              </strong>
            </p>
            <p>● {user?.email_client}</p>
            <p>● {user?.telephone || "Non renseigné"}</p>
          </div>
          <div style={btnContainer}>
            <button onClick={() => setView("edit-profil")} style={btnVertStyle}>
              Modifier
            </button>
          </div>
        </section>

        <section style={sectionStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h2 style={sectionTitle}>Historique des commandes</h2>
            {orders.length > 3 && (
              <button
                onClick={() => setShowAllOrders(!showAllOrders)}
                style={toggleBtnStyle}
              >
                {showAllOrders ? "Réduire" : `Tout voir (${orders.length})`}
              </button>
            )}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {orders.length > 0 ? (
              (showAllOrders ? orders : orders.slice(0, 3)).map((order) => (
                <div key={order.numero_commande} style={orderCardStyle}>
                  <div>
                    <p style={{ margin: 0 }}>
                      <strong>Commande #{order.numero_commande}</strong>
                    </p>
                    <p style={{ fontSize: "13px", color: "#888" }}>
                      {new Date(order.date_commande).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {order.total_ttc || order.montant_paiement} €
                    </span>
                    <button
                      onClick={() => handleReorder(order.numero_commande)}
                      style={btnReorderStyle}
                    >
                      Recommander
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={emptyText}>Aucune commande passée.</p>
            )}
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Mes adresses</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div style={addrCard}>
              <h3 style={subSectionTitle}>📦 Livraison</h3>
              {user?.adresse_livraison ? (
                <>
                  <p>{user.adresse_livraison}</p>
                  <p>
                    {user.code_postal_livraison} {user.ville_livraison}
                  </p>
                  <div style={actionLinks}>
                    <button
                      onClick={() => {
                        setEditType("livraison");
                        setView("edit-adresse");
                      }}
                      style={linkEdit}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteAddress("livraison")}
                      style={linkDelete}
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditType("livraison");
                    setView("edit-adresse");
                  }}
                  style={btnAjout}
                >
                  + Ajouter
                </button>
              )}
            </div>
            <div style={addrCard}>
              <h3 style={subSectionTitle}>💳 Facturation</h3>
              {user?.adresse_facturation ? (
                <>
                  <p>{user.adresse_facturation}</p>
                  <p>
                    {user.code_postal_facturation} {user.ville_facturation}
                  </p>
                  <div style={actionLinks}>
                    <button
                      onClick={() => {
                        setEditType("facturation");
                        setView("edit-adresse");
                      }}
                      style={linkEdit}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteAddress("facturation")}
                      style={linkDelete}
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditType("facturation");
                    setView("edit-adresse");
                  }}
                  style={btnAjout}
                >
                  + Ajouter
                </button>
              )}
            </div>
          </div>
        </section>

        <section style={{ ...sectionStyle, borderBottom: "none" }}>
          <h2 style={sectionTitle}>Sécurité</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Mot de passe : ************</p>
            <button
              onClick={() => setView("edit-password")}
              style={btnSecuStyle}
            >
              Changer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- STYLES ---
const pageContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "80px 20px",
  fontFamily: "'Montserrat', sans-serif",
};
const headerStyle = { textAlign: "center", marginBottom: "60px" };
const mainTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "42px",
  color: "#333",
};
const subTitle = { fontSize: "18px", color: "#666" };
const contentGrid = { display: "flex", flexDirection: "column", gap: "40px" };
const sectionStyle = { borderBottom: "1px solid #eee", paddingBottom: "30px" };
const sectionTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "28px",
  color: "#aa8d74",
  marginBottom: "15px",
};
const subSectionTitle = {
  fontSize: "16px",
  color: "#555",
  borderBottom: "1px solid #f0f0f0",
  paddingBottom: "5px",
  marginBottom: "10px",
};
const infoBox = { lineHeight: "1.8", fontSize: "16px" };
const btnContainer = { textAlign: "right", marginTop: "15px" };
const btnVertStyle = {
  backgroundColor: "#97af6e",
  color: "black",
  border: "none",
  borderRadius: "12px",
  padding: "10px 25px",
  fontWeight: "bold",
  cursor: "pointer",
};
const btnSecuStyle = {
  backgroundColor: "#f5f5f5",
  color: "#333",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "8px 20px",
  cursor: "pointer",
};
const orderCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  backgroundColor: "#fcfdfa",
  borderRadius: "12px",
  border: "1px solid #eee",
};
const btnReorderStyle = {
  backgroundColor: "#aa8d74",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "12px",
};
const toggleBtnStyle = {
  background: "none",
  border: "none",
  color: "#aa8d74",
  textDecoration: "underline",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
};
const addrCard = {
  padding: "15px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  border: "1px solid #eee",
  fontSize: "14px",
  lineHeight: "1.5",
};
const actionLinks = {
  display: "flex",
  gap: "15px",
  marginTop: "10px",
  borderTop: "1px solid #eee",
  paddingTop: "10px",
};
const linkEdit = {
  background: "none",
  border: "none",
  color: "#aa8d74",
  cursor: "pointer",
  fontWeight: "bold",
};
const linkDelete = {
  background: "none",
  border: "none",
  color: "#d9534f",
  cursor: "pointer",
  fontWeight: "bold",
};
const btnAjout = {
  backgroundColor: "#f9fcf5",
  border: "1px dashed #97af6e",
  color: "#97af6e",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%",
  fontWeight: "bold",
};
const subSectionCard = {
  backgroundColor: "#fcfaf8",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid #eaddcf",
};
const subGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginTop: "15px",
};
const subInfoBox = {
  backgroundColor: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
};
const subLabel = {
  fontSize: "12px",
  color: "#888",
  textTransform: "uppercase",
  marginBottom: "5px",
};
const subValue = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
  margin: 0,
};
const daysBadge = {
  fontSize: "12px",
  backgroundColor: "#f0f0f0",
  padding: "2px 8px",
  borderRadius: "10px",
  marginLeft: "10px",
  color: "#666",
};
const formContainer = {
  maxWidth: "550px",
  margin: "100px auto",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};
const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontFamily: "Montserrat",
};
const backBtn = {
  background: "none",
  border: "none",
  color: "#97af6e",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "15px",
};
const tabContainer = { display: "flex", gap: "10px", marginBottom: "20px" };
const activeTab = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#97af6e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
const inactiveTab = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#f5f5f5",
  color: "#888",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
const emptyText = { fontSize: "13px", color: "#999", fontStyle: "italic" };

const boxDetailsContainer = {
  marginTop: "20px",
  paddingTop: "15px",
  borderTop: "1px dashed #eaddcf",
};
const boxDetailsTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#aa8d74",
  marginBottom: "5px",
};
const boxDetailsText = {
  fontSize: "13px",
  color: "#666",
  lineHeight: "1.4",
  fontStyle: "italic",
};

export default MonCompte;
