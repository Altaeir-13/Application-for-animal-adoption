import React from 'react';

// AQUI ESTÁ A CORREÇÃO PRINCIPAL:
// As props foram renomeadas para corresponder aos dados da API (name, breed, etc.)
export default function AnimalCard({ name, breed, imag_url, description }) {

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/400x400/ccc/fff?text=Imagem+Indisponível';
  };

  return (
    <div className="animal-card">
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
