import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          telephone: formData.telephone,
        }),
      });

      if (res.ok) {
        alert("Profil mis à jour !");
        await fetchUserData();
        onBack();
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour au compte
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
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

// --- 2. FORMULAIRE : ADRESSE ---
const FormAdresse = ({ user, onBack, apiUrl, fetchUserData }) => {
  const [adresse, setAdresse] = useState(user?.adresse_livraison || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/clients/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adresse_principale: adresse }),
      });

      if (res.ok) {
        alert("Adresse mise à jour !");
        await fetchUserData();
        onBack();
      }
    } catch (err) {
      console.error("Erreur Update Address:", err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour
      </button>
      <h2 style={sectionTitle}>Mon adresse de livraison</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <textarea
          style={{ ...inputStyle, height: "120px" }}
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Votre adresse complète..."
        />
        <button type="submit" style={btnVertStyle}>
          Mettre à jour l'adresse
        </button>
      </form>
    </div>
  );
};

// --- 3. FORMULAIRE : MOT DE PASSE ---
const FormPassword = ({ onBack, apiUrl }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert("Mot de passe modifié avec succès !");
        onBack();
      } else {
        alert("Erreur lors de la modification");
      }
    } catch (err) {
      console.error("Erreur Password :", err);
    }
  };

  return (
    <div style={formContainer}>
      <button onClick={onBack} style={backBtn}>
        ← Retour
      </button>
      <h2 style={sectionTitle}>Changer mon mot de passe</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="password"
          style={inputStyle}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
          required
        />
        <button type="submit" style={btnVertStyle}>
          Confirmer le changement
        </button>
      </form>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
const MonCompte = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("menu");
  const [loading, setLoading] = useState(true);
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
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (e) {
      console.error("Erreur réseau :", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontFamily: "Montserrat",
        }}
      >
        Chargement...
      </div>
    );

  // Gestion des vues
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
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Mes informations personnelles</h2>
          <div style={infoBox}>
            <p>
              ● <strong>Nom :</strong> {user?.nom_client}
            </p>
            <p>
              ● <strong>Prénom :</strong> {user?.prenom_client}
            </p>
            <p>
              ● <strong>Email :</strong> {user?.email_client}
            </p>
            <p>
              ● <strong>Tel :</strong> {user?.telephone || "Non renseigné"}
            </p>
          </div>
          <div style={btnContainer}>
            <button onClick={() => setView("edit-profil")} style={btnVertStyle}>
              Modifier mon profil
            </button>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Mon adresse de livraison</h2>
          <div style={infoBox}>
            <p>● {user?.adresse_livraison || "Aucune adresse enregistrée."}</p>
          </div>
          <div style={btnContainer}>
            <button
              onClick={() => setView("edit-adresse")}
              style={btnVertStyle}
            >
              Gérer mes adresses
            </button>
          </div>
        </section>

        <section style={{ ...sectionStyle, borderBottom: "none" }}>
          <h2 style={sectionTitle}>Sécurité & Connexion</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p>Mot de passe : ************</p>
            <button
              onClick={() => setView("edit-password")} // ACTIVATION DU BOUTON ICI
              style={{
                ...btnVertStyle,
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "1px solid #ddd",
              }}
            >
              Changer le mot de passe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- STYLES (Inchangés) ---
const pageContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "80px 20px",
  fontFamily: "'Montserrat', sans-serif",
};
const headerStyle = { textAlign: "center", marginBottom: "60px" };
const mainTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "48px",
  color: "#333",
};
const subTitle = { fontSize: "18px", color: "#666", fontWeight: "500" };
const contentGrid = { display: "flex", flexDirection: "column", gap: "50px" };
const sectionStyle = { borderBottom: "1px solid #eee", paddingBottom: "40px" };
const sectionTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "32px",
  color: "#aa8d74",
  marginBottom: "25px",
};
const infoBox = { lineHeight: "2", fontSize: "16px" };
const btnContainer = { textAlign: "right", marginTop: "20px" };
const btnVertStyle = {
  backgroundColor: "#97af6e",
  color: "black",
  border: "none",
  borderRadius: "15px",
  padding: "12px 30px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
const formContainer = {
  maxWidth: "600px",
  margin: "100px auto",
  padding: "40px",
  backgroundColor: "#fcfdfa",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};
const formStyle = { display: "flex", flexDirection: "column", gap: "20px" };
const inputStyle = {
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontFamily: "Montserrat",
  fontSize: "16px",
};
const backBtn = {
  background: "none",
  border: "none",
  color: "#97af6e",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "20px",
  fontSize: "16px",
};

export default MonCompte;
