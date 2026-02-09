import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    mdp_client: motDePasse,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur de connexion");
                return;
            }

            const { token, client } = data;
            console.log("Connecté !", client);

            // ✅ C'EST CETTE LIGNE QUI DÉBLOQUE LA NAVBAR :
            // Elle met à jour l'état 'user' et 'token' dans le AuthContext
            login(token, client); 

            // Redirection immédiate
            navigate("/"); 

        } catch (error) {
            setErrorMsg("Le serveur ne répond pas.");
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>

            {errorMsg && <p style={{ color: "#e74c3c" }}>{errorMsg}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        id="password"
                        type="password"
                        value={motDePasse}
                        required
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-btn">
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;