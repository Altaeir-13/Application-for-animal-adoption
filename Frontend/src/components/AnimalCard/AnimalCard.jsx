import React from 'react';
import { useNavigate } from "react-router-dom";

export default function AnimalCard({ id, name, breed, imag_url, description }) {

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/400x400/ccc/fff?text=Imagem+Indisponível';
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/animal/${id}`);
  };

  return (
    <div className="animal-card" onClick={handleCardClick}>
      <img
        src={imag_url} // Usando a prop correta
        alt={`Foto de ${name}`} // Usando a prop correta
        className="animal-image"
        onError={handleImageError}
      />
      <div className="animal-info">
        <h3>{name}</h3> {/* Usando a prop correta */}
        <p><strong>Raça:</strong> {breed || 'SRD'}</p> {/* Usando a prop correta */}
        <p>{description}</p> {/* Usando a prop correta */}
        <button className="adopt-button">Quero Adotar</button>
      </div>
    </div>
  );
}
