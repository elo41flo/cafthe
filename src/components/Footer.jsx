import React from "react";
import { Link } from "react-router-dom";
import "../styles/Components/Footer.css"; // Import du style

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* LOGO À GAUCHE */}
      <div className="footer-logo-wrapper">
        <img src="/logo.webp" alt="Caf'Thé Logo" className="footer-logo" />
      </div>

      {/* LIENS AU CENTRE */}
      <nav className="footer-links-wrapper">
        <Link to="/MentionsLegales" className="footer-link">
          Mentions légales
        </Link>
        <Link to="/cgv" className="footer-link">
          CGV
        </Link>
        <Link to="/Politiqueconfidentialite" className="footer-link">
          Politique de confidentialité
        </Link>
        <Link to="/PlanDuSite" className="footer-link">
          Plan du site
        </Link>
      </nav>

      {/* RÉSEAUX SOCIAUX À DROITE */}
      <div className="footer-socials">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-icon"
          title="Facebook"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
          </svg>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-icon"
          title="Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.059 1.266.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.059-1.266-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.059 1.646-.071 4.85-.071M12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.907.333 4.145.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.145c-.297.762-.5 1.63-.558 2.908C.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.146.558 2.908.306.789.717 1.459 1.384 2.126s1.336 1.079 2.126 1.384c.762.297 1.63.5 2.908.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.146-.261 2.908-.558.789-.306 1.459-.717 2.126-1.384s1.079-1.336 1.384-2.126c.297-.762.5-1.63.558-2.908.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.059-1.278-.261-2.146-.558-2.908-.306-.789-.717-1.459-1.384-2.126s-1.336-1.079-2.126-1.384c-.762-.297-1.63-.5-2.908-.558C15.667.014 15.259 0 12 0z" />
            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-icon"
          title="X (Twitter)"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
