import React from "react";

const SkeletonCard = () => {
  return (
    <div style={skeletonCardStyle}>
      {/* Simulation de l'image */}
      <div style={skeletonImageStyle}></div>
      {/* Simulation du titre */}
      <div style={skeletonTitleStyle}></div>
      {/* Simulation du prix */}
      <div style={skeletonPriceStyle}></div>
    </div>
  );
};

// --- STYLES ANIMÉS ---
const pulse = {
  "@keyframes pulse": {
    "0%": { opacity: 0.6 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0.6 },
  },
};

const skeletonCardStyle = {
  width: "280px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  padding: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const skeletonImageStyle = {
  width: "100%",
  height: "200px",
  backgroundColor: "#eee",
  borderRadius: "10px",
  marginBottom: "15px",
  animation: "pulse 1.5s infinite ease-in-out",
};

const skeletonTitleStyle = {
  width: "70%",
  height: "20px",
  backgroundColor: "#eee",
  borderRadius: "4px",
  marginBottom: "10px",
  animation: "pulse 1.5s infinite ease-in-out",
};

const skeletonPriceStyle = {
  width: "40%",
  height: "20px",
  backgroundColor: "#eee",
  borderRadius: "4px",
  animation: "pulse 1.5s infinite ease-in-out",
};

// Note : Pour l'animation sans CSS externe, tu peux ajouter une balise <style> dans ton index.html
// ou utiliser une bibliothèque. Sinon, le gris fixe est déjà une grande avancée !

export default SkeletonCard;
