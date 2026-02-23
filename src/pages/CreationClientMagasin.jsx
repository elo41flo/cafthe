import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreationClientMagasin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On définit un mot de passe par défaut que le client changera plus tard
    const newUser = {
      ...formData,
      password: "CaftheTemporaire2026!",
      role: "client",
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "✅ Compte client créé avec succès !",
        });
        setFormData({ nom: "", prenom: "", email: "", telephone: "" });
      } else {
        setMessage({
          type: "error",
          text: `❌ Erreur : ${data.message || "Impossible de créer le compte"}`,
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "❌ Erreur de connexion au serveur." });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Espace Magasin</h2>
        <p style={styles.subtitle}>Création rapide d'un compte client</p>

        {message.text && (
          <div
            style={{
              ...styles.alert,
              backgroundColor:
                message.type === "success" ? "#d4edda" : "#f8d7da",
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input
              type="text"
              placeholder="Prénom"
              style={styles.input}
              required
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Nom"
              style={styles.input}
              required
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
            />
          </div>

          <input
            type="email"
            placeholder="Adresse Email"
            style={styles.input}
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="tel"
            placeholder="Téléphone (Optionnel)"
            style={styles.input}
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
          />

          <p style={styles.info}>
            Mot de passe provisoire : <strong>CaftheTemporaire2026!</strong>
          </p>

          <button type="submit" style={styles.button}>
            Enregistrer le client
          </button>
          <button
            type="button"
            onClick={() => navigate("/moncompte")}
            style={styles.btnBack}
          >
            Retour au compte
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles en ligne pour rester simple et cohérent
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#f9f6f2",
    fontFamily: "Montserrat, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  },
  title: { color: "#4a3b2c", marginBottom: "10px" },
  subtitle: { color: "#888", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  row: { display: "flex", gap: "10px" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
  },
  button: {
    backgroundColor: "#97af6e",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "10px",
  },
  btnBack: {
    backgroundColor: "transparent",
    color: "#4a3b2c",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
  alert: {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  info: {
    fontSize: "12px",
    color: "#666",
    backgroundColor: "#eee",
    padding: "5px",
    borderRadius: "5px",
  },
};

export default CreationClientMagasin;
