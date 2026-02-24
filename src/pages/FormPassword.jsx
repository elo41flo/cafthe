import React from 'react';
import "../styles/Pages/FormPassword.css";

const FormPassword = ({ onBack, apiUrl }) => {
  return (
    <div className="password-form-container fade-in">
      <h2 className="password-title">Sécurité du compte</h2>
      
      <form className="password-form">
        <div className="password-group">
          <label>Mot de passe actuel</label>
          <input type="password" className="password-input" placeholder="••••••••" />
        </div>

        <div className="password-group">
          <label>Nouveau mot de passe</label>
          <input type="password" className="password-input" placeholder="••••••••" />
          <p className="password-help-text">Minimum 8 caractères, une majuscule et un chiffre.</p>
        </div>

        <div className="password-group">
          <label>Confirmer le nouveau mot de passe</label>
          <input type="password" className="password-input" placeholder="••••••••" />
        </div>

        <div className="password-actions">
          <button type="button" className="btn-cancel-password" onClick={onBack}>
            Annuler
          </button>
          <button type="submit" className="btn-submit-password">
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPassword;