import React from 'react';
export default function AnimalCard({ nome, raca, imagem, descricao }) {

  // Esta função é uma segurança para o caso de a URL da imagem falhar.
  // Ela substitui a imagem quebrada por uma imagem padrão.
  const handleImageError = (e) => {
    e.target.onerror = null; // Previne um loop de erros
    e.target.src = 'https://placehold.co/400x400/ccc/fff?text=Imagem+Indisponível';
  };

  return (
    <div className="animal-card">
      <img
        src={imagem}
        alt={`Foto de ${nome}`}
        className="animal-image"
        onError={handleImageError}
      />
      <div className="animal-info">
        <h3>{nome}</h3>
        <p><strong>Raça:</strong> {raca}</p>
        <p>{descricao}</p>
        <button className="adopt-button">Quero Adotar</button>
      </div>
    </div>
  );
}