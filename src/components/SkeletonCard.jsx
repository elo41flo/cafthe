import React from "react";
import "../styles/Components/SkeletonCard.css"; // Importation de l'animation et des styles

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      {/* Simulation de l'image */}
      <div className="skeleton-box skeleton-image"></div>

      {/* Simulation du titre */}
      <div className="skeleton-box skeleton-title"></div>

      {/* Simulation du prix */}
      <div className="skeleton-box skeleton-price"></div>
    </div>
  );
};

export default SkeletonCard;
